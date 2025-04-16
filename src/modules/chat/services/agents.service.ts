import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, BaseMessage } from '@langchain/core/messages';
import { Runnable } from '@langchain/core/runnables';
import { Tool } from '@langchain/core/tools';

// Import the tools
import { searchTool } from '../tools/search.tool';

// Import the types
import {
  ServerSentEvent,
  ChatMessage,
  TextBlock,
  ToolUseContentBlock,
  ToolResultContentBlock,
} from '../entities/messages';

// Import the DTOs
import { ChatMessageDto } from '../dto/agent-chat.dto';

// Helper Type (not exported, just for internal use in service)
// Based on Langchain's AIMessageChunk structure
interface AIMessageChunk {
  content: string | BaseMessage[];
  additional_kwargs?: Record<string, any>;
  usage_metadata?: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  } | null;
  response_metadata?: Record<string, any>;
  tool_call_chunks?: Array<{
    name?: string;
    args?: string; // Often streamed as partial JSON string
    id?: string;
    index?: number;
    type: 'tool_call_chunk'; // Identifier
  }>;
}

// Define local event types since the originals are not exported
type Timestamp = string;

interface TextDelta {
  type: 'text_delta';
  text: string;
}

interface PingEvent {
  type: 'ping';
  timestamp: Timestamp;
}

