import { Module } from '@nestjs/common';
import { EducationController } from './controllers/education.controller';
import { EducationService } from './services/education.service';
import { CourseGenerationAgent } from './agents/course-generation.agent';
import { ContentResearchAgent } from './agents/content-research.agent';
import { LessonGenerationAgent } from './agents/lesson-generation.agent';

@Module({
  controllers: [EducationController],
  providers: [
    EducationService,
    CourseGenerationAgent,
    ContentResearchAgent,
    LessonGenerationAgent,
  ],
  exports: [EducationService],
})
export class EducationModule {}
