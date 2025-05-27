import { Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionRepository } from './permission.repository';
import { GroupModule } from './group/group.module';

@Module({
  imports: [GroupModule],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository, PrismaService],
  exports: [PermissionService, PermissionRepository, GroupModule],
})
export class PermissionModule {}
