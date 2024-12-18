import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Algorithm } from '../interfaces/algorithm.interface';
import { AlgorithmService } from '../services/algorithm.service';

@Controller('api/algorithms')
export class AlgorithmController {
  constructor(private readonly algorithmService: AlgorithmService) {}

  @Get()
  async findAll(): Promise<Algorithm[]> {
    return this.algorithmService.findAll();
  }

  @Get('daily')
  async findDaily(): Promise<Algorithm[]> {
    return this.algorithmService.findDaily();
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
  ): Promise<{ algorithm: Algorithm } | null> {
    return this.algorithmService.findById(id);
  }

  @Post()
  async create(
    @Body() algorithm: Omit<Algorithm, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Algorithm> {
    return this.algorithmService.create(algorithm);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() algorithm: Partial<Algorithm>,
  ): Promise<Algorithm> {
    return this.algorithmService.update(id, algorithm);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.algorithmService.delete(id);
  }
}
