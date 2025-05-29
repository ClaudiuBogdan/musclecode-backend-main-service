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
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PermissionService } from './permission.service';
import {
  GrantPermissionDto,
  RevokePermissionDto,
  UpdatePermissionDto,
  PermissionDto,
  PermissionSharingDto,
  UpdateContentNodeSharingDto,
} from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

interface AuthenticatedRequest extends Request {
  user: { id: string; [key: string]: any };
}

@Controller('api/v1/permissions')
@UseGuards(AuthGuard)
@ApiTags('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('grant')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Grant permission to a user or group on a content node',
  })
  async grantPermission(
    @Body() dto: GrantPermissionDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<PermissionDto> {
    return this.permissionService.grantPermission(dto, req.user.id);
  }

  @Delete('revoke')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Revoke permission from a user or group on a content node',
  })
  async revokePermission(
    @Body() dto: RevokePermissionDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<{ deletedCount: number }> {
    return this.permissionService.revokePermission(dto, req.user.id);
  }

  @Patch('content-node/:contentNodeId/sharing')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update the sharing settings for a content node',
  })
  async updateContentNodeSharing(
    @Param('contentNodeId') contentNodeId: string,
    @Body() dto: UpdateContentNodeSharingDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<PermissionSharingDto> {
    return this.permissionService.updateContentNodeSharing(
      contentNodeId,
      dto,
      req.user.id,
    );
  }

  @Put(':permissionId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update an existing permission',
  })
  async updatePermission(
    @Param('permissionId') permissionId: string,
    @Body() dto: UpdatePermissionDto,
    @Request() req: AuthenticatedRequest,
  ): Promise<PermissionDto> {
    return this.permissionService.updatePermission(
      permissionId,
      dto,
      req.user.id,
    );
  }

  @Get('content-node/:contentNodeId/all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all explicit permissions for a content node',
  })
  async getContentNodePermissions(
    @Param('contentNodeId') contentNodeId: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<{
    contentNodeId: string;
    permissions: PermissionDto[];
    sharing: PermissionSharingDto;
  }> {
    return this.permissionService.getContentNodePermissions(
      contentNodeId,
      req.user.id,
    );
  }

  @Get('content-node/:contentNodeId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Get current user's permission for a content node",
  })
  async getUserPermissionForContentNode(
    @Param('contentNodeId') contentNodeId: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<PermissionDto | null> {
    return this.permissionService.getUserPermissionForContentNode(
      req.user.id,
      contentNodeId,
    );
  }
}
