import { IsEnum, IsOptional, IsDateString, IsBoolean } from 'class-validator';
import { PermissionLevel } from '@prisma/client';

export class UpdatePermissionDto {
  @IsEnum(PermissionLevel)
  permissionLevel: PermissionLevel;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}

export class UpdateContentNodeSharingDto {
  @IsBoolean()
  isPublic: boolean;

  @IsEnum(PermissionLevel)
  defaultPermission: PermissionLevel;
}
