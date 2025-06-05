import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ContentRepository } from './content.repository';
import { PermissionService } from '../permission/permission.service';
import {
  ContentNode,
  ContentStatus,
  ContentType,
  LinkType,
  PermissionLevel,
} from '@prisma/client';
import { CreateModuleDto } from './dto/create-module.dto';
import { ModuleEntity } from './entities/module.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonBody, LessonEntity } from './entities/lesson.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExerciseEntity } from './entities/exercise.entity';
import { EditContentNodeDto } from './dto/edit-content-node.dto';
import { v4 as uuidv4 } from 'uuid';
import { PermissionDto } from '../permission/dto';
import {
  InteractionBody,
  InteractionEvent,
  ItemInteractionLog,
  validLessonInteractionEvents,
} from './entities/interaction.entity';
import { InteractionDataDto } from './dto/interaction.dto';

@Injectable()
export class ContentService {
  constructor(
    private contentRepository: ContentRepository,
    private permissionService: PermissionService,
  ) {}

  /**
   * Get all modules for a user
   */
  async getAllModules(userId: string): Promise<ModuleEntity[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const modules = await this.contentRepository.findNodesByUserIdAndType(
      userId,
      ContentType.MODULE,
    );
    return modules.map((module: ContentNode) => new ModuleEntity(module));
  }

  /**
   * Create a new module
   */
  async createModule(
    dto: CreateModuleDto,
    userId: string,
  ): Promise<ModuleEntity> {
    const { status, body, metadata } = dto;

    const node = await this.contentRepository.createNodeWithPermission(
      {
        type: ContentType.MODULE,
        status: status || ContentStatus.DRAFT,
        body,
        metadata: metadata || {},
      },
      userId,
    );
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

    // Check if module exists and user has permission to edit it
    const module = await this.contentRepository.findNodeById(moduleId);
    if (!module) {
      throw new NotFoundException(`Module with ID ${moduleId} not found`);
    }

    // TODO: FIXME: add proper userId check. Don't rely on type safety as the userId may be undefined
    const hasPermission = await this.permissionService.checkUserPermission(
      userId,
      moduleId,
      PermissionLevel.EDIT,
    );
    if (!hasPermission) {
      throw new ForbiddenException(
        'You do not have permission to add lessons to this module',
      );
    }

    // TODO: fix this. Maybe the lesson permission should be inherited from the module. No need to create an explicit permission for the lesson.
    const lesson = await this.contentRepository.createNode({
      type: ContentType.LESSON,
      status: status || ContentStatus.DRAFT,
      body,
      metadata: metadata || {},
    });

    // Link the lesson to the module
    // TODO: FIXME: add lesson order
    await this.contentRepository.linkNodes(
      moduleId,
      lesson.id,
      LinkType.DEPENDENCY,
    );

    return new LessonEntity({ ...lesson, moduleId });
  }

  async upsertLessons(
    moduleId: string,
    userId: string,
    lessons: Pick<LessonEntity, 'body' | 'status' | 'metadata'>[],
  ): Promise<LessonEntity[]> {
    // Check if module exists and user has permission to edit it
    const module = await this.contentRepository.findNodeById(moduleId);
    if (!module || module.type !== ContentType.MODULE) {
      throw new NotFoundException(`Module with ID ${moduleId} not found`);
    }

    // TODO: FIXME: add proper userId check. Don't rely on type safety as the userId may be undefined
    const hasPermission = await this.permissionService.checkUserPermission(
      userId,
      moduleId,
      PermissionLevel.EDIT,
    );
    if (!hasPermission) {
      throw new ForbiddenException(
        'You do not have permission to upsert lessons for this module',
      );
    }

    // Archive existing lessons
    const oldLessons = await this.contentRepository.findChildNodes(
      moduleId,
      ContentType.LESSON,
    );
    for (const old of oldLessons) {
      if (old.status !== ContentStatus.ARCHIVED) {
        await this.contentRepository.updateNode(old.id, {
          status: ContentStatus.ARCHIVED,
        });
      }
    }

    // Create and link new lessons
    const createdLessons: LessonEntity[] = [];
    for (const lesson of lessons) {
      const newLesson = await this.contentRepository.createNodeWithPermission(
        {
          type: ContentType.LESSON,
          status: lesson.status || ContentStatus.DRAFT,
          body: lesson.body,
          metadata: lesson.metadata || {},
        },
        userId,
      );
      await this.contentRepository.linkNodes(
        moduleId,
        newLesson.id,
        LinkType.DEPENDENCY,
      );
      createdLessons.push(new LessonEntity({ ...newLesson, moduleId }));
    }

    return createdLessons;
  }

