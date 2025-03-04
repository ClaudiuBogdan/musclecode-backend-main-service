import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { SchedulerService } from '../../scheduler/services/scheduler.service';
import {
  AlgorithmTemplate,
  AlgorithmPracticeData,
  AlgorithmSubmission,
  CodeLanguage,
  AlgorithmRating,
  AlgorithmPreview,
  AlgorithmDifficulty,
  DailyAlgorithm,
  AlgorithmFile,
} from '../interfaces/algorithm.interface';
import { CreateAlgorithmDto } from '../dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from '../dto/update-algorithm.dto';
import { IAlgorithmRepository } from '../interfaces/algorithm-repository.interface';
import { Prisma } from '@prisma/client';
import { Rating } from '../../scheduler/types/scheduler.types';
import { StructuredLogger } from '../../../logger/structured-logger.service';
import { deserializeScheduleData, serializeScheduleData } from './utils';
import { loadAlgorithmTemplates } from '../seed/algorithm-loader.util';

@Injectable()
export class AlgorithmRepository implements IAlgorithmRepository {
  private readonly logger = new StructuredLogger(AlgorithmRepository.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly schedulerService: SchedulerService,
  ) {}

  async seed(): Promise<void> {
    this.logger.log('SeedStarted', {});
    const algorithms = await this.prisma.algorithmTemplate.findMany();

    if (algorithms.length > 0) {
      this.logger.log('SeedSkipped', { count: algorithms.length });
      return;
    }

    const newAlgorithms = loadAlgorithmTemplates()
      .map((algorithm: AlgorithmTemplate) => ({
        ...algorithm,
        files: JSON.stringify(algorithm.files),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
      .sort((a, b) => (a.level ?? Infinity) - (b.level ?? Infinity));

    await this.prisma.algorithmTemplate.createMany({
      data: newAlgorithms,
    });
    this.logger.log('SeedCompleted', { seededCount: newAlgorithms.length });
  }

  // Algorithm Template operations
  async findAllTemplates(): Promise<AlgorithmTemplate[]> {
    this.logger.log('findAllTemplatesStarted', {});
    const templates = await this.prisma.algorithmTemplate.findMany();
    this.logger.log('findAllTemplatesCompleted', { count: templates.length });
    return templates.map((template) => this.mapTemplateFromDb(template));
  }

  async findTemplateById(id: string): Promise<AlgorithmTemplate | null> {
    this.logger.log('findTemplateByIdStarted', { id });
    const template = await this.prisma.algorithmTemplate.findUnique({
      where: { id },
    });
    if (!template) {
      this.logger.warn('findTemplateByIdNotFound', { id });
      return null;
    }
    this.logger.log('findTemplateByIdCompleted', { id });
    return this.mapTemplateFromDb(template);
  }

  async createTemplate(
    createAlgorithmDto: CreateAlgorithmDto,
  ): Promise<AlgorithmTemplate> {
    this.logger.log('createTemplateStarted', { createAlgorithmDto });
    const template = await this.prisma.algorithmTemplate.create({
      data: {
        title: createAlgorithmDto.title,
        categories: Array.isArray(createAlgorithmDto.categories)
          ? createAlgorithmDto.categories
          : [createAlgorithmDto.categories],
        summary: createAlgorithmDto.summary,
        description: createAlgorithmDto.description,
        difficulty: createAlgorithmDto.difficulty,
        tags: createAlgorithmDto.tags,
        files: JSON.stringify(createAlgorithmDto.files),
      },
    });
    const mappedTemplate = this.mapTemplateFromDb(template);
    this.logger.log('createTemplateCompleted', {
      templateId: mappedTemplate.id,
    });
    return mappedTemplate;
  }

  async updateTemplate(
    id: string,
    updateAlgorithmDto: UpdateAlgorithmDto,
  ): Promise<AlgorithmTemplate> {
    this.logger.log('updateTemplateStarted', {
      id,
      update: updateAlgorithmDto,
    });
    const template = await this.prisma.algorithmTemplate.update({
      where: { id },
      data: {
        title: updateAlgorithmDto.title,
        categories: updateAlgorithmDto.categories
          ? Array.isArray(updateAlgorithmDto.categories)
            ? updateAlgorithmDto.categories
            : [updateAlgorithmDto.categories]
          : undefined,
        summary: updateAlgorithmDto.summary,
        description: updateAlgorithmDto.description,
        difficulty: updateAlgorithmDto.difficulty,
        tags: updateAlgorithmDto.tags,
        files: updateAlgorithmDto.files
          ? JSON.stringify(updateAlgorithmDto.files)
          : undefined,
      },
    });
    const mappedTemplate = this.mapTemplateFromDb(template);
    this.logger.log('updateTemplateCompleted', { id });
    return mappedTemplate;
  }

  async deleteTemplate(id: string): Promise<void> {
    this.logger.log('deleteTemplateStarted', { id });
    await this.prisma.algorithmTemplate.delete({
      where: { id },
    });
    this.logger.log('deleteTemplateCompleted', { id });
  }

  // User-specific algorithm data operations
  async findAlgorithmPracticeData(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmPracticeData | null> {
    this.logger.log('findAlgorithmPracticeDataStarted', {
      userId,
      algorithmId,
    });
    const userData = await this.prisma.algorithmUserData.findUnique({
      where: {
        userId_algorithmId: {
          userId,
          algorithmId,
        },
      },
      include: {
        algorithm: true,
        submissions: true,
      },
    });
    if (!userData) {
      this.logger.log('findAlgorithmPracticeDataNotFound', {
        userId,
        algorithmId,
      });
      return null;
    }
    this.logger.log('findAlgorithmPracticeDataCompleted', {
      userId,
      algorithmId,
    });
    return {
      ...this.mapUserDataFromDb(userData),
      submissions: this.mapSubmissionsFromDb(userData.submissions).sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      ),
    };
  }

  async createAlgorithmPracticeData(
    userId: string,
    algorithmId: string,
    notes?: string,
  ): Promise<AlgorithmPracticeData> {
    this.logger.log('createAlgorithmPracticeDataStarted', {
      userId,
      algorithmId,
      notes,
    });
    const algorithm = await this.prisma.algorithmTemplate.findUnique({
      where: { id: algorithmId },
    });
    if (!algorithm) {
      const error = `Algorithm with id ${algorithmId} not found.`;
      this.logger.error('createAlgorithmPracticeDataError', error);
      throw new NotFoundException(error);
    }

    const initialScheduleState = this.schedulerService.getInitialState(
      Rating.Good,
    );
    const userData = await this.prisma.algorithmUserData.create({
      data: {
        userId,
        algorithmId,
        notes,
        due: initialScheduleState.due,
        scheduleData: serializeScheduleData(initialScheduleState),
      },
      include: {
        algorithm: true,
      },
    });
    const mappedUserData = this.mapUserDataFromDb(userData);
    this.logger.log('createAlgorithmPracticeDataCompleted', {
      userDataId: mappedUserData.id,
    });
    return mappedUserData;
  }

  async createUserAlgorithms(
    userId: string,
    algorithms: AlgorithmTemplate[],
  ): Promise<AlgorithmPracticeData[]> {
    this.logger.log('createUserAlgorithmsStarted', {
      userId,
      count: algorithms.length,
    });
    await this.prisma.algorithmUserData.createMany({
      data: algorithms.map((algorithm) => ({
        userId,
        algorithmId: algorithm.id,
        scheduleData: serializeScheduleData(
          this.schedulerService.getInitialState(Rating.Good),
        ),
      })),
    });

    const createdAlgorithms = await this.prisma.algorithmUserData.findMany({
      where: {
        algorithmId: {
          in: algorithms.map((algorithm) => algorithm.id),
        },
      },
      include: {
        algorithm: true,
      },
    });
    const mapped = createdAlgorithms.map((userData) =>
      this.mapUserDataFromDb(userData),
    );
    this.logger.log('createUserAlgorithmsCompleted', {
      createdCount: mapped.length,
    });
    return mapped;
  }

  async updateAlgorithmNotes(
    userId: string,
    algorithmId: string,
    notes?: string,
  ): Promise<void> {
    this.logger.log('updateAlgorithmNotesStarted', { userId, algorithmId });
    await this.prisma.algorithmUserData.update({
      where: { userId_algorithmId: { userId, algorithmId } },
      data: { notes },
    });
    this.logger.log('updateAlgorithmNotesCompleted', { userId, algorithmId });
  }

  async updateUserData(
    id: string,
    notes: string,
  ): Promise<AlgorithmPracticeData> {
    this.logger.log('updateUserDataStarted', { id, notes });
    const userData = await this.prisma.algorithmUserData.update({
      where: { id },
      data: { notes },
      include: {
        algorithm: true,
      },
    });
    const mapped = this.mapUserDataFromDb(userData);
    this.logger.log('updateUserDataCompleted', { id });
    return mapped;
  }

  // Submission operations
  async createSubmission(
    submission: Omit<AlgorithmSubmission, 'id' | 'createdAt'>,
    userId: string,
  ): Promise<AlgorithmSubmission> {
    this.logger.log('createSubmissionStarted', {
      userId,
      algorithmId: submission.algorithmId,
    });
    const userData = await this.updateSchedule(
      userId,
      submission.algorithmId,
      submission.rating,
    );

    const created = await this.prisma.submission.create({
      data: {
        userId,
        algorithmId: submission.algorithmId,
        algorithmUserDataId: submission.algorithmUserDataId,
        code: submission.code,
        language: submission.language,
        timeSpent: submission.timeSpent,
        notes: submission.notes,
        difficulty: submission.rating,
        scheduleData: serializeScheduleData(userData.scheduleData),
      },
    });
    const mappedSubmission = this.mapSubmissionFromDb(created);
    this.logger.log('createSubmissionCompleted', {
      userId,
      algorithmId: submission.algorithmId,
      submissionId: mappedSubmission.id,
    });
    return mappedSubmission;
  }

  async findUserSubmissions(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmSubmission[]> {
    this.logger.log('findUserSubmissionsStarted', { userId, algorithmId });
    const submissions = await this.prisma.submission.findMany({
      where: {
        userId,
        algorithmId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const mapped = submissions.map((submission) =>
      this.mapSubmissionFromDb(submission),
    );
    this.logger.log('findUserSubmissionsCompleted', {
      userId,
      algorithmId,
      count: mapped.length,
    });
    return mapped;
  }

  async updateSchedule(
    userId: string,
    algorithmId: string,
    rating: AlgorithmRating,
  ): Promise<AlgorithmPracticeData> {
    this.logger.log('updateScheduleStarted', { userId, algorithmId, rating });
    const userData = await this.prisma.algorithmUserData.findUnique({
      where: {
        userId_algorithmId: {
          userId,
          algorithmId,
        },
      },
      include: {
        algorithm: true,
      },
    });

    if (!userData) {
      const error = 'User algorithm data not found';
      this.logger.error('updateScheduleError', error);
      throw new Error(error);
    }

    const currentState = deserializeScheduleData(userData.scheduleData);
    const newSchedule = this.schedulerService.schedule(
      currentState,
      this.mapRatingToFSRS(rating),
    );

    const updatedUserData = await this.prisma.algorithmUserData.update({
      where: {
        userId_algorithmId: {
          userId,
          algorithmId,
        },
      },
      data: {
        due: newSchedule.nextDue,
        scheduleData: serializeScheduleData(newSchedule.state),
      },
      include: {
        algorithm: true,
      },
    });
    const mapped = this.mapUserDataFromDb(updatedUserData);
    this.logger.log('updateScheduleCompleted', { userId, algorithmId });
    return mapped;
  }

  async findDueAlgorithms(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<AlgorithmPracticeData[]> {
    this.logger.log('findDueAlgorithmsStarted', {
      userId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
    const dueAlgorithms = await this.prisma.algorithmUserData.findMany({
      where: {
        userId,
        due: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        algorithm: true,
      },
      orderBy: {
        due: 'asc',
      },
    });
    const mapped = dueAlgorithms.map((userData) =>
      this.mapUserDataFromDb(userData),
    );
    this.logger.log('findDueAlgorithmsCompleted', {
      userId,
      count: mapped.length,
    });
    return mapped;
  }

  async findDailyAlgorithms(
    userId: string,
    date: Date,
  ): Promise<DailyAlgorithm[]> {
    this.logger.log('findDailyAlgorithmsStarted', {
      userId,
      date: date.toISOString(),
    });
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const algorithms = await this.prisma.dailyAlgorithm.findMany({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        algorithm: true,
      },
    });
    const mapped = algorithms.map((algorithm) =>
      this.mapDailyAlgorithmFromDb(algorithm),
    );
    this.logger.log('findDailyAlgorithmsCompleted', {
      userId,
      count: mapped.length,
    });
    return mapped;
  }

  async createDailyAlgorithms(
    userId: string,
    date: Date,
    algorithmCount: number,
  ): Promise<DailyAlgorithm[]> {
    this.logger.log('createDailyAlgorithmsStarted', {
      userId,
      count: algorithmCount,
      date: date.toISOString(),
    });

    // Set up date boundaries for today
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // 1. Get all user algorithm data in a single query
    const userAlgorithmData = await this.prisma.algorithmUserData.findMany({
      where: { userId },
      include: { algorithm: true },
      orderBy: { due: 'asc' }, // Get earliest due first
      take: algorithmCount,
    });

    // 2. Get all templates relevant to this user
    // - Templates owned by the user
    const userAlgorithmIds = userAlgorithmData.map((data) => data.algorithmId);
    const relevantTemplates = await this.prisma.algorithmTemplate.findMany({
      where: { id: { notIn: userAlgorithmIds }, userId },
      orderBy: { level: 'asc' },
      take: algorithmCount,
    });

    // 3. Sort algorithms by priority
    const prioritizedAlgorithms: AlgorithmTemplate[] = [];

    // First priority: Algorithms due today
    const dueTodayAlgorithms = userAlgorithmData
      .filter((data) => data.due >= startOfDay && data.due <= endOfDay)
      .map((data) => this.mapTemplateFromDb(data.algorithm));
    prioritizedAlgorithms.push(...dueTodayAlgorithms);

    // Second priority: New algorithms
    const userOwnedTemplates = relevantTemplates.map((template) =>
      this.mapTemplateFromDb(template),
    );

    prioritizedAlgorithms.push(...userOwnedTemplates);

    // Third priority: Algorithms due on other days
    const otherDueAlgorithms = userAlgorithmData
      .filter((data) => data.due < startOfDay || data.due > endOfDay)
      .map((data) => this.mapTemplateFromDb(data.algorithm));
    prioritizedAlgorithms.push(...otherDueAlgorithms);

    // 4. Take the required number of algorithms
    const selectedAlgorithms = prioritizedAlgorithms.slice(0, algorithmCount);

    // 5. Create daily algorithm entries
    if (selectedAlgorithms.length > 0) {
      const dailyAlgorithmData = selectedAlgorithms.map((algorithm) => ({
        userId,
        algorithmId: algorithm.id,
        date,
        completed: false,
      }));

      await this.prisma.dailyAlgorithm.createMany({
        data: dailyAlgorithmData,
        skipDuplicates: true, // Skip if already exists for this day
      });
    }

    const dailyAlgorithms = await this.findDailyAlgorithms(userId, date);
    this.logger.log('createDailyAlgorithmsCompleted', {
      userId,
      count: dailyAlgorithms.length,
    });
    return dailyAlgorithms;
  }

  async markDailyAlgorithmAsCompleted(
    userId: string,
    algorithmId: string,
    date: Date,
  ): Promise<void> {
    this.logger.log('markDailyAlgorithmAsCompletedStarted', {
      userId,
      algorithmId,
      date: date.toISOString(),
    });
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    await this.prisma.dailyAlgorithm.updateMany({
      where: {
        userId,
        algorithmId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      data: {
        completed: true,
      },
    });
    this.logger.log('markDailyAlgorithmAsCompletedCompleted', {
      userId,
      algorithmId,
    });
  }

  // Mapping functions
  private mapTemplateFromDb(
    template: Prisma.AlgorithmTemplateGetPayload<any>,
  ): AlgorithmTemplate {
    return {
      id: template.id,
      title: template.title,
      description: template.description,
      difficulty: template.difficulty as AlgorithmDifficulty,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
      categories: template.categories,
      summary: template.summary,
      tags: template.tags,
      files: JSON.parse(template.files as string) as AlgorithmFile[],
    };
  }

  private mapUserDataFromDb(
    userData: Prisma.AlgorithmUserDataGetPayload<{
      include: {
        algorithm: true;
      };
    }>,
  ): AlgorithmPracticeData {
    const scheduleData = deserializeScheduleData(userData.scheduleData);
    return {
      id: userData.id,
      notes: userData.notes || undefined,
      algorithmTemplate: this.mapTemplateFromDb(userData.algorithm),
      scheduleData,
      due: userData.due,
      submissions: [],
      ratingSchedule: {
        again: 0,
        hard: 0,
        good: 0,
        easy: 0,
      },
      nextAlgorithm: null,
      dailyAlgorithm: null,
    };
  }

  private mapSubmissionsFromDb(
    submissions: Prisma.SubmissionGetPayload<any>[],
  ): AlgorithmSubmission[] {
    return submissions.map((submission) =>
      this.mapSubmissionFromDb(submission),
    );
  }

  private mapSubmissionFromDb(
    submission: Prisma.SubmissionGetPayload<any>,
  ): AlgorithmSubmission {
    const scheduleData = deserializeScheduleData(submission.scheduleData);
    return {
      id: submission.id,
      algorithmId: submission.algorithmId,
      algorithmUserDataId: submission.algorithmUserDataId,
      code: submission.code,
      notes: submission.notes || undefined,
      rating: submission.difficulty as AlgorithmRating,
      language: submission.language as CodeLanguage,
      timeSpent: submission.timeSpent,
      createdAt: submission.createdAt,
      scheduleData,
    };
  }

  private mapAlgorithmPreviewFromDb(
    algorithm: Prisma.AlgorithmTemplateGetPayload<any>,
  ): AlgorithmPreview {
    return {
      id: algorithm.id,
      title: algorithm.title,
      categories: algorithm.categories,
      summary: algorithm.summary,
      difficulty: algorithm.difficulty as AlgorithmDifficulty,
    };
  }

  private mapDailyAlgorithmFromDb(
    algorithm: Prisma.DailyAlgorithmGetPayload<{
      include: {
        algorithm: true;
      };
    }>,
  ): DailyAlgorithm {
    return {
      id: algorithm.id,
      algorithmPreview: this.mapAlgorithmPreviewFromDb(algorithm.algorithm),
      completed: algorithm.completed,
    };
  }

  private mapRatingToFSRS(rating: AlgorithmRating): Rating {
    switch (rating.toLowerCase()) {
      case AlgorithmRating.AGAIN:
        return Rating.Again;
      case AlgorithmRating.HARD:
        return Rating.Hard;
      case AlgorithmRating.GOOD:
        return Rating.Good;
      case AlgorithmRating.EASY:
        return Rating.Easy;
      default:
        throw new Error(`Invalid rating: ${rating}`);
    }
  }
}
