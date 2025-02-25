import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  UseGuards,
  ValidationPipe,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import {
  AlgorithmTemplate,
  AlgorithmPracticeData,
  DailyAlgorithm,
  AlgorithmSubmission,
} from '../interfaces/algorithm.interface';
import { AlgorithmService } from '../services/algorithm.service';
import { CreateAlgorithmDto } from '../dto/create-algorithm.dto';
import { UpdateAlgorithmDto } from '../dto/update-algorithm.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { User } from 'src/modules/auth/decorators/user.decorator';
import { StructuredLogger } from 'src/logger/structured-logger.service';

@ApiTags('Algorithms')
@Controller('api/v1/algorithms')
export class AlgorithmController {
  private readonly logger = new StructuredLogger('AlgorithmController');

  constructor(private readonly algorithmService: AlgorithmService) {}

  // Algorithm Template endpoints
  @Get('templates')
  @ApiOperation({ summary: 'Get all algorithm templates' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all algorithm templates',
    type: [AlgorithmTemplate],
  })
  async findAllTemplates(): Promise<AlgorithmTemplate[]> {
    this.logger.debug('Fetching All Templates');
    try {
      const templates = await this.algorithmService.findAllTemplates();
      this.logger.log('Templates Fetched', { count: templates.length });
      return templates;
    } catch (error) {
      this.logger.error('Templates Fetch Failed', error);
      throw error;
    }
  }

  @Get('templates/:id') // TODO: fix api: /:id/templates
  @ApiOperation({ summary: 'Get algorithm template by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Algorithm template ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the algorithm template',
    type: AlgorithmTemplate,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Algorithm template not found',
  })
  async findTemplateById(@Param('id') id: string): Promise<AlgorithmTemplate> {
    this.logger.debug('Fetching Template By ID', { templateId: id });
    try {
      const template = await this.algorithmService.findTemplateById(id);
      this.logger.log('Template Fetched', { templateId: id });
      return template;
    } catch (error) {
      this.logger.error('Template Fetch Failed', error, { templateId: id });
      throw error;
    }
  }

  @Post('templates')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new algorithm template' })
  @ApiBody({ type: CreateAlgorithmDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Algorithm template created successfully',
    type: AlgorithmTemplate,
  })
  async createTemplate(
    @Body(new ValidationPipe()) createAlgorithmDto: CreateAlgorithmDto,
  ): Promise<AlgorithmTemplate> {
    this.logger.debug('Creating Template', {
      title: createAlgorithmDto.title,
      difficulty: createAlgorithmDto.difficulty,
    });
    try {
      const template =
        await this.algorithmService.createTemplate(createAlgorithmDto);
      this.logger.log('Template Created', { templateId: template.id });
      return template;
    } catch (error) {
      this.logger.error('Template Creation Failed', error);
      throw error;
    }
  }

