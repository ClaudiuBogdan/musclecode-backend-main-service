import {
  IsString,
  IsUUID,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateThreadDto {
  @ApiProperty({
    description: 'The algorithm ID this thread is associated with',
  })
  @IsString()
  algorithmId: string;
}

export class ContextFileDto {
  @ApiProperty({
    description: 'Name of the file',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the file',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Content of the file',
  })
  @IsString()
  content: string;
}

export class MessageContextDto {
  @ApiPropertyOptional({
    description: 'Prompt used for the message',
  })
  @IsString()
  @IsOptional()
  prompt?: 'hint-prompt';

  @ApiPropertyOptional({
    description: 'Files used as context for the message',
    type: [ContextFileDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContextFileDto)
  files?: ContextFileDto[];
}

export class SendMessageDto {
  @ApiProperty({
    description: 'The user message ID',
  })
  @IsString()
  messageId: string;

  @ApiProperty({
    description: 'The type of message',
  })
  @IsString()
  type: 'chat' | 'hint';

  @ApiProperty({
    description: 'The assistant message ID that will be streamed to the user',
  })
  @IsString()
  assistantMessageId: string;

  @ApiProperty({
    description: 'Message content',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The thread ID this message is associated with',
  })
  @IsString()
  threadId: string;

  @ApiPropertyOptional({
    description: 'Previous message ID (for message branching)',
    type: String,
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @ApiProperty({
    description: 'The algorithm ID this thread is associated with',
  })
  @IsString()
  algorithmId: string;

  @ApiProperty({
    description: 'Message context',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => MessageContextDto)
  context?: MessageContextDto;
}