  /**
   * Create a new exercise and link it to its parent module and optionally to a lesson
   */
  async createExercise(
    dto: CreateExerciseDto,
    userId: string,
  ): Promise<ExerciseEntity> {
    const { moduleId, lessonId, description, status, body, metadata } = dto;

    // Check if module exists and user has permission to edit it
    const module = await this.contentRepository.findNodeById(moduleId);
    if (!module) {
      throw new NotFoundException(`Module with ID ${moduleId} not found`);
    }

    // TODO: FIXME: add proper userId check. Don't rely on type safety as the userId may be undefined
    const hasPermission = await this.permissionService.checkUserPermission(
      userId,
      moduleId,
      PermissionLevel.EDIT,
    );
    if (!hasPermission) {
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

    const exercise = await this.contentRepository.createNodeWithPermission(
      {
        type: ContentType.EXERCISE,
        status: status || ContentStatus.DRAFT,
        body: contentBody,
        metadata: metadata || {},
      },
      userId,
    );

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
    // Check if the node exists and user has permission to edit it
    const node = await this.contentRepository.findNodeById(id);
    if (!node) {
      throw new NotFoundException(`Content node with ID ${id} not found`);
    }

    // TODO: FIXME: add proper userId check. Don't rely on type safety as the userId may be undefined
    const hasPermission = await this.permissionService.checkUserPermission(
      userId,
      id,
      PermissionLevel.EDIT,
    );
    if (!hasPermission) {
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
  async getModule(
    id: string,
    userId: string,
  ): Promise<{
    module: ModuleEntity;
    lessons: LessonEntity[];
    permission: PermissionDto | null;
  }> {
    // TODO: add proper userId check. Don't rely on type safety as the userId may be undefined
    if (!userId) {
      throw new Error('User ID is required');
    }

    const module = await this.contentRepository.findNodeById(id);
    if (!module || module.type !== ContentType.MODULE) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    // Check permissions - user needs at least VIEW permission
    // TODO: FIXME: add proper userId check. Don't rely on type safety as the userId may be undefined
    let userPermission =
      await this.permissionService.getUserPermissionForContentNode(userId, id);
    if (!userPermission && !module.isPublic) {
      throw new ForbiddenException(
        'You do not have permission to view this module',
      );
    }

    if (!userPermission && module.isPublic) {
      userPermission = await this.permissionService.grantPermission(
        {
          userId,
          contentNodeId: id,
          permissionLevel: module.defaultPermission,
        },
        null,
      );
    }

    // Get lessons
    const lessons = await this.contentRepository.findChildNodes(
      id,
      ContentType.LESSON,
    );

    // TODO: FIXME: add lesson order. For now, order the lessons by creation date, from oldest to newest
    const orderedLessons = lessons.sort((a, b) => {
      const lessonA = new Date(a.createdAt).getTime();
      const lessonB = new Date(b.createdAt).getTime();
      return lessonA - lessonB;
    });

    return {
      module: new ModuleEntity(module),
      lessons: orderedLessons.map((lesson) => new LessonEntity(lesson)),
      permission: userPermission,
    };
  }

  async getLesson(
    id: string,
    userId: string,
  ): Promise<{
    lesson: LessonEntity;
    permission: PermissionDto | null;
    interaction: InteractionBody | null;
  }> {
    const node = await this.contentRepository.findNodeById(id);
    if (!node || node.type !== ContentType.LESSON) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    // Check permissions - user needs at least VIEW permission
    // TODO: FIXME: add proper userId check. Don't rely on type safety as the userId may be undefined
    const userPermission =
      await this.permissionService.getUserPermissionForContentNode(userId, id);
    if (!userPermission) {
      throw new ForbiddenException(
        'You do not have permission to view this lesson',
      );
    }

    const interactionEntry = await this.contentRepository.findUserInteraction(
      id,
      userId,
    );

    const interaction = interactionEntry?.body as InteractionBody | null;

    return {
      lesson: new LessonEntity({ ...node }),
      permission: userPermission,
      interaction,
    };
  }

  private itemExistsInLessonBody(lessonBody: any, itemId: string): boolean {
    const body = lessonBody as Partial<LessonBody>;
    if (body && body.chunks && Array.isArray(body.chunks)) {
      for (const chunk of body.chunks) {
        if (chunk.content && Array.isArray(chunk.content)) {
          for (const contentItem of chunk.content) {
            if (contentItem.id === itemId) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  private isInteractiveItemPresent(
    node: ContentNode,
    eventType: string,
    itemId?: string,
  ): boolean {
    if (!node.body || typeof node.body !== 'object') {
      return false;
    }

    const isLessonEvent = this.isLessonInteractionEvent(eventType);

    if (isLessonEvent && !itemId) {
      return false;
    }

    if (isLessonEvent && node.type === ContentType.LESSON) {
      return this.itemExistsInLessonBody(node.body, itemId as string);
    }

    return false;
  }

  private isLessonInteractionEvent(eventType: string): boolean {
    return validLessonInteractionEvents.includes(eventType as any);
  }

  /**
   * Publish a module and all its children
   */
  async publishModule(id: string, userId: string): Promise<ContentNode> {
    const module = await this.contentRepository.findNodeById(id);
    if (!module || module.type !== ContentType.MODULE) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    // TODO: FIXME: add proper userId check. Don't rely on type safety as the userId may be undefined
    const hasPermission = await this.permissionService.checkUserPermission(
      userId,
      id,
      PermissionLevel.MANAGE,
    );
    if (!hasPermission) {
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

  // Manage user interactions with content nodes
  async addUserInteraction(
    nodeId: string,
    userId: string,
    interactionDto: InteractionDataDto,
  ): Promise<InteractionBody | null> {
    const hasPermission = await this.permissionService.checkUserPermission(
      userId,
      nodeId,
      PermissionLevel.INTERACT,
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'You do not have permission to interact with this content',
      );
    }

    const node = await this.contentRepository.findNodeById(nodeId);
    if (!node) {
      throw new NotFoundException(`Node with ID ${nodeId} not found`);
    }

    const isValid = this.isInteractiveItemPresent(
      node,
      interactionDto.type,
      interactionDto.id,
    );

    if (!isValid) {
      throw new BadRequestException(
        `Invalid interaction type: ${interactionDto.type}`,
      );
    }

    const isLessonEvent = this.isLessonInteractionEvent(interactionDto.type);
    if (isLessonEvent) {
      return this.handleLessonInteraction(nodeId, userId, interactionDto);
    }

    throw new BadRequestException(
      `Invalid interaction type: ${interactionDto.type}. Not implemented.`,
    );
  }

  private async handleLessonInteraction(
    nodeId: string,
    userId: string,
    interactionDto: InteractionDataDto,
  ): Promise<InteractionBody | null> {
    const interactionDataEntry =
      await this.contentRepository.findOrCreateUserInteraction(nodeId, userId);

    const itemId = interactionDto.id as string; // This is guaranteed to be present if the interaction is valid

    const newEvent: InteractionEvent = {
      eventId: uuidv4(),
      timestamp: new Date(),
      type: interactionDto.type,
      payload: interactionDto.data,
    };

    let currentInteractionBody =
      interactionDataEntry.body as unknown as InteractionBody | null;

    if (
      !currentInteractionBody ||
      typeof currentInteractionBody !== 'object' ||
      !currentInteractionBody.items ||
      currentInteractionBody.version !== '1.0'
    ) {
      currentInteractionBody = { version: '1.0', items: {} };
    }

    const itemLog: ItemInteractionLog = currentInteractionBody.items[
      itemId
    ] || { events: [] };

    itemLog.events.push(newEvent); // Add the new event
    currentInteractionBody.items[itemId] = itemLog;

    const updatedInteraction =
      await this.contentRepository.updateUserInteraction(
        interactionDataEntry.id,
        currentInteractionBody,
      );

    return updatedInteraction.body as unknown as InteractionBody | null;
  }
}
