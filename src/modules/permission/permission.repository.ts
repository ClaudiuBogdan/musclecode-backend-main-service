import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import {
  ExplicitPermission,
  ContentNode,
  PermissionGroup,
  GroupMember,
  PermissionLevel,
  Prisma,
  LinkType,
} from '@prisma/client';
import { PermissionDto } from './dto';
import { isUUID } from 'src/fn/uuid';

export interface ContentNodeWithLinks extends ContentNode {
  outgoingLinks: Array<{
    id: string;
    toId: string;
    linkType: LinkType;
    to: ContentNode;
  }>;
  incomingLinks: Array<{
    id: string;
    fromId: string;
    linkType: LinkType;
    from: ContentNode;
  }>;
}

// Helper type for the raw SQL query result.
type RawPermissionResult = ExplicitPermission & {
  depth: number;
  priority: number;
};

@Injectable()
export class PermissionRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Create an explicit permission
   */
  async createExplicitPermission(
    data: Prisma.ExplicitPermissionCreateInput,
  ): Promise<PermissionDto> {
    const permission = await this.prisma.explicitPermission.create({
      data,
    });
    return this.mapExplicitPermissionToDto(permission, 'explicit');
  }

  /**
   * Find explicit permission by ID
   */
  async findExplicitPermissionById(id: string): Promise<PermissionDto | null> {
    const permission = await this.prisma.explicitPermission.findUnique({
      where: { id },
    });
    if (!permission) {
      return null;
    }
    return this.mapExplicitPermissionToDto(permission, 'explicit');
  }

  /**
   * Find explicit permissions for a content node (ADMIN USE - no inheritance)
   * Returns only direct explicit permissions on the specified node
   */
  async findExplicitPermissionsByContentNode(
    contentNodeId: string,
  ): Promise<PermissionDto[]> {
    const permissions = await this.prisma.explicitPermission.findMany({
      where: {
        contentNodeId,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      orderBy: { createdAt: 'desc' },
    });

    return permissions.map((permission) =>
      this.mapExplicitPermissionToDto(permission, 'explicit'),
    );
  }

  /**
   * Find explicit permissions for a user on a specific content node (no inheritance)
   * Used to check direct permissions only
   */
  async findExplicitPermissionsForUserOnNode(
    userId: string,
    contentNodeId: string,
  ): Promise<PermissionDto[]> {
    // Get user's group memberships
    const userGroups = await this.prisma.groupMember.findMany({
      where: { userId },
      select: { groupId: true },
    });

    const groupIds = userGroups.map((membership) => membership.groupId);

    const permissions = await this.prisma.explicitPermission.findMany({
      where: {
        contentNodeId,
        OR: [{ userId }, { groupId: { in: groupIds } }],
        AND: [
          {
            OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });

    return permissions.map((permission) =>
      this.mapExplicitPermissionToDto(permission, 'explicit'),
    );
  }

  /**
   * Returns the single strongest explicit permission (direct or inherited)
   * for a user on a given content node using a single, optimized recursive query.
   * This version does NOT check for public access.
   */
  async findUserPermissionWithInheritance(
    userId: string,
    contentNodeId: string,
  ): Promise<PermissionDto | null> {
    if (!isUUID(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    if (!isUUID(contentNodeId)) {
      throw new BadRequestException('Invalid content node ID');
    }

    // Step 1: Fetch the user's group memberships.
    const groupIds = (
      await this.prisma.groupMember.findMany({
        where: { userId },
        select: { groupId: true },
      })
    ).map((g) => g.groupId);

    // Define the link types that allow permission inheritance.
    const inheritanceLinkTypes: LinkType[] = [
      LinkType.DEPENDENCY,
      LinkType.EXTENDS,
    ];

    // Step 2: Execute the recursive query to find the highest-priority explicit permission.
    const results = await this.prisma.$queryRaw<RawPermissionResult[]>`
      -- This query finds the single highest-priority EXPLICIT permission for a user on a content node,
      -- respecting the node hierarchy (inheritance). It ignores public permissions.
      WITH RECURSIVE ancestors AS (
        -- CTE 1: Find the target node and all its ancestors recursively.
        SELECT id, 0 AS depth
          FROM "ContentNode"
         WHERE id = ${contentNodeId}
        UNION ALL
        SELECT cl."fromId", anc.depth + 1
          FROM "ContentLink" cl
          JOIN ancestors anc ON cl."toId" = anc.id
         WHERE cl."linkType"::text = ANY(${inheritanceLinkTypes})
      )
      -- Final Selection: Find all permissions on the ancestor chain and select the best one.
      SELECT
        ep.*,
        anc.depth
      FROM ancestors anc
      JOIN "ExplicitPermission" ep
        ON ep."contentNodeId" = anc.id
      WHERE
        -- Filter for active permissions relevant to the user or their groups.
        (ep."expiresAt" IS NULL OR ep."expiresAt" > NOW())
        AND (
          ep."userId" = ${userId}
          OR ep."groupId" = ANY(${groupIds})
        )
      -- The ranking is key:
      -- 1. Order by "depth" to prioritize permissions closer to the target node.
      -- 2. Order by "permissionLevel" enum order to get the strongest permission at a given depth.
      ORDER BY
        anc.depth ASC,
        CASE ep."permissionLevel"
          WHEN 'OWNER'    THEN 1
          WHEN 'MANAGE'   THEN 2
          WHEN 'EDIT'     THEN 3
          WHEN 'INTERACT' THEN 4
          WHEN 'VIEW'     THEN 5
        END ASC
      -- We only need the single best permission.
      LIMIT 1;
    `;

    // Step 3: Map the result to a DTO or return null if no permission was found.
    if (results.length === 0) {
      return null;
    }

    const bestPermission = results[0];

    return {
      id: bestPermission.id,
      // 'depth > 0' means it came from a parent node.
      type: bestPermission.depth > 0 ? 'inherited' : 'explicit',
      contentNodeId: bestPermission.contentNodeId,
      userId: bestPermission.userId ?? undefined,
      groupId: bestPermission.groupId ?? undefined,
      permissionLevel: bestPermission.permissionLevel,
      grantedBy: bestPermission.grantedBy,
      expiresAt: bestPermission.expiresAt ?? undefined,
      createdAt: bestPermission.createdAt,
      updatedAt: bestPermission.updatedAt,
    };
  }

  /**
   * Update an explicit permission
   */
  async updateExplicitPermission(
    id: string,
    data: Prisma.ExplicitPermissionUpdateInput,
  ): Promise<PermissionDto> {
    const permission = await this.prisma.explicitPermission.update({
      where: { id },
      data,
    });
    return this.mapExplicitPermissionToDto(permission, 'explicit');
  }

  /**
   * Delete explicit permissions
   */
  async deleteExplicitPermissions(where: {
    contentNodeId: string;
    userId?: string;
    groupId?: string;
  }): Promise<number> {
    const result = await this.prisma.explicitPermission.deleteMany({
      where,
    });
    return result.count;
  }

  // ===== CONTENT NODE AND HIERARCHY METHODS =====

  /**
   * Find content node with its links
   */
  async findContentNodeWithLinks(
    id: string,
  ): Promise<ContentNodeWithLinks | null> {
    return this.prisma.contentNode.findUnique({
      where: { id },
      include: {
        outgoingLinks: {
          include: { to: true },
        },
        incomingLinks: {
          include: { from: true },
        },
      },
    });
  }

  /**
   * Find all parent nodes for a given content node
   */
  async findParentNodes(contentNodeId: string): Promise<ContentNode[]> {
    const node = await this.prisma.contentNode.findUnique({
      where: { id: contentNodeId },
      include: {
        incomingLinks: {
          where: {
            linkType: { in: [LinkType.DEPENDENCY, LinkType.EXTENDS] },
          },
          include: { from: true },
        },
      },
    });

    return node?.incomingLinks.map((link) => link.from) || [];
  }

  /**
   * Check if content node exists
   */
  async findContentNodeById(id: string): Promise<ContentNode | null> {
    return this.prisma.contentNode.findUnique({
      where: { id },
    });
  }

  // ===== GROUP AND USER METHODS =====

  /**
   * Find permission group with members
   */
  async findPermissionGroupWithMembers(
    groupId: string,
  ): Promise<(PermissionGroup & { members: GroupMember[] }) | null> {
    return this.prisma.permissionGroup.findUnique({
      where: { id: groupId },
      include: { members: true },
    });
  }

  /**
   * Find user's group memberships
   */
  async findUserGroupMemberships(userId: string): Promise<GroupMember[]> {
    return this.prisma.groupMember.findMany({
      where: { userId },
      include: { group: true },
    });
  }

  /**
   * Get highest permission level from a list of permissions
   */
  getHighestPermissionLevel(
    permissions: ExplicitPermission[],
  ): PermissionLevel | null {
    if (permissions.length === 0) return null;

    const highestRank = (level: PermissionLevel): number => {
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

    return permissions.reduce<PermissionLevel | null>(
      (best, p) =>
        !best || highestRank(p.permissionLevel) > highestRank(best)
          ? p.permissionLevel
          : best,
      null,
    );
  }

  /**
   * Map ExplicitPermission to DTO
   */
  private mapExplicitPermissionToDto(
    permission: ExplicitPermission,
    type: 'explicit' | 'inherited',
  ): PermissionDto {
    return {
      id: permission.id,
      type,
      contentNodeId: permission.contentNodeId,
      userId: permission.userId || undefined,
      groupId: permission.groupId || undefined,
      permissionLevel: permission.permissionLevel,
      grantedBy: permission.grantedBy,
      expiresAt: permission.expiresAt || undefined,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
    };
  }
}
