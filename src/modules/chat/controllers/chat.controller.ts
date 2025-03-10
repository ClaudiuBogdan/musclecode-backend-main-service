import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Header,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ChatService } from '../services/chat.service';
import { SendMessageDto } from '../dto/chat.dto';
import { Response } from 'express';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { AuthenticatedRequest } from 'src/types/request.types';
import { StructuredLogger } from 'src/logger/structured-logger.service';
import { SyncThreadsDto } from '../dto/sync-threads.dto';

@ApiTags('chat')
@Controller('api/v1/chat')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ChatController {
  private readonly logger = new StructuredLogger(ChatController.name);

  constructor(private readonly chatService: ChatService) {}

  // @Get('threads')
  // @ApiOperation({ summary: 'Get all threads for the current user' })
  // @ApiResponse({ status: 200, description: 'Return all threads.' })
  // async getThreads(@Req() req: AuthenticatedRequest) {
  //   const userId = req.user.id;
  //   return this.chatService.getThreads(userId);
  // }

  // @Get('threads/:threadId')
  // @ApiOperation({ summary: 'Get a specific thread' })
  // @ApiParam({ name: 'threadId', description: 'The ID of the thread' })
  // @ApiResponse({ status: 200, description: 'Return the thread.' })
  // @ApiResponse({ status: 404, description: 'Thread not found.' })
  // async getThread(
  //   @Req() req: AuthenticatedRequest,
  //   @Param('threadId') threadId: string,
  // ) {
  //   const userId = req.user.id;
  //   return this.chatService.getThreadById(threadId, userId);
  // }

  @Post('messages/stream')
  @ApiOperation({ summary: 'Stream a message in a thread' })
  @ApiParam({ name: 'threadId', description: 'The ID of the thread' })
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  @ApiResponse({ status: 200, description: 'Returns a stream of tokens.' })
  @ApiResponse({ status: 404, description: 'Thread not found.' })
  async streamMessage(
    @Req() req: AuthenticatedRequest,
    @Body() sendMessageDto: SendMessageDto,
    @Res() response: Response,
  ) {
    const userId = req.user.id;
    const { messageId, threadId, algorithmId } = sendMessageDto;

    this.logger.log('streamMessage', {
      messageId,
      threadId,
      userId,
      algorithmId,
    });

    try {
      const { stream } = await this.chatService.streamMessage(
        sendMessageDto,
        userId,
      );

      const reader = stream.getReader();
      const pump = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            response.write(`data: ${JSON.stringify({ content: value })}\n\n`);
          }
          response.write(`data: ${JSON.stringify({ done: true })}\n\n`);
          response.end();
        } catch (err) {
          this.logger.error('Error while streaming to client', err);
          response.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
          response.end();
        }
      };
      pump();

      response.on('close', () => {
        reader.cancel().catch((err) => {
          this.logger.error('Error canceling reader on client disconnect', err);
        });
      });
    } catch (error) {
      this.logger.error(error);
      // Send error event
      response.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      response.end();
    }
  }

  @Post('threads/sync')
  @ApiOperation({ summary: 'Sync client threads with server state' })
  @ApiResponse({
    status: 200,
    description: 'Returns updated or new threads with all messages.',
  })
  async syncThreads(
    @Req() req: AuthenticatedRequest,
    @Body() syncThreadsDto: SyncThreadsDto,
  ) {
    try {
      const userId = req.user.id;
      this.logger.log('syncThreads', {
        userId,
        threadCount: syncThreadsDto.threads.length,
      });
      return await this.chatService.syncThreads(syncThreadsDto, userId);
    } catch (error) {
      this.logger.error('Error syncing threads', error);
      throw error;
    }
  }
}
