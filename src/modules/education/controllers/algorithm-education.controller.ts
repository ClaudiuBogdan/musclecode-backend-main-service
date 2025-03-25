import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AlgorithmEducationService } from '../services/algorithm-education.service';
import { GenerateAlgorithmCollectionDto } from '../dto/generate-algorithm-collection.dto';
import {
  AlgorithmCollectionOutline,
  GeneratedAlgorithmTemplate,
} from '../interfaces/algorithm-collection.interface';

@ApiTags('education/algorithms')
@Controller('education/algorithms')
export class AlgorithmEducationController {
  constructor(
    private readonly algorithmEducationService: AlgorithmEducationService,
  ) {}

  @Post('collection/outline')
  @ApiOperation({
    summary: 'Generate an algorithm collection outline based on a topic',
  })
  @ApiBody({ type: GenerateAlgorithmCollectionDto })
  @ApiResponse({
    status: 201,
    description: 'Algorithm collection outline generated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async generateCollectionOutline(
    @Body() generateDto: GenerateAlgorithmCollectionDto,
  ): Promise<AlgorithmCollectionOutline> {
    try {
      return await this.algorithmEducationService.generateCollectionOutline(
        generateDto,
      );
    } catch (error) {
      throw new HttpException(
        `Failed to generate algorithm collection outline: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('collection/generate')
  @ApiOperation({
    summary: 'Generate all algorithms for a collection based on an outline',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        collectionOutline: {
          type: 'object',
          example: {
            name: 'Lodash Utility Functions',
            description:
              'A collection of coding challenges to learn Lodash utility functions',
            algorithms: [
              {
                title: 'Array Chunking with _.chunk',
                summary:
                  'Learn how to split arrays into groups of specified size',
                difficulty: 'beginner',
                categories: ['arrays', 'lodash', 'utility'],
              },
            ],
          },
        },
        language: {
          type: 'string',
          example: 'javascript',
        },
      },
      required: ['collectionOutline', 'language'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Algorithm collection generated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async generateFullCollection(
    @Body()
    body: {
      collectionOutline: AlgorithmCollectionOutline;
      language: string;
    },
  ): Promise<GeneratedAlgorithmTemplate[]> {
    try {
      return await this.algorithmEducationService.generateFullCollection(
        body.collectionOutline,
        body.language,
      );
    } catch (error) {
      throw new HttpException(
        `Failed to generate algorithm collection: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('template/generate')
  @ApiOperation({
    summary: 'Generate a single algorithm template from a collection outline',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        collectionOutline: {
          type: 'object',
          example: {
            name: 'Lodash Utility Functions',
            description:
              'A collection of coding challenges to learn Lodash utility functions',
            algorithms: [
              {
                title: 'Array Chunking with _.chunk',
                summary:
                  'Learn how to split arrays into groups of specified size',
                difficulty: 'beginner',
                categories: ['arrays', 'lodash', 'utility'],
              },
            ],
          },
        },
        algorithmIndex: {
          type: 'number',
          example: 0,
        },
        language: {
          type: 'string',
          example: 'javascript',
        },
      },
      required: ['collectionOutline', 'algorithmIndex', 'language'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Algorithm template generated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async generateSingleTemplate(
    @Body()
    body: {
      collectionOutline: AlgorithmCollectionOutline;
      algorithmIndex: number;
      language: string;
    },
  ): Promise<GeneratedAlgorithmTemplate> {
    try {
      return await this.algorithmEducationService.generateAlgorithmTemplate(
        body.collectionOutline,
        body.algorithmIndex,
        body.language,
      );
    } catch (error) {
      throw new HttpException(
        `Failed to generate algorithm template: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
