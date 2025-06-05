import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PermissionLevel } from '@prisma/client';
import { PermissionRepository } from './permission.repository';
import { KeycloakDatabaseService } from '../auth/services/keycloak-database.service';
import {
  GrantPermissionDto,
  RevokePermissionDto,
  UpdatePermissionDto,
  PermissionDto,
  PermissionSharingDto,
  UpdateContentNodeSharingDto,
  PermissionSharingWithUsersDto,
} from './dto';

@Injectable()
export class PermissionService {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly keycloakDatabaseService: KeycloakDatabaseService,
  ) {}

  /**
   * Grant permission to a user or group on a content node (ADMIN OPERATION)
   */
  async grantPermission(
    dto: GrantPermissionDto,
    grantedBy: string | null,
  ): Promise<PermissionDto> {
    // Validate that either userId or groupId is provided
    if (!dto.userId && !dto.groupId) {
      throw new BadRequestException(
        'Either userId or groupId must be provided',
      );
    }

    if (dto.userId && dto.groupId) {
      throw new BadRequestException('Cannot specify both userId and groupId');
    }

    // Check if the content node exists
    const contentNode = await this.permissionRepository.findContentNodeById(
      dto.contentNodeId,
    );
    if (!contentNode) {
      throw new NotFoundException('Content node not found');
    }

    // Check if granting user has MANAGE permission on the content node
    if (grantedBy !== null) {
      await this.checkUserPermission(
        grantedBy,
        dto.contentNodeId,
        PermissionLevel.MANAGE,
      );
    }

    // Check if group exists (if groupId is provided)
    if (dto.groupId) {
      const group =
        await this.permissionRepository.findPermissionGroupWithMembers(
          dto.groupId,
        );
      if (!group) {
        throw new NotFoundException('Permission group not found');
      }
    }

    // Create explicit permission
    const explicitPermission =
      await this.permissionRepository.createExplicitPermission({
        contentNode: {
          connect: {
            id: dto.contentNodeId,
          },
        },
        userId: dto.userId,
        group: dto.groupId
          ? {
              connect: {
                id: dto.groupId,
              },
            }
          : undefined,
        permissionLevel: dto.permissionLevel,
        grantedBy,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
      });

    return explicitPermission;
  }

  /**
   * Revoke permission from a user or group on a content node (ADMIN OPERATION)
   */
  async revokePermission(
    dto: RevokePermissionDto,
    revokedBy: string,
  ): Promise<{ deletedCount: number }> {
    // Validate that either userId or groupId is provided
    if (!dto.userId && !dto.groupId) {
      throw new BadRequestException(
        'Either userId or groupId must be provided',
      );
    }

    // Check if revoking user has MANAGE permission on the content node
    await this.checkUserPermission(
      revokedBy,
      dto.contentNodeId,
      PermissionLevel.MANAGE,
    );

    // Delete explicit permissions
    const deletedCount =
      await this.permissionRepository.deleteExplicitPermissions({
        contentNodeId: dto.contentNodeId,
        userId: dto.userId,
        groupId: dto.groupId,
      });

    if (deletedCount === 0) {
      throw new NotFoundException('No permissions found to revoke');
    }

    return { deletedCount };
  }

  /**
   * Update an existing permission (ADMIN OPERATION)
   */
  async updatePermission(
    permissionId: string,
    dto: UpdatePermissionDto,
    updatedBy: string,
  ): Promise<PermissionDto> {
    // Find the existing permission
    const existingPermission =
      await this.permissionRepository.findExplicitPermissionById(permissionId);
    if (!existingPermission) {
      throw new NotFoundException('Permission not found');
    }

    // Check if updating user has MANAGE permission on the content node
    await this.checkUserPermission(
      updatedBy,
      existingPermission.contentNodeId,
      PermissionLevel.MANAGE,
    );

    // Update the permission
    const updatedPermission =
      await this.permissionRepository.updateExplicitPermission(permissionId, {
        permissionLevel: dto.permissionLevel,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
        updatedAt: new Date(),
      });

    return updatedPermission;
  }

  async updateContentNodeSharing(
    contentNodeId: string,
    dto: UpdateContentNodeSharingDto,
    updatedBy: string,
  ): Promise<PermissionSharingDto> {
    // Check if content node exists
    const contentNode =
      await this.permissionRepository.findContentNodeById(contentNodeId);
    if (!contentNode) {
      throw new NotFoundException('Content node not found');
    }

    // Check if updating user has MANAGE permission on the content node
    await this.checkUserPermission(
      updatedBy,
      contentNodeId,
      PermissionLevel.MANAGE,
    );

    // Update the content node sharing
    const updatedContentNode =
      await this.permissionRepository.updateContentNodeSharing(contentNodeId, {
        isPublic: dto.isPublic,
        defaultPermission: dto.defaultPermission,
      });

    return {
      contentNodeId,
      isPublic: updatedContentNode.isPublic,
      defaultPermission: updatedContentNode.defaultPermission,
    };
  }

  /**
   * Get all explicit permissions for a content node (ADMIN OPERATION)
   * Returns only direct explicit permissions, no inheritance
   */
  async getContentNodePermissions(
    contentNodeId: string,
    requestedBy: string,
  ): Promise<{
    contentNodeId: string;
    permissions: PermissionDto[];
    sharing: PermissionSharingWithUsersDto;
  }> {
    // Check if requesting user has MANAGE permission on the content node
    await this.checkUserPermission(
      requestedBy,
      contentNodeId,
      PermissionLevel.MANAGE,
    );

    // Check if content node exists
    const [contentNode, permissions] = await Promise.all([
      this.permissionRepository.findContentNodeById(contentNodeId),
      this.permissionRepository.findExplicitPermissionsByContentNode(
        contentNodeId,
      ),
    ]);

    if (!contentNode) {
      throw new NotFoundException('Content node not found');
    }

    // Extract unique user IDs from permissions
    const userIds = permissions
      .filter((permission) => permission.userId)
      .map((permission) => permission.userId!);

    // Fetch user data from Keycloak database or fallback to user IDs
    const users = await this.enrichUsersWithKeycloakData(userIds, permissions);

    return {
      contentNodeId,
      permissions,
      sharing: {
        contentNodeId,
        isPublic: contentNode.isPublic,
        defaultPermission: contentNode.defaultPermission,
        users,
      },
    };
  }

  // ===== USER OPERATIONS =====

  /**
   * Get user's permission for a content node (USER OPERATION)
   * Checks explicit permissions first, then looks at parent nodes for inheritance
   * Returns null if no permissions found
   */
  async getUserPermissionForContentNode(
    userId: string,
    contentNodeId: string,
  ): Promise<PermissionDto | null> {
    // Check if content node exists
    const contentNode =
      await this.permissionRepository.findContentNodeById(contentNodeId);
    if (!contentNode) {
      throw new NotFoundException('Content node not found');
    }

    // Calculate user permission with inheritance
    const permission =
      await this.permissionRepository.findUserPermissionWithInheritance(
        userId,
        contentNodeId,
      );
    if (!permission) {
      return null;
    }

    return permission;
  }

  async checkUserPermission(
    userId: string,
    contentNodeId: string,
    permissionLevel: PermissionLevel,
  ): Promise<boolean> {
    const permission =
      await this.permissionRepository.findUserPermissionWithInheritance(
        userId,
        contentNodeId,
      );

    if (!permission) {
      return false;
    }

    const getPermissionScore = (level: PermissionLevel): number => {
      return (
        {
          [PermissionLevel.OWNER]: 5,
          [PermissionLevel.MANAGE]: 4,
          [PermissionLevel.EDIT]: 3,
          [PermissionLevel.INTERACT]: 2,
          [PermissionLevel.VIEW]: 1,
        } as const
      )[level];
    };

    const userPermissionScore = getPermissionScore(permission.permissionLevel);
    const requiredPermissionScore = getPermissionScore(permissionLevel);

    if (
      userPermissionScore === undefined ||
      requiredPermissionScore === undefined
    ) {
      throw new NotFoundException('Permission not found');
    }

    return userPermissionScore >= requiredPermissionScore;
  }
  // ===== HELPER METHODS =====

  /**
   * Enrich user data with information from Keycloak database or fallback to user IDs
   */
  private async enrichUsersWithKeycloakData(
    userIds: string[],
    permissions: PermissionDto[],
  ): Promise<
    {
      id: string;
      name: string;
      email: string;
      permissionId: string;
      permissionLevel: PermissionLevel;
    }[]
  > {
    // Try to fetch user data from Keycloak database
    const userMap = await this.keycloakDatabaseService.getUsersByIds(userIds);

    // Map permissions to users with enriched data
    return permissions
      .filter((permission) => permission.userId)
      .map((permission) => {
        const userId = permission.userId!;
        const keycloakUser = userMap.get(userId);

        return {
          id: userId,
          name: keycloakUser?.name || userId,
          email: keycloakUser?.email || userId,
          permissionId: permission.id,
          permissionLevel: permission.permissionLevel,
        };
      });
  }
}
