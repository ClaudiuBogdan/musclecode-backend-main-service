import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum AlgorithmDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export class GenerateAlgorithmCollectionDto {
  @ApiProperty({
    description: 'The main topic or theme for the algorithm collection',
    example: 'Lodash Functions for Frontend Developers',
  })
  @IsString()
  topic: string;

  @ApiProperty({
    description: 'Target programming language for the algorithms',
    example: 'JavaScript',
    required: true,
  })
  @IsString()
  language: string;

  @ApiProperty({
    description: 'Categories for the algorithms',
    example: ['frontend', 'utility functions', 'data manipulation'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @ApiProperty({
    description: 'The difficulty level of the algorithms',
    enum: AlgorithmDifficulty,
    default: AlgorithmDifficulty.BEGINNER,
    required: false,
  })
  @IsOptional()
  @IsEnum(AlgorithmDifficulty)
  difficulty?: AlgorithmDifficulty;

  @ApiProperty({
    description: 'Number of algorithms to generate in the collection',
    example: 5,
    default: 5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  count?: number;

  @ApiProperty({
    description: 'Specific focus areas or techniques to cover',
    example: ['Array methods', 'Object manipulation', 'Data transformation'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  focusAreas?: string[];

  @ApiProperty({
    description:
      'Additional requirements or instructions for algorithm generation',
    example:
      'Include practical examples relevant to real-world web applications',
    required: false,
  })
  @IsOptional()
  @IsString()
  additionalRequirements?: string;
}
