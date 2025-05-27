import { Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionRepository } from './permission.repository';

@Module({
  imports: [],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository, PrismaService],
  exports: [PermissionService, PermissionRepository],
})
export class PermissionModule {}
