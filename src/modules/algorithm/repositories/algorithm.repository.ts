import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import {
  AlgorithmTemplate,
  AlgorithmPracticeData,
  AlgorithmSubmission,
  CodeLanguage,
  AlgorithmRating,
  AlgorithmPreview,
  AlgorithmDifficulty,
} from '../interfaces/algorithm.interface';
import { CreateAlgorithmDto } from '../dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from '../dto/update-algorithm.dto';
import { IAlgorithmRepository } from '../interfaces/algorithm-repository.interface';
import { Prisma } from '@prisma/client';
import { seedAlgorithms } from '../seed/algorithms.seed';

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
      },
    });
    return userData ? this.mapUserDataFromDb(userData) : null;
  }

  async createAlgorithmPracticeData(
    userId: string,
    algorithmId: string,
    notes?: string,
  ): Promise<AlgorithmPracticeData> {
    const userData = await this.prisma.algorithmUserData.create({
      data: {
        userId,
        algorithmId,
        notes,
      },
      include: {
        algorithm: true,
      },
    });
    return this.mapUserDataFromDb(userData);
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
    const created = await this.prisma.submission.create({
      data: {
        userId: userId,
        algorithmId: submission.algorithmId,
        algorithmUserDataId: submission.algorithmUserDataId,
        code: submission.code,
        language: submission.language,
        timeSpent: submission.timeSpent,
        notes: submission.notes,
        difficulty: submission.rating,
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
      submissions: [],
      schedule: {
        again: 1000 * 60 * 60 * 24 * 7,
        hard: 1000 * 60 * 60 * 24 * 14,
        good: 1000 * 60 * 60 * 24 * 21,
        easy: 1000 * 60 * 60 * 24 * 28,
      },
    };
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
}
