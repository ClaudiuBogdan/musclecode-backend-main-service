import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentRepository } from './content.repository';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { ContentController } from './content.controller';
import { AgentsService } from '../chat/services/agents.service';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [PermissionModule],
  controllers: [ContentController],
  providers: [ContentService, ContentRepository, PrismaService, AgentsService],
  exports: [ContentService],
})
export class ContentModule {}
