import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
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
  AlgorithmUserData,
  DailyAlgorithm,
  AlgorithmUserProgress,
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

  @Delete('templates/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an algorithm template' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Algorithm template ID',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Algorithm template deleted successfully',
  })
  async deleteTemplate(@Param('id') id: string): Promise<void> {
    await this.algorithmService.deleteTemplate(id);
  }

  // User-specific algorithm data endpoints
  @Get('user-data/:algorithmId')
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
    type: AlgorithmUserData,
  })
  async findUserData(
    @User('id') userId: string,
    @Param('algorithmId') algorithmId: string,
  ): Promise<AlgorithmUserData | null> {
    return this.algorithmService.findUserData(userId, algorithmId);
  }

  @Post('user-data/:algorithmId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create user-specific algorithm data' })
  @ApiParam({
    name: 'algorithmId',
    type: 'string',
    description: 'Algorithm ID',
  })
  @ApiBody({ type: String, description: 'Notes' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User-specific algorithm data created successfully',
    type: AlgorithmUserData,
  })
  async createUserData(
    @User('id') userId: string,
    @Param('algorithmId') algorithmId: string,
    @Body('notes') notes?: string,
  ): Promise<AlgorithmUserData> {
    return this.algorithmService.createUserData(userId, algorithmId, notes);
  }

  @Put('user-data/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user-specific algorithm data' })
  @ApiParam({ name: 'id', type: 'string', description: 'User data ID' })
  @ApiBody({ type: String, description: 'Notes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User-specific algorithm data updated successfully',
    type: AlgorithmUserData,
  })
  async updateUserData(
    @Param('id') id: string,
    @Body('notes') notes: string,
  ): Promise<AlgorithmUserData> {
    return this.algorithmService.updateUserData(id, notes);
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

  @Post('daily/:algorithmId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a daily algorithm' })
  @ApiParam({
    name: 'algorithmId',
    type: 'string',
    description: 'Algorithm ID',
  })
  @ApiQuery({
    name: 'date',
    required: false,
    type: Date,
    description: 'Date for the daily algorithm (defaults to today)',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Daily algorithm created successfully',
    type: DailyAlgorithm,
  })
  async createDailyAlgorithm(
    @User('id') userId: string,
    @Param('algorithmId') algorithmId: string,
    @Query('date') date?: string,
  ): Promise<DailyAlgorithm> {
    return this.algorithmService.createDailyAlgorithm(
      userId,
      algorithmId,
      date ? new Date(date) : undefined,
    );
  }

  @Put('daily/:id/complete')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark a daily algorithm as completed' })
  @ApiParam({ name: 'id', type: 'string', description: 'Daily algorithm ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Daily algorithm marked as completed',
    type: DailyAlgorithm,
  })
  async markDailyAlgorithmCompleted(
    @Param('id') id: string,
  ): Promise<DailyAlgorithm> {
    return this.algorithmService.markDailyAlgorithmCompleted(id);
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
    return this.algorithmService.createSubmission({
      ...submission,
      userId,
      algorithmId,
    });
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

  // Combined data endpoints
  @Get(':algorithmId/progress')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user progress for an algorithm' })
  @ApiParam({
    name: 'algorithmId',
    type: 'string',
    description: 'Algorithm ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns user progress',
    type: AlgorithmUserProgress,
  })
  async findUserProgress(
    @User('id') userId: string,
    @Param('algorithmId') algorithmId: string,
  ): Promise<AlgorithmUserProgress> {
    return this.algorithmService.findUserProgress(userId, algorithmId);
  }
}
