import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ContentRepository } from './content.repository';
import {
  ContentNode,
  ContentStatus,
  ContentType,
  LinkType,
} from '@prisma/client';
import { CreateModuleDto } from './dto/create-module.dto';
import { ModuleEntity } from './entities/module.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonEntity } from './entities/lesson.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExerciseEntity } from './entities/exercise.entity';
import { EditContentNodeDto } from './dto/edit-content-node.dto';

@Injectable()
export class ContentService {
  constructor(private contentRepository: ContentRepository) {}

  /**
   * Create a new module
   */
  async createModule(
    dto: CreateModuleDto,
    userId: string,
  ): Promise<ModuleEntity> {
    const { status, body, metadata } = dto;

    const node = await this.contentRepository.createNode({
      type: ContentType.MODULE,
      status: status || ContentStatus.DRAFT,
      body,
      metadata: metadata || {},
      userId,
    });
    return new ModuleEntity(node);
  }

  /**
   * Create a new lesson and link it to its parent module
   */
  async createLesson(
    dto: CreateLessonDto,
    userId: string,
  ): Promise<LessonEntity> {
    const { moduleId, status, body, metadata } = dto;

    // Check if module exists and belongs to user
    const module = await this.contentRepository.findNodeById(moduleId);
    if (!module) {
      throw new NotFoundException(`Module with ID ${moduleId} not found`);
    }

    if (module.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to add lessons to this module',
      );
    }

    const lesson = await this.contentRepository.createNode({
      type: ContentType.LESSON,
      status: status || ContentStatus.DRAFT,
      body,
      metadata: metadata || {},
      userId,
    });

    // Link the lesson to the module
    await this.contentRepository.linkNodes(
      moduleId,
      lesson.id,
      LinkType.DEPENDENCY,
    );

