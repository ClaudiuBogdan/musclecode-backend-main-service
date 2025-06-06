import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { ContentRepository } from '../content.repository';
import { ContentNode, ContentType, PermissionLevel } from '@prisma/client';
import { EventDto, EventType } from '../dto/interaction.dto';
import { InteractionBody } from '../entities/interaction.entity';
import { PermissionService } from 'src/modules/permission/permission.service';
import { LessonInteractionService } from './lesson-interaction.service';

@Injectable()
export class InteractionService {
  constructor(
    private readonly contentRepository: ContentRepository,
    private readonly permissionService: PermissionService,
    private readonly lessonInteractionService: LessonInteractionService,
  ) {}

  /**
   * Handle user interaction with a content node
   */
  async handleInteraction(
    nodeId: string,
    userId: string,
    eventDto: EventDto,
  ): Promise<InteractionBody> {
    const node = await this.contentRepository.findNodeById(nodeId);
    if (!node) {
      throw new BadRequestException(`Node with ID ${nodeId} not found`);
    }

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

    const handler = this.getHandler(node.type, eventDto.type as EventType);

    if (!handler) {
      throw new BadRequestException(
        `Unsupported interaction type: ${eventDto.type} for content type: ${node.type}`,
      );
    }

    return handler(node, userId, eventDto);
  }

  private getHandler(
    nodeType: ContentType,
    eventType: EventType,
  ): (
    node: ContentNode,
    userId: string,
    eventDto: EventDto,
  ) => Promise<InteractionBody> {
    if (
      nodeType === ContentType.LESSON &&
      this.lessonInteractionService.isLessonInteractionEvent(eventType)
    ) {
      return this.lessonInteractionService.handleLessonInteraction.bind(
        this.lessonInteractionService,
      );
    }

    throw new BadRequestException(
      `Unsupported interaction type: ${eventType} for content type: ${nodeType}`,
    );
  }
}
