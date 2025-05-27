import {
  Controller,
  Post,
  Delete,
  Put,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { GroupService } from './group.service';
import {
  CreateGroupDto,
  UpdateGroupDto,
  AddGroupMemberDto,
  RemoveGroupMemberDto,
  UpdateGroupMemberDto,
  GroupResponseDto,
  GroupMemberResponseDto,
} from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

interface AuthenticatedRequest extends Request {
  user: { id: string; [key: string]: any };
}

@Controller('permissions/groups')
@UseGuards(AuthGuard)
@ApiTags('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new permission group',
  })
  async createGroup(
    @Body() dto: CreateGroupDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<GroupResponseDto> {
    return this.groupService.createGroup(dto, req.user.id);
  }

  @Get(':groupId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get group details',
  })
  async getGroup(
    @Param('groupId') groupId: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<GroupResponseDto> {
    return this.groupService.getGroup(groupId, req.user.id);
  }

  @Put(':groupId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update group details',
  })
  async updateGroup(
    @Param('groupId') groupId: string,
    @Body() dto: UpdateGroupDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<GroupResponseDto> {
    return this.groupService.updateGroup(groupId, dto, req.user.id);
  }

  @Delete(':groupId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a group',
  })
  async deleteGroup(
    @Param('groupId') groupId: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<void> {
    return this.groupService.deleteGroup(groupId, req.user.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get current user's groups (owned and member)",
  })
  async getUserGroups(@Request() req: AuthenticatedRequest): Promise<{
    ownedGroups: GroupResponseDto[];
    memberGroups: GroupResponseDto[];
  }> {
    return this.groupService.getUserGroups(req.user.id);
  }

  @Get('public/all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all public groups',
  })
  async getPublicGroups(): Promise<GroupResponseDto[]> {
    return this.groupService.getPublicGroups();
  }

  // ===== GROUP MEMBER MANAGEMENT ENDPOINTS =====

  @Post(':groupId/members')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Add member to group',
  })
  async addGroupMember(
    @Param('groupId') groupId: string,
    @Body() dto: AddGroupMemberDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<GroupMemberResponseDto> {
    return this.groupService.addGroupMember(groupId, dto, req.user.id);
  }

  @Delete(':groupId/members')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remove member from group',
  })
  async removeGroupMember(
    @Param('groupId') groupId: string,
    @Body() dto: RemoveGroupMemberDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<void> {
    return this.groupService.removeGroupMember(groupId, dto, req.user.id);
  }

  @Put(':groupId/members/:userId/role')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update group member role',
  })
  async updateGroupMemberRole(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
    @Body() dto: UpdateGroupMemberDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<GroupMemberResponseDto> {
    return this.groupService.updateGroupMemberRole(
      groupId,
      userId,
      dto,
      req.user.id,
    );
  }

  @Post(':groupId/join')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Join a public group',
  })
  async joinPublicGroup(
    @Param('groupId') groupId: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<GroupMemberResponseDto> {
    return this.groupService.joinPublicGroup(groupId, req.user.id);
  }
}
