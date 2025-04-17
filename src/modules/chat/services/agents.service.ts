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
  ToolUseContentBlock,
  ToolResultContentBlock,
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

    // Extract user text
    const userContent = this.extractTextFromContent(messageContent);
    const currentMessages: BaseMessage[] = [new HumanMessage(userContent)];

    // Emit message_start
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

    // Stream events from the React agent
    const stream = this.agentExecutor.streamEvents(
      { messages: currentMessages },
      { version: 'v2' },
    );

    let contentIndex = 0;
    let currentContentBlockId: string | null = null;
    let currentContentBlockType: 'text' | 'tool_use' | 'tool_result' | null =
      null;

    for await (const evt of stream) {
      const ts = now();

      switch (evt.event) {
        // ———————————————————————
        // 1) Text streams (chain‐ or model‐level)
        // ———————————————————————
        case 'on_chain_stream':
        case 'on_chat_model_stream': {
          const chunk = (evt.data as any).chunk as AIMessageChunk;
          const text = typeof chunk.content === 'string' ? chunk.content : '';

          if (text) {
            // if we're not already in a text block, start one
            if (currentContentBlockType !== 'text') {
              // close any previous block
              if (currentContentBlockId) {
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
              } as ServerSentEvent;
            }

            // emit the delta
            yield {
              type: 'content_block_delta',
              index: contentIndex,
              delta: { type: 'text_delta', text } as any,
            } as ServerSentEvent;
          }
          break;
        }

        // ———————————————————————
        // 2) Tool invocation
        // ———————————————————————
        case 'on_tool_start': {
          // 1) Grab the raw payload
          const payload = evt.data as any;

          // 2) Pull out name + input (LangGraph sometimes nests these)
          const toolName: string =
            payload.name ?? payload.tool?.name ?? '<unknown>';
          let rawInput = payload.input ?? payload.tool?.input ?? {};

          // 3) If it's a JSON‐string, parse it
          if (typeof rawInput === 'string') {
            try {
              rawInput = JSON.parse(rawInput);
            } catch {
              // leave it as a string fallback
            }
          }

          // 4) Close any open text block
          if (currentContentBlockType === 'text' && currentContentBlockId) {
            yield {
              type: 'content_block_stop',
              index: contentIndex,
              stop_timestamp: ts,
            };
            contentIndex++;
          }

          // 5) Emit the tool use
          currentContentBlockType = 'tool_use';
          currentContentBlockId = uuidv4();
          yield {
            type: 'content_block_start',
            index: contentIndex,
            content_block: {
              id: currentContentBlockId,
              type: 'tool_use',
              name: toolName,
              input: rawInput,
              start_timestamp: ts,
              stop_timestamp: ts,
            } as ToolUseContentBlock,
          } as ServerSentEvent;

          yield {
            type: 'content_block_stop',
            index: contentIndex,
            stop_timestamp: ts,
          } as ServerSentEvent;

          contentIndex++;
          currentContentBlockType = null;
          break;
        }

        case 'on_tool_end': {
          const payload = evt.data as any;

          const toolName: string =
            payload.name ?? payload.tool?.name ?? '<unknown>';

          // LangGraph often gives you a ToolMessage object; extract its `.text`
          let result = payload.output ?? payload.tool?.output ?? '';
          if (result && typeof result === 'object' && 'text' in result) {
            result = (result as any).text;
          }

          // Emit the tool result
          yield {
            type: 'content_block_start',
            index: contentIndex,
            content_block: {
              id: uuidv4(),
              type: 'tool_result',
              tool_use_id: currentContentBlockId!,
              name: toolName,
              content: [{ type: 'text', text: String(result) }],
              is_error: false,
              start_timestamp: ts,
              stop_timestamp: ts,
            } as ToolResultContentBlock,
          } as ServerSentEvent;

          yield {
            type: 'content_block_stop',
            index: contentIndex,
            stop_timestamp: ts,
          } as ServerSentEvent;

          // reset so you don't accidentally re-close this block
          currentContentBlockType = null;
          contentIndex++;
          break;
        }

        // ———————————————————————
        // 3) Finalize at end of model/chain
        // ———————————————————————
        case 'on_chat_model_end':
        case 'on_chain_end': {
          // close any open text block
          if (currentContentBlockType === 'text' && currentContentBlockId) {
            yield {
              type: 'content_block_stop',
              index: contentIndex,
              stop_timestamp: ts,
            };
            // no more stops for this block
            currentContentBlockType = null;
          }
          break;
        }
      }
    }

    // Emit message_stop
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
