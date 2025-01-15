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
import { SchedulerService } from 'src/modules/scheduler/services/scheduler.service';
import { Rating } from 'src/modules/scheduler/types/scheduler.types';

@Injectable()
export class AlgorithmService implements OnModuleInit {
  constructor(
    private readonly algorithmRepository: AlgorithmRepository,
    private readonly schedulerService: SchedulerService,
  ) {}

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
    let userData = await this.algorithmRepository.findAlgorithmPracticeData(
      userId,
      algorithmId,
    );

    if (!userData) {
      userData = await this.createPracticeData(userId, algorithmId);
    }

    const ratingSchedule = {
      again: this.schedulerService.schedule(
        userData?.scheduleData,
        Rating.Again,
      ).interval,
      hard: this.schedulerService.schedule(userData?.scheduleData, Rating.Hard)
        .interval,
      good: this.schedulerService.schedule(userData?.scheduleData, Rating.Good)
        .interval,
      easy: this.schedulerService.schedule(userData?.scheduleData, Rating.Easy)
        .interval,
    };

    userData.ratingSchedule = ratingSchedule;

    const dailyAlgorithms = await this.findDailyAlgorithms(userId);
    const dailyAlgorithm =
      dailyAlgorithms.find(
        (algorithm) =>
          algorithm.algorithmPreview.id === userData.algorithmTemplate.id,
      ) || null;

    const findNextAlgorithm = () => {
      const algorithmIndex = dailyAlgorithm
        ? dailyAlgorithms.findIndex(
            (algorithm) => algorithm.id === dailyAlgorithm.id,
          )
        : -1;

      for (let i = 1; i < dailyAlgorithms.length; i++) {
        const nextIndex = (algorithmIndex + i) % dailyAlgorithms.length;
        const isCompleted = dailyAlgorithms[nextIndex].completed;
        if (nextIndex !== algorithmIndex && !isCompleted) {
          return dailyAlgorithms[nextIndex].algorithmPreview;
        }
      }

      return null;
    };

    userData.nextAlgorithm = findNextAlgorithm();
    userData.dailyAlgorithm = dailyAlgorithm;

    return userData;
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

    // Check if we already have daily algorithms for this date
    let dailyAlgorithms = await this.algorithmRepository.findDailyAlgorithms(
      userId,
      startOfDay,
    );

    // If no daily algorithms exist for this date, create them
    if (dailyAlgorithms.length === 0) {
      const totalDailyAlgorithms = 5;

      // First, get the due algorithms for today
      const dueAlgorithms = await this.algorithmRepository.findDueAlgorithms(
        userId,
        startOfDay,
        endOfDay,
      );

      // Get all algorithms to fill the remaining slots
      const allAlgorithms = await this.algorithmRepository.findAllTemplates();

      // Filter out algorithms that are already due today
      const availableAlgorithms = allAlgorithms.filter(
        (algorithm) =>
          !dueAlgorithms.some(
            (due) => due.algorithmTemplate.id === algorithm.id,
          ),
      );

      // Calculate how many more algorithms we need
      const remainingCount = Math.max(
        0,
        totalDailyAlgorithms - dueAlgorithms.length,
      );

      // Randomly select algorithms to fill the remaining slots
      const selectedAlgorithms = [
        ...dueAlgorithms.map((data) => data.algorithmTemplate),
        ...availableAlgorithms
          .sort(() => Math.random() - 0.5)
          .slice(0, remainingCount),
      ];

      // Create daily algorithms for the user
      dailyAlgorithms = await this.algorithmRepository.createDailyAlgorithms(
        userId,
        selectedAlgorithms,
        startOfDay,
      );
    }

    return dailyAlgorithms;
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

    // Mark the daily algorithm as completed
    await this.algorithmRepository.markDailyAlgorithmAsCompleted(
      userId,
      algorithmId,
      new Date(),
    );

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
