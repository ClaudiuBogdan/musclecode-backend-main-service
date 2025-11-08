import { IsUUID, IsOptional, IsEnum, IsObject } from 'class-validator';
import { ContentStatus } from '@prisma/client';

export class CreateLessonDto {
  @IsUUID()
  moduleId: string;

  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @IsObject()
  body: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
