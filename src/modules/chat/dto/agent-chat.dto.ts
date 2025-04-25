import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Type enums
export enum ChatRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
  TOOL = 'tool',
}

export enum MessageStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum ModelProvider {
  GEMINI = 'gemini',
}

export class ModelDto {
  @ApiProperty({ description: 'Model ID' })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Model name defined by the user' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Model provider' })
  @IsString()
  provider: ModelProvider;

  @ApiProperty({ description: 'Model key from the provider' })
  @IsString()
  model: string;

  @ApiProperty({ description: 'Model API key' })
  @IsString()
  apiKey: string;
}
// Base content block DTO
export class BaseContentBlockDto {
  @ApiProperty({
    description: 'Unique ID for this specific content block instance',
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The discriminator field to identify the block type',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The timestamp of when the block was created',
  })
  @IsString()
  start_timestamp: string;

  @ApiProperty({
    description: 'The timestamp of when the block was completed',
  })
  @IsString()
  stop_timestamp: string;
}

// Text block DTO
export class TextBlockDto extends BaseContentBlockDto {
  @ApiProperty({ description: 'The text content' })
  @IsString()
  text: string;
}

// Tool use content block DTO
export class ToolUseContentBlockDto extends BaseContentBlockDto {
  @ApiProperty({ description: 'Name of the tool being used' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The complete input object once assembled' })
  @IsObject()
  input: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'Optional descriptive message' })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({ description: 'Optional integration name' })
  @IsString()
  @IsOptional()
  integration_name?: string;

  @ApiPropertyOptional({ description: 'Optional integration icon URL' })
  @IsString()
  @IsOptional()
  integration_icon_url?: string;

  @ApiPropertyOptional({ description: 'Optional display content' })
  @IsString()
  @IsOptional()
  display_content?: string;
}

// Tool result text part DTO
export class ToolResultTextPartDto {
  @ApiPropertyOptional({ description: 'Optional unique ID' })
  @IsString()
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({ description: 'Type is always text for text parts' })
  @IsString()
  type: 'text';

  @ApiProperty({ description: 'The text content' })
  @IsString()
  text: string;
}

// Tool result content block DTO
export class ToolResultContentBlockDto extends BaseContentBlockDto {
  @ApiProperty({ description: 'ID of the corresponding tool_use block' })
  @IsString()
  @IsUUID()
  tool_use_id: string;

