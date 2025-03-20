import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export class GenerateCourseDto {
  @ApiProperty({
    description: 'The topic for the course',
    example: 'React Fundamentals',
  })
  @IsString()
  topic: string;

  @ApiProperty({
    description: 'The target audience for the course',
    example: ['Web developers', 'Frontend engineers'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  targetAudience?: string[];

  @ApiProperty({
    description: 'The difficulty level of the course',
    enum: DifficultyLevel,
    default: DifficultyLevel.BEGINNER,
    required: false,
  })
  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficultyLevel?: DifficultyLevel;

  @ApiProperty({
    description: 'Specific learning objectives to be covered in the course',
    example: ['Learn React hooks', 'Understand component lifecycle'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  learningObjectives?: string[];

  @ApiProperty({
    description:
      'Additional requirements or instructions for the course generation',
    example: 'Include practical examples using the latest React 18 features',
    required: false,
  })
  @IsOptional()
  @IsString()
  additionalRequirements?: string;
}
