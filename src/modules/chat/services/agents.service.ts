import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import {
  HumanMessage,
  BaseMessage,
  AIMessageChunk,
} from '@langchain/core/messages';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { Runnable } from '@langchain/core/runnables';

// Import the tools
import { searchTool } from '../tools/search.tool';

// Import the types
import {
  ServerSentEvent,
  TextBlock,
  ToolResultContentBlock,
  ToolUseContentBlock,
} from '../entities/messages';

// Import the DTOs
import { ChatMessageDto } from '../dto/agent-chat.dto';

@Injectable()
export class AgentsService implements OnModuleInit {
  private readonly logger = new Logger(AgentsService.name);
  private readonly llm: ChatGoogleGenerativeAI;
  private readonly agentExecutor: Runnable; // React agent executor

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    const model = this.configService.get<string>('GEMINI_MODEL') as string;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in environment variables');
    }

    this.llm = new ChatGoogleGenerativeAI({
      apiKey,
      model,
      temperature: 0.3,
    });

    // Create a React-style agent that uses the LLM and tools
    this.agentExecutor = createReactAgent({
      llm: this.llm,
      tools: [searchTool],
    });
  }

  onModuleInit() {
    this.logger.log(
      'AgentsService initialized with Gemini LLM and LangGraph agent',
    );
  }

  /**
   * Streams an agent response as SSE, automatically invoking the search tool when needed.
   */
  async *streamAgentResponse(
    message: ChatMessageDto,
    _userId: string,
  ): AsyncGenerator<ServerSentEvent, void, undefined> {
    const { threadId, id: userMessageId, content: messageContent } = message;
    const assistantMessageId = uuidv4();
    const now = (): string => new Date().toISOString();

    // 1) Send the message_start event
    yield {
      type: 'message_start',
      message: {
        id: assistantMessageId,
        createdAt: now(),
        role: 'assistant',
        content: [],
        threadId,
        parentId: userMessageId,
      },
    } as ServerSentEvent;

    // 2) Prepare the user prompt
    const userContent = this.extractTextFromContent(messageContent);
    const currentMessages: BaseMessage[] = [new HumanMessage(userContent)];

    // 3) Kick off the agent stream
    const stream = this.agentExecutor.streamEvents(
      { messages: currentMessages },
      { version: 'v2' },
    );

    let contentIndex = 0;
    let currentContentBlockType: 'text' | 'tool_use' | 'tool_result' | null =
      null;
    let currentContentBlockId: string | null = null;

    for await (const evt of stream) {
      const ts = now();

      switch (evt.event) {
        // —————————————————————
        // 1) Text streaming
        // —————————————————————
        case 'on_chain_stream':
        case 'on_chat_model_stream': {
          const chunk = (evt.data as any).chunk as AIMessageChunk;
          const text = typeof chunk.content === 'string' ? chunk.content : '';
          if (!text) break;

          // if we're not in a text block, close whatever was open and open a new text block
          if (currentContentBlockType !== 'text') {
            if (currentContentBlockType && currentContentBlockId) {
              yield {
                type: 'content_block_stop',
                index: contentIndex,
                stop_timestamp: ts,
              };
              contentIndex++;
            }
            currentContentBlockType = 'text';
            currentContentBlockId = uuidv4();
            yield {
              type: 'content_block_start',
              index: contentIndex,
              content_block: {
                id: currentContentBlockId,
                type: 'text',
                text: '',
                start_timestamp: ts,
                stop_timestamp: '',
              } as TextBlock,
            };
          }

          // emit the delta
          yield {
            type: 'content_block_delta',
            index: contentIndex,
            delta: { type: 'text_delta', text } as any,
          };
          break;
        }

        // —————————————————————
        // 2) Tool invocation
        // —————————————————————
        case 'on_tool_start': {
          const payload = evt.data as any;
          const toolName: string =
            payload.name ?? payload.tool?.name ?? '<unknown>';
          let rawInput = payload.input ?? payload.tool?.input ?? {};

          if (typeof rawInput === 'string') {
            try {
              rawInput = JSON.parse(rawInput);
            } catch {
              // leave as string if JSON parse fails
            }
          }

          // close any open block
          if (currentContentBlockType && currentContentBlockId) {
            yield {
              type: 'content_block_stop',
              index: contentIndex,
              stop_timestamp: ts,
            };
            contentIndex++;
          }

          // start & immediately stop the tool_use block
          const toolUseId = uuidv4();
          yield {
            type: 'content_block_start',
            index: contentIndex,
            content_block: {
              id: toolUseId,
              type: 'tool_use',
              name: toolName,
              input: rawInput,
              start_timestamp: ts,
              stop_timestamp: ts,
            } as ToolUseContentBlock,
          };
          yield {
            type: 'content_block_stop',
            index: contentIndex,
            stop_timestamp: ts,
          };
          contentIndex++;

          // reset state
          currentContentBlockType = null;
          currentContentBlockId = null;
          break;
        }

        case 'on_tool_end': {
          const payload = evt.data as any;
          const toolName: string =
            payload.name ?? payload.tool?.name ?? '<unknown>';
          let result = payload.output ?? payload.tool?.output ?? '';
          if (result && typeof result === 'object' && 'text' in result) {
            result = (result as any).text;
          }

          // start & immediately stop the tool_result block
          const toolResultId = uuidv4();
          yield {
            type: 'content_block_start',
            index: contentIndex,
            content_block: {
              id: toolResultId,
              type: 'tool_result',
              tool_use_id: currentContentBlockId ?? toolResultId,
              name: toolName,
              content: [{ type: 'text', text: String(result) }],
              is_error: false,
              start_timestamp: ts,
              stop_timestamp: ts,
            } as ToolResultContentBlock,
          };
          yield {
            type: 'content_block_stop',
            index: contentIndex,
            stop_timestamp: ts,
          };
          contentIndex++;

          currentContentBlockType = null;
          currentContentBlockId = null;
          break;
        }

        // —————————————————————
        // 3) End‐of‐chain/model
        // —————————————————————
        case 'on_chain_end':
        case 'on_chat_model_end': {
          if (currentContentBlockType === 'text' && currentContentBlockId) {
            yield {
              type: 'content_block_stop',
              index: contentIndex,
              stop_timestamp: ts,
            };
            contentIndex++;
            currentContentBlockType = null;
            currentContentBlockId = null;
          }
          break;
        }
      }
    }

    // 4) Finally close out the assistant message
    yield {
      type: 'message_stop',
      messageId: assistantMessageId,
      stop_reason: 'stop',
      stop_timestamp: now(),
    } as ServerSentEvent;
  }

  private extractTextFromContent(content: any[]): string {
    if (!Array.isArray(content)) return String(content || '');
    return content
      .map((b) => (typeof b === 'string' ? b : b.text || ''))
      .join('\n');
  }
}
