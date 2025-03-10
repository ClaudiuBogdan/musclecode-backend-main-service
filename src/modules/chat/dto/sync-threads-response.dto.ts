import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { ThreadDto } from './thread.dto';

export class SyncThreadsResponseDto {
  @ApiProperty({
    type: [ThreadDto],
    description: 'List of updated or new threads.',
  })
  @IsArray()
  threads: ThreadDto[];
}
