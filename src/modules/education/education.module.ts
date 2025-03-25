import { Module } from '@nestjs/common';
import { EducationController } from './controllers/education.controller';
import { EducationService } from './services/education.service';
import { CourseGenerationAgent } from './agents/course-generation.agent';
import { ContentResearchAgent } from './agents/content-research.agent';
import { LessonGenerationAgent } from './agents/lesson-generation.agent';
import { AlgorithmCollectionGenerationAgent } from './agents/algorithm-collection-generation.agent';
import { AlgorithmGenerationAgent } from './agents/algorithm-generation.agent';
import { AlgorithmEducationService } from './services/algorithm-education.service';
import { AlgorithmEducationController } from './controllers/algorithm-education.controller';

@Module({
  controllers: [EducationController, AlgorithmEducationController],
  providers: [
    EducationService,
    CourseGenerationAgent,
    ContentResearchAgent,
    LessonGenerationAgent,
    AlgorithmCollectionGenerationAgent,
    AlgorithmGenerationAgent,
    AlgorithmEducationService,
  ],
  exports: [EducationService, AlgorithmEducationService],
})
export class EducationModule {}
