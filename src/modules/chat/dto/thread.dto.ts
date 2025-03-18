import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsInt,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';

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

export class MessageCommandDto {
  @ApiProperty({
    description: 'Name of the command',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the command',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Command to execute',
  })
  @IsString()
  command: string;

  @ApiProperty({
    description: 'Prompt to execute the command',
  })
  @IsString()
  prompt: string;
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

class MessageDto {
  @ApiProperty({ description: 'ID of the message' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Content of the message' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'Timestamp of the message' })
  @IsInt()
  timestamp: number;

  @ApiProperty({ description: 'Role of the message sender' })
  @IsString()
  role: 'user' | 'assistant';

  @ApiProperty({ description: 'Parent ID of the message (if any)' })
  @IsString()
  parentId: string | null;

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

export class ThreadDto {
  @ApiProperty({ description: 'ID of the thread' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Algorithm ID of the thread' })
  @IsString()
  algorithmId: string;

  @ApiProperty({ description: 'Creation timestamp of the thread' })
  @IsInt()
  createdAt: number;

  @ApiProperty({ description: 'Last update timestamp of the thread' })
  @IsInt()
  updatedAt: number;

  @ApiProperty({ type: [MessageDto], description: 'Messages in the thread' })
  @IsArray()
  messages: MessageDto[];
}
