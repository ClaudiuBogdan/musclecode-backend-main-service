import { PermissionLevel } from '@prisma/client';

export class PermissionDto {
  id: string;
  type: 'explicit' | 'inherited';
  contentNodeId: string;
  userId?: string;
  groupId?: string;
  permissionLevel: PermissionLevel;
  grantedBy: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class PermissionSharingDto {
  contentNodeId: string;
  isPublic: boolean;
  defaultPermission: PermissionLevel;
}
