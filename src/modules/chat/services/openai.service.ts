import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { Message } from '../entities/thread';
import { createChatPrompt } from '../prompts';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;
  private model: string;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
      baseURL: this.configService.get<string>('OPENAI_API_URL'),
    });
    this.model =
      this.configService.get<string>('OPENAI_MODEL') || 'gpt-4o-mini';
  }

  private convertMessagesToOpenAIFormat(
    messages: Message[],
  ): OpenAI.ChatCompletionMessageParam[] {
    return messages.map((message) => ({
      role: message.role,
      content: createChatPrompt(message),
    }));
  }

  async streamChatCompletion(
    content: string,
    history: Message[] = [],
  ): Promise<ReadableStream<string>> {
    const messages = [
      ...this.convertMessagesToOpenAIFormat(history),
      { role: 'user' as const, content },
    ];

    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages,
      stream: true,
    });

    // Create a ReadableStream to send data to the client
    return new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(content);
          }
        }
        controller.close();
      },
    });
  }
}
