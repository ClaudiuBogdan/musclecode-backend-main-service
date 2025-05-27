import { IsEnum, IsOptional, IsDateString } from 'class-validator';
import { PermissionLevel } from '@prisma/client';

export class UpdatePermissionDto {
  @IsEnum(PermissionLevel)
  permissionLevel: PermissionLevel;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
