import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsArray } from 'class-validator';

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
