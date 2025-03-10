import { Injectable } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { Logger } from '@nestjs/common';
import { ChatRepository } from '../repositories/chat.repository';
import { Message } from '../entities/thread';
import { SendMessageDto } from '../dto/chat.dto';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private openaiService: OpenAIService,
    private chatRepository: ChatRepository,
  ) {}

  // async getThreads(userId: string): Promise<ThreadResponse[]> {
  //   // TODO: Implement
  // }

  // async getThreadById(
  //   threadId: string,
  //   userId: string,
  // ): Promise<ThreadResponse> {
  //   // TODO: Implement
  // }

  async streamMessage(
    sendMessageDto: SendMessageDto,
    userId: string,
  ): Promise<{ stream: ReadableStream<string>; messageId: string }> {
    const { messageId, threadId, algorithmId, parentId, content } =
      sendMessageDto;
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

      // Call the OpenAIService to get a streaming response
      const sourceStream = await this.openaiService.streamChatCompletion(
        content,
        thread.messages
          .map((msg) => ({
            content: msg.content,
            sender: msg.role,
          }))
          .slice(0, 3),
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
              id: messageId,
              content: finalContent,
              threadId: thread.id,
              parentId: parentId || null,
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

      return { stream, messageId };
    } catch (error) {
      this.logger.error('Error in streamMessage', error);
      throw error;
    }
  }
}
