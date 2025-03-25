import { Module } from '@nestjs/common';
import { CourseGenerationAgent } from './agents/course-generation.agent';
import { ContentResearchAgent } from './agents/content-research.agent';
import { LessonGenerationAgent } from './agents/lesson-generation.agent';
import { ModuleGenerationController as CreateController } from './controllers/create.controller';

@Module({
  controllers: [CreateController],
  providers: [
    CourseGenerationAgent,
    ContentResearchAgent,
    LessonGenerationAgent,
  ],
  exports: [],
})
export class LearningModule {}
