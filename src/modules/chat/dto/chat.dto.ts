import {
  IsString,
  IsUUID,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MessageContextDto } from './thread.dto';
import { MessageCommandDto } from './thread.dto';

export class CreateThreadDto {
  @ApiProperty({
    description: 'The algorithm ID this thread is associated with',
  })
  @IsString()
  algorithmId: string;
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

  @ApiPropertyOptional({
    description: 'Message commands',
    type: [MessageCommandDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageCommandDto)
  commands?: MessageCommandDto[];
}