  @Put('templates/:id') // TODO: fix api: /:id/templates
  @UseGuards(AuthGuard, RolesGuard)
  // @Roles('admin') // TODO: it should only update it's own templates
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an algorithm template' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Algorithm template ID',
  })
  @ApiBody({ type: UpdateAlgorithmDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Algorithm template updated successfully',
    type: AlgorithmTemplate,
  })
  async updateTemplate(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateAlgorithmDto: UpdateAlgorithmDto,
  ): Promise<AlgorithmTemplate> {
    this.logger.debug('Updating Template', {
      templateId: id,
      updatedFields: Object.keys(updateAlgorithmDto),
    });
    try {
      const template = await this.algorithmService.updateTemplate(
        id,
        updateAlgorithmDto,
      );
      this.logger.log('Template Updated', { templateId: id });
      return template;
    } catch (error) {
      this.logger.error('Template Update Failed', error, { templateId: id });
      throw error;
    }
  }

  // User-specific algorithm data endpoints
  @Get('practice/:algorithmId') // TODO: fix api: /:algorithmId/practice
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user-specific algorithm data' })
  @ApiParam({
    name: 'algorithmId',
    type: 'string',
    description: 'Algorithm ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns user-specific algorithm data',
    type: AlgorithmPracticeData,
  })
  async findUserData(
    @User('id') userId: string,
    @Param('algorithmId') algorithmId: string,
  ): Promise<AlgorithmPracticeData | null> {
    this.logger.debug('Fetching Practice Data', {
      algorithmId,
    });
    try {
      const data = await this.algorithmService.findPracticeData(
        userId,
        algorithmId,
      );
      this.logger.log('Practice Data Fetched', {
        algorithmId,
        found: !!data,
      });
      return data;
    } catch (error) {
      this.logger.error('Practice Data Fetch Failed', error.stack, {
        algorithmId,
      });
      throw error;
    }
  }

  @Put('practice/:algorithmId/notes') // TODO: fix api: /:algorithmId/notes
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user notes for an algorithm' })
  @ApiParam({
    name: 'algorithmId',
    type: 'string',
    description: 'Algorithm ID',
  })
  @ApiBody({ type: String, description: 'Notes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User algorithm notes updated successfully',
    type: AlgorithmPracticeData,
  })
  async updateAlgorithmNotes(
    @User('id') userId: string,
    @Param('algorithmId') algorithmId: string,
    @Body('notes') notes: string,
  ): Promise<void> {
    this.logger.debug('Updating Algorithm Notes', { algorithmId });
    try {
      await this.algorithmService.updateAlgorithmNotes(
        userId,
        algorithmId,
        notes,
      );
      this.logger.log('Algorithm Notes Updated', { algorithmId });
    } catch (error) {
      this.logger.error('Algorithm Notes Update Failed', error, {
        algorithmId,
      });
      throw error;
    }
  }

  // Daily algorithm endpoints
  @Get('daily')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get daily algorithms' })
  @ApiQuery({
    name: 'date',
    required: false,
    type: Date,
    description: 'Date for daily algorithms (defaults to today)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns daily algorithms',
    type: [DailyAlgorithm],
  })
  async findDailyAlgorithms(
    @User('id') userId: string,
    @Query('date') date?: string,
  ): Promise<DailyAlgorithm[]> {
    this.logger.debug('Fetching Daily Algorithms', {
      date: date || 'today',
    });
    try {
      const algorithms = await this.algorithmService.findDailyAlgorithms(
        userId,
        date ? new Date(date) : undefined,
      );
      this.logger.log('Daily Algorithms Fetched', {
        count: algorithms.length,
        date: date || 'today',
      });
      return algorithms;
    } catch (error) {
      this.logger.error('Daily Algorithms Fetch Failed', error, {
        date: date || 'today',
      });
      throw error;
    }
  }

  // Submission endpoints
  @Post(':algorithmId/submissions') // TODO: fix api: /:algorithmId/submissions
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a submission' })
  @ApiParam({
    name: 'algorithmId',
    type: 'string',
    description: 'Algorithm ID',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Submission created successfully',
    type: AlgorithmSubmission,
  })
  async createSubmission(
    @User('id') userId: string,
    @Param('algorithmId') algorithmId: string,
    @Body()
    submission: Omit<
      AlgorithmSubmission,
      'id' | 'createdAt' | 'algorithmId' | 'algorithmUserDataId'
    >,
  ): Promise<AlgorithmSubmission> {
    this.logger.debug('Creating Submission', {
      algorithmId,
      language: submission.language,
      rating: submission.rating,
    });
    try {
      const result = await this.algorithmService.createSubmission(
        userId,
        algorithmId,
        submission,
      );
      this.logger.log('Submission Created', {
        algorithmId,
        submissionId: result.id,
        rating: result.rating,
      });
      return result;
    } catch (error) {
      this.logger.error('Submission Creation Failed', error, {
        algorithmId,
        language: submission.language,
        rating: submission.rating,
      });
      throw error;
    }
  }

  @Get('submissions/:algorithmId') // TODO: fix api: /:algorithmId/submissions
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user submissions for an algorithm' })
  @ApiParam({
    name: 'algorithmId',
    type: 'string',
    description: 'Algorithm ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns user submissions',
    type: [AlgorithmSubmission],
  })
  async findUserSubmissions(
    @User('id') userId: string,
    @Param('algorithmId') algorithmId: string,
  ): Promise<AlgorithmSubmission[]> {
    this.logger.debug('Fetching User Submissions', { algorithmId });
    try {
      const submissions = await this.algorithmService.findUserSubmissions(
        userId,
        algorithmId,
      );
      this.logger.log('User Submissions Fetched', {
        algorithmId,
        count: submissions.length,
      });
      return submissions;
    } catch (error) {
      this.logger.error('User Submissions Fetch Failed', error, {
        algorithmId,
      });
      throw error;
    }
  }
}
