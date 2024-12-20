import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import {
  AlgorithmTemplate,
  AlgorithmPracticeData,
  DailyAlgorithm,
  AlgorithmSubmission,
} from '../interfaces/algorithm.interface';
import { AlgorithmRepository } from '../repositories/algorithm.repository';
import { CreateAlgorithmDto } from '../dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from '../dto/update-algorithm.dto';

@Injectable()
export class AlgorithmService implements OnModuleInit {
  constructor(private readonly algorithmRepository: AlgorithmRepository) {}

  async onModuleInit() {
    await this.algorithmRepository.seed();
  }

  // Algorithm Template operations
  async findAllTemplates(): Promise<AlgorithmTemplate[]> {
    return this.algorithmRepository.findAllTemplates();
  }

  async findTemplateById(id: string): Promise<AlgorithmTemplate> {
    const template = await this.algorithmRepository.findTemplateById(id);
    if (!template) {
      throw new NotFoundException(`Algorithm template with ID ${id} not found`);
    }
    return template;
  }

  async createTemplate(
    createAlgorithmDto: CreateAlgorithmDto,
  ): Promise<AlgorithmTemplate> {
    return this.algorithmRepository.createTemplate(createAlgorithmDto);
  }

  async updateTemplate(
    id: string,
    updateAlgorithmDto: UpdateAlgorithmDto,
  ): Promise<AlgorithmTemplate> {
    const template = await this.algorithmRepository.findTemplateById(id);
    if (!template) {
      throw new NotFoundException(`Algorithm template with ID ${id} not found`);
    }
    return this.algorithmRepository.updateTemplate(id, updateAlgorithmDto);
  }

  async deleteTemplate(id: string): Promise<void> {
    const template = await this.algorithmRepository.findTemplateById(id);
    if (!template) {
      throw new NotFoundException(`Algorithm template with ID ${id} not found`);
    }
    await this.algorithmRepository.deleteTemplate(id);
  }

  // User-specific algorithm data operations
  async findPracticeData(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmPracticeData | null> {
    return this.algorithmRepository.findAlgorithmPracticeData(
      userId,
      algorithmId,
    );
  }

  // Daily algorithm operations
  async findDailyAlgorithms(
    userId: string,
    date: Date = new Date(),
  ): Promise<DailyAlgorithm[]> {
    const algorithms = await this.algorithmRepository.findAllTemplates();

    const dailyAlgorithms = algorithms.map((algorithm) => ({
      id: algorithm.id,
      date: date,
      completed: false,
      createdAt: algorithm.createdAt,
      algorithmPreview: {
        id: algorithm.id,
        title: algorithm.title,
        category: algorithm.category,
        summary: algorithm.summary,
        difficulty: algorithm.difficulty,
        tags: algorithm.tags,
      },
    }));

    return dailyAlgorithms;
  }

  // Submission operations
  async createSubmission(
    submission: Omit<AlgorithmSubmission, 'id' | 'createdAt'>,
    userId: string,
  ): Promise<AlgorithmSubmission> {
    return this.algorithmRepository.createSubmission(submission, userId);
  }

  async findUserSubmissions(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmSubmission[]> {
    return this.algorithmRepository.findUserSubmissions(userId, algorithmId);
  }

  async updateAlgorithmNotes(
    userId: string,
    algorithmId: string,
    notes?: string,
  ): Promise<void> {
    return this.algorithmRepository.updateAlgorithmNotes(
      userId,
      algorithmId,
      notes,
    );
  }
}
