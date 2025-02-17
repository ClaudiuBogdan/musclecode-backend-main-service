import { Injectable } from '@nestjs/common';
import { Collection, AlgorithmCollection } from '@prisma/client';
import { CreateCollectionDto } from '../dto/create-collection.dto';
import {
  CollectionResponseDto,
  AlgorithmInCollectionDto,
} from '../dto/collection.response.dto';
import { StructuredLogger } from '../../../logger/structured-logger.service';
import { PrismaService } from 'src/infrastructure/database/prisma.service';

type CollectionWithAlgorithms = Collection & {
  algorithms: (AlgorithmCollection & {
    algorithm: {
      id: string;
      title: string;
      difficulty: string;
      categories: string[];
      tags: string[];
    };
  })[];
};

@Injectable()
export class CollectionRepository {
  private readonly logger = new StructuredLogger('CollectionRepository');

  constructor(private readonly prisma: PrismaService) {}

  private mapCollectionToDto(
    collection: CollectionWithAlgorithms,
  ): CollectionResponseDto {
    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      userId: collection.userId,
      parentId: collection.parentId,
      createdAt: collection.createdAt,
      algorithms: collection.algorithms.map(
        (ac): AlgorithmInCollectionDto => ({
          id: ac.algorithm.id,
          title: ac.algorithm.title,
          difficulty: ac.algorithm.difficulty,
          categories: ac.algorithm.categories,
          tags: ac.algorithm.tags,
        }),
      ),
    };
  }

  async findPublicCollections(): Promise<CollectionResponseDto[]> {
    this.logger.debug('Finding public collections');
    const collections = await this.prisma.collection.findMany({
      where: {
        userId: null, // System collections are public
      },
      include: {
        algorithms: {
          include: {
            algorithm: {
              select: {
                id: true,
                title: true,
                difficulty: true,
                categories: true,
              },
            },
          },
        },
      },
    });

    return collections.map(this.mapCollectionToDto);
  }

  async findById(id: string): Promise<CollectionResponseDto | null> {
    this.logger.debug('Finding collection by ID', { collectionId: id });
    const collection = await this.prisma.collection.findUnique({
      where: { id },
      include: {
        algorithms: {
          include: {
            algorithm: {
              select: {
                id: true,
                title: true,
                difficulty: true,
                categories: true,
                tags: true,
              },
            },
          },
        },
      },
    });

    return collection ? this.mapCollectionToDto(collection) : null;
  }

  async create(
    createCollectionDto: CreateCollectionDto,
    userId?: string,
  ): Promise<CollectionResponseDto> {
    const { algorithmIds, ...collectionData } = createCollectionDto;

    this.logger.debug('Creating collection', {
      userId,
      name: collectionData.name,
    });

    const collection = await this.prisma.$transaction(async (tx) => {
      // Create the collection
      const newCollection = await tx.collection.create({
        data: {
          ...collectionData,
          userId,
        },
        include: {
          algorithms: {
            include: {
              algorithm: {
                select: {
                  id: true,
                  title: true,
                  difficulty: true,
                  categories: true,
                  tags: true,
                },
              },
            },
          },
        },
      });

      // If algorithm IDs are provided, create the relationships
      if (algorithmIds?.length) {
        await tx.algorithmCollection.createMany({
          data: algorithmIds.map((algorithmId) => ({
            algorithmId,
            collectionId: newCollection.id,
          })),
        });

        // Fetch the complete collection with algorithms after creating relationships
        const updatedCollection = await tx.collection.findUnique({
          where: { id: newCollection.id },
          include: {
            algorithms: {
              include: {
                algorithm: {
                  select: {
                    id: true,
                    title: true,
                    difficulty: true,
                    categories: true,
                  },
                },
              },
            },
          },
        });

        if (!updatedCollection) {
          throw new Error(
            'Failed to fetch updated collection after creating relationships',
          );
        }

        return updatedCollection;
      }

      return newCollection;
    });

    return this.mapCollectionToDto(collection);
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
