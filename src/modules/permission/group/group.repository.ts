import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import {
  PermissionGroup,
  GroupMember,
  GroupRole,
  Prisma,
} from '@prisma/client';
import { GroupResponseDto, GroupMemberResponseDto } from './dto';

@Injectable()
export class GroupRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new permission group
   */
  async createPermissionGroup(
    data: Prisma.PermissionGroupCreateInput,
  ): Promise<GroupResponseDto> {
    const group = await this.prisma.permissionGroup.create({
      data,
      include: { members: true },
    });
    return this.mapGroupToDto(group);
  }

  /**
   * Find permission group by ID
   */
  async findPermissionGroupById(
    id: string,
    includeMembers = false,
  ): Promise<GroupResponseDto | null> {
    const group = await this.prisma.permissionGroup.findUnique({
      where: { id },
      include: { members: includeMembers },
    });
    if (!group) {
      return null;
    }
    return this.mapGroupToDto(group);
  }

  /**
   * Update permission group
   */
  async updatePermissionGroup(
    id: string,
    data: Prisma.PermissionGroupUpdateInput,
  ): Promise<GroupResponseDto> {
    const group = await this.prisma.permissionGroup.update({
      where: { id },
      data,
      include: { members: true },
    });
    return this.mapGroupToDto(group);
  }

  /**
   * Delete permission group
   */
  async deletePermissionGroup(id: string): Promise<void> {
    await this.prisma.permissionGroup.delete({
      where: { id },
    });
  }

  /**
   * Find groups owned by user
   */
  async findGroupsByOwner(ownerId: string): Promise<GroupResponseDto[]> {
    const groups = await this.prisma.permissionGroup.findMany({
      where: { ownerId },
      include: { members: true },
      orderBy: { createdAt: 'desc' },
    });
    return groups.map((group) => this.mapGroupToDto(group));
  }

  /**
   * Find groups where user is a member
   */
  async findGroupsByMember(userId: string): Promise<GroupResponseDto[]> {
    const memberships = await this.prisma.groupMember.findMany({
      where: { userId },
      include: {
        group: {
          include: { members: true },
        },
      },
      orderBy: { joinedAt: 'desc' },
    });
    return memberships.map((membership) =>
      this.mapGroupToDto(membership.group),
    );
  }

  /**
   * Find public groups
   */
  async findPublicGroups(): Promise<GroupResponseDto[]> {
    const groups = await this.prisma.permissionGroup.findMany({
      where: { isPublic: true },
      include: { members: true },
      orderBy: { createdAt: 'desc' },
    });
    return groups.map((group) => this.mapGroupToDto(group));
  }

  /**
   * Add member to group
   */
  async addGroupMember(
    groupId: string,
    userId: string,
    role: GroupRole = GroupRole.MEMBER,
  ): Promise<GroupMemberResponseDto> {
    const member = await this.prisma.groupMember.create({
      data: {
        groupId,
        userId,
        role,
      },
    });
    return this.mapGroupMemberToDto(member);
  }

  /**
   * Remove member from group
   */
  async removeGroupMember(groupId: string, userId: string): Promise<void> {
    await this.prisma.groupMember.delete({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
    });
  }

  /**
   * Update group member role
   */
  async updateGroupMemberRole(
    groupId: string,
    userId: string,
    role: GroupRole,
  ): Promise<GroupMemberResponseDto> {
    const member = await this.prisma.groupMember.update({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
      data: { role },
    });
    return this.mapGroupMemberToDto(member);
  }

  /**
   * Find group member
   */
  async findGroupMember(
    groupId: string,
    userId: string,
  ): Promise<GroupMemberResponseDto | null> {
    const member = await this.prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
    });
    if (!member) {
      return null;
    }
    return this.mapGroupMemberToDto(member);
  }

  /**
   * Check if user is group owner or admin
   */
  async isGroupOwnerOrAdmin(groupId: string, userId: string): Promise<boolean> {
    const group = await this.prisma.permissionGroup.findUnique({
      where: { id: groupId },
      select: { ownerId: true },
    });

    if (group?.ownerId === userId) {
      return true;
    }

    const member = await this.prisma.groupMember.findUnique({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
      select: { role: true },
    });

    return member?.role === GroupRole.ADMIN || member?.role === GroupRole.OWNER;
  }

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
   * Map PermissionGroup to DTO
   */
  private mapGroupToDto(
    group: PermissionGroup & { members?: GroupMember[] },
  ): GroupResponseDto {
    return {
      id: group.id,
      name: group.name,
      description: group.description || undefined,
      ownerId: group.ownerId,
      isPublic: group.isPublic,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
      members: group.members?.map((member) => this.mapGroupMemberToDto(member)),
    };
  }

  /**
   * Map GroupMember to DTO
   */
  private mapGroupMemberToDto(member: GroupMember): GroupMemberResponseDto {
    return {
      id: member.id,
      userId: member.userId,
      role: member.role,
      joinedAt: member.joinedAt,
    };
  }
}
