import { BadRequestException, Injectable } from '@nestjs/common';
import { ContentNode } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import {
  EventDto,
  EventType,
  isQuestionSubmitEvent,
  isQuizAnswerEvent,
} from '../dto/interaction.dto';
import {
  InteractionBody,
  InteractionEvent,
} from '../entities/interaction.entity';
import { ContentRepository } from '../content.repository';
import { LessonBody, LessonContent } from '../entities';

@Injectable()
export class LessonInteractionService {
  constructor(private readonly contentRepository: ContentRepository) {}

  isLessonInteractionEvent(eventType: EventType): boolean {
    return [EventType.QUIZ_ANSWER, EventType.QUESTION_SUBMIT].includes(
      eventType,
    );
  }

  async handleLessonInteraction(
    node: ContentNode,
    userId: string,
    eventDto: EventDto,
  ): Promise<InteractionBody> {
    const interactionDataEntry =
      await this.contentRepository.findOrCreateUserInteraction(node.id, userId);

    const newEvent: InteractionEvent = {
      id: uuidv4(),
      version: '1.0',
      type: eventDto.type,
      payload: eventDto.payload,
      timestamp: new Date(),
    };

    const currentInteractionBody = this.getOrCreateInteractionBody(
      interactionDataEntry.body,
    );

    await this.validateEvent(node, eventDto);

    const updatedInteractionBody: InteractionBody = {
      ...currentInteractionBody,
      events: [...currentInteractionBody.events, newEvent],
    };

    const updatedInteraction =
      await this.contentRepository.updateUserInteraction(
        interactionDataEntry.id,
        updatedInteractionBody,
      );

    return updatedInteraction.body as unknown as InteractionBody;
  }

  /**
   * Gets existing interaction body or creates a new one if invalid
   */
  private getOrCreateInteractionBody(body: unknown): InteractionBody {
    if (isInteractionBody(body)) {
      return body;
    }
    return { version: '1.0', events: [] };
  }

  /**
   * Process specific event types with custom logic
   */
  private async validateEvent(
    node: ContentNode,
    eventDto: EventDto,
  ): Promise<void> {
    const itemId = this.extractItemIdFromEvent(eventDto);
    const isValidId = this.itemExistsInLessonBody(
      node.body as unknown as LessonBody,
      itemId,
    );
    if (!isValidId) {
      throw new BadRequestException(
        `Invalid interaction: item ${itemId} not found for event type ${eventDto.type}`,
      );
    }
  }

  private extractItemIdFromEvent(eventDto: EventDto): string {
    if (isQuizAnswerEvent(eventDto)) {
      return eventDto.payload.quizId;
    }
    if (isQuestionSubmitEvent(eventDto)) {
      return eventDto.payload.questionId;
    }
    throw new BadRequestException(`Invalid event type: ${eventDto.type}`);
  }

  /**
   * Check if an item exists in lesson body structure
   */
  private itemExistsInLessonBody(
    lessonBody: LessonBody,
    itemId: string,
  ): boolean {
    return (
      lessonBody.chunks?.some((chunk) =>
        chunk.content?.some(
          (contentItem: LessonContent) => contentItem.id === itemId,
        ),
      ) ?? false
    );
  }
}

function isInteractionBody(body: unknown): body is InteractionBody {
  return (
    typeof body === 'object' &&
    body !== null &&
    'version' in body &&
    body.version === '1.0' &&
    'events' in body &&
    Array.isArray(body.events)
  );
}
