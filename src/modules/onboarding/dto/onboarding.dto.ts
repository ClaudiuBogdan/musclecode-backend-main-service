import {
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  IsEnum,
  IsObject,
  ValidateNested,
  IsInt,
  IsUUID,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum OnboardingStep {
  WELCOME = 'welcome',
  GOALS = 'goals',
  QUIZ = 'quiz',
  SUMMARY = 'summary',
}

export class UpdateOnboardingStateDto {
  @ApiProperty({
    description: 'Current step in the onboarding process',
    enum: OnboardingStep,
    example: 'goals',
  })
  @IsEnum(OnboardingStep)
  @IsOptional()
  currentStep?: OnboardingStep;

  @ApiProperty({
    description: 'Whether onboarding is completed',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}

export class UserGoalsDto {
  @ApiProperty({
    description: 'Study time in minutes per day',
    example: 30,
  })
  @IsInt()
  @Min(5)
  @Max(240)
  studyTime: number;

  @ApiProperty({
    description: 'Selected collection IDs',
    example: ['sorting-algorithms', 'dynamic-programming'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  selectedCollections?: string[];
}

export class QuizAnswerDto {
  @ApiProperty({
    description: 'Question ID',
    example: 'uuid-1',
  })
  @IsString()
  @IsUUID('4')
  questionId: string;

  @ApiProperty({
    description: 'Selected option index',
    example: 2,
  })
  @IsInt()
  @Min(0)
  selectedOption: number;
}

export class SubmitQuizDto {
  @ApiProperty({
    description: 'Quiz answers',
    type: [QuizAnswerDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizAnswerDto)
  answers: QuizAnswerDto[];
}

export class QuizQuestionDto {
  @ApiProperty({
    description: 'Question ID',
    example: 'uuid-1',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Algorithm ID associated with the question',
    example: 'uuid-1',
  })
  @IsString()
  algorithmId: string;

  @ApiProperty({
    description: 'Question text',
    example: 'What is the time complexity of a linear search?',
  })
  @IsString()
  question: string;

  @ApiProperty({
    description: 'Answer options',
    example: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
  })
  @IsArray()
  @IsString({ each: true })
  options: string[];

  @ApiProperty({
    description: 'Correct answer index',
    example: 0,
  })
  @IsInt()
  correctAnswerIndex: number;
}

export class QuizGroupDto {
  @ApiProperty({
    description: 'Quiz group ID',
    example: 'data-structures',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Quiz group name',
    example: 'Data Structures',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Quiz group description',
    example:
      'A comprehensive collection of data structures, from basic to advanced.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Quiz questions',
    type: [QuizQuestionDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizQuestionDto)
  questions: QuizQuestionDto[];
}

export class CollectionDto {
  @ApiProperty({
    description: 'Collection ID',
    example: 'sorting-algorithms',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Collection name',
    example: 'Sorting Algorithms',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Collection description',
    example:
      'A comprehensive collection of sorting algorithms, from basic to advanced.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

export class OnboardingResponseDto {
  @ApiProperty({
    description: 'Onboarding ID',
    example: 'uuid-1',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'User ID',
    example: 'uuid-1',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Current step in the onboarding process',
    enum: OnboardingStep,
    example: 'goals',
  })
  @IsEnum(OnboardingStep)
  currentStep: OnboardingStep;

  @ApiProperty({
    description: 'Whether onboarding is completed',
    example: false,
  })
  @IsBoolean()
  isCompleted: boolean;

  @ApiProperty({
    description: 'User goals',
    type: UserGoalsDto,
    required: false,
  })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => UserGoalsDto)
  goals?: UserGoalsDto;

  @ApiProperty({
    description: 'Available collections',
    type: [CollectionDto],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CollectionDto)
  collections?: CollectionDto[];

  @ApiProperty({
    description: 'Quiz questions',
    type: [QuizQuestionDto],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => QuizGroupDto)
  quizQuestions?: QuizGroupDto[];

  @ApiProperty({
    description: 'Quiz results',
    type: SubmitQuizDto,
    required: false,
  })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => SubmitQuizDto)
  quizResults?: SubmitQuizDto;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-01-01T00:00:00.000Z',
  })
  @IsString()
  createdAt: string;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-01-01T00:00:00.000Z',
  })
  @IsString()
  updatedAt: string;
}

export class SkipOnboardingStepDto {
  @ApiProperty({
    description: 'Step to skip',
    enum: OnboardingStep,
  })
  step: OnboardingStep;
}
