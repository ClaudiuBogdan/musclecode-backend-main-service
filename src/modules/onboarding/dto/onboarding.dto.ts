import {
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  IsEnum,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum OnboardingStep {
  WELCOME = 'welcome',
  CONCEPTS = 'concepts',
  GOALS = 'goals',
  QUIZ = 'quiz',
  SUMMARY = 'summary',
}

export enum ExperienceLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum TimeCommitment {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum LearningPreference {
  PRACTICAL = 'practical',
  THEORETICAL = 'theoretical',
  MIXED = 'mixed',
}

export enum TopicFamiliarity {
  UNFAMILIAR = 'unfamiliar',
  FAMILIAR = 'familiar',
  VERY_FAMILIAR = 'very_familiar',
}

export class UpdateOnboardingStateDto {
  @IsEnum(OnboardingStep)
  @IsOptional()
  currentStep?: OnboardingStep;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}

export class UserGoalsDto {
  @ApiProperty({
    description: 'Time commitment level',
    enum: TimeCommitment,
    example: 'medium',
  })
  @IsEnum(TimeCommitment)
  timeCommitment: TimeCommitment;

  @ApiProperty({
    description: 'Preferred learning style',
    enum: LearningPreference,
    example: 'practical',
  })
  @IsEnum(LearningPreference)
  learningPreference: LearningPreference;

  @ApiProperty({
    description: 'User experience level',
    enum: ExperienceLevel,
    example: 'beginner',
  })
  @IsEnum(ExperienceLevel)
  experienceLevel: ExperienceLevel;

  @ApiProperty({
    description: 'Focus areas for learning',
    type: [String],
    example: ['arrays', 'dynamic_programming'],
  })
  @IsArray()
  @IsString({ each: true })
  focusAreas: string[];
}

export class QuizAnswersMap {
  @ApiProperty({
    description: 'Familiarity with sorting algorithms',
    enum: TopicFamiliarity,
    example: 'familiar',
  })
  @IsEnum(TopicFamiliarity)
  @IsOptional()
  sorting?: TopicFamiliarity;

  @ApiProperty({
    description: 'Familiarity with graph algorithms',
    enum: TopicFamiliarity,
    example: 'familiar',
  })
  @IsEnum(TopicFamiliarity)
  @IsOptional()
  graphs?: TopicFamiliarity;

  @ApiProperty({
    description: 'Familiarity with dynamic programming',
    enum: TopicFamiliarity,
    example: 'familiar',
  })
  @IsEnum(TopicFamiliarity)
  @IsOptional()
  dp?: TopicFamiliarity;

  @ApiProperty({
    description: 'Familiarity with tree algorithms',
    enum: TopicFamiliarity,
    example: 'familiar',
  })
  @IsEnum(TopicFamiliarity)
  @IsOptional()
  trees?: TopicFamiliarity;

  @ApiProperty({
    description: 'Familiarity with string algorithms',
    enum: TopicFamiliarity,
    example: 'familiar',
  })
  @IsEnum(TopicFamiliarity)
  @IsOptional()
  strings?: TopicFamiliarity;
}

export class SubmitQuizDto {
  @ApiProperty({
    description: 'Topic familiarity answers',
    type: QuizAnswersMap,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => QuizAnswersMap)
  answers: QuizAnswersMap;
}

export class OnboardingResponseDto {
  @IsString()
  id: string;

  @IsString()
  userId: string;

  @IsEnum(OnboardingStep)
  currentStep: OnboardingStep;

  @IsBoolean()
  isCompleted: boolean;

  @IsObject()
  @IsOptional()
  goals?: UserGoalsDto;

  @IsObject()
  @IsOptional()
  quizResults?: {
    score: number;
    recommendations: any;
  };

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
