import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export class GenerateModuleRequestDto {
  @ApiProperty({
    description: 'The user prompt for generating a learning module',
    example: 'Create a module on JavaScript promises for beginners',
  })
  @IsString()
  prompt: string;

  @ApiProperty({
    description: 'The difficulty level of the module',
    enum: DifficultyLevel,
    default: DifficultyLevel.BEGINNER,
    required: false,
  })
  @IsEnum(DifficultyLevel)
  @IsOptional()
  difficulty?: DifficultyLevel;
}

export class GenerateModuleResponseDto {
  @ApiProperty({
    description: 'The ID of the generated module',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  id: string;

  @ApiProperty({
    description: 'The title of the generated module',
    example: 'JavaScript Promises: A Comprehensive Guide',
  })
  title: string;

  @ApiProperty({
    description: 'The description of the generated module',
    example:
      'Learn about JavaScript promises, from basic concepts to advanced patterns.',
  })
  description: string;

  @ApiProperty({
    description: 'Array of lessons in the module',
    example: [
      {
        title: 'Introduction to JavaScript Promises',
        description: 'Learn the basics of JavaScript promises',
        order: 1,
      },
      {
        title: 'Advanced JavaScript Promises',
        description: 'Learn the advanced concepts of JavaScript promises',
        order: 2,
      },
    ],
  })
  lessons: Array<{
    title: string;
    description: string;
    order: number;
  }>;
}
