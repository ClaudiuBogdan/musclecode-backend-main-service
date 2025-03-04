import { Injectable, NotFoundException } from '@nestjs/common';
import { OnboardingRepository } from '../repositories/onboarding.repository';
import {
  OnboardingStep,
  UpdateOnboardingStateDto,
  UserGoalsDto,
  QuizAnswerDto,
  OnboardingResponseDto,
} from '../dto/onboarding.dto';
import { StructuredLogger } from '../../../logger/structured-logger.service';
import { CollectionService } from 'src/modules/collection/services/collection.service';
import { questions } from '../data/questions';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly onboardingRepository: OnboardingRepository,
    private readonly logger: StructuredLogger,
    private readonly collectionService: CollectionService,
  ) {}

  async getOnboardingState(userId: string): Promise<OnboardingResponseDto> {
    this.logger.debug('Getting onboarding state', { userId });

    // Get the onboarding state or create it if it doesn't exist
    let onboardingState =
      await this.onboardingRepository.getOnboardingState(userId);

    if (!onboardingState) {
      this.logger.debug('Creating new onboarding state for user', { userId });
      onboardingState =
        await this.onboardingRepository.createOnboardingState(userId);
    }

    // Get all available collections
    const collections =
      await this.onboardingRepository.getAvailableCollections();

    // Format the response according to the OnboardingResponseDto
    const response: OnboardingResponseDto = {
      id: onboardingState.id,
      userId: onboardingState.userId,
      currentStep: onboardingState.currentStep as OnboardingStep,
      isCompleted: onboardingState.isCompleted,
      createdAt: onboardingState.createdAt.toISOString(),
      updatedAt: onboardingState.updatedAt.toISOString(),
      collections: collections.map((collection) => ({
        id: collection.id,
        name: collection.name,
        description: collection.description || undefined,
      })),
      quizQuestions: questions,
    };

    if (onboardingState.goals) {
      response.goals = {
        studyTime: onboardingState.goals.studyTime,
        selectedCollections: onboardingState.goals.selectedCollections,
      };
    }

    if (onboardingState.quizResults) {
      response.quizResults = {
        answers: (onboardingState.quizResults.answers as any).answers || [],
      };
    }

    return response;
  }

  async updateOnboardingState(
    userId: string,
    updateDto: UpdateOnboardingStateDto,
  ) {
    const state = await this.onboardingRepository.getOnboardingState(userId);

    if (!state) {
      throw new NotFoundException('Onboarding state not found');
    }

    this.logger.debug('Updating onboarding state', {
      userId,
      currentStep: state.currentStep,
      newStep: updateDto.currentStep,
      isCompleted: updateDto.isCompleted,
    });

    // Update the onboarding state
    await this.onboardingRepository.updateOnboardingState(
      userId,
      updateDto.currentStep || (state.currentStep as OnboardingStep),
      updateDto.isCompleted || state.isCompleted,
    );

    // Return the updated state
    return true;
  }

  async saveUserWelcome(userId: string) {
    this.logger.debug('Saving user welcome', { userId });

    await this.updateOnboardingState(userId, {
      currentStep: this.getNextStep(OnboardingStep.WELCOME),
    });

    // Return the updated onboarding state
    return true;
  }

  async saveUserGoals(userId: string, goals: UserGoalsDto) {
    this.logger.debug('Saving user goals', { userId, goals });

    // Save the user goals
    await this.onboardingRepository.saveUserGoals(userId, {
      studyTime: goals.studyTime,
    });

    if (goals.selectedCollections && goals.selectedCollections.length > 0) {
      // Update the onboarding state to move to the next step
      for (const collectionId of goals.selectedCollections) {
        await this.collectionService.copyCollection(collectionId, userId);
      }
    }

    await this.updateOnboardingState(userId, {
      currentStep: this.getNextStep(OnboardingStep.GOALS),
    });

    // Return the updated onboarding state
    return true;
  }

  async submitQuiz(userId: string, answers: QuizAnswerDto[]) {
    this.logger.debug('Submitting quiz answers', {
      userId,
      answerCount: answers.length,
    });

    try {
      // Save the quiz results
      await Promise.all([
        this.onboardingRepository.saveQuizResults(userId, answers),
        this.onboardingRepository.initializeAlgorithmSchedule(userId),
        this.updateOnboardingState(userId, {
          currentStep: this.getNextStep(OnboardingStep.QUIZ),
          isCompleted: this.checkStepCompleted(OnboardingStep.QUIZ),
        }),
      ]);
    } catch (error) {
      this.logger.error('Error submitting quiz', error, {
        userId,
        error: error.message,
      });
      throw error;
    }

    // Return the updated onboarding state
    return true;
  }

  async skipOnboardingStep(userId: string, step: OnboardingStep) {
    this.logger.debug('Skipping onboarding step', { userId, step });

    // Update the onboarding state to mark it as completed
    await this.updateOnboardingState(userId, {
      currentStep: this.getNextStep(step),
      isCompleted: this.checkStepCompleted(step),
    });

    // Return true to indicate success
    return true;
  }

  private getNextStep(step: OnboardingStep): OnboardingStep {
    switch (step) {
      case OnboardingStep.WELCOME:
        return OnboardingStep.GOALS;
      case OnboardingStep.GOALS:
        return OnboardingStep.QUIZ;
      case OnboardingStep.QUIZ:
        return OnboardingStep.SUMMARY;
      case OnboardingStep.SUMMARY:
        return OnboardingStep.SUMMARY;
      default:
        throw new Error(`Invalid onboarding step: ${step}`);
    }
  }

  private checkStepCompleted(step: OnboardingStep): boolean {
    return step === OnboardingStep.SUMMARY || step === OnboardingStep.QUIZ;
  }
}
