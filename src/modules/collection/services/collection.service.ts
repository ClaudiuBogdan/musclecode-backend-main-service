import { Injectable, NotFoundException } from '@nestjs/common';
import { AlgorithmCollection } from '@prisma/client';
import { CollectionRepository } from '../repositories/collection.repository';
import { CreateCollectionDto } from '../dto/create-collection.dto';
import { CollectionResponseDto } from '../dto/collection.response.dto';
import { StructuredLogger } from '../../../logger/structured-logger.service';

@Injectable()
export class CollectionService {
  private readonly logger = new StructuredLogger('CollectionService');

  constructor(private readonly collectionRepository: CollectionRepository) {}

  async findPublicCollections(): Promise<CollectionResponseDto[]> {
    this.logger.debug('Finding public collections');
    try {
      const collections =
        await this.collectionRepository.findPublicCollections();
      this.logger.log('Public collections found', {
        count: collections.length,
      });
      return collections;
    } catch (error) {
      this.logger.error('Failed to find public collections', error);
      throw error;
    }
  }

  async findById(id: string): Promise<CollectionResponseDto> {
    this.logger.debug('Finding collection by ID', { collectionId: id });
    try {
      const collection = await this.collectionRepository.findById(id);
      if (!collection) {
        this.logger.warn('Collection not found', { collectionId: id });
        throw new NotFoundException(`Collection with ID ${id} not found`);
      }
      this.logger.log('Collection found', { collectionId: id });
      return collection;
    } catch (error) {
      this.logger.error('Failed to find collection', error, {
        collectionId: id,
      });
      throw error;
    }
  }

  async create(
    createCollectionDto: CreateCollectionDto,
    userId?: string,
  ): Promise<CollectionResponseDto> {
    this.logger.debug('Creating collection', {
      userId,
      name: createCollectionDto.name,
    });
    try {
      const collection = await this.collectionRepository.create(
        createCollectionDto,
        userId,
      );
      this.logger.log('Collection created', {
        collectionId: collection.id,
        userId,
      });
      return collection;
    } catch (error) {
      this.logger.error('Failed to create collection', error, {
        userId,
        name: createCollectionDto.name,
      });
      throw error;
    }
  }

  async copyCollection(
    sourceCollectionId: string,
    userId: string,
  ): Promise<CollectionResponseDto> {
    this.logger.debug('Copying collection', {
      sourceCollectionId,
      userId,
    });
    try {
      // Verify source collection exists
      await this.findById(sourceCollectionId);

      const collection = await this.collectionRepository.copyCollection(
        sourceCollectionId,
        userId,
      );
      this.logger.log('Collection copied', {
        sourceCollectionId,
        newCollectionId: collection.id,
        userId,
      });
      return collection;
    } catch (error) {
      this.logger.error('Failed to copy collection', error, {
        sourceCollectionId,
        userId,
      });
      throw error;
    }
  }

  async addAlgorithmToCollection(
    collectionId: string,
    algorithmId: string,
  ): Promise<AlgorithmCollection> {
    this.logger.debug('Adding algorithm to collection', {
      collectionId,
      algorithmId,
    });
    try {
      // Verify collection exists
      await this.findById(collectionId);

      const algorithmCollection =
        await this.collectionRepository.addAlgorithmToCollection(
          collectionId,
          algorithmId,
        );
      this.logger.log('Algorithm added to collection', {
        collectionId,
        algorithmId,
      });
      return algorithmCollection;
    } catch (error) {
      this.logger.error('Failed to add algorithm to collection', error, {
        collectionId,
        algorithmId,
      });
      throw error;
    }
  }

  async removeAlgorithmFromCollection(
    collectionId: string,
    algorithmId: string,
  ): Promise<void> {
    this.logger.debug('Removing algorithm from collection', {
      collectionId,
      algorithmId,
    });
    try {
      // Verify collection exists
      await this.findById(collectionId);

      await this.collectionRepository.removeAlgorithmFromCollection(
        collectionId,
        algorithmId,
      );
      this.logger.log('Algorithm removed from collection', {
        collectionId,
        algorithmId,
      });
    } catch (error) {
      this.logger.error('Failed to remove algorithm from collection', error, {
        collectionId,
        algorithmId,
      });
      throw error;
    }
  }

  async findUserCollections(userId: string): Promise<CollectionResponseDto[]> {
    this.logger.debug('Finding collections for user', { userId });
    try {
      const collections =
        await this.collectionRepository.findUserCollections(userId);
      this.logger.log('User collections found', {
        userId,
        count: collections.length,
      });
      return collections;
    } catch (error) {
      this.logger.error('Failed to find user collections', error, { userId });
      throw error;
    }
  }
}
