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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ContentService } from './content.service';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { User } from 'src/modules/auth/decorators/user.decorator';
import { StructuredLogger } from 'src/logger/structured-logger.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { EditContentNodeDto } from './dto/edit-content-node.dto';
import { ModuleEntity } from './entities/module.entity';
import { LessonEntity } from './entities/lesson.entity';
import { ExerciseEntity } from './entities/exercise.entity';
import { ContentNode } from '@prisma/client';
import { CheckQuestionDto, QuestionResponseDto } from './dto/questions.dto';
import { AgentsService } from '../chat/services/agents.service';
import { PermissionDto } from '../permission/dto';
import {
  EventDto,
  InteractionRequestDto,
  InteractionResponseDto,
} from './dto/interaction.dto';
import { InteractionBody } from './entities/interaction.entity';
import { InteractionService } from './services/interaction.service';

@ApiTags('Content')
@Controller('api/v1/content')
export class ContentController {
  private readonly logger = new StructuredLogger('ContentController');

  constructor(
    private readonly contentService: ContentService,
    private readonly agentsService: AgentsService,
    private readonly interactionService: InteractionService,
  ) {}

  // Module endpoints
  @Get('modules')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all modules preview for the authenticated user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all modules for the user',
    type: [ModuleEntity],
  })
  async getAllModules(@User('id') userId: string): Promise<ModuleEntity[]> {
    this.logger.debug('Fetching All Modules for User', { userId });
    try {
      const modules = await this.contentService.getAllModules(userId);
      this.logger.log('All Modules Fetched', { userId, count: modules.length });
      return modules;
    } catch (error) {
      this.logger.error('All Modules Fetch Failed', error, { userId });
      throw error;
    }
  }

  @Post('modules')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new module' })
  @ApiBody({ type: CreateModuleDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Module created successfully',
    type: ModuleEntity,
  })
  async createModule(
    @User('id') userId: string,
    @Body(new ValidationPipe()) createModuleDto: CreateModuleDto,
  ): Promise<ModuleEntity> {
    this.logger.debug('Creating Module', {
      title: createModuleDto.body?.title,
    });
    try {
      const module = await this.contentService.createModule(
        createModuleDto,
        userId,
      );
      this.logger.log('Module Created', { moduleId: module.id });
      return module;
    } catch (error) {
      this.logger.error('Module Creation Failed', error);
      throw error;
    }
  }

  @Get('modules/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a module with its lessons and exercises' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Module ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the module with its lessons and exercises',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Module not found',
  })
  async getModule(
    @User('id') userId: string,
    @Param('id') id: string,
  ): Promise<{
    module: ModuleEntity;
    permission: PermissionDto | null;
    lessons: LessonEntity[];
  }> {
    this.logger.debug('Fetching Module', { moduleId: id });
    try {
      return this.contentService.getModule(id, userId);
    } catch (error) {
      this.logger.error('Module Fetch Failed', error, { moduleId: id });
      throw error;
    }
  }

  @Put('modules/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit a module' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Module ID',
  })
  @ApiBody({ type: EditContentNodeDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Module updated successfully',
    type: ModuleEntity,
  })
  async editModule(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body(new ValidationPipe()) editContentNodeDto: EditContentNodeDto,
  ): Promise<ModuleEntity> {
    this.logger.debug('Editing Module', {
      moduleId: id,
      updatedFields: Object.keys(editContentNodeDto),
    });
    try {
      const module = await this.contentService.editModule(
        id,
        editContentNodeDto,
        userId,
      );
      this.logger.log('Module Updated', { moduleId: id });
      return module;
    } catch (error) {
      this.logger.error('Module Update Failed', error, { moduleId: id });
      throw error;
    }
  }

  @Put('modules/:id/publish')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publish a module and all its children' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Module ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Module published successfully',
  })
  async publishModule(
    @User('id') userId: string,
    @Param('id') id: string,
  ): Promise<ContentNode> {
    this.logger.debug('Publishing Module', { moduleId: id });
    try {
      const module = await this.contentService.publishModule(id, userId);
      this.logger.log('Module Published', { moduleId: id });
      return module;
    } catch (error) {
      this.logger.error('Module Publish Failed', error, { moduleId: id });
      throw error;
    }
  }

  // Lesson endpoints
  @Post('lessons')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiBody({ type: CreateLessonDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Lesson created successfully',
    type: LessonEntity,
  })
  async createLesson(
    @User('id') userId: string,
    @Body(new ValidationPipe()) createLessonDto: CreateLessonDto,
  ): Promise<LessonEntity> {
    this.logger.debug('Creating Lesson', {
      moduleId: createLessonDto.moduleId,
      title: createLessonDto.body?.title,
    });
    try {
      const lesson = await this.contentService.createLesson(
        createLessonDto,
        userId,
      );
      this.logger.log('Lesson Created', {
        lessonId: lesson.id,
        moduleId: lesson.moduleId,
      });
      return lesson;
    } catch (error) {
      this.logger.error('Lesson Creation Failed', error);
      throw error;
    }
  }

  @Get('lessons/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a lesson' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Lesson ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the lesson',
    type: LessonEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Lesson not found',
  })
  async getLesson(
    @User('id') userId: string,
    @Param('id') id: string,
  ): Promise<{
    data: {
      lesson: LessonEntity;
      permission: PermissionDto | null;
      interaction: InteractionBody | null;
    };
  }> {
    this.logger.debug('Fetching Lesson', { lessonId: id });
    try {
      const data = await this.contentService.getLesson(id, userId);
      this.logger.log('Lesson Fetched', { lessonId: id });
      return {
        data,
      };
    } catch (error) {
      this.logger.error('Lesson Fetch Failed', error, { lessonId: id });
      throw error;
    }
  }

  @Put('lessons/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit a lesson' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Lesson ID',
  })
  @ApiBody({ type: EditContentNodeDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lesson updated successfully',
    type: LessonEntity,
  })
  async editLesson(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body(new ValidationPipe()) editContentNodeDto: EditContentNodeDto,
  ): Promise<LessonEntity> {
    this.logger.debug('Editing Lesson', {
      lessonId: id,
      updatedFields: Object.keys(editContentNodeDto),
    });
    try {
      const lesson = await this.contentService.editLesson(
        id,
        editContentNodeDto,
        userId,
      );
      this.logger.log('Lesson Updated', { lessonId: id });
      return lesson;
    } catch (error) {
      this.logger.error('Lesson Update Failed', error, { lessonId: id });
      throw error;
    }
  }

  // Exercise endpoints
  @Post('exercises')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new exercise' })
  @ApiBody({ type: CreateExerciseDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Exercise created successfully',
    type: ExerciseEntity,
  })
  async createExercise(
    @User('id') userId: string,
    @Body(new ValidationPipe()) createExerciseDto: CreateExerciseDto,
  ): Promise<ExerciseEntity> {
    this.logger.debug('Creating Exercise', {
      moduleId: createExerciseDto.moduleId,
      lessonId: createExerciseDto.lessonId,
    });
    try {
      const exercise = await this.contentService.createExercise(
        createExerciseDto,
        userId,
      );
      this.logger.log('Exercise Created', {
        exerciseId: exercise.id,
        moduleId: exercise.moduleId,
        lessonId: exercise.lessonId,
      });
      return exercise;
    } catch (error) {
      this.logger.error('Exercise Creation Failed', error);
      throw error;
    }
  }

  @Put('exercises/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit an exercise' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Exercise ID',
  })
  @ApiBody({ type: EditContentNodeDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exercise updated successfully',
    type: ExerciseEntity,
  })
  async editExercise(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body(new ValidationPipe()) editContentNodeDto: EditContentNodeDto,
  ): Promise<ExerciseEntity> {
    this.logger.debug('Editing Exercise', {
      exerciseId: id,
      updatedFields: Object.keys(editContentNodeDto),
    });
    try {
      const exercise = await this.contentService.editExercise(
        id,
        editContentNodeDto,
        userId,
      );
      this.logger.log('Exercise Updated', { exerciseId: id });
      return exercise;
    } catch (error) {
      this.logger.error('Exercise Update Failed', error, { exerciseId: id });
      throw error;
    }
  }

  @Post('questions/:questionId/check')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check an exercise' })
  @ApiParam({
    name: 'questionId',
    type: 'string',
    description: 'Question ID',
  })
  @ApiBody({ type: CheckQuestionDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Question checked successfully',
    type: QuestionResponseDto,
  })
  async checkQuestion(
    @User('id') userId: string,
    @Param('questionId') questionId: string,
    @Body(new ValidationPipe()) checkQuestionDto: CheckQuestionDto,
  ): Promise<QuestionResponseDto> {
    this.logger.debug('Checking Question', {
      questionId: questionId,
      userId: userId,
    });
    try {
      const response = await this.agentsService.checkQuestion(
        checkQuestionDto,
        userId,
      );
      this.logger.log('Question Check Completed', {
        questionId,
        userId,
        score: response.score,
        isCorrect: response.isCorrect,
      });
      return response;
    } catch (error) {
      this.logger.error('Question Check Failed', error, {
        questionId,
        userId,
      });
      throw error;
    }
  }

  @Post('interactions')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add an entry to an interaction' })
  @ApiBody({ type: EventDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Interaction updated successfully',
    type: EventDto,
  })
  async handleInteraction(
    @User('id') userId: string,
    @Body(new ValidationPipe()) interactionRequestDto: InteractionRequestDto,
  ): Promise<InteractionResponseDto> {
    const { nodeId, event } = interactionRequestDto;
    this.logger.debug('Adding Interaction Entry', {
      eventType: event.type,
      nodeId,
      userId,
    });
    try {
      const interaction = await this.interactionService.handleInteraction(
        nodeId,
        userId,
        event,
      );
      this.logger.log('Interaction Entry Added', {
        eventType: event.type,
        nodeId,
        userId,
      });
      return {
        data: {
          interaction,
        },
      };
    } catch (error) {
      this.logger.error('Interaction Entry Add Failed', error, {
        eventType: event.type,
        nodeId,
        userId,
      });
      throw error;
    }
  }
}
