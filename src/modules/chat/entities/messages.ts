/**
 * Represents the author role in the chat.
 * - user: End-user interacting with the agent.
 * - assistant: The AI agent.
 * - system: Configuration messages or instructions (often hidden).
 * - tool: Messages representing tool calls or results (can also be part of 'assistant' message content).
 */
export type ChatRole = 'user' | 'assistant' | 'system' | 'tool';

export type UUID = string;
export type Timestamp = string;

/**
 * Represents the overall status of a potentially multi-step message generation or processing.
 */
export type MessageStatus =
  | 'in_progress'
  | 'completed'
  | 'failed'
  | 'cancelled';

// --------------- Base Content Block ---------------

/**
 * Base interface for any distinct piece of content within a message.
 * Uses a 'type' discriminator for specific rendering and processing.
 */
export interface BaseContentBlock {
  /** Unique ID for this specific content block instance, useful for updates or referencing. */
  id: string;
  /** The discriminator field to identify the block type. */
  type: string;

  /** The timestamp of when the block was created. */
  start_timestamp: Timestamp;
  /** The timestamp of when the block was completed. */
  stop_timestamp: Timestamp;
}

// --------------- Content Block Types ---------------
// Discriminated union of all possible content blocks within a message body.

export type ContentBlock =
  | TextBlock
  | ToolUseContentBlock
  | ToolResultContentBlock;

/**
 * Plain text content. Supports markdown rendering on the frontend.
 */
export interface TextBlock extends BaseContentBlock {
  type: 'text';
  /** The text content. */
  text: string;
}

/**
 * Content block representing the initiation of a tool call.
 * The 'input' field is built incrementally by 'input_json_delta' events.
 */
export interface ToolUseContentBlock extends BaseContentBlock {
  type: 'tool_use';
  name: string; // Name of the tool being used (e.g., "artifacts")
  id: string; // Unique ID for this specific tool usage instance (e.g., "toolu_015ShpskUsQYcGWHTnFSaoXj")
  input: Record<string, unknown>; // The complete input object once assembled
  message?: string; // Optional descriptive message
  integration_name?: string | null;
  integration_icon_url?: string | null;
  display_content?: string | null;
}

/**
 * Represents a simple text part, potentially used within tool results.
 */
export interface ToolResultTextPart {
  id?: UUID;
  type: 'text';
  text: string;
}

// Define a more specific type if the tool result structure is known,
// otherwise use a broader type. Based on the example:
export type ToolResultContent = ToolResultTextPart[]; // Array of text parts based on example result delta

/**
 * Content block representing the result returned from a tool call.
 * The 'content' field is built incrementally.
 */
export interface ToolResultContentBlock extends BaseContentBlock {
  type: 'tool_result';
  tool_use_id: string; // ID of the corresponding 'tool_use' block
  name: string; // Name of the tool that was used
  content: ToolResultContent | string | unknown; // The result content (structure depends on the tool)
  is_error: boolean;
  message?: string | null; // Optional descriptive message from the tool execution
  display_content?: string | null;
}

// --------------- Context Reference Types ---------------
/**
 * Base interface for any distinct piece of context attached to a message.
 * Uses a 'type' discriminator for specific processing.
 */
export interface BaseContextBlock {
  /** Unique ID for this specific context block instance. */
  id: string;
  /** The discriminator field to identify the context block type. */
  type: string;
  /** Whether this context block can be used multiple times in the same message. */
  unique?: boolean;
}

/**
 * Represents a reference to a prompt provided as context.
 */
export interface PromptReferenceContext extends BaseContextBlock {
  type: 'prompt';
  prompt: {
    id: string;
    name: string;
    description: string;
  };
  unique: true;
}

/**
 * Represents a reference to a canvas provided as context.
 */
export interface GraphNodeContext extends BaseContextBlock {
  type: 'graph_node';
  graph_node: {
    id: string;
  };
}

/**
 * Represents a key-value pair provided as context.
 */
export interface KeyValueContextBlock extends BaseContextBlock {
  type: 'key_value';
  title: string;
  key_value: {
    key: string;
    value: string;
    options?: string[];
    customValue?: boolean;
    description?: string;
    unique?: boolean;
  };
}

export type ContextReference =
  | PromptReferenceContext
  | GraphNodeContext
  | KeyValueContextBlock;

// --------------- Chat Message ---------------

/**
 * Represents a single message within the chat conversation.
 */
export interface ChatMessage {
  /** Unique identifier for the message. */
  id: string;
  /** Timestamp of message creation (recommend ISO 8601 format string for serialization). */
  createdAt: string;
  /** Who sent the message. */
  role: ChatRole;
  /**
   * The structured content of the message. Always an array for rendering consistency.
   * Simple text messages should be represented as `[{ type: 'text', value: '...' }]`.
   */
  content: ContentBlock[];

