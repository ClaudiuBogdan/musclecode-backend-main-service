import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty({
    description: 'The name of the collection',
    example: 'Dynamic Programming Patterns',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the collection',
    example: 'A curated list of dynamic programming problems and patterns',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Array of algorithm IDs to include in the collection',
    example: ['uuid1', 'uuid2'],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  algorithmIds?: string[];
}
