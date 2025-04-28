import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsBoolean,
} from 'class-validator';
import { ModelDto } from 'src/modules/chat/dto/agent-chat.dto';

class FeedbackItemDto {
  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean;

  @IsString()
  @IsNotEmpty()
  explanation: string;

  @IsNumber()
  @IsNotEmpty()
  points: number;
}

class CorrectionCriteriaDto {
  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsNumber()
  @IsNotEmpty()
  points: number;

  @IsString()
  @IsNotEmpty()
  explanation: string;
}

export class LessonQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsArray()
  @IsNotEmpty()
  @Type(() => CorrectionCriteriaDto)
  correctionCriteria: CorrectionCriteriaDto[];
}

export class CheckQuestionDto {
  @IsString()
  @IsNotEmpty()
  userAnswer: string;

  @IsObject()
  @IsNotEmpty()
  @Type(() => LessonQuestionDto)
  lessonQuestion: LessonQuestionDto;

  @IsObject()
  @IsNotEmpty()
  @Type(() => ModelDto)
  model: ModelDto;
}

export class QuestionResponseDto {
  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsNumber()
  @IsNotEmpty()
  maxScore: number;

  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean;

  @IsArray()
  @IsNotEmpty()
  @Type(() => FeedbackItemDto)
  feedbackItems: FeedbackItemDto[];
}
