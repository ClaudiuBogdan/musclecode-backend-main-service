import { Injectable } from '@nestjs/common';
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
import { PermissionResponseDto } from './dto';

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

@Injectable()
export class PermissionRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Create an explicit permission
   */
  async createExplicitPermission(
    data: Prisma.ExplicitPermissionCreateInput,
  ): Promise<PermissionResponseDto> {
    const permission = await this.prisma.explicitPermission.create({
      data,
    });
    return this.mapExplicitPermissionToDto(permission, 'explicit', false);
  }

  /**
   * Find explicit permission by ID
   */
  async findExplicitPermissionById(
    id: string,
  ): Promise<PermissionResponseDto | null> {
    const permission = await this.prisma.explicitPermission.findUnique({
      where: { id },
    });
    if (!permission) {
      return null;
    }
    return this.mapExplicitPermissionToDto(permission, 'explicit', false);
  }

  /**
   * Find explicit permissions for a content node (ADMIN USE - no inheritance)
   * Returns only direct explicit permissions on the specified node
   */
  async findExplicitPermissionsByContentNode(
    contentNodeId: string,
  ): Promise<PermissionResponseDto[]> {
    const permissions = await this.prisma.explicitPermission.findMany({
      where: {
        contentNodeId,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      orderBy: { createdAt: 'desc' },
    });

    return permissions.map((permission) =>
      this.mapExplicitPermissionToDto(permission, 'explicit', false),
    );
  }

  /**
   * Find explicit permissions for a user on a specific content node (no inheritance)
   * Used to check direct permissions only
   */
  async findExplicitPermissionsForUserOnNode(
    userId: string,
    contentNodeId: string,
  ): Promise<PermissionResponseDto[]> {
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
      this.mapExplicitPermissionToDto(permission, 'explicit', false),
    );
  }

  /**
   * Returns the single strongest ExplicitPermission (or the synthetic public VIEW)
   * according to the spec, using ONE optimized recursive query.
   */
  async findUserPermissionWithInheritance(
    userId: string,
    contentNodeId: string,
  ): Promise<PermissionResponseDto | null> {
    // Step 1: Get user's group memberships. (1st DB Call)
    const groupIds = (
      await this.prisma.groupMember.findMany({
        where: { userId },
        select: { groupId: true },
      })
    ).map((g) => g.groupId);

    // Define the shape of the full permission object we expect from the raw query
    type FullPermissionResult = ExplicitPermission & { sourceId?: 'PUBLIC' };

    // Step 2: Run the main recursive query. (2nd and FINAL DB Call for permissions)
    // This query now returns all necessary fields, not just the ID.
    const results = await this.prisma.$queryRawUnsafe<FullPermissionResult[]>(
      `
    -- This query finds the single highest-priority permission for a user on a content node,
    -- respecting the node hierarchy (inheritance) and public access rules.

    -- CTE 1: Find the target node and all its ancestors recursively.
    WITH RECURSIVE ancestors AS (
      SELECT id, 0 AS depth
      FROM "ContentNode"
      WHERE id = $1

      UNION ALL

      -- Recursively walk up the parent chain via 'DEPENDENCY' or 'EXTENDS' links.
      SELECT cl."fromId", a.depth + 1
      FROM "ContentLink" cl
      JOIN ancestors a ON a.id = cl."toId"
      WHERE cl."linkType" IN ('DEPENDENCY', 'EXTENDS') -- Ensure we only use hierarchical links
    ),
    -- CTE 2: Combine all possible permission sources (explicit and public) into one set.
    all_possible_permissions AS (
      -- Source A: Find the best explicit permission from the ancestor chain.
      SELECT
        ep.*, -- Select all columns from ExplicitPermission
        a.depth
      FROM ancestors a
      JOIN "ExplicitPermission" ep ON ep."contentNodeId" = a.id
      WHERE
        (ep."expiresAt" IS NULL OR ep."expiresAt" > now())
        AND (
          ep."userId" = $2
          OR ep."groupId" = ANY($3::uuid[])
        )
      -- Order by proximity (depth) first, then by permission strength.
      -- This single ORDER BY / LIMIT 1 is more efficient than using ROW_NUMBER().
      ORDER BY
        a.depth ASC,
        CASE ep."permissionLevel"
          WHEN 'OWNER'    THEN 1
          WHEN 'MANAGE'   THEN 2
          WHEN 'EDIT'     THEN 3
          WHEN 'INTERACT' THEN 4
          WHEN 'VIEW'     THEN 5
        END ASC
      LIMIT 1
    ),
    -- Source B: The public permission, if applicable.
    public_view AS (
      SELECT
        NULL AS id, -- Use NULL for synthetic permissions
        'VIEW'::"PermissionLevel" as "permissionLevel",
        -- Fill in other required fields with NULL or default values
        NULL as "contentNodeId", NULL as "userId", NULL as "groupId",
        NULL as "grantedBy", NULL as "expiresAt", NULL as "createdAt", NULL as "updatedAt"
      FROM "ContentNode"
      WHERE id = $1 AND "isPublic" IS TRUE
    )

    -- Final Selection: Prioritize the explicit permission over the public one.
    -- The LIMIT 1 ensures that if an explicit permission exists, the public one is ignored.
    SELECT * FROM all_possible_permissions
    UNION ALL
    SELECT * FROM public_view
    LIMIT 1;
    `,
      contentNodeId,
      userId,
      groupIds,
    );

    const bestPermission = results[0];

    if (!bestPermission) {
      return null; // No permission found
    }

    // Handle the synthetic public permission
    if (bestPermission.id === null) {
      return this.mapExplicitPermissionToDto(bestPermission, 'inherited', true);
    }

    // Because the query now returns a full ExplicitPermission object,
    // we can just return it. We still need to fetch relations if needed.
    // For maximum efficiency, those could also be joined in the SQL,
    // but this is a great balance of performance and code clarity.
    return this.mapExplicitPermissionToDto(bestPermission, 'explicit', false);
  }
  /**
   * Update an explicit permission
   */
  async updateExplicitPermission(
    id: string,
    data: Prisma.ExplicitPermissionUpdateInput,
  ): Promise<PermissionResponseDto> {
    const permission = await this.prisma.explicitPermission.update({
      where: { id },
      data,
    });
    return this.mapExplicitPermissionToDto(permission, 'explicit', false);
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
    isPublic: boolean,
  ): PermissionResponseDto {
    return {
      id: permission.id,
      type,
      isPublic,
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
