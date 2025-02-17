import { Module, OnModuleInit } from '@nestjs/common';
import { CollectionController } from './controllers/collection.controller';
import { CollectionService } from './services/collection.service';
import { CollectionRepository } from './repositories/collection.repository';
import { CollectionSeedService } from './seed/collection-seed.service';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { ModuleRef } from '@nestjs/core';
import { StructuredLogger } from '../../logger/structured-logger.service';

@Module({
  controllers: [CollectionController],
  providers: [
    CollectionService,
    CollectionRepository,
    CollectionSeedService,
    PrismaService,
  ],
  exports: [CollectionService, CollectionSeedService],
})
export class CollectionModule implements OnModuleInit {
  private readonly logger = new StructuredLogger('CollectionModule');

  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    const seedService = this.moduleRef.get(CollectionSeedService);

    try {
      const shouldSeed = await seedService.shouldSeed();
      if (shouldSeed) {
        this.logger.log('No collections found, starting initial seeding');
        await seedService.seed();
        this.logger.log('Initial collection seeding completed');
      } else {
        this.logger.debug('Collections already exist, skipping seeding');
      }
    } catch (error) {
      this.logger.error('Failed to perform initial collection seeding', error);
      // Don't throw the error - allow the module to initialize even if seeding fails
    }
  }
}
