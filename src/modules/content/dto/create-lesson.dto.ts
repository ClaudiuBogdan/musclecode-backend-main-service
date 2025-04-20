import { IsUUID, IsOptional, IsEnum, IsObject } from 'class-validator';
import { ContentStatus } from '@prisma/client';

export class CreateLessonDto {
  @IsUUID()
  moduleId: string;

  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @IsObject()
  body: Record<string, any>;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
