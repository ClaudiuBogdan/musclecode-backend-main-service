import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { StructuredLogger } from 'src/logger/structured-logger.service';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new StructuredLogger(PrismaService.name);

  constructor() {
    super({
      log: ['warn', 'error'],
      errorFormat: process.env.NODE_ENV === 'production' ? 'minimal' : 'pretty',
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Prisma connected successfully');
    } catch (error) {
      this.logger.error('Prisma connection error:', error);
      throw new Error('Database connection failed');
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Prisma disconnected successfully');
    } catch (error) {
      this.logger.error('Prisma disconnection error:', error);
    }
  }
}
