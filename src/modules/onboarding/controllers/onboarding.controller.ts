import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OnboardingService } from '../services/onboarding.service';
import {
  UserGoalsDto,
  SubmitQuizDto,
  OnboardingResponseDto,
  SkipOnboardingStepDto,
} from '../dto/onboarding.dto';
import { AuthenticatedRequest } from '../../../types/request.types';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('onboarding')
@Controller('api/v1/onboarding')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get()
  @ApiOperation({ summary: 'Get user onboarding state' })
  @ApiResponse({
    status: 200,
    description: 'Returns the current onboarding state for the user',
    type: OnboardingResponseDto,
  })
  async getOnboardingState(@Request() req: AuthenticatedRequest) {
    return this.onboardingService.getOnboardingState(req.user.id);
  }

  @Post('goals')
  @ApiOperation({ summary: 'Save user goals' })
  @ApiResponse({
    status: 200,
    description: 'Saves user goals and returns updated onboarding state',
    type: Boolean,
  })
  async saveUserGoals(
    @Request() req: AuthenticatedRequest,
    @Body() goals: UserGoalsDto,
  ) {
    return this.onboardingService.saveUserGoals(req.user.id, goals);
  }

  @Post('quiz')
  @ApiOperation({ summary: 'Submit quiz answers' })
  @ApiResponse({
    status: 200,
    description: 'Processes quiz answers and returns updated onboarding state',
    type: Boolean,
  })
  async submitQuiz(
    @Request() req: AuthenticatedRequest,
    @Body() submitQuizDto: SubmitQuizDto,
  ) {
    return this.onboardingService.submitQuiz(
      req.user.id,
      submitQuizDto.answers,
    );
  }

  @Post('skip')
  @ApiOperation({
    summary: 'Skip onboarding and initialize algorithm schedule',
  })
  @ApiResponse({
    status: 200,
    description: 'Skips onboarding and initializes algorithm schedule',
    type: Boolean,
  })
  async skipOnboardingStep(
    @Request() req: AuthenticatedRequest,
    @Body() body: SkipOnboardingStepDto,
  ) {
    return this.onboardingService.skipOnboardingStep(req.user.id, body.step);
  }
}
