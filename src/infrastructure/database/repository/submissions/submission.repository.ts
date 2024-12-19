import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ISubmissionRepository } from './submission.interface';
import {
  Difficulty,
  Submission,
} from 'src/modules/submission/interfaces/submission.interface';
import { CodeLanguage } from 'src/modules/algorithm/interfaces/algorithm.interface';

@Injectable()
export class SubmissionRepository implements ISubmissionRepository {
  constructor(private prisma: PrismaService) {}

  async save(
    userId: string,
    algorithmId: string,
    data: Submission,
  ): Promise<void> {
    await this.prisma.submission.create({
      data: {
        userId,
        algorithmId,
        code: data.code,
        notes: data.notes || undefined,
        difficulty: data.difficulty,
        language: data.language,
        timeSpent: data.timeSpent,
      },
    });
  }

  async get(userId: string, algorithmId: string): Promise<Submission[]> {
    const submissions = await this.prisma.submission.findMany({
      where: {
        userId,
        algorithmId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return submissions.map((sub) => ({
      id: sub.id,
      userId: sub.userId,
      algorithmId: sub.algorithmId,
      code: sub.code,
      notes: sub.notes || undefined,
      difficulty: sub.difficulty as Difficulty,
      language: sub.language as CodeLanguage,
      timeSpent: sub.timeSpent,
      createdAt: sub.createdAt.toISOString(),
    }));
  }
}
