import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
}

export class MessageVoteDto {
  @ApiProperty({
    description: 'Whether this is an upvote (true) or downvote (false)',
  })
  @IsBoolean()
  isUpvote: boolean;
}
