import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CollectionService } from '../services/collection.service';
import { CreateCollectionDto } from '../dto/create-collection.dto';
import {
  CollectionResponseDto,
  AlgorithmCollectionResponseDto,
} from '../dto/collection.response.dto';
import { AuthGuard } from '../../../modules/auth/guards/auth.guard';
import { RolesGuard } from '../../../modules/auth/guards/roles.guard';
import { Roles } from '../../../modules/auth/decorators/roles.decorator';
import { User } from '../../../modules/auth/decorators/user.decorator';
import { StructuredLogger } from '../../../logger/structured-logger.service';

@ApiTags('Collections')
@Controller('api/v1/collections')
export class CollectionController {
  private readonly logger = new StructuredLogger('CollectionController');

  constructor(private readonly collectionService: CollectionService) {}

  @Get('public')
  @ApiOperation({ summary: 'Get all public collections' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all public collections',
    type: [CollectionResponseDto],
  })
  async findPublicCollections(): Promise<CollectionResponseDto[]> {
    this.logger.debug('Fetching public collections');
    try {
      const collections = await this.collectionService.findPublicCollections();
      this.logger.log('Public collections fetched', {
        count: collections.length,
      });
      return collections;
    } catch (error) {
      this.logger.error('Failed to fetch public collections', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get collection by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Collection ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the collection',
    type: CollectionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Collection not found',
  })
  async findById(@Param('id') id: string): Promise<CollectionResponseDto> {
    this.logger.debug('Fetching collection by ID', { collectionId: id });
    try {
      const collection = await this.collectionService.findById(id);
      this.logger.log('Collection fetched', { collectionId: id });
      return collection;
    } catch (error) {
      this.logger.error('Failed to fetch collection', error, {
        collectionId: id,
      });
      throw error;
    }
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new collection' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Collection created successfully',
    type: CollectionResponseDto,
  })
  async create(
    @Body(new ValidationPipe()) createCollectionDto: CreateCollectionDto,
    @User('id') userId: string,
  ): Promise<CollectionResponseDto> {
    this.logger.debug('Creating collection', {
      userId,
      name: createCollectionDto.name,
    });
    try {
      if (createCollectionDto.algorithmIds?.length === 0) {
        throw new BadRequestException('At least one algorithm ID is required');
      }

      const collection = await this.collectionService.create(
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

  @Post(':id/copy')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Copy a collection and its algorithms to the user workspace',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Collection ID to copy',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Collection copied successfully',
    type: CollectionResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Source collection not found',
  })
  async copyCollection(
    @Param('id') id: string,
    @User('id') userId: string,
  ): Promise<CollectionResponseDto> {
    this.logger.debug('Copying collection', {
      sourceCollectionId: id,
      userId,
    });
    try {
      const collection = await this.collectionService.copyCollection(
        id,
        userId,
      );
      this.logger.log('Collection copied', {
        sourceCollectionId: id,
        newCollectionId: collection.id,
        userId,
      });
      return collection;
    } catch (error) {
      this.logger.error('Failed to copy collection', error, {
        sourceCollectionId: id,
        userId,
      });
      throw error;
    }
  }

  @Post(':collectionId/algorithms/:algorithmId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add algorithm to collection' })
  @ApiParam({
    name: 'collectionId',
    type: 'string',
    description: 'Collection ID',
  })
  @ApiParam({
    name: 'algorithmId',
    type: 'string',
    description: 'Algorithm ID',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Algorithm added to collection successfully',
    type: AlgorithmCollectionResponseDto,
  })
  async addAlgorithmToCollection(
    @Param('collectionId') collectionId: string,
    @Param('algorithmId') algorithmId: string,
  ): Promise<AlgorithmCollectionResponseDto> {
    this.logger.debug('Adding algorithm to collection', {
      collectionId,
      algorithmId,
    });
    try {
      const algorithmCollection =
        await this.collectionService.addAlgorithmToCollection(
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

  @Delete(':collectionId/algorithms/:algorithmId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove algorithm from collection' })
  @ApiParam({
    name: 'collectionId',
    type: 'string',
    description: 'Collection ID',
  })
  @ApiParam({
    name: 'algorithmId',
    type: 'string',
    description: 'Algorithm ID',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Algorithm removed from collection successfully',
  })
  async removeAlgorithmFromCollection(
    @Param('collectionId') collectionId: string,
    @Param('algorithmId') algorithmId: string,
  ): Promise<void> {
    this.logger.debug('Removing algorithm from collection', {
      collectionId,
      algorithmId,
    });
    try {
      await this.collectionService.removeAlgorithmFromCollection(
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
}
