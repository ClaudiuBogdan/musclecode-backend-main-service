import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ISubmissionRepository } from './submission.interface';
import {
  Difficulty,
  Submission,
} from 'src/modules/submission/interfaces/submission.interface';

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
        language: data.language,
        notes: data.notes,
        difficulty: data.difficulty,
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
      ...sub,
      difficulty: sub.difficulty as Difficulty,
      createdAt: sub.createdAt.toISOString(),
    }));
  }
}
