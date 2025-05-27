import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  ValidateIf,
} from 'class-validator';
import { PermissionLevel } from '@prisma/client';

export class GrantPermissionDto {
  @IsString()
  contentNodeId: string;

  @ValidateIf((o) => !o.groupId)
  @IsString()
  userId?: string;

  @ValidateIf((o) => !o.userId)
  @IsString()
  groupId?: string;

  @IsEnum(PermissionLevel)
  permissionLevel: PermissionLevel;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
