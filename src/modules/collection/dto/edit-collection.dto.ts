import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class EditCollectionDto {
  @ApiProperty({
    description: 'The name of the collection',
    example: 'My Algorithms Collection',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the collection',
    example: 'A collection of my favorite algorithms',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Array of algorithm IDs in the collection',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    required: true,
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  algorithmIds: string[];
}
