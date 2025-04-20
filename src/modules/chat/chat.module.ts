import { Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './services/chat.service';
import { OpenAIService } from './services/openai.service';
import { ConfigModule } from '@nestjs/config';
import { ChatRepository } from './repositories/chat.repository';
import { AgentsService } from './services/agents.service';
import { ContentModule } from '../content/content.module';

@Module({
  imports: [ConfigModule, ContentModule],
  controllers: [ChatController],
  providers: [
    ChatService,
    OpenAIService,
    PrismaService,
    ChatRepository,
    AgentsService,
  ],
  exports: [ChatService],
})
export class ChatModule {}
