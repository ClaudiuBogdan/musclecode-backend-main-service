import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { seedCollections, seedAlgorithmCollections } from './collections.seed';
import { StructuredLogger } from '../../../logger/structured-logger.service';
import { AlgorithmService } from '../../algorithm/services/algorithm.service';

@Injectable()
export class CollectionSeedService {
  private readonly logger = new StructuredLogger('CollectionSeedService');

  constructor(
    private readonly prisma: PrismaService,
    private readonly algorithmService: AlgorithmService,
  ) {}

  async shouldSeed(): Promise<boolean> {
    const count = await this.prisma.collection.count();
    return count === 0;
  }

  async seed(): Promise<void> {
    this.logger.debug('Starting collection seeding');

    try {
      // Ensure algorithms exist before proceeding
      const algorithms = await this.algorithmService.findAllTemplates();
      if (algorithms.length === 0) {
        this.logger.warn(
          'No algorithms found, cannot seed collections that reference algorithms',
        );
        throw new Error('Algorithms must be seeded before collections');
      }

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
      const algorithmCollections = await seedAlgorithmCollections();

      // Verify all referenced algorithms exist
      const algorithmIds = [
        ...new Set(algorithmCollections.map((ac) => ac.algorithmId)),
      ];
      const existingAlgorithms = await this.prisma.algorithmTemplate.findMany({
        where: { id: { in: algorithmIds } },
        select: { id: true },
      });

      const existingAlgorithmIds = new Set(existingAlgorithms.map((a) => a.id));
      const validAlgorithmCollections = algorithmCollections.filter((ac) =>
        existingAlgorithmIds.has(ac.algorithmId),
      );

      if (validAlgorithmCollections.length < algorithmCollections.length) {
        this.logger.warn('Some algorithm IDs do not exist in the database', {
          missing:
            algorithmCollections.length - validAlgorithmCollections.length,
        });
      }

      await this.prisma.$transaction(
        validAlgorithmCollections.map(({ algorithmId, collectionId }) =>
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
        count: validAlgorithmCollections.length,
      });
    } catch (error) {
      this.logger.error('Failed to seed collections', error);
      throw error;
    }
  }
}
