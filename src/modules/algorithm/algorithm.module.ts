import { Module } from '@nestjs/common';
import { AlgorithmController } from './controllers/algorithm.controller';
import { AlgorithmService } from './services/algorithm.service';
import { AlgorithmRepository } from './repositories/algorithm.repository';
import { PrismaService } from '../../infrastructure/database/prisma.service';

@Module({
  imports: [],
  controllers: [AlgorithmController],
  providers: [AlgorithmService, AlgorithmRepository, PrismaService],
  exports: [AlgorithmService],
})
export class AlgorithmModule {}
