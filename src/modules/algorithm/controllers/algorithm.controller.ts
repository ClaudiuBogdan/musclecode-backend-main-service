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

@ApiTags('Algorithms')
@Controller('api/v1/algorithms')
export class AlgorithmController {
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
    return this.algorithmService.findAllTemplates();
  }

  @Get('templates/:id')
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
    return this.algorithmService.findTemplateById(id);
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
    return this.algorithmService.createTemplate(createAlgorithmDto);
  }

  @Put('templates/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
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
    return this.algorithmService.updateTemplate(id, updateAlgorithmDto);
  }

  // User-specific algorithm data endpoints
  @Get('practice/:algorithmId')
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
    return this.algorithmService.findPracticeData(userId, algorithmId);
  }

  @Put('practice/:algorithmId/notes')
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
    return this.algorithmService.updateAlgorithmNotes(
      userId,
      algorithmId,
      notes,
    );
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
    return this.algorithmService.findDailyAlgorithms(
      userId,
      date ? new Date(date) : undefined,
    );
  }

  // Submission endpoints
  @Post('submissions/:algorithmId')
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
      'id' | 'createdAt' | 'userId' | 'algorithmId'
    >,
  ): Promise<AlgorithmSubmission> {
    return this.algorithmService.createSubmission(
      {
        ...submission,
        algorithmId,
      },
      userId,
    );
  }

  @Get('submissions/:algorithmId')
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
    return this.algorithmService.findUserSubmissions(userId, algorithmId);
  }
}
