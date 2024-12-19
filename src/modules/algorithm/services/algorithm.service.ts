import { Injectable, OnModuleInit } from '@nestjs/common';
import { Algorithm } from '../interfaces/algorithm.interface';
import { AlgorithmRepository } from '../repositories/algorithm.repository';
import { CreateAlgorithmDto } from '../dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from '../dto/update-algorithm.dto';

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

  async create(algorithm: CreateAlgorithmDto): Promise<Algorithm> {
    return this.algorithmRepository.create(algorithm);
  }

  async update(id: string, algorithm: UpdateAlgorithmDto): Promise<Algorithm> {
    return this.algorithmRepository.update(id, algorithm);
  }

  async delete(id: string): Promise<void> {
    await this.algorithmRepository.delete(id);
  }
}
