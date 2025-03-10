import {
  IsArray,
  ValidateNested,
  IsString,
  IsInt,
  Min,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ClientThreadUpdate {
  @ApiProperty({ description: 'ID of the thread' })
  @IsString()
  threadId: string;

  @ApiProperty({ description: 'Message count of the thread at the client' })
  @IsInt()
  @Min(0)
  messageCount: number;
}

export class SyncThreadsDto {
  @ApiProperty({
    type: String,
    description: 'Algorithm ID',
  })
  @IsOptional()
  @IsString()
  algorithmId?: string;

  @ApiProperty({
    type: [ClientThreadUpdate],
    description:
      'List of client threads with their message count and last update timestamp',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClientThreadUpdate)
  threads: ClientThreadUpdate[];
}
