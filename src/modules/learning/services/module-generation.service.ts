import { Injectable, Logger } from '@nestjs/common';
import {
  ModuleGenerationAgent,
  GenerateModuleDto,
} from '../agents/module-generation.agent';
import { LearningRepository } from '../repositories/learning.repository';

@Injectable()
export class ModuleGenerationService {
  private readonly logger = new Logger(ModuleGenerationService.name);

  constructor(
    private moduleGenerationAgent: ModuleGenerationAgent,
    private learningRepository: LearningRepository,
  ) {}

  /**
   * Generate a module with lessons and exercises from a user prompt
   */
  async generateModuleFromPrompt(dto: GenerateModuleDto) {
    try {
      // Generate the module structure using the agent
      this.logger.log(`Generating module structure for prompt: ${dto.prompt}`);
      const moduleStructure =
        await this.moduleGenerationAgent.generateModuleStructure(dto);

      // Store the generated structure in the database
      this.logger.log(`Storing module with title: ${moduleStructure.title}`);
      const result = await this.learningRepository.createModule(
        dto.userId,
        moduleStructure,
      );

      return {
        id: result.module.id,
        title: moduleStructure.title,
        description: moduleStructure.description,
        lessons: moduleStructure.lessons,
      };
    } catch (error) {
      this.logger.error(
        `Error generating module: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Get a module with all its content (lessons, exercises)
   */
  async getModuleWithContent(moduleId: string) {
    try {
      return await this.learningRepository.getModuleWithContent(moduleId);
    } catch (error) {
      this.logger.error(
        `Error retrieving module: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
