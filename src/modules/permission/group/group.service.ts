import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { GroupRole } from '@prisma/client';
import { GroupRepository } from './group.repository';
import {
  CreateGroupDto,
  UpdateGroupDto,
  AddGroupMemberDto,
  RemoveGroupMemberDto,
  UpdateGroupMemberDto,
  GroupResponseDto,
  GroupMemberResponseDto,
} from './dto';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  /**
   * Create a new permission group
   */
  async createGroup(
    dto: CreateGroupDto,
    ownerId: string,
  ): Promise<GroupResponseDto> {
    const group = await this.groupRepository.createPermissionGroup({
      name: dto.name,
      description: dto.description,
      ownerId,
      isPublic: dto.isPublic || false,
    });

    return group;
  }

  /**
   * Get group details
   */
  async getGroup(
    groupId: string,
    requestedBy: string,
  ): Promise<GroupResponseDto> {
    const group = await this.groupRepository.findPermissionGroupById(
      groupId,
      true,
    );
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    // Check if user has access to view the group
    // Owner, members, or public groups can be viewed
    if (
      group.ownerId !== requestedBy &&
      !group.isPublic &&
      !group.members?.some((member) => member.userId === requestedBy)
    ) {
      throw new ForbiddenException('You do not have access to this group');
    }

    return group;
  }

  /**
   * Update group details
   */
  async updateGroup(
    groupId: string,
    dto: UpdateGroupDto,
    updatedBy: string,
  ): Promise<GroupResponseDto> {
    // Check if user has permission to update the group
    await this.validateGroupOwnerOrAdmin(groupId, updatedBy);

    const group = await this.groupRepository.updatePermissionGroup(groupId, {
      name: dto.name,
      description: dto.description,
      isPublic: dto.isPublic,
      updatedAt: new Date(),
    });

    return group;
  }

  /**
   * Delete a group
   */
  async deleteGroup(groupId: string, deletedBy: string): Promise<void> {
    const group = await this.groupRepository.findPermissionGroupById(groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    // Only group owner can delete the group
    if (group.ownerId !== deletedBy) {
      throw new ForbiddenException('Only group owner can delete the group');
    }

    await this.groupRepository.deletePermissionGroup(groupId);
  }

  /**
   * Get user's groups (owned and member)
   */
  async getUserGroups(userId: string): Promise<{
    ownedGroups: GroupResponseDto[];
    memberGroups: GroupResponseDto[];
  }> {
    const [ownedGroups, memberGroups] = await Promise.all([
      this.groupRepository.findGroupsByOwner(userId),
      this.groupRepository.findGroupsByMember(userId),
    ]);

    return {
      ownedGroups,
      memberGroups,
    };
  }

  /**
   * Get public groups
   */
  async getPublicGroups(): Promise<GroupResponseDto[]> {
    return this.groupRepository.findPublicGroups();
  }

  /**
   * Add member to group
   */
  async addGroupMember(
    groupId: string,
    dto: AddGroupMemberDto,
    addedBy: string,
  ): Promise<GroupMemberResponseDto> {
    const group = await this.groupRepository.findPermissionGroupById(groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    // For public groups, anyone can join as MEMBER
    // For private groups, only owner/admin can add members
    if (!group.isPublic) {
      await this.validateGroupOwnerOrAdmin(groupId, addedBy);
    } else if (dto.role && dto.role !== GroupRole.MEMBER) {
      // Only owner/admin can assign roles other than MEMBER in public groups
      await this.validateGroupOwnerOrAdmin(groupId, addedBy);
    }

    // Check if user is already a member
    const existingMember = await this.groupRepository.findGroupMember(
      groupId,
      dto.userId,
    );
    if (existingMember) {
      throw new ConflictException('User is already a member of this group');
    }

    const member = await this.groupRepository.addGroupMember(
      groupId,
      dto.userId,
      dto.role || GroupRole.MEMBER,
    );

    return member;
  }

  /**
   * Remove member from group
   */
  async removeGroupMember(
    groupId: string,
    dto: RemoveGroupMemberDto,
    removedBy: string,
  ): Promise<void> {
    const group = await this.groupRepository.findPermissionGroupById(groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    // Check if member exists
    const member = await this.groupRepository.findGroupMember(
      groupId,
      dto.userId,
    );
    if (!member) {
      throw new NotFoundException('User is not a member of this group');
    }

    // Owner/admin can remove any member, or user can remove themselves
    if (
      dto.userId !== removedBy &&
      !(await this.groupRepository.isGroupOwnerOrAdmin(groupId, removedBy))
    ) {
      throw new ForbiddenException(
        'You can only remove yourself or you must be an owner/admin',
      );
    }

    // Cannot remove the group owner
    if (group.ownerId === dto.userId) {
      throw new BadRequestException('Cannot remove the group owner');
    }

    await this.groupRepository.removeGroupMember(groupId, dto.userId);
  }

  /**
   * Update group member role
   */
  async updateGroupMemberRole(
    groupId: string,
    userId: string,
    dto: UpdateGroupMemberDto,
    updatedBy: string,
  ): Promise<GroupMemberResponseDto> {
    const group = await this.groupRepository.findPermissionGroupById(groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    // Check if member exists
    const member = await this.groupRepository.findGroupMember(groupId, userId);
    if (!member) {
      throw new NotFoundException('User is not a member of this group');
    }

    // Only owner/admin can update roles
    await this.validateGroupOwnerOrAdmin(groupId, updatedBy);

    // Cannot change the group owner's role
    if (group.ownerId === userId) {
      throw new BadRequestException("Cannot change the group owner's role");
    }

    const updatedMember = await this.groupRepository.updateGroupMemberRole(
      groupId,
      userId,
      dto.role,
    );

    return updatedMember;
  }

  /**
   * Join a public group
   */
  async joinPublicGroup(
    groupId: string,
    userId: string,
  ): Promise<GroupMemberResponseDto> {
    const group = await this.groupRepository.findPermissionGroupById(groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (!group.isPublic) {
      throw new ForbiddenException('This group is not public');
    }

    // Check if user is already a member
    const existingMember = await this.groupRepository.findGroupMember(
      groupId,
      userId,
    );
    if (existingMember) {
      throw new ConflictException('You are already a member of this group');
    }

    const member = await this.groupRepository.addGroupMember(
      groupId,
      userId,
      GroupRole.MEMBER,
    );

    return member;
  }

  // ===== HELPER METHODS =====

  /**
   * Validate that a user is group owner or admin
   */
  private async validateGroupOwnerOrAdmin(
    groupId: string,
    userId: string,
  ): Promise<void> {
    const isOwnerOrAdmin = await this.groupRepository.isGroupOwnerOrAdmin(
      groupId,
      userId,
    );
    if (!isOwnerOrAdmin) {
      throw new ForbiddenException(
        'You must be the group owner or admin to perform this action',
      );
    }
  }
}
