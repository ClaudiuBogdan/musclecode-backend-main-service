import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { Algorithm } from '../interfaces/algorithm.interface';
import { CreateAlgorithmDto } from '../dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from '../dto/update-algorithm.dto';
import { IAlgorithmRepository } from '../interfaces/algorithm-repository.interface';
import { Prisma } from '@prisma/client';
import { seedAlgorithms } from '../seed/algorithms.seed';

@Injectable()
export class AlgorithmRepository implements IAlgorithmRepository {
  constructor(private readonly prisma: PrismaService) {}

  async seed(): Promise<void> {
    const algorithms = await this.prisma.algorithm.findMany();
    if (algorithms.length > 0) return;

    const newAlgorithms = seedAlgorithms().map((algorithm) => ({
      ...algorithm,
      tags: JSON.stringify(algorithm.tags),
      files: JSON.stringify(algorithm.files),
    }));

    await this.prisma.algorithm.createMany({
      data: newAlgorithms,
    });
    console.log('Algorithms seeded successfully');
  }

  async findAll(): Promise<Algorithm[]> {
    const algorithms = await this.prisma.algorithm.findMany();
    return algorithms.map(this.mapAlgorithmFromDb);
  }

  async findById(id: string): Promise<Algorithm | null> {
    const algorithm = await this.prisma.algorithm.findUnique({
      where: { id },
    });
    if (!algorithm) return null;
    return this.mapAlgorithmFromDb(algorithm);
  }

  async findDaily(): Promise<Algorithm[]> {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const algorithms = await this.prisma.algorithm.findMany({
      where: {
        createdAt: {
          gte: today,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });
    return algorithms.map(this.mapAlgorithmFromDb);
  }

  async create(createAlgorithmDto: CreateAlgorithmDto): Promise<Algorithm> {
    const algorithm = await this.prisma.algorithm.create({
      data: {
        title: createAlgorithmDto.title,
        category: createAlgorithmDto.category,
        summary: createAlgorithmDto.summary,
        description: createAlgorithmDto.description,
        difficulty: createAlgorithmDto.difficulty,
        tags: JSON.stringify(createAlgorithmDto.tags),
        notes: createAlgorithmDto.notes || '',
        files: JSON.stringify(createAlgorithmDto.files),
      },
    });

    return this.mapAlgorithmFromDb(algorithm);
  }

  async update(
    id: string,
    updateAlgorithmDto: UpdateAlgorithmDto,
  ): Promise<Algorithm> {
    const algorithm = await this.prisma.algorithm.update({
      where: { id },
      data: {
        title: updateAlgorithmDto.title,
        category: updateAlgorithmDto.category,
        summary: updateAlgorithmDto.summary,
        description: updateAlgorithmDto.description,
        difficulty: updateAlgorithmDto.difficulty,
        tags: JSON.stringify(updateAlgorithmDto.tags),
        notes: updateAlgorithmDto.notes || '',
        files: JSON.stringify(updateAlgorithmDto.files),
      },
    });
    return this.mapAlgorithmFromDb(algorithm);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.algorithm.delete({
      where: { id },
    });
  }

  private mapAlgorithmFromDb(
    algorithm: Prisma.AlgorithmGetPayload<any>,
  ): Algorithm {
    return {
      id: algorithm.id,
      title: algorithm.title,
      category: algorithm.category,
      summary: algorithm.summary,
      description: algorithm.description,
      difficulty: algorithm.difficulty as 'easy' | 'medium' | 'hard',
      tags: JSON.parse(algorithm.tags),
      notes: algorithm.notes,
      files: JSON.parse(algorithm.files),
      completed: algorithm.completed,
    };
  }
}
