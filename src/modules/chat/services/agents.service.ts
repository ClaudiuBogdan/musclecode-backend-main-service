import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, AIMessageChunk } from '@langchain/core/messages';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { Runnable } from '@langchain/core/runnables';
import { PromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import {
  ServerSentEvent,
  TextBlock,
  ToolResultContentBlock,
  ToolUseContentBlock,
} from '../entities/messages';
import {
  BaseContextBlockDto,
  ChatMessageDto,
  ModelDto,
  ModelReferenceContextDto,
} from '../dto/agent-chat.dto';
import { PostgresSaver } from '@langchain/langgraph-checkpoint-postgres';

import { ContentService } from '../../content/content.service';
import { createModuleTool, editModuleTool } from '../tools/modules.tool';
import { createLessonsTool, editLessonTool } from '../tools/lessons.tool';
import { createSearchTool } from '../tools/search/search.tool';
import {
  CheckQuestionDto,
  QuestionResponseDto,
} from 'src/modules/content/dto/questions.dto';
import zodToJsonSchema from 'zod-to-json-schema';
import CallbackHandler from 'langfuse-langchain';

@Injectable()
export class AgentsService implements OnModuleInit {
  private readonly logger = new Logger(AgentsService.name);
  private checkpointer: PostgresSaver;
  private langfuseHandler?: CallbackHandler;

  constructor(
    private configService: ConfigService,
    private contentService: ContentService,
  ) {
    const databaseUrl = this.configService.get('DATABASE_URL')!;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }
    this.checkpointer = PostgresSaver.fromConnString(databaseUrl, {
      schema: 'langchain_chat_histories',
    });

    const isLangfuseEnabled = !!this.configService.get<string>(
      'LANGFUSE_PUBLIC_KEY',
    );
    if (isLangfuseEnabled) {
      this.langfuseHandler = new CallbackHandler({
        publicKey: this.configService.get<string>('LANGFUSE_PUBLIC_KEY'),
        secretKey: this.configService.get<string>('LANGFUSE_SECRET_KEY'),
        baseUrl: this.configService.get<string>('LANGFUSE_BASE_URL'),
        environment: this.configService.get<string>('APP_NAME'),
      });
    }
  }

  async onModuleInit() {
    await this.checkpointer.setup();

    this.logger.log(
      'AgentsService initialized with Gemini LLM and LangGraph agent',
    );
  }

  async *streamAgentResponse(
    message: ChatMessageDto,
    context: BaseContextBlockDto[],
    userId: string,
  ): AsyncGenerator<ServerSentEvent> {
    // log userId to avoid unused variable warning
    this.logger.log(`streamAgentResponse called for user ${userId}`);
    const modelContext = context.find(
      (c) => c.type === 'model',
    ) as ModelReferenceContextDto;

    const agentExecutor = this.createAgent(modelContext.model);
    const assistantMessageId = uuidv4();
    const now = () => new Date().toISOString();

    // 1) Emit message_start
    yield {
      type: 'message_start',
      message: {
        id: assistantMessageId,
        createdAt: now(),
        role: 'assistant',
        content: [],
        threadId: message.threadId,
        parentId: message.id,
      },
    };

    // 2) Prepare state
    const userText = this.extractText(message.content);
    let currentType: 'text' | 'tool_use' | 'tool_result' | null = null;
    let currentId: string | null = null;
    let index = 0;
    let isBlockOpen = false;
    const idMap = new Map<string, string>();

    // 3) Stream events from the agent
    const eventStream = agentExecutor.streamEvents(
      {
        messages: [new HumanMessage(userText)],
      },
      {
        version: 'v2',
        configurable: {
          thread_id: `${userId}_${message.threadId}`,
        },
        metadata: {
          userId,
          threadId: message.threadId,
          langfuseUserId: userId,
          langfuseSessionId: message.threadId,
          environment: this.configService.get<string>('NODE_ENV'),
          service: this.configService.get<string>('APP_NAME'),
        },
        callbacks: this.langfuseHandler ? [this.langfuseHandler] : undefined,
      },
    );

    // Nested generator to close the current block
    function* closeBlock(ts: string): Generator<ServerSentEvent> {
      if (!currentId || !isBlockOpen) {
        return;
      }
      yield {
        type: 'content_block_stop',
        index,
        stop_timestamp: ts,
      } as ServerSentEvent;
      index++;
      currentType = null;
      currentId = null;
      isBlockOpen = false;
    }

    // Nested generator to start a new text block
    function* startTextBlock(ts: string): Generator<ServerSentEvent> {
      currentType = 'text';
      currentId = uuidv4();
      isBlockOpen = true;
      yield {
        type: 'content_block_start',
        index,
        content_block: {
          id: currentId,
          type: 'text',
          text: '',
          start_timestamp: ts,
        } as TextBlock,
      } as ServerSentEvent;
    }

    function* startToolUseBlock(
      evt: any,
      runId: string,
      ts: string,
    ): Generator<ServerSentEvent> {
      const toolName = evt.name;
      const toolId = evt.run_id;

      currentType = 'tool_use';
      currentId = uuidv4();
      isBlockOpen = true;
      if (runId) idMap.set(runId, currentId);

      yield {
        type: 'content_block_start',
        index,
        content_block: {
          id: toolId,
          type: 'tool_use',
          name: toolName,
          input: {},
          start_timestamp: ts,
          stop_timestamp: ts,
        } as ToolUseContentBlock,
      } as ServerSentEvent;
    }

    function* startToolResultBlock(
      evt: any,
      runId: string,
      ts: string,
    ): Generator<ServerSentEvent> {
      currentType = 'tool_result';
      currentId = uuidv4();
      isBlockOpen = true;
      const toolUseId = runId ? idMap.get(runId) : undefined;

      const data = evt.data as any;
      let result: any = data.output ?? '';
      if (typeof result === 'object') {
        result = result.content ?? result.text ?? JSON.stringify(result);
      }

      yield {
        type: 'content_block_start',
        index,
        content_block: {
          id: currentId,
          type: 'tool_result',
          tool_use_id: toolUseId ?? 'unknown_tool_use_id',
          name: data.name,
          content: [{ type: 'text', text: String(result) }], // TODO: make sure you also include the json type or other data types.
          start_timestamp: ts,
          stop_timestamp: ts,
        } as ToolResultContentBlock,
      } as ServerSentEvent;
    }

    for await (const evt of eventStream) {
      // keepalive ping to prevent SSE connection from closing
      const ts = now();
      const runId = evt.run_id;

      switch (evt.event) {
        // ———————————————————————
        //  Text streaming from the chat model
        // ———————————————————————
        case 'on_chat_model_stream': {
          const skip = evt.tags?.includes('skip_client_stream');
          if (skip) {
            break;
          }
          const chunk = (evt.data as any).chunk as AIMessageChunk;
          const text = typeof chunk.content === 'string' ? chunk.content : '';
          if (!text) break;

          if (currentType !== 'text') {
            yield* startTextBlock(ts);
          }

          // Emit the text delta
          yield {
            type: 'content_block_delta',
            index,
            delta: { type: 'text_delta', text },
          } as ServerSentEvent;
          break;
        }

        // ———————————————————————
        //  Chat model end — final cleanup
        // ———————————————————————
        case 'on_chat_model_end': {
          const skip = evt.tags?.includes('skip_client_stream');
          if (skip) {
            break;
          }
          yield* closeBlock(ts);
          break;
        }

        // ———————————————————————
        //  Tool invocation start
        // ———————————————————————
        case 'on_tool_start': {
          yield* closeBlock(ts);

          yield* startToolUseBlock(evt, runId, ts);

          // Immediately close the tool_use block
          // yield* closeBlock(ts);
          break;
        }

        // ———————————————————————
        //  Tool invocation end (result)
        // ———————————————————————
        case 'on_tool_end': {
          // Close tool use block
          yield* closeBlock(ts);

          // Start tool result block
          yield* startToolResultBlock(evt, runId, ts);

          // Close it immediately, as there is not other content to stream from the tool result
          yield* closeBlock(ts);
          break;
        }

        // ———————————————————————
        //  Custom events (if you dispatch any)
        // ———————————————————————
        case 'on_custom_event': {
          // TODO: fix this. we need a better index handling and better event interface
          if (evt.name === 'input_json_delta') {
            yield {
              type: 'content_block_delta',
              index,
              delta: evt.data,
            } as ServerSentEvent;
          }
          break;
        }

        default:
          break;
      }
    }

    // 4) Final force-close and stop
    const finalTs = now();
    yield* closeBlock(finalTs);
    yield {
      type: 'message_stop',
      messageId: assistantMessageId,
      stop_timestamp: finalTs,
    } as ServerSentEvent;
  }

  async checkQuestion(
    checkDto: CheckQuestionDto,
    userId: string,
  ): Promise<QuestionResponseDto> {
    this.logger.log(`Checking question for user ${userId}`, {
      question: checkDto.lessonQuestion.question,
    });

    // Zod schema for the expected response structure
    const questionResponseSchema = z
      .object({
        feedbackItems: z
          .array(
            z.object({
              isCorrect: z
                .boolean()
                .describe(
                  'Whether this specific part of the answer/criterion is correct.',
                ),
              explanation: z
                .string()
                .describe(
                  'Explanation for why this part is correct or incorrect.',
                ),
              points: z
                .number()
                .describe('Points awarded for this specific criterion.'),
            }),
          )
          .describe(
            'An array of feedback items, one for each correction criterion.',
          ),
      })
      .describe(
        'The review of the user answer against the correction criteria. Make sure you review correctly the user answer using the criteria.',
      );

    const { userAnswer, lessonQuestion, model } = checkDto;

    const apiKey =
      model?.apiKey || this.configService.get<string>('GEMINI_API_KEY');
    const modelName =
      model?.model || this.configService.get<string>('GEMINI_MODEL');

    if (!modelName) {
      throw new Error('GEMINI_MODEL is not defined');
    }
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined');
    }

    const llm = new ChatGoogleGenerativeAI({
      apiKey,
      model: modelName,
      temperature: 0.3, // Low temperature for factual evaluation
    });

    const promptTemplate = PromptTemplate.fromTemplate(
      `Evaluate the user's answer to the following question based on the provided correction criteria.

      Question: {question}

      Correction Criteria:
      {correctionCriteria}

      User's Answer: {userAnswer}

      Instructions:
      1. Analyze the User's Answer against each item in the Correction Criteria.
      2. For each criterion, determine if the user's answer meets it (isCorrect: true/false).
      3. Assign points for each criterion met, as specified in the criteria.
      4. Provide a concise explanation for each criterion's evaluation.
      5. Return ONLY the JSON object as specified. Do not include any other text or explanations outside the JSON structure.

      Your response MUST be a JSON object adhering EXACTLY to the following format instructions:
      {responseSchema}
      `,
    );

    const prompt = await promptTemplate.format({
      responseSchema: JSON.stringify(zodToJsonSchema(questionResponseSchema)),
      question: lessonQuestion.question,
      correctionCriteria: JSON.stringify(
        lessonQuestion.correctionCriteria,
        null,
        2,
      ),
      userAnswer: userAnswer,
    });

    try {
      const response = await llm
        .withStructuredOutput(questionResponseSchema)
        .invoke(prompt);
      const feedbackItems = response.feedbackItems as z.infer<
        typeof questionResponseSchema.shape.feedbackItems
      >;

      const score = feedbackItems
        .filter((item) => item.isCorrect)
        .reduce((acc, item) => acc + item.points, 0);

      const maxScore = lessonQuestion.correctionCriteria.reduce(
        (acc, item) => acc + item.points,
        0,
      );

      const isCorrect = score === maxScore;

      this.logger.log(`Question check completed for user ${userId}`, {
        score: score,
        maxScore: maxScore,
      });
      return {
        score,
        maxScore,
        isCorrect,
        feedbackItems: response.feedbackItems,
      };
    } catch (error) {
      this.logger.error(
        `Error checking question for user ${userId}: ${error.message}`,
        error.stack,
        { question: lessonQuestion.question },
      );
      // Consider returning a default error response DTO or re-throwing
      throw new Error(`Failed to evaluate answer: ${error.message}`);
    }
  }

  private extractText(content: any[] | string): string {
    if (typeof content === 'string') return content;
    if (!Array.isArray(content)) return String(content || '');
    return content
      .filter((b) => b.type === 'text' || typeof b === 'string')
      .map((b) => (typeof b === 'string' ? b : b.text))
      .join('\n');
  }

  private createAgent(model?: ModelDto): Runnable {
    const apiKey =
      model?.apiKey || this.configService.get<string>('GEMINI_API_KEY');
    const modelName =
      model?.model || this.configService.get<string>('GEMINI_MODEL');

    if (!modelName) {
      throw new Error('GEMINI_MODEL is not defined');
    }

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined');
    }

    const llm = new ChatGoogleGenerativeAI({
      apiKey,
      model: modelName,
      temperature: 0.3,
      streaming: true,
    });

    const agentExecutor = createReactAgent({
      llm,
      tools: [
        createSearchTool({
          tavilyApiKey: this.configService.get<string>('TRAVILY_API_KEY'),
          braveApiKey: this.configService.get<string>('BRAVE_API_KEY'),
          perplexityApiKey:
            this.configService.get<string>('PERPLEXITY_API_KEY'),
          jinaApiKey: this.configService.get<string>('JINA_API_KEY'),
        }),
        createModuleTool(
          apiKey,
          modelName,
          this.contentService.createModule.bind(this.contentService),
          this.langfuseHandler,
        ),
        editModuleTool(
          apiKey,
          modelName,
          this.contentService.getModule.bind(this.contentService),
          this.contentService.editModule.bind(this.contentService),
          this.langfuseHandler,
        ),
        createLessonsTool(
          apiKey,
          modelName,
          this.contentService.getModule.bind(this.contentService),
          this.contentService.upsertLessons.bind(this.contentService),
          this.langfuseHandler,
        ),
        editLessonTool(
          apiKey,
          modelName,
          this.contentService.getLesson.bind(this.contentService),
          this.contentService.editLesson.bind(this.contentService),
          this.langfuseHandler,
        ),
      ],
      checkpointSaver: this.checkpointer,
    });

    return agentExecutor;
  }
}
