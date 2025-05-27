import { Module } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupRepository } from './group.repository';

@Module({
  imports: [],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository, PrismaService],
  exports: [GroupService, GroupRepository],
})
export class GroupModule {}
