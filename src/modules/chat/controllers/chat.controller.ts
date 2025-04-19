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
import { MessagePayloadDto } from '../dto/agent-chat.dto';
import { SendMessageDto } from '../dto/chat.dto';
import { Response } from 'express';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { AuthenticatedRequest } from 'src/types/request.types';
import { StructuredLogger } from 'src/logger/structured-logger.service';
import { SyncThreadsDto } from '../dto/sync-threads.dto';
import { ServerSentEvent } from '../entities/messages';
import { AgentsService } from '../services/agents.service';

@ApiTags('chat')
@Controller('api/v1/chat')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ChatController {
  private readonly logger = new StructuredLogger(ChatController.name);

  constructor(
    private readonly chatService: ChatService,
    private readonly agentsService: AgentsService,
  ) {}

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

  @Post('messages/stream-complex')
  @ApiOperation({
    summary:
      'Stream a complex message with structured content (SSE) using Agent',
  })
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  @Header('X-Accel-Buffering', 'no')
  @ApiResponse({ status: 200, description: 'Returns a stream of SSE events.' })
  @ApiResponse({ status: 400, description: 'Bad request payload.' })
  async streamComplexMessage(
    @Req() req: AuthenticatedRequest,
    @Body() payload: MessagePayloadDto,
    @Res() response: Response,
  ) {
    const userId = req.user.id;
    // Use the assistant message ID from the DTO if provided, otherwise generate one (or let service handle it)
    // It's better if the service generates the ID for the message it creates.
    // Let's remove assistantMessageId from SendMessageDto or ignore it here.
    const { threadId, id: clientMessageId } = payload.message;

    this.logger.log(
      `streamComplexMessage Request: User ${userId}, Thread ${threadId}, ClientMsg ${clientMessageId}`,
    );

    // Function to send SSE data remains the same
    const sendEvent = (event: ServerSentEvent) => {
      const dataString = JSON.stringify(event);
      response.write(`data: ${dataString}\n\n`);
      // Optional: response.flushHeaders(); needed sometimes behind proxies
    };

    let isClientConnected = true;
    response.on('close', () => {
      this.logger.log(
        `Client disconnected for thread ${threadId}. Signaling stream closure.`,
      );
      isClientConnected = false;
      // Cancellation should ideally be propagated to the agent stream generator
      // (AsyncGenerators automatically handle this via `return()` when the loop breaks)
    });

    let pingInterval: NodeJS.Timeout | undefined = undefined;

    try {
      // --- Call the AgentsService ---
      const agentStream = this.agentsService.streamAgentResponse(
        payload.message,
        userId,
      );
      // start keep-alive pings every 15 seconds
      pingInterval = setInterval(() => {
        if (isClientConnected) {
          sendEvent({ type: 'ping' });
        }
      }, 500);

      // --- Pipe the generator to the response ---
      for await (const event of agentStream) {
        if (!isClientConnected) {
          this.logger.warn(
            `[${threadId}] Attempted to send event after client disconnected. Stopping.`,
          );
          // The generator should stop automatically when the loop breaks
          // If the generator does long async work *between* yields, explicit cancellation might be needed.
          break;
        }
        sendEvent(event);
      }
      clearInterval(pingInterval);
      this.logger.log(`[${threadId}] Agent stream finished successfully.`);
    } catch (error) {
      clearInterval(pingInterval);
      // Log the error originating from the controller or initial service call setup
      this.logger.error(
        `[${threadId}] Error setting up or piping complex stream: ${error.message}`,
        error.stack,
      );
      // Try to send an error event if the connection is still open
      if (isClientConnected && !response.writableEnded) {
        // Send a generic error or use a specific event type if defined
        const errorEvent: ServerSentEvent = { type: 'message_stop' }; // Use message_stop to signal termination on error too
        // OR: response.write(`data: ${JSON.stringify({ type: 'error', detail: error.message })}\n\n`);
        sendEvent(errorEvent);
      }
    } finally {
      clearInterval(pingInterval);
      // Ensure the response is always ended
      if (!response.writableEnded) {
        response.end();
        this.logger.log(`[${threadId}] SSE response stream ended.`);
      }
    }
    // Remove the simulateComplexStreamGenerator method and the helper delay function at the end of the controller file
  }
}