    return new LessonEntity({ ...lesson, moduleId });
  }

  /**
   * Create a new exercise and link it to its parent module and optionally to a lesson
   */
  async createExercise(
    dto: CreateExerciseDto,
    userId: string,
  ): Promise<ExerciseEntity> {
    const { moduleId, lessonId, description, status, body, metadata } = dto;

    // Check if module exists and belongs to user
    const module = await this.contentRepository.findNodeById(moduleId);
    if (!module) {
      throw new NotFoundException(`Module with ID ${moduleId} not found`);
    }

    if (module.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to add exercises to this module',
      );
    }

    // If lessonId is provided, check if it exists and belongs to the same module
    if (lessonId) {
      const lesson = await this.contentRepository.findNodeById(lessonId);
      if (!lesson) {
        throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
      }

      // Check if lesson belongs to the specified module
      const links = await this.contentRepository.findLinks(moduleId, lessonId);
      if (links.length === 0) {
        throw new ForbiddenException(
          'The specified lesson does not belong to the specified module',
        );
      }
    }

    // Create the exercise
    const contentBody = {
      ...body,
      description: description || '',
    };

    const exercise = await this.contentRepository.createNode({
      type: ContentType.EXERCISE,
      status: status || ContentStatus.DRAFT,
      body: contentBody,
      metadata: metadata || {},
      userId,
    });

    // Link the exercise to the module
    await this.contentRepository.linkNodes(
      moduleId,
      exercise.id,
      LinkType.DEPENDENCY,
    );

    // If a lesson is specified, link the exercise to the lesson as well
    if (lessonId) {
      await this.contentRepository.linkNodes(
        lessonId,
        exercise.id,
        LinkType.DEPENDENCY,
      );
    }

    return new ExerciseEntity({ ...exercise, moduleId, lessonId });
  }

  /**
   * Edit a content node (module, lesson, or exercise)
   */
  async editContentNode(
    id: string,
    dto: EditContentNodeDto,
    userId: string,
  ): Promise<ContentNode> {
    // Check if the node exists and belongs to the user
    const node = await this.contentRepository.findNodeById(id);
    if (!node) {
      throw new NotFoundException(`Content node with ID ${id} not found`);
    }

    if (node.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to edit this content',
      );
    }

    // Create the update data
    const updateData: any = {};

    if (dto.status !== undefined) {
      updateData.status = dto.status;
    }

    if (dto.body !== undefined) {
      updateData.body = {
        ...(node.body as Record<string, any>),
        ...dto.body,
      };
    }

    if (dto.metadata !== undefined) {
      updateData.metadata = {
        ...(node.metadata as Record<string, any>),
        ...dto.metadata,
      };
    }

    return this.contentRepository.updateNode(id, updateData);
  }

  /**
   * Edit a module
   */
  async editModule(
    id: string,
    dto: EditContentNodeDto,
    userId: string,
  ): Promise<ModuleEntity> {
    // Check if it's a module
    const node = await this.contentRepository.findNodeById(id);
    if (!node || node.type !== ContentType.MODULE) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    const updatedNode = await this.editContentNode(id, dto, userId);
    return new ModuleEntity(updatedNode);
  }

  /**
   * Edit a lesson
   */
  async editLesson(
    id: string,
    dto: EditContentNodeDto,
    userId: string,
  ): Promise<LessonEntity> {
    // Check if it's a lesson
    const node = await this.contentRepository.findNodeById(id);
    if (!node || node.type !== ContentType.LESSON) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    // Find the module this lesson belongs to
    const links = await this.contentRepository.findLinks(
      undefined,
      id,
      LinkType.DEPENDENCY,
    );
    if (!links.length) {
      throw new NotFoundException(
        `Parent module for lesson with ID ${id} not found`,
      );
    }
    const moduleId = links[0].fromId;

    const updatedNode = await this.editContentNode(id, dto, userId);
    return new LessonEntity({ ...updatedNode, moduleId });
  }

  /**
   * Edit an exercise
   */
  async editExercise(
    id: string,
    dto: EditContentNodeDto,
    userId: string,
  ): Promise<ExerciseEntity> {
    // Check if it's an exercise
    const node = await this.contentRepository.findNodeById(id);
    if (!node || node.type !== ContentType.EXERCISE) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    // Find the module this exercise belongs to
    const moduleLinks = await this.contentRepository.findLinks(
      undefined,
      id,
      LinkType.DEPENDENCY,
    );
    if (!moduleLinks.length) {
      throw new NotFoundException(
        `Parent module for exercise with ID ${id} not found`,
      );
    }

    // Assuming the first link is from a module (could be improved with type checking)
    const moduleId = moduleLinks[0].fromId;

    // Check if this exercise is also linked to a lesson
    let lessonId: string | undefined;
    if (moduleLinks.length > 1) {
      // If there are multiple links, one might be from a lesson
      // A more robust solution would check the type of the from node
      lessonId = moduleLinks[1].fromId;
    }

    const updatedNode = await this.editContentNode(id, dto, userId);
    return new ExerciseEntity({ ...updatedNode, moduleId, lessonId });
  }

  /**
   * Get a module with its lessons and exercises
   */
  async getModule(id: string, userId: string): Promise<any> {
    // TODO: add proper userId check. Don't rely on type safety as the userId may be undefined
    if (!userId) {
      throw new Error('User ID is required');
    }

    const module = await this.contentRepository.findNodeById(id);
    if (!module || module.type !== ContentType.MODULE) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    // Check permissions
    if (module.userId !== userId) {
      // You might want to check for shared permissions here
      throw new ForbiddenException(
        'You do not have permission to view this module',
      );
    }

    // Get lessons
    const lessons = await this.contentRepository.findChildNodes(
      id,
      ContentType.LESSON,
    );

    // Get exercises directly linked to the module
    const moduleExercises = await this.contentRepository.findChildNodes(
      id,
      ContentType.EXERCISE,
    );

    // For each lesson, get its exercises
    const lessonsWithExercises = await Promise.all(
      lessons.map(async (lesson) => {
        const exercises = await this.contentRepository.findChildNodes(
          lesson.id,
          ContentType.EXERCISE,
        );
        return {
          ...lesson,
          exercises,
        };
      }),
    );

    return {
      ...module,
      lessons: lessonsWithExercises,
      exercises: moduleExercises,
    };
  }

  async getLesson(id: string, userId: string): Promise<LessonEntity> {
    const node = await this.contentRepository.findNodeById(id);
    if (!node || node.type !== ContentType.LESSON) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    if (node.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to view this lesson',
      );
    }

    return new LessonEntity({ ...node });
  }

  /**
   * Publish a module and all its children
   */
  async publishModule(id: string, userId: string): Promise<ContentNode> {
    const module = await this.contentRepository.findNodeById(id);
    if (!module || module.type !== ContentType.MODULE) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    if (module.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to publish this module',
      );
    }

    // Update the module status
    const updatedModule = await this.contentRepository.updateNode(id, {
      status: ContentStatus.CREATED,
    });

    // Find all children (lessons and exercises)
    const lessons = await this.contentRepository.findChildNodes(
      id,
      ContentType.LESSON,
    );
    const moduleExercises = await this.contentRepository.findChildNodes(
      id,
      ContentType.EXERCISE,
    );

    // Update status of lessons
    for (const lesson of lessons) {
      await this.contentRepository.updateNode(lesson.id, {
        status: ContentStatus.CREATED,
      });

      // Find exercises linked to this lesson
      const lessonExercises = await this.contentRepository.findChildNodes(
        lesson.id,
        ContentType.EXERCISE,
      );

      // Update status of exercises linked to lessons
      for (const exercise of lessonExercises) {
        await this.contentRepository.updateNode(exercise.id, {
          status: ContentStatus.CREATED,
        });
      }
    }

    // Update status of exercises linked directly to module
    for (const exercise of moduleExercises) {
      await this.contentRepository.updateNode(exercise.id, {
        status: ContentStatus.CREATED,
      });
    }

    return updatedModule;
  }
}
