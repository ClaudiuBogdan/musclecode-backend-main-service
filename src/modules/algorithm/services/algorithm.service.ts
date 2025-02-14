import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { StructuredLogger } from 'src/common/logger/structured-logger';
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
  private readonly logger = new StructuredLogger(AlgorithmService.name);
  constructor(
    private readonly algorithmRepository: AlgorithmRepository,
    private readonly schedulerService: SchedulerService,
  ) {}

  async onModuleInit() {
    this.logger.log('AlgorithmRepositorySeedingStarted', {});
    await this.algorithmRepository.seed();
    this.logger.log('AlgorithmRepositorySeedingCompleted', {});
  }

  // Algorithm Template operations
  async findAllTemplates(): Promise<AlgorithmTemplate[]> {
    this.logger.log('FindAllTemplatesStarted', {});
    const templates = await this.algorithmRepository.findAllTemplates();
    this.logger.log('FindAllTemplatesCompleted', { count: templates.length });
    return templates;
  }

  async findTemplateById(id: string): Promise<AlgorithmTemplate> {
    this.logger.log('FindAlgorithmTemplateByIdStarted', { templateId: id });
    const template = await this.algorithmRepository.findTemplateById(id);
    if (!template) {
      this.logger.warn('AlgorithmTemplateNotFound', { templateId: id });
      throw new NotFoundException(`Algorithm template with ID ${id} not found`);
    }
    this.logger.log('AlgorithmTemplateFound', { templateId: id });
    return template;
  }

  async createTemplate(
    createAlgorithmDto: CreateAlgorithmDto,
  ): Promise<AlgorithmTemplate> {
    this.logger.log('AlgorithmTemplateCreationStarted', {});
    const template =
      await this.algorithmRepository.createTemplate(createAlgorithmDto);
    this.logger.log('AlgorithmTemplateCreated', { templateId: template.id });
    return template;
  }

  async updateTemplate(
    id: string,
    updateAlgorithmDto: UpdateAlgorithmDto,
  ): Promise<AlgorithmTemplate> {
    this.logger.log('AlgorithmTemplateUpdateStarted', { templateId: id });
    const template = await this.algorithmRepository.findTemplateById(id);
    if (!template) {
      this.logger.warn('AlgorithmTemplateNotFound', { templateId: id });
      throw new NotFoundException(`Algorithm template with ID ${id} not found`);
    }
    const updatedTemplate = await this.algorithmRepository.updateTemplate(
      id,
      updateAlgorithmDto,
    );
    this.logger.log('AlgorithmTemplateUpdated', { templateId: id });
    return updatedTemplate;
  }

  async deleteTemplate(id: string): Promise<void> {
    this.logger.log('AlgorithmTemplateDeletionStarted', { templateId: id });
    const template = await this.algorithmRepository.findTemplateById(id);
    if (!template) {
      this.logger.warn('AlgorithmTemplateNotFound', { templateId: id });
      throw new NotFoundException(`Algorithm template with ID ${id} not found`);
    }
    await this.algorithmRepository.deleteTemplate(id);
    this.logger.log('AlgorithmTemplateDeleted', { templateId: id });
  }

  // User-specific algorithm data operations
  async findPracticeData(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmPracticeData | null> {
    this.logger.log('FindPracticeDataStarted', { userId, algorithmId });
    let userData = await this.algorithmRepository.findAlgorithmPracticeData(
      userId,
      algorithmId,
    );
    if (!userData) {
      this.logger.log('PracticeDataNotFound', { userId, algorithmId });
      userData = await this.createPracticeData(userId, algorithmId);
      this.logger.log('AlgorithmPracticeDataCreatedViaFind', {
        userId,
        algorithmId,
        practiceDataId: userData.id,
      });
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

    this.logger.log('ReviewingDailyAlgorithm', { userId, algorithmId });
    const dailyAlgorithms = await this.findDailyAlgorithms(userId);
    const dailyAlgorithm =
      dailyAlgorithms.find(
        (algorithm) =>
          algorithm.algorithmPreview.id === userData.algorithmTemplate.id,
      ) || null;
    userData.dailyAlgorithm = dailyAlgorithm;

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
    this.logger.log('FindPracticeDataCompleted', { userId, algorithmId });
    return userData;
  }

  async createPracticeData(
    userId: string,
    algorithmId: string,
    notes?: string,
  ): Promise<AlgorithmPracticeData> {
    this.logger.log('AlgorithmPracticeDataCreationStarted', {
      userId,
      algorithmId,
    });
    const practiceData =
      await this.algorithmRepository.createAlgorithmPracticeData(
        userId,
        algorithmId,
        notes,
      );
    this.logger.log('AlgorithmPracticeDataCreated', {
      practiceDataId: practiceData.id,
      userId,
      algorithmId,
    });
    return practiceData;
  }

  async updateAlgorithmNotes(
    userId: string,
    algorithmId: string,
    notes?: string,
  ): Promise<void> {
    this.logger.log('AlgorithmNotesUpdateStarted', { userId, algorithmId });
    await this.algorithmRepository.updateAlgorithmNotes(
      userId,
      algorithmId,
      notes,
    );
    this.logger.log('AlgorithmNotesUpdated', { userId, algorithmId });
  }

  async findDailyAlgorithms(
    userId: string,
    date: Date = new Date(),
  ): Promise<DailyAlgorithm[]> {
    this.logger.log('FindDailyAlgorithmsStarted', {
      userId,
      date: date.toISOString(),
    });
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    let dailyAlgorithms = await this.algorithmRepository.findDailyAlgorithms(
      userId,
      startOfDay,
    );

    if (dailyAlgorithms.length === 0) {
      this.logger.log('NoDailyAlgorithmsFound', {
        userId,
        date: date.toISOString(),
      });
      const totalDailyAlgorithms = 5;
      const dueAlgorithms = await this.algorithmRepository.findDueAlgorithms(
        userId,
        startOfDay,
        endOfDay,
      );
      const allAlgorithms = await this.algorithmRepository.findAllTemplates();
      const availableAlgorithms = allAlgorithms.filter(
        (algorithm) =>
          !dueAlgorithms.some(
            (due) => due.algorithmTemplate.id === algorithm.id,
          ),
      );
      const remainingCount = Math.max(
        0,
        totalDailyAlgorithms - dueAlgorithms.length,
      );
      const selectedAlgorithms = [
        ...dueAlgorithms.map((data) => data.algorithmTemplate),
        ...availableAlgorithms
          .sort(() => Math.random() - 0.5)
          .slice(0, remainingCount),
      ];

      dailyAlgorithms = await this.algorithmRepository.createDailyAlgorithms(
        userId,
        selectedAlgorithms,
        startOfDay,
      );
      this.logger.log('DailyAlgorithmsCreated', {
        userId,
        count: dailyAlgorithms.length,
      });
    } else {
      this.logger.log('DailyAlgorithmsFound', {
        userId,
        count: dailyAlgorithms.length,
      });
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
    this.logger.log('AlgorithmSubmissionCreationStarted', {
      userId,
      algorithmId,
    });
    let userData = await this.findPracticeData(userId, algorithmId);
    if (!userData) {
      this.logger.log('AlgorithmPracticeDataMissingDuringSubmission', {
        userId,
        algorithmId,
      });
      userData = await this.createPracticeData(userId, algorithmId);
    }
    await this.algorithmRepository.markDailyAlgorithmAsCompleted(
      userId,
      algorithmId,
      new Date(),
    );
    this.logger.log('DailyAlgorithmMarkedCompleted', { userId, algorithmId });
    const createdSubmission = await this.algorithmRepository.createSubmission(
      {
        ...submission,
        algorithmId,
        algorithmUserDataId: userData.id,
      },
      userId,
    );
    this.logger.log('AlgorithmSubmissionCreated', {
      userId,
      algorithmId,
      submissionId: createdSubmission.id,
    });
    return createdSubmission;
  }

  async findUserSubmissions(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmSubmission[]> {
    this.logger.log('FindUserSubmissionsStarted', { userId, algorithmId });
    const submissions = await this.algorithmRepository.findUserSubmissions(
      userId,
      algorithmId,
    );
    this.logger.log('FindUserSubmissionsCompleted', {
      userId,
      algorithmId,
      count: submissions.length,
    });
    return submissions;
  }
}
