import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Request } from 'express';
import { ModuleGenerationService } from '../services/module-generation.service';
import {
  GenerateModuleRequestDto,
  GenerateModuleResponseDto,
} from '../dto/module-generation.dto';

// Define a custom Request interface that includes the user property
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

@ApiTags('learning')
@Controller('api/v1/learning/create')
export class ModuleGenerationController {
  constructor(private moduleGenerationService: ModuleGenerationService) {}

  @Post('module')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate a new learning module from a prompt' })
  @ApiResponse({
    status: 201,
    description: 'Module generated successfully',
    type: GenerateModuleResponseDto,
  })
  async createModule(
    @Body() dto: GenerateModuleRequestDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<GenerateModuleResponseDto> {
    const userId = request.user.id;

    return this.moduleGenerationService.generateModuleFromPrompt({
      prompt: dto.prompt,
      userId,
      difficulty: dto.difficulty,
    });
  }

  @Get('module/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a generated module with its content' })
  @ApiResponse({
    status: 200,
    description: 'Module retrieved successfully',
  })
  async getModule(@Param('id') id: string) {
    return this.moduleGenerationService.getModuleWithContent(id);
  }
}
