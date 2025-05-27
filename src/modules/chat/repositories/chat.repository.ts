import { Injectable } from '@nestjs/common';
import { StructuredLogger } from '../../../logger/structured-logger.service';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import {
  ChatThread as ChatThreadDb,
  ContentNode,
  ContentType,
} from '@prisma/client';
import { ChatMessage, ChatThread } from '../entities/messages';
import { Thread, Message } from '../entities/thread';
import { InputJsonValue } from '@prisma/client/runtime/library';

@Injectable()
export class ChatRepository {
  private readonly logger = new StructuredLogger(ChatRepository.name);
  constructor(private readonly prisma: PrismaService) {
    this.logger.log('ChatRepository initialized');
  }

  /**
   * @deprecated
   */
  async getThreadById(
    threadId: string,
    userId: string,
  ): Promise<Thread | null> {
    const thread = await this.prisma.chatThread.findUnique({
      where: { id: threadId, userId },
    });
    if (!thread) {
      this.logger.log(`Thread ${threadId} not found`);
      return null;
    }
    return this.mapThreadFromDb(thread);
  }

  async findOrCreateThread(
    threadId: string,
    userId: string,
  ): Promise<ChatThread> {
    const thread = await this.prisma.contentNode.findUnique({
      where: { id: threadId, type: ContentType.CHAT_THREAD },
    });
    if (!thread) {
      return this.createThreadContentNode(threadId, userId);
    }
    // TODO: add permission check
    return this.mapThreadToChatThread(thread);
  }

  async createThreadContentNode(
    threadId: string,
    userId: string,
  ): Promise<ChatThread> {
    const thread = await this.prisma.contentNode.create({
      data: {
        id: threadId,
        type: ContentType.CHAT_THREAD,
        body: {
          version: 1,
          messages: [],
        },
      },
    });
    // TODO: add permission check
    return this.mapThreadToChatThread(thread);
  }

  async updateThreadMessages(
    userId: string,
    threadId: string,
    messages: ChatMessage[],
  ): Promise<ChatThread> {
    const updatedThread = await this.prisma.contentNode.update({
      where: { id: threadId, type: ContentType.CHAT_THREAD },
      data: {
        body: {
          version: 1,
          messages: messages as unknown as InputJsonValue,
        },
      },
    });
    // TODO: add permission check
    return this.mapThreadToChatThread(updatedThread);
  }

  async mapThreadToChatThread(thread: ContentNode): Promise<ChatThread> {
    const body = thread.body as unknown as { messages: ChatMessage[] };
    return {
      id: thread.id,
      messages: body.messages,
      createdAt: thread.createdAt.toISOString(),
      updatedAt: thread.updatedAt.toISOString(),
    };
  }

  /**
   * @deprecated
   */
  async createThread(
    threadId: string,
    userId: string,
    algorithmId: string,
    type: 'chat' | 'hint',
  ): Promise<Thread> {
    const thread = await this.prisma.chatThread.create({
      data: {
        id: threadId,
        userId,
        algorithmId,
        type,
        messages: [],
      },
    });
    return this.mapThreadFromDb(thread);
  }

  /**
   * @deprecated
   */
  async updateThread(userId: string, thread: Thread): Promise<Thread> {
    const updatedThread = await this.prisma.chatThread.update({
      where: { id: thread.id, userId },
      data: {
        messages: thread.messages as unknown as InputJsonValue,
      },
    });
    return this.mapThreadFromDb(updatedThread);
  }

  async getThreads(userId: string, algorithmId?: string): Promise<Thread[]> {
    const threads = await this.prisma.chatThread.findMany({
      where: {
        userId,
        ...(algorithmId ? { algorithmId } : {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return threads.map(this.mapThreadFromDb.bind(this));
  }

  private mapThreadFromDb(thread: ChatThreadDb): Thread {
    return {
      id: thread.id,
      algorithmId: thread.algorithmId,
      messages: thread.messages as unknown as Message[],
      createdAt: thread.createdAt.getTime(),
      updatedAt: thread.updatedAt.getTime(),
    };
  }
}
