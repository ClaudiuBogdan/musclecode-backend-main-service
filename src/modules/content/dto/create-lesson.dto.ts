import {
  IsString,
  IsUUID,
  IsOptional,
  IsEnum,
  IsObject,
} from 'class-validator';
import { ContentStatus } from '@prisma/client';

export class CreateLessonDto {
  @IsUUID()
  moduleId: string;

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
