import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
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

export enum ActionStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  SUCCESS = 'success',
  ERROR = 'error',
  SKIPPED = 'skipped',
}

// Base content element DTO
export class BaseContentElementDto {
  @ApiProperty({
    description: 'The discriminator field to identify the element type',
  })
  @IsString()
  type: string;

  @ApiPropertyOptional({
    description:
      'Optional unique ID for this specific content element instance',
  })
  @IsString()
  @IsOptional()
  @IsUUID()
  id?: string;
}

// Text element DTO
export class TextElementDto extends BaseContentElementDto {
  @ApiProperty({ description: 'The text content' })
  @IsString()
  value: string;
}

// Code element DTO
export class CodeElementDto extends BaseContentElementDto {
  @ApiProperty({ description: 'The code content' })
  @IsString()
  value: string;

  @ApiPropertyOptional({
    description: 'Optional language identifier for syntax highlighting',
  })
  @IsString()
  @IsOptional()
  language?: string;
}

// Image element DTO
export class ImageElementDto extends BaseContentElementDto {
  @ApiProperty({ description: 'URL of the image file' })
  @IsString()
  url: string;

  @ApiPropertyOptional({
    description: 'Alt text for accessibility and description',
  })
  @IsString()
  @IsOptional()
  alt?: string;
}

// File element DTO
export class FileElementDto extends BaseContentElementDto {
  @ApiProperty({ description: 'Display name of the file' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'URL to download/view the file' })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiPropertyOptional({ description: 'MIME type' })
  @IsString()
  @IsOptional()
  mimeType?: string;

  @ApiPropertyOptional({ description: 'Size in bytes' })
  @IsNumber()
  @IsOptional()
  size?: number;

  @ApiPropertyOptional({
    description: 'Internal reference ID if needed for backend correlation',
  })
  @IsString()
  @IsOptional()
  refId?: string;
}

// Action request element DTO
export class ActionRequestElementDto extends BaseContentElementDto {
  @ApiProperty({ description: 'Name of the tool/action being called' })
  @IsString()
  toolName: string;

  @ApiProperty({ description: 'Arguments passed to the tool' })
  @IsObject()
  args: Record<string, unknown>;

  @ApiProperty({
    description: 'Unique ID for this specific tool call instance',
  })
  @IsString()
  @IsUUID()
  callId: string;
}

// Action status element DTO
export class ActionStatusElementDto extends BaseContentElementDto {
  @ApiProperty({
    description:
      'Links this status update to the corresponding ActionRequestElement',
  })
  @IsString()
  @IsUUID()
  callId: string;

  @ApiProperty({
    description: 'The current status of the action execution',
    enum: ActionStatus,
  })
  @IsEnum(ActionStatus)
  status: ActionStatus;

  @ApiPropertyOptional({ description: 'Optional status message' })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({ description: 'Optional progress indicator' })
  @IsNumber()
  @IsOptional()
  progress?: number;
}

// Action result element DTO
export class ActionResultElementDto extends BaseContentElementDto {
  @ApiProperty({
    description: 'Links this result to the corresponding ActionRequestElement',
  })
  @IsString()
  @IsUUID()
  callId: string;

  @ApiProperty({ description: 'The raw result data returned by the tool' })
  result: unknown;

  @ApiPropertyOptional({
    description:
      'Pre-rendered representation of the result using other ContentElements for direct display',
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BaseContentElementDto)
  renderedResult?: BaseContentElementDto[];

  @ApiProperty({
    description:
      'Indicates if the action execution that produced this result was successful or failed',
  })
  @IsString()
  status: 'success' | 'error';

  @ApiPropertyOptional({
    description: 'Optional error message if status is error',
  })
  @IsString()
  @IsOptional()
  errorMessage?: string;
}

// Reference element DTO
export class ReferenceElementDto extends BaseContentElementDto {
  @ApiProperty({ description: 'Name or identifier of the source' })
  @IsString()
  source: string;

  @ApiPropertyOptional({
    description: 'Relevant snippet/quote from the source content',
  })
  @IsString()
  @IsOptional()
  snippet?: string;

  @ApiPropertyOptional({
    description: 'Direct link to the source if available',
  })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiPropertyOptional({ description: 'Internal reference ID if needed' })
  @IsString()
  @IsOptional()
  refId?: string;
}

// UI control element DTO
export class UIControlElementDto extends BaseContentElementDto {
  @ApiProperty({ description: 'The type of UI control to render' })
  @IsString()
  controlType: 'button' | 'input' | 'select' | 'checkbox' | 'textarea';

