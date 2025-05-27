import { PermissionLevel } from '@prisma/client';

export class PermissionResponseDto {
  id: string;
  type: 'explicit' | 'inherited';
  isPublic: boolean;
  contentNodeId: string;
  userId?: string;
  groupId?: string;
  permissionLevel: PermissionLevel;
  grantedBy: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
