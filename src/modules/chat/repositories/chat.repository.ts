import { Injectable } from '@nestjs/common';
import { StructuredLogger } from '../../../logger/structured-logger.service';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { ChatThread } from '@prisma/client';
import { Thread, Message } from '../entities/thread';
import { JsonValue } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';
@Injectable()
export class ChatRepository {
  private readonly logger = new StructuredLogger(ChatRepository.name);
  constructor(private readonly prisma: PrismaService) {
    this.logger.log('ChatRepository initialized');
  }

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

  async createThread(
    threadId: string,
    userId: string,
    algorithmId: string,
  ): Promise<Thread> {
    const thread = await this.prisma.chatThread.create({
      data: {
        id: threadId,
        userId,
        algorithmId,
        messages: JSON.stringify([]),
      },
    });
    return this.mapThreadFromDb(thread);
  }

  async updateThread(userId: string, thread: Thread): Promise<Thread> {
    const updatedThread = await this.prisma.chatThread.update({
      where: { id: thread.id, userId },
      data: {
        messages: JSON.stringify(thread.messages),
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
    });
    return threads.map(this.mapThreadFromDb.bind(this));
  }

  private mapThreadFromDb(thread: ChatThread): Thread {
    return {
      id: thread.id,
      algorithmId: thread.algorithmId,
      messages: this.mapMessagesFromDb(thread.messages),
      createdAt: thread.createdAt.getTime(),
      updatedAt: thread.updatedAt.getTime(),
    };
  }

  private mapMessagesFromDb(messages: JsonValue): Message[] {
    if (!messages) {
      return [];
    }
    if (typeof messages !== 'string') {
      throw new Error('Messages are not a string');
    }
    return JSON.parse(messages) as Message[];
  }
}
