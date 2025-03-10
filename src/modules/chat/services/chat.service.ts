import { Injectable } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { Logger } from '@nestjs/common';
import { ChatRepository } from '../repositories/chat.repository';
import { Message } from '../entities/thread';
import { SendMessageDto } from '../dto/chat.dto';
import { SyncThreadsDto } from '../dto/sync-threads.dto';
import { SyncThreadsResponseDto } from '../dto';
import { ThreadDto } from '../dto/thread.dto';
import { Thread } from '../entities/thread';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private openaiService: OpenAIService,
    private chatRepository: ChatRepository,
  ) {}

  async streamMessage(
    sendMessageDto: SendMessageDto,
    userId: string,
  ): Promise<{
    stream: ReadableStream<string>;
  }> {
    const {
      messageId,
      assistantMessageId,
      threadId,
      algorithmId,
      parentId,
      content,
    } = sendMessageDto;
    try {
      // Find or create thread
      let thread = await this.chatRepository.getThreadById(threadId, userId);
      if (!thread) {
        this.logger.log(`Thread ${threadId} not found, creating new thread`);
        thread = await this.chatRepository.createThread(
          threadId,
          userId,
          algorithmId,
        );
      }

      thread.messages.push({
        id: messageId,
        content,
        threadId,
        parentId: parentId || null,
        role: 'user',
        timestamp: new Date().getTime(),
      });

      const messages = this.getMainBranch(thread.messages);

      // Call the OpenAIService to get a streaming response
      const sourceStream = await this.openaiService.streamChatCompletion(
        content,
        messages.map((msg) => ({
          content: msg.content,
          sender: msg.role,
        })),
      );

      // Wrap the source stream to accumulate the tokens and save the final message when done
      const stream = new ReadableStream<string>({
        start: async (controller) => {
          const reader = sourceStream.getReader();
          let finalContent = '';
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              finalContent += value;
              controller.enqueue(value);
            }

            // When streaming is complete, save the assistant's message to the database
            const newMessage: Message = {
              id: assistantMessageId,
              content: finalContent,
              threadId: thread.id,
              parentId: messageId,
              role: 'assistant',
              timestamp: new Date().getTime(),
            };

            thread.messages.push(newMessage);
            await this.chatRepository.updateThread(userId, thread);

            this.logger.log(
              `Final streaming result for ${messageId}: ${finalContent.substring(0, 100)}...`,
            );
          } catch (err) {
            this.logger.error('Error processing stream', err);
            controller.error(err);
          }
          controller.close();
        },
      });

      return { stream };
    } catch (error) {
      this.logger.error('Error in streamMessage', error);
      throw error;
    }
  }

  private getMainBranch(messages: Message[]): Message[] {
    // Create a map: key = parentId, value = child message with the most recent timestamp
    const childMap = new Map();
    messages.forEach((msg) => {
      childMap.set(msg.parentId, msg);
    });

    const root = childMap.get(null);
    if (!root) return [];

    // Construct the branch from the root using the childMap
    const branch = [root];
    let current = root;
    while (childMap.has(current.id)) {
      const child = childMap.get(current.id);
      branch.push(child);
      current = child;
      if (child.parentId === child.id) {
        break;
      }
    }

    return branch;
  }

  private mapThreadToThreadDto(thread: Thread): ThreadDto {
    return {
      id: thread.id,
      algorithmId: thread.algorithmId,
      createdAt: thread.createdAt,
      updatedAt: thread.updatedAt,
      messages: thread.messages.map((message) => ({
        id: message.id,
        content: message.content,
        timestamp: message.timestamp,
        role: message.role,
        parentId: message.parentId,
      })),
    };
  }

  async getThreads(userId: string, algorithmId?: string): Promise<ThreadDto[]> {
    try {
      const threads = await this.chatRepository.getThreads(userId, algorithmId);

      return threads.map((thread: Thread) => this.mapThreadToThreadDto(thread));
    } catch (error) {
      this.logger.error(`Error fetching threads for user ${userId}`, error);
      throw error;
    }
  }

  async syncThreads(
    syncThreadsDto: SyncThreadsDto,
    userId: string,
  ): Promise<SyncThreadsResponseDto> {
    try {
      // Retrieve all threads for the authenticated user
      const allThreads = await this.getThreads(
        userId,
        syncThreadsDto.algorithmId,
      );

      // Build a map of client's threadId to its messageCount and lastUpdate
      const clientThreadMap = new Map<string, { messageCount: number }>();
      for (const clientThread of syncThreadsDto.threads) {
        clientThreadMap.set(clientThread.threadId, {
          messageCount: clientThread.messageCount,
        });
      }

      // Determine updated or new threads by comparing message count and lastUpdate
      const updatedThreads = allThreads.filter((thread) => {
        const clientRecord = clientThreadMap.get(thread.id);
        if (!clientRecord) {
          // Thread is new on the server
          return true;
        }
        // If message counts differ or the server's lastUpdate is greater, then the thread is out-of-sync
        return thread.messages.length !== clientRecord.messageCount;
      });

      this.logger.log(
        `Syncing threads for user ${userId}. Found ${updatedThreads.length} threads to sync out of ${allThreads.length} total threads.`,
      );

      return { threads: updatedThreads };
    } catch (error) {
      this.logger.error(`Error syncing threads for user ${userId}`, error);
      throw error;
    }
  }
}
