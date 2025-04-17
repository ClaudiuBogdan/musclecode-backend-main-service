import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, AIMessageChunk } from '@langchain/core/messages';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { Runnable } from '@langchain/core/runnables';

// Tools
import { searchTool } from '../tools/search.tool';

// Types
import {
  ServerSentEvent,
  TextBlock,
  ToolResultContentBlock,
  ToolUseContentBlock,
} from '../entities/messages';
import { ChatMessageDto } from '../dto/agent-chat.dto';

@Injectable()
export class AgentsService implements OnModuleInit {
  private readonly logger = new Logger(AgentsService.name);
  private llm: ChatGoogleGenerativeAI;
  private agentExecutor: Runnable;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    const model = this.configService.get<string>('GEMINI_MODEL')!;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined');
    }
    this.llm = new ChatGoogleGenerativeAI({ apiKey, model, temperature: 0.3 });
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

  async *streamAgentResponse(
    message: ChatMessageDto,
    _userId: string,
  ): AsyncGenerator<ServerSentEvent> {
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
    const idMap = new Map<string, string>();

    // Nested generator to close the current block
    function* closeBlock(ts: string): Generator<ServerSentEvent> {
      if (!currentId) {
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
    }

    // Nested generator to start a new text block
    function* startTextBlock(ts: string): Generator<ServerSentEvent> {
      currentType = 'text';
      currentId = uuidv4();
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

    // 3) Stream events from the agent
    const eventStream = this.agentExecutor.streamEvents(
      { messages: [new HumanMessage(userText)] },
      { version: 'v2' },
    );

    for await (const evt of eventStream) {
      const ts = now();
      const runId = evt.run_id;

      switch (evt.event) {
        // ———————————————————————
        //  Text streaming from the chat model
        // ———————————————————————
        case 'on_chat_model_stream': {
          const chunk = (evt.data as any).chunk as AIMessageChunk;
          const text = typeof chunk.content === 'string' ? chunk.content : '';
          if (!text) break;

          // If not already in a text block, close whatever was open and start one
          if (currentType !== 'text') {
            yield* closeBlock(ts);
            yield* startTextBlock(ts);
            currentType = 'text';
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
        //  Tool invocation start
        // ———————————————————————
        case 'on_tool_start': {
          const data = evt.data as any;
          const toolName = evt.name;
          const toolId = evt.run_id;

          // Close previous block
          yield* closeBlock(ts);

          // Open a tool_use block
          currentType = 'tool_use';
          currentId = uuidv4();
          if (runId) idMap.set(runId, currentId);

          yield {
            type: 'content_block_start',
            index,
            content_block: {
              id: toolId,
              type: 'tool_use',
              name: toolName,
              input: data.input ?? {},
              start_timestamp: ts,
              stop_timestamp: ts,
            } as ToolUseContentBlock,
          } as ServerSentEvent;

          // Immediately close the tool_use block
          yield* closeBlock(ts);
          break;
        }

        // ———————————————————————
        //  Tool invocation end (result)
        // ———————————————————————
        case 'on_tool_end': {
          const data = evt.data as any;
          // Close any open block
          yield* closeBlock(ts);

          // Start tool_result
          currentType = 'tool_result';
          currentId = uuidv4();
          const toolUseId = runId ? idMap.get(runId) : undefined;

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
              content: [{ type: 'text', text: String(result) }],
              start_timestamp: ts,
              stop_timestamp: ts,
            } as ToolResultContentBlock,
          } as ServerSentEvent;

          // Close it immediately
          yield* closeBlock(ts);
          break;
        }

        // ———————————————————————
        //  Custom events (if you dispatch any)
        // ———————————————————————
        case 'on_custom_event': {
          // handle or ignore
          break;
        }

        // ———————————————————————
        //  Chat model end — final cleanup
        // ———————————————————————
        case 'on_chat_model_end': {
          yield* closeBlock(ts);
          break;
        }

        default:
          // ignore retriever, prompt, chain events, etc.
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

  private extractText(content: any[] | string): string {
    if (typeof content === 'string') return content;
    if (!Array.isArray(content)) return String(content || '');
    return content
      .filter((b) => b.type === 'text' || typeof b === 'string')
      .map((b) => (typeof b === 'string' ? b : b.text))
      .join('\n');
  }
}