  @ApiProperty({ description: 'Display label' })
  @IsString()
  label: string;

  @ApiProperty({
    description:
      'Identifier for the action this control triggers when interacted with',
  })
  @IsString()
  actionId: string;

  @ApiPropertyOptional({
    description: 'Optional data associated with the control or action',
  })
  @IsOptional()
  payload?: unknown;

  @ApiPropertyOptional({
    description: 'Default value for inputs/selects/textareas',
  })
  @IsOptional()
  defaultValue?: unknown;

  @ApiPropertyOptional({ description: 'Options for select controlType' })
  @IsArray()
  @IsOptional()
  options?: { label: string; value: string }[];

  @ApiPropertyOptional({
    description: 'Whether the control is currently interactive',
  })
  @IsBoolean()
  @IsOptional()
  disabled?: boolean;
}

// Status update element DTO
export class StatusUpdateElementDto extends BaseContentElementDto {
  @ApiProperty({ description: 'Status message' })
  @IsString()
  message: string;

  @ApiProperty({ description: 'Severity level' })
  @IsString()
  level: 'info' | 'warning' | 'error' | 'debug';
}

// Error element DTO
export class ErrorElementDto extends BaseContentElementDto {
  @ApiProperty({ description: 'User-friendly error message' })
  @IsString()
  message: string;

  @ApiPropertyOptional({ description: 'Optional error code' })
  @IsOptional()
  code?: string | number;

  @ApiPropertyOptional({
    description: 'Optional technical details, stack trace, etc.',
  })
  @IsString()
  @IsOptional()
  details?: string;

  @ApiPropertyOptional({
    description: 'Indicates if this error likely halted the intended operation',
  })
  @IsBoolean()
  @IsOptional()
  fatal?: boolean;
}

// Interaction response element DTO
export class InteractionResponseElementDto extends BaseContentElementDto {
  @ApiPropertyOptional({
    description:
      'ID of the specific UIControlElement instance that was interacted with',
  })
  @IsString()
  @IsOptional()
  @IsUUID()
  controlId?: string;

  @ApiProperty({
    description:
      'The action identifier from the UIControlElement that was triggered',
  })
  @IsString()
  actionId: string;

  @ApiPropertyOptional({
    description:
      'Payload from the UIControlElement or data entered/selected by the user',
  })
  @IsOptional()
  payload?: unknown;

  @ApiPropertyOptional({
    description: 'User-facing label of the control interacted with',
  })
  @IsString()
  @IsOptional()
  label?: string;
}

// Custom element DTO
export class CustomElementDto extends BaseContentElementDto {
  @ApiProperty({
    description: 'Specific identifier for your custom element type',
  })
  @IsString()
  customType: string;

  @ApiProperty({
    description: 'Custom data structure needed to render this element',
  })
  @IsObject()
  data: Record<string, unknown>;
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

// Context reference DTOs
export class BaseContextElementDto {
  @ApiProperty({
    description: 'Unique ID for this specific context element instance',
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The discriminator field to identify the context element type',
  })
  @IsString()
  type: string;

