import { IsString, ValidateIf } from 'class-validator';

export class RevokePermissionDto {
  @IsString()
  contentNodeId: string;

  @ValidateIf((o) => !o.groupId)
  @IsString()
  userId?: string;

  @ValidateIf((o) => !o.userId)
  @IsString()
  groupId?: string;
}
