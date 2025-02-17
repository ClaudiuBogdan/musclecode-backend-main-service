import { Injectable } from '@nestjs/common';
import { Collection, AlgorithmCollection } from '@prisma/client';
import { CreateCollectionDto } from '../dto/create-collection.dto';
import { StructuredLogger } from '../../../logger/structured-logger.service';
import { PrismaService } from 'src/infrastructure/database/prisma.service';

@Injectable()
export class CollectionRepository {
  private readonly logger = new StructuredLogger('CollectionRepository');

  constructor(private readonly prisma: PrismaService) {}

  async findPublicCollections(): Promise<Collection[]> {
    this.logger.debug('Finding public collections');
    return this.prisma.collection.findMany({
      where: {
        userId: null, // System collections are public
      },
      include: {
        algorithms: {
          include: {
            algorithm: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Collection | null> {
    this.logger.debug('Finding collection by ID', { collectionId: id });
    return this.prisma.collection.findUnique({
      where: { id },
      include: {
        algorithms: {
          include: {
            algorithm: true,
          },
        },
      },
    });
  }

  async create(
    createCollectionDto: CreateCollectionDto,
    userId?: string,
  ): Promise<Collection> {
    const { algorithmIds, ...collectionData } = createCollectionDto;

    this.logger.debug('Creating collection', {
      userId,
      name: collectionData.name,
    });

    return this.prisma.$transaction(async (tx) => {
      // Create the collection
      const collection = await tx.collection.create({
        data: {
          ...collectionData,
          userId,
        },
      });

      // If algorithm IDs are provided, create the relationships
      if (algorithmIds?.length) {
        await tx.algorithmCollection.createMany({
          data: algorithmIds.map((algorithmId) => ({
            algorithmId,
            collectionId: collection.id,
          })),
        });
      }

      return collection;
    });
  }

  async addAlgorithmToCollection(
    collectionId: string,
    algorithmId: string,
  ): Promise<AlgorithmCollection> {
    this.logger.debug('Adding algorithm to collection', {
      collectionId,
      algorithmId,
    });

    return this.prisma.algorithmCollection.create({
      data: {
        algorithmId,
        collectionId,
      },
    });
  }

  async removeAlgorithmFromCollection(
    collectionId: string,
    algorithmId: string,
  ): Promise<void> {
    this.logger.debug('Removing algorithm from collection', {
      collectionId,
      algorithmId,
    });

    await this.prisma.algorithmCollection.delete({
      where: {
        algorithmId_collectionId: {
          algorithmId,
          collectionId,
        },
      },
    });
  }
}