  @ApiProperty({ description: 'Name of the tool that was used' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The result content' })
  content: unknown;

  @ApiProperty({
    description: 'Indicates if the tool execution resulted in an error',
  })
  @IsBoolean()
  is_error: boolean;

  @ApiPropertyOptional({
    description: 'Optional descriptive message from the tool execution',
  })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({ description: 'Optional display content' })
  @IsString()
  @IsOptional()
  display_content?: string;
}

// Context reference DTOs
export class BaseContextBlockDto {
  @ApiProperty({
    description: 'Unique ID for this specific context block instance',
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The discriminator field to identify the context block type',
  })
  @IsString()
  type: string;

  @ApiPropertyOptional({
    description:
      'Whether this context block can be used multiple times in the same message',
  })
  @IsBoolean()
  @IsOptional()
  unique?: boolean;
}

export class PromptDto {
  @ApiProperty({ description: 'Prompt ID' })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Prompt name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Prompt description' })
  @IsString()
  description: string;
}

export class PromptReferenceContextDto extends BaseContextBlockDto {
  @ApiProperty({ description: 'Prompt reference information' })
  @ValidateNested()
  @Type(() => PromptDto)
  prompt: PromptDto;

  @ApiProperty({
    description:
      'Whether this context element can be used multiple times in the same message',
  })
  @IsBoolean()
  unique: true;
}

export class ModelReferenceContextDto extends BaseContextBlockDto {
  @ApiProperty({ description: 'Model reference information' })
  @ValidateNested()
  @Type(() => ModelDto)
  model: ModelDto;
}

export class GraphNodeDto {
  @ApiProperty({ description: 'Graph node ID' })
  @IsString()
  @IsUUID()
  id: string;
}

export class GraphNodeContextDto extends BaseContextBlockDto {
  @ApiProperty({ description: 'Graph node information' })
  @ValidateNested()
  @Type(() => GraphNodeDto)
  graph_node: GraphNodeDto;
}

export class KeyValueDto {
  @ApiProperty({ description: 'Key' })
  @IsString()
  key: string;

  @ApiProperty({ description: 'Value' })
  @IsString()
  value: string;

  @ApiPropertyOptional({ description: 'Available options' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  options?: string[];

  @ApiPropertyOptional({ description: 'Whether custom values are allowed' })
  @IsBoolean()
  @IsOptional()
  customValue?: boolean;

  @ApiPropertyOptional({ description: 'Description of the key-value pair' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Whether this key can be used multiple times',
  })
  @IsBoolean()
  @IsOptional()
  unique?: boolean;
}

export class KeyValueContextBlockDto extends BaseContextBlockDto {
  @ApiProperty({ description: 'Title of the key-value context' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Key-value information' })
  @ValidateNested()
  @Type(() => KeyValueDto)
  key_value: KeyValueDto;
}

// Token usage DTO
export class TokenUsageDto {
  @ApiPropertyOptional({ description: 'Number of prompt tokens used' })
  @IsNumber()
  @IsOptional()
  promptTokens?: number;

  @ApiPropertyOptional({ description: 'Number of completion tokens used' })
  @IsNumber()
  @IsOptional()
  completionTokens?: number;

  @ApiPropertyOptional({ description: 'Total number of tokens used' })
  @IsNumber()
  @IsOptional()
  totalTokens?: number;
}

// Main Chat Message DTO
export class ContentBlockUnion {
  static create(
    block: any,
  ): TextBlockDto | ToolUseContentBlockDto | ToolResultContentBlockDto {
    if (!block || !block.type) {
      throw new Error('Invalid content block: type is required');
    }

    switch (block.type) {
      case 'text':
        return Object.assign(new TextBlockDto(), block);
      case 'tool_use':
        return Object.assign(new ToolUseContentBlockDto(), block);
      case 'tool_result':
        return Object.assign(new ToolResultContentBlockDto(), block);
      default:
        throw new Error(`Unknown content block type: ${block.type}`);
    }
  }
}

export class ChatMessageDto {
  @ApiProperty({ description: 'Unique identifier for the message' })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Timestamp of message creation' })
  @IsString()
  createdAt: string;

  @ApiProperty({ description: 'Who sent the message', enum: ChatRole })
  @IsEnum(ChatRole)
  role: ChatRole;

  @ApiProperty({
    description: 'The structured content of the message',
    type: [BaseContentBlockDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BaseContentBlockDto, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: TextBlockDto, name: 'text' },
        { value: ToolUseContentBlockDto, name: 'tool_use' },
        { value: ToolResultContentBlockDto, name: 'tool_result' },
      ],
    },
  })
  content: (
    | TextBlockDto
    | ToolUseContentBlockDto
    | ToolResultContentBlockDto
  )[];

  @ApiPropertyOptional({
    description: 'References to external context items',
    type: [BaseContextBlockDto],
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BaseContextBlockDto)
  attachedContext?: BaseContextBlockDto[];

  @ApiPropertyOptional({
    description: 'Overall status of the message processing',
    enum: MessageStatus,
  })
  @IsEnum(MessageStatus)
  @IsOptional()
  status?: MessageStatus;

  @ApiPropertyOptional({
    description: 'Id of the message this one is related to',
  })
  @IsUUID()
  @IsOptional()
  parentId?: string;

  @ApiProperty({
    description:
      'Id for grouping related messages in a logical sub-thread or step',
  })
  @IsUUID()
  threadId: string;

  @ApiPropertyOptional({
    description: 'End-to-end latency in milliseconds',
  })
  @IsNumber()
  @IsOptional()
  latencyMs?: number;

  @ApiPropertyOptional({
    description: 'Token usage information',
  })
  @ValidateNested()
  @Type(() => TokenUsageDto)
  @IsOptional()
  tokenUsage?: TokenUsageDto;

  @ApiPropertyOptional({
    description: 'Reason the message generation finished',
  })
  @IsString()
  @IsOptional()
  finishReason?:
    | 'stop'
    | 'length'
    | 'tool_calls'
    | 'content_filter'
    | 'error'
    | null;

  @ApiPropertyOptional({
    description: 'Generic property bag for additional custom data',
  })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, unknown>;
}

export class ResponseMessageDto {
  @ApiProperty({ description: 'The id of the response message' })
  @IsUUID()
  id: string;
}

export class MessagePayloadDto {
  @ApiProperty({ description: 'The message to send' })
  @ValidateNested()
  @Type(() => ChatMessageDto)
  message: ChatMessageDto;

  @ApiProperty({ description: 'The context array for the message' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BaseContextBlockDto)
  context: BaseContextBlockDto[];

  @ApiProperty({ description: 'The response message' })
  @ValidateNested()
  @Type(() => ResponseMessageDto)
  responseMessage: ResponseMessageDto;
}

// Chat Thread DTO
export class ChatThreadDto {
  @ApiProperty({ description: 'Unique identifier for the chat session' })
  @IsString()
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: 'Optional title for the chat session' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Timestamp of session creation' })
  @IsString()
  createdAt: string;

  @ApiProperty({ description: 'Timestamp of the last session update' })
  @IsString()
  updatedAt: string;

  @ApiProperty({
    description: 'Ordered list of messages constituting the conversation',
    type: [ChatMessageDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  messages: ChatMessageDto[];

  @ApiPropertyOptional({
    description: 'Context references attached to the session',
    type: [BaseContextBlockDto],
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BaseContextBlockDto)
  attachedContext?: BaseContextBlockDto[];

  @ApiPropertyOptional({
    description: 'Timestamp of the last message sync with the backend',
  })
  @IsString()
  @IsOptional()
  lastMessagesSyncAt?: string;
}

// Delta level structures for streaming
export class TextDeltaDto {
  @ApiProperty({ description: 'Type is always text_delta for text deltas' })
  @IsString()
  type: 'text_delta';

  @ApiProperty({ description: 'The text content being added' })
  @IsString()
  text: string;
}

export class InputJsonDeltaDto {
  @ApiProperty({
    description: 'Type is always input_json_delta for JSON deltas',
  })
  @IsString()
  type: 'input_json_delta';

  @ApiProperty({ description: 'A string fragment of the JSON object' })
  @IsString()
  partial_json: string;
}

export class MessageDeltaDto {
  @ApiPropertyOptional({ description: 'Reason why message generation stopped' })
  @IsString()
  @IsOptional()
  stop_reason?: string | null;

  @ApiPropertyOptional({ description: 'Stop sequence that triggered the stop' })
  @IsString()
  @IsOptional()
  stop_sequence?: string | null;
}

// Event level DTOs for server-sent events
export class MessageStartEventDto {
  @ApiProperty({ description: 'Event type is always message_start' })
  @IsString()
  type: 'message_start';

  @ApiProperty({ description: 'The initial message metadata' })
  @ValidateNested()
  @Type(() => ChatMessageDto)
  message: ChatMessageDto;
}

export class ContentBlockStartEventDto {
  @ApiProperty({ description: 'Event type is always content_block_start' })
  @IsString()
  type: 'content_block_start';

  @ApiProperty({
    description: 'The index of the content block in the message content array',
  })
  @IsNumber()
  index: number;

  @ApiProperty({ description: 'The initial state of the content block' })
  content_block:
    | TextBlockDto
    | ToolUseContentBlockDto
    | ToolResultContentBlockDto;
}

export class ContentBlockDeltaEventDto {
  @ApiProperty({ description: 'Event type is always content_block_delta' })
  @IsString()
  type: 'content_block_delta';

  @ApiProperty({ description: 'The index of the content block being updated' })
  @IsNumber()
  index: number;

  @ApiProperty({ description: 'The actual change' })
  delta: TextDeltaDto | InputJsonDeltaDto;
}

export class ContentBlockStopEventDto {
  @ApiProperty({ description: 'Event type is always content_block_stop' })
  @IsString()
  type: 'content_block_stop';

  @ApiProperty({ description: 'The index of the content block that stopped' })
  @IsNumber()
  index: number;

  @ApiProperty({ description: 'When the block stopped generating' })
  @IsString()
  stop_timestamp: string;
}

export class MessageDeltaEventDto {
  @ApiProperty({ description: 'Event type is always message_delta' })
  @IsString()
  type: 'message_delta';

  @ApiProperty({ description: 'The delta information' })
  @ValidateNested()
  @Type(() => MessageDeltaDto)
  delta: MessageDeltaDto;
}

export class PingEventDto {
  @ApiProperty({ description: 'Event type is always ping' })
  @IsString()
  type: 'ping';
}

export class MessageStopEventDto {
  @ApiProperty({ description: 'Event type is always message_stop' })
  @IsString()
  type: 'message_stop';
}

export type ServerSentEventDto =
  | MessageStartEventDto
  | ContentBlockStartEventDto
  | ContentBlockDeltaEventDto
  | ContentBlockStopEventDto
  | MessageDeltaEventDto
  | PingEventDto
  | MessageStopEventDto;
