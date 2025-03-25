import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GenerateAlgorithmCollectionDto } from '../dto/generate-algorithm-collection.dto';
import {
  AlgorithmCollectionOutline,
  GeneratedAlgorithmTemplate,
} from '../interfaces/algorithm-collection.interface';
import { AlgorithmCollectionGenerationAgent } from '../agents/algorithm-collection-generation.agent';
import { AlgorithmGenerationAgent } from '../agents/algorithm-generation.agent';

@Injectable()
export class AlgorithmEducationService {
  private readonly logger = new Logger(AlgorithmEducationService.name);

  constructor(
    private readonly algorithmCollectionAgent: AlgorithmCollectionGenerationAgent,
    private readonly algorithmGenerationAgent: AlgorithmGenerationAgent,
  ) {}

  /**
   * Generates a collection outline with algorithm challenges
   */
  async generateCollectionOutline(
    dto: GenerateAlgorithmCollectionDto,
  ): Promise<AlgorithmCollectionOutline> {
    try {
      this.logger.log(
        `Generating algorithm collection outline for topic: ${dto.topic}`,
      );
      return await this.algorithmCollectionAgent.generateCollectionOutline(dto);
    } catch (error) {
      this.logger.error(
        `Failed to generate algorithm collection outline: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Generates a complete algorithm template for a collection item
   */
  async generateAlgorithmTemplate(
    collectionOutline: AlgorithmCollectionOutline,
    algorithmIndex: number,
    language: string,
  ): Promise<GeneratedAlgorithmTemplate> {
    try {
      if (
        algorithmIndex < 0 ||
        algorithmIndex >= collectionOutline.algorithms.length
      ) {
        throw new Error(
          `Algorithm index ${algorithmIndex} out of bounds for collection with ${collectionOutline.algorithms.length} algorithms`,
        );
      }

      const algorithmPreview = collectionOutline.algorithms[algorithmIndex];
      this.logger.log(
        `Generating algorithm template for: ${algorithmPreview.title}`,
      );

      const generatedTemplate =
        await this.algorithmGenerationAgent.generateAlgorithmTemplate(
          algorithmPreview,
          language,
        );

      // Add unique ID
      return {
        ...generatedTemplate,
        id: uuidv4(),
      };
    } catch (error) {
      this.logger.error(
        `Failed to generate algorithm template: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Generates all algorithm templates for a collection
   */
  async generateFullCollection(
    collectionOutline: AlgorithmCollectionOutline,
    language: string,
  ): Promise<GeneratedAlgorithmTemplate[]> {
    this.logger.log(
      `Starting full collection generation for: ${collectionOutline.name}`,
    );

    const generatedAlgorithms: GeneratedAlgorithmTemplate[] = [];

    for (let i = 0; i < collectionOutline.algorithms.length; i++) {
      try {
        const algorithm = await this.generateAlgorithmTemplate(
          collectionOutline,
          i,
          language,
        );

        generatedAlgorithms.push(algorithm);
        this.logger.log(
          `Generated algorithm ${i + 1}/${collectionOutline.algorithms.length}: ${algorithm.title}`,
        );
      } catch (error) {
        this.logger.error(
          `Error generating algorithm ${i + 1}: ${error.message}`,
          error.stack,
        );
        // Continue with other algorithms even if one fails
      }
    }

    this.logger.log(
      `Completed collection generation with ${generatedAlgorithms.length} algorithms`,
    );
    return generatedAlgorithms;
  }

  /**
   * Converts generated algorithm templates to PrismaDB format for storage
   */
  convertToDatabaseFormat(
    generatedAlgorithms: GeneratedAlgorithmTemplate[],
    collectionName: string,
    collectionDescription: string,
  ): {
    collection: {
      name: string;
      description: string;
    };
    algorithms: {
      id: string;
      title: string;
      categories: string[];
      summary: string;
      lessons: unknown;
      difficulty: string;
      level?: number;
      tags: string[];
      files: unknown;
    }[];
  } {
    const collection = {
      name: collectionName,
      description: collectionDescription,
    };

    const algorithms = generatedAlgorithms.map((algorithm) => ({
      id: algorithm.id || uuidv4(),
      title: algorithm.title,
      categories: algorithm.categories,
      summary: algorithm.summary,
      lessons: algorithm.lessons,
      difficulty: algorithm.difficulty,
      level: algorithm.level,
      tags: algorithm.tags,
      files: algorithm.files,
    }));

    return { collection, algorithms };
  }
}