  @ApiPropertyOptional({
    description:
      'Whether this context element can be used multiple times in the same message',
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

export class PromptReferenceContextDto extends BaseContextElementDto {
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

export class CanvasDto {
  @ApiProperty({ description: 'Canvas ID' })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Canvas name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Canvas description' })
  @IsString()
  description: string;
}

export class CanvasContextDto extends BaseContextElementDto {
  @ApiProperty({ description: 'Canvas information' })
  @ValidateNested()
  @Type(() => CanvasDto)
  canvas: CanvasDto;
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

export class KeyValueContextElementDto extends BaseContextElementDto {
  @ApiProperty({ description: 'Title of the key-value context' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Key-value information' })
  @ValidateNested()
  @Type(() => KeyValueDto)
  key_value: KeyValueDto;
}

// Main Chat Message DTO
export class ContentElementUnion {
  static create(
    element: any,
  ):
    | TextElementDto
    | CodeElementDto
    | ImageElementDto
    | FileElementDto
    | ActionRequestElementDto
    | ActionStatusElementDto
    | ActionResultElementDto
    | ReferenceElementDto
    | UIControlElementDto
    | StatusUpdateElementDto
    | ErrorElementDto
    | InteractionResponseElementDto
    | CustomElementDto {
    if (!element || !element.type) {
      throw new Error('Invalid content element: type is required');
    }

    switch (element.type) {
      case 'text':
        return Object.assign(new TextElementDto(), element);
      case 'code':
        return Object.assign(new CodeElementDto(), element);
      case 'image':
        return Object.assign(new ImageElementDto(), element);
      case 'file':
        return Object.assign(new FileElementDto(), element);
      case 'action_request':
        return Object.assign(new ActionRequestElementDto(), element);
      case 'action_status':
        return Object.assign(new ActionStatusElementDto(), element);
      case 'action_result':
        return Object.assign(new ActionResultElementDto(), element);
      case 'reference':
        return Object.assign(new ReferenceElementDto(), element);
      case 'ui_control':
        return Object.assign(new UIControlElementDto(), element);
      case 'status_update':
        return Object.assign(new StatusUpdateElementDto(), element);
      case 'error':
        return Object.assign(new ErrorElementDto(), element);
      case 'interaction_response':
        return Object.assign(new InteractionResponseElementDto(), element);
      case 'custom':
        return Object.assign(new CustomElementDto(), element);
      default:
        throw new Error(`Unknown content element type: ${element.type}`);
    }
  }
}

export class ChatMessageDto {
  @ApiProperty({ description: 'Unique identifier for the message' })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Timestamp of message creation' })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({ description: 'Who sent the message', enum: ChatRole })
  @IsEnum(ChatRole)
  role: ChatRole;

  @ApiPropertyOptional({
    description: 'The user ID associated with the message',
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({
    description: 'The structured content of the message',
    type: [BaseContentElementDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BaseContentElementDto, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: TextElementDto, name: 'text' },
        { value: CodeElementDto, name: 'code' },
        { value: ImageElementDto, name: 'image' },
        { value: FileElementDto, name: 'file' },
        { value: ActionRequestElementDto, name: 'action_request' },
        { value: ActionStatusElementDto, name: 'action_status' },
        { value: ActionResultElementDto, name: 'action_result' },
        { value: ReferenceElementDto, name: 'reference' },
        { value: UIControlElementDto, name: 'ui_control' },
        { value: StatusUpdateElementDto, name: 'status_update' },
        { value: ErrorElementDto, name: 'error' },
        { value: InteractionResponseElementDto, name: 'interaction_response' },
        { value: CustomElementDto, name: 'custom' },
      ],
    },
  })
  content: (
    | TextElementDto
    | CodeElementDto
    | ImageElementDto
    | FileElementDto
    | ActionRequestElementDto
    | ActionStatusElementDto
    | ActionResultElementDto
    | ReferenceElementDto
    | UIControlElementDto
    | StatusUpdateElementDto
    | ErrorElementDto
    | InteractionResponseElementDto
    | CustomElementDto
  )[];

  @ApiPropertyOptional({
    description: 'References to external context items',
    type: [BaseContextElementDto],
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BaseContextElementDto)
  attachedContext?: BaseContextElementDto[];

  @ApiPropertyOptional({
    description: 'Id of the message this one is related to. UUID v4',
  })
  @IsUUID()
  @IsOptional()
  parentId?: string;

  @ApiProperty({
    description:
      'Id for grouping related messages in a logical sub-thread or step. UUID v4',
  })
  @IsUUID()
  threadId: string;
}

export class ReponseMessageDto {
  @ApiProperty({ description: 'The id of the response message' })
  @IsUUID()
  id: string;
}
export class MessagePayloadDto {
  @ApiProperty({ description: 'The message to send' })
  @ValidateNested()
  @Type(() => ChatMessageDto)
  message: ChatMessageDto;

  @ApiProperty({ description: 'The response message' })
  @ValidateNested()
  @Type(() => ReponseMessageDto)
  responseMessage: ReponseMessageDto;
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
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp of the last session update' })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({
    description: 'Ordered list of messages constituting the conversation',
    type: [ChatMessageDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  messages: ChatMessageDto[];

  @ApiPropertyOptional({
    description: 'Metadata associated with the entire session',
  })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, unknown>;

  @ApiPropertyOptional({
    description: 'Context references attached to the session',
    type: [BaseContextElementDto],
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BaseContextElementDto)
  attachedContext?: BaseContextElementDto[];
}
