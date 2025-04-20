import { IsOptional, IsEnum, IsObject } from 'class-validator';
import { ContentStatus } from '@prisma/client';

export class CreateModuleDto {
  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @IsOptional()
  @IsObject()
  body: Record<string, any>;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
