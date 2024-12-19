import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import {
  AlgorithmTemplate,
  AlgorithmUserData,
  DailyAlgorithm,
  AlgorithmUserProgress,
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
  async findUserData(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmUserData | null> {
    return this.algorithmRepository.findUserData(userId, algorithmId);
  }

  async createUserData(
    userId: string,
    algorithmId: string,
    notes?: string,
  ): Promise<AlgorithmUserData> {
    // Verify that the algorithm exists
    const template =
      await this.algorithmRepository.findTemplateById(algorithmId);
    if (!template) {
      throw new NotFoundException(
        `Algorithm template with ID ${algorithmId} not found`,
      );
    }
    return this.algorithmRepository.createUserData(userId, algorithmId, notes);
  }

  async updateUserData(id: string, notes: string): Promise<AlgorithmUserData> {
    return this.algorithmRepository.updateUserData(id, notes);
  }

  // Daily algorithm operations
  async findDailyAlgorithms(
    userId: string,
    date: Date = new Date(),
  ): Promise<DailyAlgorithm[]> {
    return this.algorithmRepository.findDailyAlgorithms(userId, date);
  }

  async createDailyAlgorithm(
    userId: string,
    algorithmId: string,
    date: Date = new Date(),
  ): Promise<DailyAlgorithm> {
    // Verify that the algorithm exists
    const template =
      await this.algorithmRepository.findTemplateById(algorithmId);
    if (!template) {
      throw new NotFoundException(
        `Algorithm template with ID ${algorithmId} not found`,
      );
    }
    return this.algorithmRepository.createDailyAlgorithm(
      userId,
      algorithmId,
      date,
    );
  }

  async markDailyAlgorithmCompleted(id: string): Promise<DailyAlgorithm> {
    return this.algorithmRepository.markDailyAlgorithmCompleted(id);
  }

  // Submission operations
  async createSubmission(
    submission: Omit<AlgorithmSubmission, 'id' | 'createdAt'>,
  ): Promise<AlgorithmSubmission> {
    // Verify that the algorithm exists
    const template = await this.algorithmRepository.findTemplateById(
      submission.algorithmId,
    );
    if (!template) {
      throw new NotFoundException(
        `Algorithm template with ID ${submission.algorithmId} not found`,
      );
    }
    return this.algorithmRepository.createSubmission(submission);
  }

  async findUserSubmissions(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmSubmission[]> {
    return this.algorithmRepository.findUserSubmissions(userId, algorithmId);
  }

  // Combined data operations
  async findUserProgress(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmUserProgress> {
    const progress = await this.algorithmRepository.findUserProgress(
      userId,
      algorithmId,
    );
    if (!progress) {
      throw new NotFoundException(
        `Algorithm template with ID ${algorithmId} not found`,
      );
    }
    return progress;
  }
}
