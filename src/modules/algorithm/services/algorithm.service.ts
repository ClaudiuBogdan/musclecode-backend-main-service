import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import {
  AlgorithmTemplate,
  AlgorithmPracticeData,
  AlgorithmSubmission,
  DailyAlgorithm,
} from '../interfaces/algorithm.interface';
import { CreateAlgorithmDto } from '../dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from '../dto/update-algorithm.dto';
import { AlgorithmRepository } from '../repositories/algorithm.repository';

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
    return this.algorithmRepository.deleteTemplate(id);
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

  async createPracticeData(
    userId: string,
    algorithmId: string,
    notes?: string,
  ): Promise<AlgorithmPracticeData> {
    return this.algorithmRepository.createAlgorithmPracticeData(
      userId,
      algorithmId,
      notes,
    );
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

  async findDailyAlgorithms(
    userId: string,
    date: Date = new Date(),
  ): Promise<DailyAlgorithm[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const totalDailyAlgorithms = 5;

    const dueAlgorithms = await this.algorithmRepository.findDueAlgorithms(
      userId,
      startOfDay,
      endOfDay,
    );

    // Calculate the number of algorithms to add
    const remainingAlgorithms = totalDailyAlgorithms - dueAlgorithms.length;

    // Get all algorithms
    const algorithms = await this.algorithmRepository.findAllTemplates();

    // Get the algorithms that are not due
    const newAlgorithms = algorithms.filter(
      (algorithm) =>
        !dueAlgorithms.some((due) => due.algorithmTemplate.id === algorithm.id),
    );

    // Get the algorithms that are not due
    const algorithmsToAdd = newAlgorithms.slice(0, remainingAlgorithms);

    // Create user algorithms
    const userAlgorithms = await this.algorithmRepository.createUserAlgorithms(
      userId,
      algorithmsToAdd,
    );

    // Add the user algorithms to the due algorithms
    const allAlgorithms = [...dueAlgorithms, ...userAlgorithms];

    return allAlgorithms.map((userData: AlgorithmPracticeData) => ({
      id: userData.id,
      date: userData.due,
      completed: userData.due > endOfDay,
      createdAt: userData.algorithmTemplate.createdAt,
      algorithmPreview: {
        id: userData.algorithmTemplate.id,
        title: userData.algorithmTemplate.title,
        category: userData.algorithmTemplate.category,
        summary: userData.algorithmTemplate.summary,
        difficulty: userData.algorithmTemplate.difficulty,
        tags: userData.algorithmTemplate.tags,
      },
    }));
  }

  async createSubmission(
    userId: string,
    algorithmId: string,
    submission: Omit<
      AlgorithmSubmission,
      'id' | 'createdAt' | 'algorithmId' | 'algorithmUserDataId'
    >,
  ): Promise<AlgorithmSubmission> {
    let userData = await this.findPracticeData(userId, algorithmId);

    if (!userData) {
      userData = await this.createPracticeData(userId, algorithmId);
    }

    if (!userData) {
      throw new Error('Failed to create or find algorithm practice data');
    }

    return this.algorithmRepository.createSubmission(
      {
        ...submission,
        algorithmId,
        algorithmUserDataId: userData.id,
      },
      userId,
    );
  }

  async findUserSubmissions(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmSubmission[]> {
    return this.algorithmRepository.findUserSubmissions(userId, algorithmId);
  }
}
