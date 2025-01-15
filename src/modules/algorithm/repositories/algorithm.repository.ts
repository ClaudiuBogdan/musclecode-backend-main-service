import { Injectable } from '@nestjs/common';
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
} from '../interfaces/algorithm.interface';
import { CreateAlgorithmDto } from '../dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from '../dto/update-algorithm.dto';
import { IAlgorithmRepository } from '../interfaces/algorithm-repository.interface';
import { Prisma } from '@prisma/client';
import { seedAlgorithms } from '../seed/algorithms.seed';
import { Rating } from '../../scheduler/types/scheduler.types';

@Injectable()
export class AlgorithmRepository implements IAlgorithmRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly schedulerService: SchedulerService,
  ) {}

  async seed(): Promise<void> {
    const algorithms = await this.prisma.algorithmTemplate.findMany();
    if (algorithms.length > 0) return;

    const newAlgorithms = seedAlgorithms().map((algorithm) => ({
      ...algorithm,
      tags: JSON.stringify(algorithm.tags),
      files: JSON.stringify(algorithm.files),
    }));

    await this.prisma.algorithmTemplate.createMany({
      data: newAlgorithms,
    });
  }

  // Algorithm Template operations
  async findAllTemplates(): Promise<AlgorithmTemplate[]> {
    const templates = await this.prisma.algorithmTemplate.findMany();
    return templates.map((template) => this.mapTemplateFromDb(template));
  }

  async findTemplateById(id: string): Promise<AlgorithmTemplate | null> {
    const template = await this.prisma.algorithmTemplate.findUnique({
      where: { id },
    });
    if (!template) return null;
    return this.mapTemplateFromDb(template);
  }

  async createTemplate(
    createAlgorithmDto: CreateAlgorithmDto,
  ): Promise<AlgorithmTemplate> {
    const template = await this.prisma.algorithmTemplate.create({
      data: {
        title: createAlgorithmDto.title,
        category: createAlgorithmDto.category,
        summary: createAlgorithmDto.summary,
        description: createAlgorithmDto.description,
        difficulty: createAlgorithmDto.difficulty,
        tags: JSON.stringify(createAlgorithmDto.tags),
        files: JSON.stringify(createAlgorithmDto.files),
      },
    });
    return this.mapTemplateFromDb(template);
  }

  async updateTemplate(
    id: string,
    updateAlgorithmDto: UpdateAlgorithmDto,
  ): Promise<AlgorithmTemplate> {
    const template = await this.prisma.algorithmTemplate.update({
      where: { id },
      data: {
        title: updateAlgorithmDto.title,
        category: updateAlgorithmDto.category,
        summary: updateAlgorithmDto.summary,
        description: updateAlgorithmDto.description,
        difficulty: updateAlgorithmDto.difficulty,
        tags: updateAlgorithmDto.tags
          ? JSON.stringify(updateAlgorithmDto.tags)
          : undefined,
        files: updateAlgorithmDto.files
          ? JSON.stringify(updateAlgorithmDto.files)
          : undefined,
      },
    });
    return this.mapTemplateFromDb(template);
  }

  async deleteTemplate(id: string): Promise<void> {
    await this.prisma.algorithmTemplate.delete({
      where: { id },
    });
  }

  // User-specific algorithm data operations
  async findAlgorithmPracticeData(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmPracticeData | null> {
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
    if (!userData) return null;
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
    const initialScheduleState = this.schedulerService.initializeState();
    const userData = await this.prisma.algorithmUserData.create({
      data: {
        userId,
        algorithmId,
        notes,
        due: initialScheduleState.due,
        scheduleData: JSON.stringify(initialScheduleState),
      },
      include: {
        algorithm: true,
      },
    });
    return this.mapUserDataFromDb(userData);
  }

  async createUserAlgorithms(
    userId: string,
    algorithms: AlgorithmTemplate[],
  ): Promise<AlgorithmPracticeData[]> {
    await this.prisma.algorithmUserData.createMany({
      data: algorithms.map((algorithm) => ({
        userId,
        algorithmId: algorithm.id,
        scheduleData: JSON.stringify(this.schedulerService.initializeState()),
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

    return createdAlgorithms.map((userData) =>
      this.mapUserDataFromDb(userData),
    );
  }

  async updateAlgorithmNotes(
    userId: string,
    algorithmId: string,
    notes?: string,
  ): Promise<void> {
    await this.prisma.algorithmUserData.update({
      where: { userId_algorithmId: { userId, algorithmId } },
      data: { notes },
    });
  }

  async updateUserData(
    id: string,
    notes: string,
  ): Promise<AlgorithmPracticeData> {
    const userData = await this.prisma.algorithmUserData.update({
      where: { id },
      data: { notes },
      include: {
        algorithm: true,
      },
    });
    return this.mapUserDataFromDb(userData);
  }

  // Submission operations
  async createSubmission(
    submission: Omit<AlgorithmSubmission, 'id' | 'createdAt'>,
    userId: string,
  ): Promise<AlgorithmSubmission> {
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
        scheduleData: JSON.stringify(userData.scheduleData),
      },
    });

    return this.mapSubmissionFromDb(created);
  }

  async findUserSubmissions(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmSubmission[]> {
    const submissions = await this.prisma.submission.findMany({
      where: {
        userId,
        algorithmId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return submissions.map((submission) =>
      this.mapSubmissionFromDb(submission),
    );
  }

  async updateSchedule(
    userId: string,
    algorithmId: string,
    rating: AlgorithmRating,
  ): Promise<AlgorithmPracticeData> {
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
      throw new Error('User algorithm data not found');
    }

    const currentState = JSON.parse(userData.scheduleData);
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
        scheduleData: JSON.stringify(newSchedule.state),
      },
      include: {
        algorithm: true,
      },
    });

    return this.mapUserDataFromDb(updatedUserData);
  }

  async findDueAlgorithms(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<AlgorithmPracticeData[]> {
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

    return dueAlgorithms.map((userData) => this.mapUserDataFromDb(userData));
  }

  async findDailyAlgorithms(
    userId: string,
    date: Date,
  ): Promise<DailyAlgorithm[]> {
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

    return algorithms.map((algorithm) =>
      this.mapDailyAlgorithmFromDb(algorithm),
    );
  }

  async createDailyAlgorithms(
    userId: string,
    algorithms: AlgorithmTemplate[],
    date: Date,
  ): Promise<DailyAlgorithm[]> {
    const data = algorithms.map((algorithm) => ({
      userId,
      algorithmId: algorithm.id,
      date,
      completed: false,
    }));

    await this.prisma.dailyAlgorithm.createMany({
      data,
    });

    return this.findDailyAlgorithms(userId, date);
  }

  async markDailyAlgorithmAsCompleted(
    userId: string,
    algorithmId: string,
    date: Date,
  ): Promise<void> {
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
      category: template.category,
      summary: template.summary,
      tags: JSON.parse(template.tags),
      files: JSON.parse(template.files),
    };
  }

  private mapUserDataFromDb(
    userData: Prisma.AlgorithmUserDataGetPayload<{
      include: {
        algorithm: true;
      };
    }>,
  ): AlgorithmPracticeData {
    return {
      id: userData.id,
      notes: userData.notes || undefined,
      algorithmTemplate: this.mapTemplateFromDb(userData.algorithm),
      scheduleData: JSON.parse(userData.scheduleData),
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
      scheduleData: JSON.parse(submission.scheduleData),
    };
  }

  private mapAlgorithmPreviewFromDb(
    algorithm: Prisma.AlgorithmTemplateGetPayload<any>,
  ): AlgorithmPreview {
    return {
      id: algorithm.id,
      title: algorithm.title,
      category: algorithm.category,
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
    switch (rating) {
      case AlgorithmRating.AGAIN:
        return Rating.Again;
      case AlgorithmRating.HARD:
        return Rating.Hard;
      case AlgorithmRating.GOOD:
        return Rating.Good;
      case AlgorithmRating.EASY:
        return Rating.Easy;
      default:
        throw new Error('Invalid rating');
    }
  }
}
