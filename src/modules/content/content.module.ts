import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentRepository } from './content.repository';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { ContentController } from './content.controller';
import { AgentsService } from '../chat/services/agents.service';
import { PermissionModule } from '../permission/permission.module';
import { InteractionService } from './services/interaction.service';
import { LessonInteractionService } from './services/lesson-interaction.service';

@Module({
  imports: [PermissionModule],
  controllers: [ContentController],
  providers: [
    PrismaService,
    ContentService,
    ContentRepository,
    AgentsService,
    LessonInteractionService,
    InteractionService,
  ],
  exports: [ContentService, InteractionService],
})
export class ContentModule {}
