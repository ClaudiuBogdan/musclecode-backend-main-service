import { Injectable, OnModuleInit } from '@nestjs/common';
import { Algorithm } from '../interfaces/algorithm.interface';
import { AlgorithmRepository } from '../repositories/algorithm.repository';

@Injectable()
export class AlgorithmService implements OnModuleInit {
  constructor(private readonly algorithmRepository: AlgorithmRepository) {}

  async onModuleInit() {
    await this.algorithmRepository.seed();
  }

  async findAll(): Promise<Algorithm[]> {
    return this.algorithmRepository.findAll();
  }

  async findDaily(): Promise<Algorithm[]> {
    return this.algorithmRepository.findDaily();
  }

  async findById(id: string): Promise<{ algorithm: Algorithm } | null> {
    const algorithm = await this.algorithmRepository.findById(id);
    if (!algorithm) {
      return null;
    }
    return { algorithm };
  }

  async create(
    algorithm: Omit<Algorithm, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Algorithm> {
    return this.algorithmRepository.create(algorithm);
  }

  async update(id: string, algorithm: Partial<Algorithm>): Promise<Algorithm> {
    return this.algorithmRepository.update(id, algorithm);
  }

  async delete(id: string): Promise<void> {
    await this.algorithmRepository.delete(id);
  }
}
