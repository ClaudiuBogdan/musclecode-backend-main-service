import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Collection,
  AlgorithmCollection,
  AlgorithmTemplate,
} from '@prisma/client';
import { CreateCollectionDto } from '../dto/create-collection.dto';
import {
  CollectionResponseDto,
  AlgorithmInCollectionDto,
} from '../dto/collection.response.dto';
import { StructuredLogger } from '../../../logger/structured-logger.service';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { InputJsonValue } from '@prisma/client/runtime/library';

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
      // Create collection with algorithms in single operation
      const newCollection = await tx.collection.create({
        data: {
          name: collectionData.name,
          description: collectionData.description,
          userId,
          // Connect algorithms atomically with collection creation
          algorithms: {
            create: algorithmIds?.map((algorithmId) => ({
              algorithm: {
                connect: { id: algorithmId },
              },
            })),
          },
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

      if (!newCollection) {
        throw new Error('Failed to create collection');
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

  async findUserCollectionByParentId(
    userId: string,
    parentId: string,
  ): Promise<Collection | null> {
    return this.prisma.collection.findFirst({
      where: {
        userId,
        parentId,
      },
    });
  }

  async findUserCollections(userId: string): Promise<CollectionResponseDto[]> {
    this.logger.debug('Finding collections for user', { userId });
    const collections = await this.prisma.collection.findMany({
      where: {
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

    return collections.map(this.mapCollectionToDto);
  }

  async findUserAlgorithmByParentId(
    userId: string,
    parentId: string,
  ): Promise<AlgorithmTemplate | null> {
    return this.prisma.algorithmTemplate.findFirst({
      where: {
        userId,
        parentId,
      },
    });
  }

  async copyCollection(
    sourceCollectionId: string,
    userId: string,
  ): Promise<CollectionResponseDto> {
    // Get the source collection with its algorithms
    const sourceCollection = await this.prisma.collection.findUnique({
      where: { id: sourceCollectionId },
      include: {
        algorithms: {
          include: {
            algorithm: true,
          },
        },
      },
    });

    if (!sourceCollection) {
      throw new Error(`Collection with ID ${sourceCollectionId} not found`);
    }

    // Check if user already has a copy of this collection
    const existingCopy = await this.findUserCollectionByParentId(
      userId,
      sourceCollectionId,
    );

    return this.prisma.$transaction(async (tx) => {
      let userCollection: Collection;

      if (existingCopy) {
        // Use existing collection
        userCollection = existingCopy;
      } else {
        // Create new collection copy
        userCollection = await tx.collection.create({
          data: {
            name: sourceCollection.name,
            description: sourceCollection.description,
            userId,
            parentId: sourceCollectionId,
          },
        });
      }

      // Process each algorithm in the source collection
      for (const { algorithm } of sourceCollection.algorithms) {
        // Check if user already has a copy of this algorithm
        let userAlgorithm = await this.findUserAlgorithmByParentId(
          userId,
          algorithm.id,
        );

        if (!userAlgorithm) {
          // Create algorithm copy if it doesn't exist
          userAlgorithm = await tx.algorithmTemplate.create({
            data: {
              title: algorithm.title,
              categories: algorithm.categories,
              summary: algorithm.summary,
              description: algorithm.description,
              difficulty: algorithm.difficulty,
              tags: algorithm.tags,
              files: algorithm.files as InputJsonValue,
              userId,
              parentId: algorithm.id,
            },
          });
        }

        // Create or ensure the algorithm-collection relationship exists
        await tx.algorithmCollection.upsert({
          where: {
            algorithmId_collectionId: {
              algorithmId: userAlgorithm.id,
              collectionId: userCollection.id,
            },
          },
          update: {},
          create: {
            algorithmId: userAlgorithm.id,
            collectionId: userCollection.id,
          },
        });
      }

      // Fetch the complete collection with algorithms
      const result = await tx.collection.findUnique({
        where: { id: userCollection.id },
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

      if (!result) {
        throw new Error('Failed to fetch copied collection');
      }

      return this.mapCollectionToDto(result);
    });
  }

  async editCollection(
    id: string,
    userId: string,
    data: { name?: string; description?: string; algorithmIds?: string[] },
  ): Promise<CollectionResponseDto> {
    this.logger.debug('Editing collection', { collectionId: id, userId });

    return this.prisma.$transaction(async (tx) => {
      // Update collection basic info
      const updatedCollection = await tx.collection.update({
        where: {
          id,
          userId, // Ensure the collection belongs to the user
        },
        data: {
          name: data.name,
          description: data.description,
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

      // If algorithmIds are provided, update the algorithms
      if (data.algorithmIds) {
        // Delete existing algorithm associations
        await tx.algorithmCollection.deleteMany({
          where: {
            collectionId: id,
          },
        });

        // Create new algorithm associations
        if (data.algorithmIds.length > 0) {
          await tx.algorithmCollection.createMany({
            data: data.algorithmIds.map((algorithmId) => ({
              collectionId: id,
              algorithmId,
            })),
          });
        }

        // Fetch updated collection with new algorithms
        const refreshedCollection = await tx.collection.findUnique({
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

        if (!refreshedCollection) {
          throw new Error('Failed to fetch updated collection');
        }

        return this.mapCollectionToDto(refreshedCollection);
      }

      return this.mapCollectionToDto(updatedCollection);
    });
  }

  async deleteCollection(id: string, userId: string): Promise<void> {
    this.logger.debug('Deleting collection', { collectionId: id, userId });

    await this.prisma.$transaction(async (tx) => {
      // First verify the collection exists and belongs to the user
      const collection = await tx.collection.findFirst({
        where: { id, userId },
      });

      if (!collection) {
        throw new NotFoundException(
          `Collection with ID ${id} not found or does not belong to user`,
        );
      }

      // Delete all algorithm associations first
      await tx.algorithmCollection.deleteMany({
        where: { collectionId: id },
      });

      // Then delete the collection itself
      await tx.collection.delete({
        where: { id },
      });
    });

    this.logger.log('Collection deleted successfully', {
      collectionId: id,
      userId,
    });
  }
}
