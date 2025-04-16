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
import { v4 as uuidv4 } from 'uuid';
import { ChatService } from '../services/chat.service';
import { MessagePayloadDto } from '../dto/agent-chat.dto';
import { SendMessageDto } from '../dto/chat.dto';
import { Response } from 'express';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { AuthenticatedRequest } from 'src/types/request.types';
import { StructuredLogger } from 'src/logger/structured-logger.service';
import { SyncThreadsDto } from '../dto/sync-threads.dto';
import {
  ChatMessage,
  ServerSentEvent,
  TextBlock,
  ToolResultContent,
  ToolResultContentBlock,
  ToolUseContentBlock,
} from '../entities/messages';

@ApiTags('chat')
@Controller('api/v1/chat')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ChatController {
  private readonly logger = new StructuredLogger(ChatController.name);

  constructor(private readonly chatService: ChatService) {}

  @Post('messages')
  @ApiOperation({ summary: 'Send a message' })
  @ApiResponse({
    status: 200,
    description: 'Returns the message.',
  })
  async sendMessage(
    @Req() req: AuthenticatedRequest,
    @Body() payload: MessagePayloadDto,
  ) {
    try {
      const userId = req.user.id;

      payload.message.userId = userId;

      this.logger.log('messageDto', {
        userId,
        message: payload.message,
      });
      console.log('messageDto', payload);
      return await this.chatService.sendMessage(userId, payload);
    } catch (error) {
      this.logger.error('Error sending message', error);
      throw error;
    }
  }

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

  @Post('messages/stream-complex') // New route
  @ApiOperation({
    summary: 'Stream a complex message with structured content (SSE)',
  })
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  @Header('X-Accel-Buffering', 'no') // Often needed with Nginx proxies
  @ApiResponse({ status: 200, description: 'Returns a stream of SSE events.' })
  @ApiResponse({ status: 400, description: 'Bad request payload.' })
  async streamComplexMessage(
    @Req() req: AuthenticatedRequest,
    @Body() sendMessageDto: SendMessageDto, // Use the same DTO for now
    @Res() response: Response,
  ) {
    const userId = req.user.id;
    const { threadId, messageId: clientMessageId } = sendMessageDto; // Use DTO fields
    const assistantMessageId = uuidv4(); // Generate unique ID for the assistant's message

    this.logger.log(
      `[${assistantMessageId}] streamComplexMessage: User ${userId}, Thread ${threadId}, ClientMsg ${clientMessageId}`,
    );

    // Function to send SSE data
    const sendEvent = (event: ServerSentEvent) => {
      const dataString = JSON.stringify(event);
      response.write(`data: ${dataString}\n\n`);
      // Force flush if needed, especially behind proxies (might vary)
      // response.flushHeaders();
    };

    // Flag to stop simulation if client disconnects
    let isClientConnected = true;
    response.on('close', () => {
      this.logger.log(
        `[${assistantMessageId}] Client disconnected for thread ${threadId}. Stopping stream.`,
      );
      isClientConnected = false;
    });

    try {
      // Simulate the stream generation
      const simulationGenerator = this.simulateComplexStreamGenerator(
        assistantMessageId,
        threadId,
        clientMessageId, // Pass parentId if needed
      );

      for await (const event of simulationGenerator) {
        if (!isClientConnected) {
          break; // Stop sending if client disconnected
        }
        sendEvent(event);
        await delay(50); // Small delay between sending events to client
      }

      this.logger.log(`[${assistantMessageId}] Stream finished successfully.`);
    } catch (error) {
      this.logger.error(
        `[${assistantMessageId}] Error during complex stream simulation: ${error.message}`,
        error.stack,
      );
      // Send an error event if possible (client might already be gone)
      if (isClientConnected && !response.writableEnded) {
        const errorEvent: ServerSentEvent = {
          type: 'message_stop', // Or define a specific error event type
          // Add error details if your frontend/reconstructor handles them
        };
        // Alternatively, send a simple error structure if your frontend expects it on error
        // response.write(`data: ${JSON.stringify({ type: 'error', error: error.message })}\n\n`);
        sendEvent(errorEvent); // Send message_stop to signal termination
      }
    } finally {
      // Ensure the response is ended if it hasn't been already
      if (!response.writableEnded) {
        response.end();
      }
    }
  }

  /**
   * Async generator to simulate the creation of a complex message stream.
   */
  private async *simulateComplexStreamGenerator(
    messageId: string,
    threadId: string,
    parentId?: string, // ID of the user message this is responding to
  ): AsyncGenerator<ServerSentEvent, void, undefined> {
    const startTime = new Date();
    const startTimestamp = startTime.toISOString();

    this.logger.debug(`[${messageId}] Simulation started`);

    // 1. message_start
    const initialMessage: ChatMessage = {
      id: messageId,
      createdAt: startTimestamp,
      role: 'assistant',
      content: [], // Start with empty content
      status: 'in_progress',
      threadId: threadId,
      parentId: parentId,
      // Metadata can be added here
    };
    yield { type: 'message_start', message: initialMessage };
    await delay(100); // Simulate initial processing time

    // --- Block 0: Simple Text ---
    const textBlockId = uuidv4();
    const textBlockStartTime = new Date().toISOString();

    // 2. content_block_start (Text)
    const initialTextBlock: TextBlock = {
      id: textBlockId,
      type: 'text',
      text: '',
      start_timestamp: textBlockStartTime,
      stop_timestamp: '', // Will be set on stop
    };
    yield {
      type: 'content_block_start',
      index: 0,
      content_block: initialTextBlock,
    };
    await delay(50);

    // 3. content_block_delta (Text) - Stream text chunks
    const textChunks = [
      'Okay, ',
      'I can help ',
      'with that. ',
      'First, I need to ',
      'use a tool ',
      'to find the ',
      'relevant ',
      'artifacts.\n\n',
    ];
    for (const chunk of textChunks) {
      yield {
        type: 'content_block_delta',
        index: 0,
        delta: { type: 'text_delta', text: chunk },
      };
      await delay(80); // Simulate typing speed
    }

    // 4. content_block_stop (Text)
    const textBlockStopTime = new Date().toISOString();
    yield {
      type: 'content_block_stop',
      index: 0,
      stop_timestamp: textBlockStopTime,
    };
    this.logger.debug(`[${messageId}] Text block 0 finished`);
    await delay(200); // Simulate pause before tool use

    // --- Block 1: Tool Use ---
    const toolUseId = `toolu_${uuidv4().replace(/-/g, '')}`; // Example ID format
    const toolUseBlockId = uuidv4();
    const toolUseStartTime = new Date().toISOString();

    // 5. content_block_start (Tool Use)
    const initialToolUseBlock: ToolUseContentBlock = {
      id: toolUseBlockId, // Block specific ID
      type: 'tool_use',
      name: 'artifact_finder',
      input: {}, // Start with empty input
      start_timestamp: toolUseStartTime,
      stop_timestamp: '',
      message: 'Searching for artifacts...',
      integration_name: 'Internal Search', // Example metadata
      integration_icon_url: '/icons/search-tool.svg', // Example metadata
    };
    yield {
      type: 'content_block_start',
      index: 1,
      content_block: initialToolUseBlock,
    };
    await delay(150); // Simulate tool invocation setup

    // 6. content_block_delta (Input JSON) - Stream the input JSON
    const toolInput = {
      query: 'latest user requirements document',
      project_id: 'project-alpha',
      max_results: 3,
    };
    const inputJsonString = JSON.stringify(toolInput, null, 2); // Pretty print for demo
    const inputChunks = this.chunkString(inputJsonString, 40); // Split into small chunks

    for (const chunk of inputChunks) {
      yield {
        type: 'content_block_delta',
        index: 1,
        delta: { type: 'input_json_delta', partial_json: chunk },
      };
      await delay(1000); // Simulate JSON streaming
    }

    // 7. content_block_stop (Tool Use)
    const toolUseStopTime = new Date().toISOString();
    yield {
      type: 'content_block_stop',
      index: 1,
      stop_timestamp: toolUseStopTime,
    };
    this.logger.debug(`[${messageId}] Tool use block 1 finished (input sent)`);
    await delay(1000); // Simulate actual tool execution time

    // --- Block 2: Tool Result ---
    const toolResultBlockId = uuidv4();
    const toolResultStartTime = new Date().toISOString();

    // 8. content_block_start (Tool Result)
    const initialToolResultBlock: ToolResultContentBlock = {
      id: toolResultBlockId,
      type: 'tool_result',
      tool_use_id: toolUseId, // Link to the tool_use block
      name: 'artifact_finder', // Name of the tool that ran
      content: [], // Start empty, will be assembled from JSON delta
      is_error: false,
      start_timestamp: toolResultStartTime,
      stop_timestamp: '',
      message: 'Found 3 artifacts.', // Optional status message
    };
    yield {
      type: 'content_block_start',
      index: 2,
      content_block: initialToolResultBlock,
    };
    await delay(50);

    // 9. content_block_delta (Input JSON) - Stream the result content JSON
    // Your type ToolResultContent is ToolResultTextPart[]
    const toolResultContent: ToolResultContent = [
      {
        type: 'text',
        text: 'Found Artifact 1: "User Requirements v3.pdf" (ID: art_123)\n',
      },
      {
        type: 'text',
        text: 'Found Artifact 2: "Stakeholder Feedback Summary Q1.docx" (ID: art_456)\n',
      },
      {
        type: 'text',
        text: 'Found Artifact 3: "Initial Design Mockups - Rev 2.png" (ID: art_789)',
      },
      // {
      //   type: 'text',
      //   text:
      //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 1  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 2  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 3  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 4  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 5  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 6  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' +
      //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 1  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 2  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 3  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 4  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 5  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 6  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' +
      //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 1  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 2  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 3  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 4  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 5  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 6  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' +
      //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 1  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 2  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 3  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 4  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 5  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 6  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      // },
    ];
    const resultJsonString = JSON.stringify(toolResultContent);
    const resultChunks = this.chunkString(resultJsonString, 30); // Split result JSON

    for (const chunk of resultChunks) {
      yield {
        type: 'content_block_delta',
        index: 2,
        // IMPORTANT: Using 'input_json_delta' because the frontend reconstructor
        // uses this delta type to assemble JSON for both tool_use *input* and tool_result *content*.
        // If the LLM/API streams results differently, the reconstructor would need adjustment.
        delta: { type: 'input_json_delta', partial_json: chunk },
      };
      await delay(50); // Simulate result streaming
    }

    // 10. content_block_stop (Tool Result)
    const toolResultStopTime = new Date().toISOString();
    yield {
      type: 'content_block_stop',
      index: 2,
      stop_timestamp: toolResultStopTime,
    };
    this.logger.debug(`[${messageId}] Tool result block 2 finished`);
    await delay(150); // Pause before final text

    // --- Block 3: Final Text ---
    const finalTextBlockId = uuidv4();
    const finalTextStartTime = new Date().toISOString();

    // 11. content_block_start (Final Text)
    const initialFinalTextBlock: TextBlock = {
      id: finalTextBlockId,
      type: 'text',
      text: '',
      start_timestamp: finalTextStartTime,
      stop_timestamp: '',
    };
    yield {
      type: 'content_block_start',
      index: 3,
      content_block: initialFinalTextBlock,
    };
    await delay(50);

    // 12. content_block_delta (Final Text)
    const finalChunks = [
      '\nI found these artifacts for you. ',
      'Let me know if you want details on a specific one.',
    ];
    for (const chunk of finalChunks) {
      yield {
        type: 'content_block_delta',
        index: 3,
        delta: { type: 'text_delta', text: chunk },
      };
      await delay(100);
    }

    // 13. content_block_stop (Final Text)
    const finalTextBlockStopTime = new Date().toISOString();
    yield {
      type: 'content_block_stop',
      index: 3,
      stop_timestamp: finalTextBlockStopTime,
    };
    this.logger.debug(`[${messageId}] Final text block 3 finished`);
    await delay(100);

    // --- Message Completion ---
    const endTime = new Date();
    const latencyMs = endTime.getTime() - startTime.getTime();

    // 14. message_delta (Optional - Update final status/metadata)
    // This is where you might update token counts, final status, etc.
    // The provided frontend reconstructor doesn't explicitly use message_delta payload,
    // but sending it is good practice according to the event definitions.
    yield {
      type: 'message_delta',
      delta: { stop_reason: 'stop', stop_sequence: null },
      // You could potentially add usage data here if the full message object schema
      // in message_start allowed for partial updates via message_delta.
      // usage: { input_tokens: 100, output_tokens: 250 } // Example
    };
    await delay(50);

    // 15. message_stop
    yield { type: 'message_stop' };
    this.logger.debug(
      `[${messageId}] Simulation finished. Total time: ${latencyMs}ms`,
    );
  }

  /** Helper to split a string into chunks */
  private chunkString(str: string, size: number): string[] {
    const numChunks = Math.ceil(str.length / size);
    const chunks = new Array(numChunks);
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size);
    }
    return chunks;
  }
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