  /**
   * References to external context items (like prompts or canvases) relevant to this message.
   * Useful for tracking information sources or augmenting LLM context.
   */
  attachedContext?: ContextReference[];

  /** Overall status, useful for async assistant messages that might involve multiple steps. */
  status?: MessageStatus;
  /** ID of the message this one is related to (e.g., a tool result message replying to a tool call message, or user interaction replying to assistant message). */
  parentId?: string;
  /** Optional ID for grouping related messages in a logical sub-thread or step (e.g., all messages related to one complex agent task). */
  threadId: string;

  // --- Standardized Optional Metadata ---
  /** End-to-end latency in milliseconds for generating the message (if applicable, e.g., for 'assistant' role). */
  latencyMs?: number;
  /** Token usage information for the LLM call that generated this message (if applicable). */
  tokenUsage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
  /** Reason the message generation finished (e.g., 'stop' sequence, max length reached, tool calls needed). */
  finishReason?:
    | 'stop'
    | 'length'
    | 'tool_calls'
    | 'content_filter'
    | 'error'
    | null;

  // --- Custom Metadata ---
  /** Generic property bag for any additional custom data associated with the message. */
  metadata?: Record<string, unknown>;
}

// --------------- Chat Container ---------------
/**
 * Represents a single chat conversation/thread.
 */
export interface ChatThread {
  /** Unique identifier for the session */
  id: string;
  /** Optional title for the chat session. */
  title?: string;
  /** Timestamp of session creation (recommend ISO 8601 format string). */
  createdAt: string;
  /** Timestamp of the last session update (recommend ISO 8601 format string). */
  updatedAt: string;
  /** Ordered list of messages constituting the conversation. */
  messages: ChatMessage[];
  /** Context references attached to the session. */
  attachedContext?: ContextReference[];
  /** Timestamp of the last message sync with the backend. */
  lastMessagesSyncAt?: string;
}

// -------------- Delta Level Structures --------------
/**
 * Possible reasons why message generation stopped.
 */
type StopReason = 'end_turn' | 'max_tokens' | 'stop_sequence' | string; // Allow other potential string values

/**
 * Represents the delta applied at the message level, typically indicating completion.
 */
interface MessageDelta {
  stop_reason: StopReason | null;
  stop_sequence: string | null;
}

/**
 * Base interface for delta objects within content_block_delta events.
 */
interface BaseDelta {
  type: string; // Discriminator field ('text_delta', 'input_json_delta')
}

/**
 * Delta representing a chunk of text being added to a 'text' content block.
 */
interface TextDelta extends BaseDelta {
  type: 'text_delta';
  text: string;
}

/**
 * Delta representing a chunk of JSON string being added to a tool's 'input'
 * or potentially a tool's 'content' if the result is streamed as JSON.
 */
interface InputJsonDelta extends BaseDelta {
  type: 'input_json_delta';
  partial_json: string; // A string fragment of the JSON object
}

/**
 * Union type for all possible delta structures.
 */
type Delta = TextDelta | InputJsonDelta; // Add other delta types if they exist

// -------------- Event Level Interfaces --------------

/**
 * Event: Indicates the start of a new message from the assistant or user.
 */
interface MessageStartEvent {
  type: 'message_start';
  message: ChatMessage; // Contains the initial message metadata
}

/**
 * Event: Indicates the start of a new content block within the message.
 */
interface ContentBlockStartEvent {
  type: 'content_block_start';
  index: number; // The index of the content block in the message's content array
  content_block: ContentBlock; // The initial state of the content block
}

/**
 * Event: Represents an incremental update (delta) to a content block.
 */
interface ContentBlockDeltaEvent {
  type: 'content_block_delta';
  index: number; // The index of the content block being updated
  delta: Delta; // The actual change (text, JSON chunk, etc.)
}

/**
 * Event: Indicates that a content block has finished generating.
 */
interface ContentBlockStopEvent {
  type: 'content_block_stop';
  index: number; // The index of the content block that stopped
  stop_timestamp: Timestamp; // When the block stopped generating
}

/**
 * Event: Represents an incremental update at the message level, usually stop reason.
 */
interface MessageDeltaEvent {
  type: 'message_delta';
  delta: MessageDelta;
}

/**
 * Event: A keep-alive ping.
 */
interface PingEvent {
  type: 'ping';
}

/**
 * Event: Indicates the entire message generation process has stopped.
 */
interface MessageStopEvent {
  type: 'message_stop';
}

/**
 * Union type representing any possible event from the stream.
 */
export type ServerSentEvent =
  | MessageStartEvent
  | ContentBlockStartEvent
  | ContentBlockDeltaEvent
  | ContentBlockStopEvent
  | MessageDeltaEvent
  | PingEvent
  | MessageStopEvent;
