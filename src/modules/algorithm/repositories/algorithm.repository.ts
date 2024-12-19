import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import {
  AlgorithmTemplate,
  AlgorithmUserData,
  DailyAlgorithm,
  AlgorithmUserProgress,
  AlgorithmSubmission,
  CodeLanguage,
} from '../interfaces/algorithm.interface';
import { CreateAlgorithmDto } from '../dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from '../dto/update-algorithm.dto';
import { IAlgorithmRepository } from '../interfaces/algorithm-repository.interface';
import { Prisma } from '@prisma/client';
import { seedAlgorithms } from '../seed/algorithms.seed';
import { AlgorithmDifficulty } from '../interfaces/algorithm-difficulty.enum';

@Injectable()
export class AlgorithmRepository implements IAlgorithmRepository {
  constructor(private readonly prisma: PrismaService) {}

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
    console.log('Algorithm templates seeded successfully');
  }

  // Algorithm Template operations
  async findAllTemplates(): Promise<AlgorithmTemplate[]> {
    const templates = await this.prisma.algorithmTemplate.findMany();
    return templates.map(this.mapTemplateFromDb);
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
  async findUserData(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmUserData | null> {
    const userData = await this.prisma.algorithmUserData.findUnique({
      where: {
        userId_algorithmId: {
          userId,
          algorithmId,
        },
      },
    });
    return userData ? this.mapUserDataFromDb(userData) : null;
  }

  async createUserData(
    userId: string,
    algorithmId: string,
    notes?: string,
  ): Promise<AlgorithmUserData> {
    const userData = await this.prisma.algorithmUserData.create({
      data: {
        userId,
        algorithmId,
        notes,
      },
    });
    return this.mapUserDataFromDb(userData);
  }

  async updateUserData(id: string, notes: string): Promise<AlgorithmUserData> {
    const userData = await this.prisma.algorithmUserData.update({
      where: { id },
      data: { notes },
    });
    return this.mapUserDataFromDb(userData);
  }

  // Daily algorithm operations
  async findDailyAlgorithms(
    userId: string,
    date: Date,
  ): Promise<DailyAlgorithm[]> {
    const dailyAlgorithms = await this.prisma.dailyAlgorithm.findMany({
      where: {
        userId,
        date: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(23, 59, 59, 999)),
        },
      },
    });
    return dailyAlgorithms.map(this.mapDailyAlgorithmFromDb);
  }

  async createDailyAlgorithm(
    userId: string,
    algorithmId: string,
    date: Date,
  ): Promise<DailyAlgorithm> {
    const dailyAlgorithm = await this.prisma.dailyAlgorithm.create({
      data: {
        userId,
        algorithmId,
        date,
      },
    });
    return this.mapDailyAlgorithmFromDb(dailyAlgorithm);
  }

  async markDailyAlgorithmCompleted(id: string): Promise<DailyAlgorithm> {
    const dailyAlgorithm = await this.prisma.dailyAlgorithm.update({
      where: { id },
      data: { completed: true },
    });
    return this.mapDailyAlgorithmFromDb(dailyAlgorithm);
  }

  // Submission operations
  async createSubmission(
    submission: Omit<AlgorithmSubmission, 'id' | 'createdAt'>,
  ): Promise<AlgorithmSubmission> {
    const created = await this.prisma.submission.create({
      data: {
        userId: submission.userId,
        algorithmId: submission.algorithmId,
        code: submission.code,
        language: submission.language,
        timeSpent: submission.timeSpent,
        notes: submission.notes,
        difficulty: submission.difficulty,
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
    return submissions.map(this.mapSubmissionFromDb);
  }

  // Combined data operations
  async findUserProgress(
    userId: string,
    algorithmId: string,
  ): Promise<AlgorithmUserProgress | null> {
    const [template, userData, dailyAlgorithm] = await Promise.all([
      this.findTemplateById(algorithmId),
      this.findUserData(userId, algorithmId),
      this.prisma.dailyAlgorithm.findFirst({
        where: {
          userId,
          algorithmId,
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      }),
    ]);

    if (!template) return null;

    const defaultUserData: AlgorithmUserData = {
      id: '',
      userId,
      algorithmId,
      notes: undefined,
      createdAt: new Date(),
    };

    return {
      algorithmTemplate: template,
      algorithmUserData: userData || defaultUserData,
      dailyAlgorithm: dailyAlgorithm
        ? this.mapDailyAlgorithmFromDb(dailyAlgorithm)
        : null,
    };
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
    userData: Prisma.AlgorithmUserDataGetPayload<any>,
  ): AlgorithmUserData {
    return {
      id: userData.id,
      userId: userData.userId,
      algorithmId: userData.algorithmId,
      notes: userData.notes || undefined,
      createdAt: userData.createdAt,
    };
  }

  private mapDailyAlgorithmFromDb(
    dailyAlgorithm: Prisma.DailyAlgorithmGetPayload<any>,
  ): DailyAlgorithm {
    return {
      id: dailyAlgorithm.id,
      userId: dailyAlgorithm.userId,
      algorithmId: dailyAlgorithm.algorithmId,
      date: dailyAlgorithm.date,
      completed: dailyAlgorithm.completed,
      createdAt: dailyAlgorithm.createdAt,
    };
  }

  private mapSubmissionFromDb(
    submission: Prisma.SubmissionGetPayload<any>,
  ): AlgorithmSubmission {
    return {
      id: submission.id,
      userId: submission.userId,
      algorithmId: submission.algorithmId,
      code: submission.code,
      notes: submission.notes || undefined,
      difficulty: submission.difficulty as AlgorithmDifficulty,
      language: submission.language as CodeLanguage,
      timeSpent: submission.timeSpent,
      createdAt: submission.createdAt,
    };
  }
}
