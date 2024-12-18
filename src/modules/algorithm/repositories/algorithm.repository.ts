import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import {
  Algorithm,
  IAlgorithmRepository,
} from '../interfaces/algorithm.interface';
import { seedAlgorithms } from '../seed/algorithms.seed';

@Injectable()
export class AlgorithmRepository implements IAlgorithmRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Algorithm[]> {
    const algorithms = await this.prisma.algorithm.findMany();
    return algorithms.map(this.mapToAlgorithm);
  }

  async findDaily(): Promise<Algorithm[]> {
    const algorithms = await this.prisma.algorithm.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return algorithms.map(this.mapToAlgorithm);
  }

  async findById(id: string): Promise<Algorithm | null> {
    const algorithm = await this.prisma.algorithm.findUnique({
      where: { id },
    });
    return algorithm ? this.mapToAlgorithm(algorithm) : null;
  }

  async create(
    algorithm: Omit<Algorithm, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Algorithm> {
    const created = await this.prisma.algorithm.create({
      data: {
        ...algorithm,
        files: JSON.stringify(algorithm.files),
        tags: JSON.stringify(algorithm.tags),
      },
    });
    return this.mapToAlgorithm(created);
  }

  async update(id: string, algorithm: Partial<Algorithm>): Promise<Algorithm> {
    const updated = await this.prisma.algorithm.update({
      where: { id },
      data: {
        ...algorithm,
        files: JSON.stringify(algorithm.files),
        tags: JSON.stringify(algorithm.tags),
      },
    });
    return this.mapToAlgorithm(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.algorithm.delete({
      where: { id },
    });
  }

  async seed(): Promise<void> {
    const count = await this.prisma.algorithm.count();
    if (count === 0) {
      const algorithms = seedAlgorithms();
      await Promise.all(
        algorithms.map((algorithm) =>
          this.prisma.algorithm.create({
            data: {
              ...algorithm,
              files: JSON.stringify(algorithm.files),
              tags: JSON.stringify(algorithm.tags),
            },
          }),
        ),
      );
    }
  }

  private mapToAlgorithm(data: any): Algorithm {
    return {
      ...data,
      files: JSON.parse(data.files),
      tags: JSON.parse(data.tags),
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
    };
  }
}