@Injectable()
export class AgentsService implements OnModuleInit {
  private readonly logger = new Logger(AgentsService.name);
  private readonly llm: ChatGoogleGenerativeAI;
  private readonly tools: Tool[]; // Define tools for binding
  private readonly modelWithTools: Runnable; // Runnable with tools bound

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    const model = this.configService.get<string>('GEMINI_MODEL') as string;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in environment variables');
    }

    this.llm = new ChatGoogleGenerativeAI({
      apiKey: apiKey,
      model: model, // Or choose another appropriate model like gemini-1.5-flash
      temperature: 0.7,
    });

    // Define the tools the model can use
    this.tools = [
      // Add more tools here as needed
      searchTool, // Our defined search tool
    ];

    // Bind the tools to the model
    this.modelWithTools = this.llm.bindTools(this.tools);
  }

  onModuleInit() {
    this.logger.log('AgentsService initialized with Gemini LLM');
  }

  /**
   * Processes a chat request and returns an SSE stream.
   * Compatible with the current controller implementation.
   */
  async *streamAgentResponse(
    message: ChatMessageDto,
    userId: string,
  ): AsyncGenerator<ServerSentEvent, void, undefined> {
    const { threadId, id: userMessageId, content: messageContent } = message;
    const assistantMessageId = uuidv4();
    const requestStartTime = Date.now();
    let stopReason: string | null = null;
    let finalTokenUsage: ChatMessage['tokenUsage'] = undefined;
    let currentContentBlockIndex = 0;
    let currentContentBlockId: string | null = null;
    let currentContentBlockType: 'text' | 'tool_use' | 'tool_result' | null =
      null;
    const toolCallIdMap: Record<string, string> = {}; // Maps Langchain tool call ID to our content block ID
    const currentToolResultMap: Record<
      string,
      { name: string; result: any; isError: boolean }
    > = {}; // Track results for tool_result blocks

    const now = (): Timestamp => new Date().toISOString();

    // --- Format History ---
    // Extract text content from the message content blocks
    const userContent = this.extractTextFromContent(messageContent);

    // In a real implementation, you would fetch the actual thread history from a database
    // For this example, we'll just use the current message
    const currentMessages: BaseMessage[] = [new HumanMessage(userContent)];

    this.logger.log(
      `[${threadId}] Starting processing for user message: "${userContent}"`,
    );

    // Add user ID to logging context
    this.logger.log(`Processing request for user: ${userId}`);

    // Emit MessageStartEvent for the Assistant's response
    yield {
      type: 'message_start',
      message: {
        id: assistantMessageId,
        createdAt: now(),
        role: 'assistant',
        content: [], // Start with empty content
        threadId: threadId,
        parentId: userMessageId, // Assuming user message triggered this
      },
    } as ServerSentEvent;

    // --- Set up ping interval ---
    let pingIntervalId: NodeJS.Timeout | null = null;
    const startPingInterval = () => {
      pingIntervalId = setInterval(() => {
        const pingEvent: PingEvent = { type: 'ping', timestamp: now() };
        this._yieldEvent(pingEvent);
      }, 15000); // Send ping every 15 seconds
    };

    const stopPingInterval = () => {
      if (pingIntervalId) {
        clearInterval(pingIntervalId);
        pingIntervalId = null;
      }
    };

    // Start the ping interval
    startPingInterval();

    try {
      // --- Invoke LLM with streaming ---
      const stream = this.modelWithTools.streamEvents(currentMessages, {
        version: 'v2',
      });

      // --- Process the Stream Events ---
      for await (const event of stream) {
        const eventType = event.event;
        const eventData = event.data || {};
        const timestamp = now();

        switch (eventType) {
          case 'on_chat_model_start':
            // Optional: Could signal start, but message_start is already sent
            break;

          case 'on_chat_model_stream':
            const chunk = eventData?.chunk as AIMessageChunk | undefined;
            const textChunk = chunk?.content;

            if (typeof textChunk === 'string' && textChunk.length > 0) {
              if (currentContentBlockType !== 'text') {
                // Starting a new TextBlock
                if (currentContentBlockId) {
                  // Stop the previous block if it existed
                  yield {
                    type: 'content_block_stop',
                    index: currentContentBlockIndex,
                    stop_timestamp: timestamp,
                  } as ServerSentEvent;
                  currentContentBlockIndex++;
                }
                currentContentBlockId = uuidv4();
                currentContentBlockType = 'text';
                const startBlock: TextBlock = {
                  id: currentContentBlockId,
                  type: 'text',
                  text: '', // Start empty, deltas will fill it
                  start_timestamp: timestamp,
                  stop_timestamp: '', // Will be set on stop
                };
                yield {
                  type: 'content_block_start',
                  index: currentContentBlockIndex,
                  content_block: startBlock,
                } as ServerSentEvent;
              }

              // Append text and send delta
              const delta: TextDelta = { type: 'text_delta', text: textChunk };
              yield {
                type: 'content_block_delta',
                index: currentContentBlockIndex,
                delta,
              } as ServerSentEvent;
            }
            break;

          case 'on_chat_model_end':
            // LLM finished generating tokens for this turn
            if (currentContentBlockId && currentContentBlockType === 'text') {
              yield {
                type: 'content_block_stop',
                index: currentContentBlockIndex,
                stop_timestamp: timestamp,
              } as ServerSentEvent;
              currentContentBlockId = null; // Reset for next block
              currentContentBlockType = null;
            }
            // Extract metadata if available - using any to avoid TypeScript errors
            const metadata = eventData as any;
            stopReason =
              metadata?.run_metadata?.stop_reason ?? stopReason ?? 'stop'; // Get stop reason
            if (metadata?.usage_metadata) {
              finalTokenUsage = {
                promptTokens: metadata.usage_metadata.input_tokens,
                completionTokens: metadata.usage_metadata.output_tokens,
                totalTokens: metadata.usage_metadata.total_tokens,
              };
            }
            this.logger.log(
              `[${threadId}] LLM processing finished. Stop Reason: ${stopReason}`,
            );
            break;

          case 'on_tool_start':
            // A tool call is requested by the LLM
            if (currentContentBlockId) {
              // Stop the previous block (likely text)
              yield {
                type: 'content_block_stop',
                index: currentContentBlockIndex,
                stop_timestamp: timestamp,
              } as ServerSentEvent;
              currentContentBlockIndex++;
            }
            currentContentBlockId = uuidv4(); // Our ID for this block
            currentContentBlockType = 'tool_use';

            // Using any to avoid TypeScript errors
            const toolData = eventData as any;
            const toolInput =
              (toolData?.input as Record<string, unknown>) ?? {};
            const toolName = (toolData?.name as string) ?? 'unknown_tool';
            const langchainToolCallId = event.run_id; // Use run_id to link tool_result
            toolCallIdMap[langchainToolCallId] = currentContentBlockId; // Map Langchain ID to our Block ID

            const toolUseBlock: ToolUseContentBlock = {
              id: currentContentBlockId,
              type: 'tool_use',
              name: toolName,
              input: toolInput, // Langchain usually provides the full input here
              start_timestamp: timestamp,
              stop_timestamp: timestamp, // Tool use block is usually instantaneous
            };
            yield {
              type: 'content_block_start',
              index: currentContentBlockIndex,
              content_block: toolUseBlock,
            } as ServerSentEvent;
            // ToolUse block often stops immediately after starting
            yield {
              type: 'content_block_stop',
              index: currentContentBlockIndex,
              stop_timestamp: timestamp,
            } as ServerSentEvent;
            this.logger.log(
              `[${threadId}] Tool call requested: ${toolName}, Input: ${JSON.stringify(toolInput)}, LC ID: ${langchainToolCallId}`,
            );
            // We don't execute the tool here; Langchain handles execution when using .bindTools()
            // The result will arrive in on_tool_end
            currentContentBlockId = null; // Reset for next block (which will be tool_result)
            currentContentBlockType = null;
            currentContentBlockIndex++;
            break;

          case 'on_tool_end':
            // A tool finished execution
            const toolEndData = eventData as any;
            const toolOutput = toolEndData?.output; // This is the result from the tool function
            const toolRunId = event.run_id;
            const correspondingBlockId = toolCallIdMap[toolRunId];
            const toolExecName = toolEndData?.name ?? 'unknown_tool';
            const isError = event.tags?.includes('error'); // Check if Langchain tagged it as an error

            this.logger.log(
              `[${threadId}] Tool execution finished: ${toolExecName}, LC ID: ${toolRunId}, Block ID: ${correspondingBlockId}, Error: ${isError}`,
            );
            this.logger.debug(
              `[${threadId}] Tool output: ${JSON.stringify(toolOutput)}`,
            );

            if (correspondingBlockId) {
              // Store the result temporarily, keyed by OUR block ID
              currentToolResultMap[correspondingBlockId] = {
                name: toolExecName,
                result: toolOutput ?? 'Tool returned no output.',
                isError: !!isError,
              };

              currentContentBlockId = uuidv4();
              currentContentBlockType = 'tool_result';

              // Determine the content type for the block
              let toolResultContent: ToolResultContentBlock['content'];
              if (typeof toolOutput === 'string') {
                toolResultContent = [
                  { type: 'text', text: toolOutput, id: uuidv4() },
                ];
              } else if (
                Array.isArray(toolOutput) ||
                (typeof toolOutput === 'object' && toolOutput !== null)
              ) {
                // Attempt to stringify complex objects for display, or handle specific structures
                try {
                  toolResultContent = [
                    {
                      type: 'text',
                      text: JSON.stringify(toolOutput),
                      id: uuidv4(),
                    },
                  ];
                } catch (e) {
                  this.logger.error(
                    `[${threadId}] Error stringifying tool output: ${e}`,
                  );
                  toolResultContent = [
                    { type: 'text', text: '[Complex Object]', id: uuidv4() },
                  ];
                }
              } else {
                toolResultContent = [
                  { type: 'text', text: String(toolOutput), id: uuidv4() },
                ];
              }

              const resultBlock: ToolResultContentBlock = {
                id: currentContentBlockId,
                type: 'tool_result',
                tool_use_id: correspondingBlockId, // Link to the 'tool_use' block
                name: toolExecName,
                content: toolResultContent,
                is_error: !!isError,
                start_timestamp: timestamp,
                stop_timestamp: timestamp, // Tool result block is also often instantaneous content-wise
              };
              yield {
                type: 'content_block_start',
                index: currentContentBlockIndex,
                content_block: resultBlock,
              } as ServerSentEvent;
              yield {
                type: 'content_block_stop',
                index: currentContentBlockIndex,
                stop_timestamp: timestamp,
              } as ServerSentEvent;

              currentContentBlockId = null; // Reset for potential next text block
              currentContentBlockType = null;
              currentContentBlockIndex++;
            } else {
              this.logger.warn(
                `[${threadId}] Received on_tool_end for unknown run_id: ${toolRunId}`,
              );
            }
            break;

          case 'on_chain_end':
            // The entire chain execution finished
            this.logger.log(`[${threadId}] Chain execution finished.`);
            // Final stop reason might be here if not caught by on_llm_end
            const chainEndData = eventData as any;
            stopReason =
              stopReason ?? chainEndData?.metadata?.stop_reason ?? 'stop';
            // Make sure any lingering content block is stopped
            if (currentContentBlockId) {
              yield {
                type: 'content_block_stop',
                index: currentContentBlockIndex,
                stop_timestamp: timestamp,
              } as ServerSentEvent;
            }
            break;

          case 'on_chain_error':
            this.logger.error(`[${threadId}] Chain error: ${eventData}`);
            stopReason = 'error';
            // Potentially send an error message block
            // For now, just ensure final stop event reflects error
            break;

          // Handle other events if necessary (on_retriever_start, on_prompt_start, etc.)
          default:
            // Optional: Log unhandled events
            // this.logger.debug(`[${threadId}] Unhandled Event: ${eventType}`);
            break;
        }
      }

      this.logger.log(`[${threadId}] Stream processing loop completed.`);
    } catch (error) {
      this.logger.error(
        `[${threadId}] Error processing stream: ${error.message}`,
        error.stack,
      );
      stopReason = 'error';
    } finally {
      // Stop the ping interval
      stopPingInterval();

      // --- Send final MessageStopEvent ---
      const stopTimestamp = now();
      yield {
        type: 'message_stop',
        messageId: assistantMessageId,
        stop_reason: stopReason,
        stop_timestamp: stopTimestamp,
        tokenUsage: finalTokenUsage, // Include collected token usage
      } as ServerSentEvent;

      // Complete the generator by returning
      const duration = Date.now() - requestStartTime;
      this.logger.log(
        `[${threadId}] Request processing finished. Duration: ${duration}ms`,
      );
    }
  }

  /**
   * Helper method to extract text content from message content blocks
   */
  private extractTextFromContent(content: any[]): string {
    if (!Array.isArray(content)) {
      return String(content || '');
    }

    return content
      .map((block) => {
        if (typeof block === 'string') {
          return block;
        }
        if (block.type === 'text') {
          return block.text || block.value || '';
        }
        // Handle other block types if needed
        return '';
      })
      .filter((text) => text.length > 0)
      .join('\n');
  }

  /**
   * Special helper method to yield ping events
   * This is needed since we can't directly yield inside a callback/interval
   */
  private _yieldEvent(event: PingEvent): void {
    // This is a placeholder. In the actual implementation, this would
    // queue the event to be yielded in the main generator loop.
    // Since we can't directly yield from a setTimeout callback,
    // we'll need a more complex state management solution in a real app.
    this.logger.debug(
      'Ping event queued (not actually sent in this implementation)',
      event,
    );
  }
}
