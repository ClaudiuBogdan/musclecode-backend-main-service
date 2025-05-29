import { PermissionLevel } from '@prisma/client';

export class PermissionDto {
  id: string;
  type: 'explicit' | 'inherited';
  contentNodeId: string;
  userId?: string;
  groupId?: string;
  permissionLevel: PermissionLevel;
  grantedBy: string | null;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class PermissionSharingDto {
  contentNodeId: string;
  isPublic: boolean;
  defaultPermission: PermissionLevel;
}

export class PermissionSharingWithUsersDto extends PermissionSharingDto {
  users: {
    id: string;
    name: string;
    email: string;
    permissionId: string;
    permissionLevel: PermissionLevel;
  }[];
}
