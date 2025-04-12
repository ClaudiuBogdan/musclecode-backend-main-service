import { Module } from '@nestjs/common';
import { ContentResearchAgent } from './agents/content-research.agent';
import { ModuleGenerationAgent } from './agents/module-generation.agent';
import { ModuleGenerationController } from './controllers/create.controller';
import { LearningRepository } from './repositories/learning.repository';
import { ModuleGenerationService } from './services/module-generation.service';
import { PrismaService } from '../../infrastructure/database/prisma.service';

@Module({
  controllers: [ModuleGenerationController],
  providers: [
    // Agents
    ContentResearchAgent,
    ModuleGenerationAgent,

    // Services
    ModuleGenerationService,

    // Repositories
    LearningRepository,
    PrismaService,
  ],
  exports: [ModuleGenerationService],
})
export class LearningModule {}
