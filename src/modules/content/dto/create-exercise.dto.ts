import {
  IsString,
  IsUUID,
  IsOptional,
  IsEnum,
  IsObject,
} from 'class-validator';
import { ContentStatus } from '@prisma/client';

export class CreateExerciseDto {
  @IsUUID()
  moduleId: string;

  @IsOptional()
  @IsUUID()
  lessonId?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @IsOptional()
  @IsObject()
  body?: Record<string, any>;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
