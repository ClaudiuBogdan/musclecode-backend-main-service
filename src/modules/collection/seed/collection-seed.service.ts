import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { seedCollections, seedAlgorithmCollections } from './collections.seed';
import { StructuredLogger } from '../../../logger/structured-logger.service';

@Injectable()
export class CollectionSeedService {
  private readonly logger = new StructuredLogger('CollectionSeedService');

  constructor(private readonly prisma: PrismaService) {}

  async shouldSeed(): Promise<boolean> {
    const count = await this.prisma.collection.count();
    return count === 0;
  }

  async seed(): Promise<void> {
    this.logger.debug('Starting collection seeding');

    try {
      // Create collections
      const collections = seedCollections();
      for (const collection of collections) {
        const { ...collectionData } = collection;
        await this.prisma.collection.upsert({
          where: { id: collectionData.id },
          update: collectionData,
          create: collectionData,
        });
      }
      this.logger.log('Collections seeded', { count: collections.length });

      // Create algorithm-collection relationships
      const algorithmCollections = seedAlgorithmCollections();
      await this.prisma.$transaction(
        algorithmCollections.map(({ algorithmId, collectionId }) =>
          this.prisma.algorithmCollection.upsert({
            where: {
              algorithmId_collectionId: {
                algorithmId,
                collectionId,
              },
            },
            update: {},
            create: {
              algorithmId,
              collectionId,
            },
          }),
        ),
      );

      this.logger.log('Algorithm-Collection relationships seeded', {
        count: algorithmCollections.length,
      });
    } catch (error) {
      this.logger.error('Failed to seed collections', error);
      throw error;
    }
  }
}
