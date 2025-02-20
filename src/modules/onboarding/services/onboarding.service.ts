import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OnboardingRepository } from '../repositories/onboarding.repository';
import {
  OnboardingStep,
  UpdateOnboardingStateDto,
  UserGoalsDto,
  QuizAnswersMap,
  TopicFamiliarity,
  TimeCommitment,
} from '../dto/onboarding.dto';
import { StructuredLogger } from '../../../logger/structured-logger.service';

interface StudyPlanInput {
  timeCommitment: TimeCommitment;
  experienceLevel: string;
  focusAreas: string[];
  studyTime: number;
}

interface UserGoalsModel {
  id: string;
  userId: string;
  onboardingId: string;
  timeCommitment: TimeCommitment;
  learningPreference: string;
  experienceLevel: string;
  focusAreas: string[];
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class OnboardingService {
  constructor(
    private readonly onboardingRepository: OnboardingRepository,
    private readonly logger: StructuredLogger,
  ) {}

  async getOnboardingState(userId: string) {
    let state = await this.onboardingRepository.getOnboardingState(userId);

    if (!state) {
      this.logger.debug('Creating new onboarding state for user', { userId });
      state = await this.onboardingRepository.createOnboardingState(userId);
    }

    return state;
  }

  async updateOnboardingState(
    userId: string,
    updateDto: UpdateOnboardingStateDto,
  ) {
    const state = await this.getOnboardingState(userId);
    if (!state) {
      throw new NotFoundException('Onboarding state not found');
    }

    const currentStep =
      updateDto.currentStep || (state.currentStep as OnboardingStep);
    return this.onboardingRepository.updateOnboardingState(
      userId,
      currentStep,
      updateDto.isCompleted,
    );
  }

  async saveUserGoals(userId: string, goals: UserGoalsDto) {
    const state = await this.getOnboardingState(userId);
    if (!state) {
      throw new NotFoundException('Onboarding state not found');
    }

    await this.onboardingRepository.saveUserGoals(userId, goals);
    return this.onboardingRepository.updateOnboardingState(
      userId,
      OnboardingStep.QUIZ,
    );
  }

  async submitQuiz(userId: string, answers: QuizAnswersMap) {
    const state = await this.getOnboardingState(userId);
    if (!state) {
      throw new NotFoundException('Onboarding state not found');
    }

    if (!state.goals) {
      throw new BadRequestException(
        'User goals must be set before taking the quiz',
      );
    }

    // Calculate score based on familiarity levels
    const score = this.calculateQuizScore(answers);

    // Generate recommendations based on familiarity levels
    const recommendations = await this.generateRecommendations(
      userId,
      score,
      state.goals as unknown as UserGoalsModel,
      answers,
    );

    // Save results and update state
    await this.onboardingRepository.saveQuizResults(
      userId,
      answers,
      score,
      recommendations,
    );

    return this.onboardingRepository.updateOnboardingState(
      userId,
      OnboardingStep.SUMMARY,
      true,
    );
  }

  private calculateQuizScore(answers: QuizAnswersMap): number {
    const familiarityScores = {
      [TopicFamiliarity.UNFAMILIAR]: 0,
      [TopicFamiliarity.FAMILIAR]: 50,
      [TopicFamiliarity.VERY_FAMILIAR]: 100,
    };

    const topics = Object.keys(answers) as (keyof QuizAnswersMap)[];
    if (topics.length === 0) {
      return 0;
    }

    const totalScore = topics.reduce((sum, topic) => {
      const familiarity = answers[topic];
      return sum + (familiarity ? familiarityScores[familiarity] : 0);
    }, 0);

    return Math.round(totalScore / topics.length);
  }

  private async generateRecommendations(
    userId: string,
    score: number,
    goals: UserGoalsModel,
    answers: QuizAnswersMap,
  ) {
    // Convert time commitment to study time
    const studyTimeMap: Record<TimeCommitment, number> = {
      [TimeCommitment.LOW]: 30,
      [TimeCommitment.MEDIUM]: 60,
      [TimeCommitment.HIGH]: 120,
    };

    const studyTime = studyTimeMap[goals.timeCommitment];

    // Analyze weak areas based on familiarity levels
    const weakAreas = this.analyzeWeakAreas(answers);
    const allTopics = Object.keys(answers);

    // Generate personalized recommendations
    return {
      dailyAlgorithmsCount: this.calculateDailyAlgorithms(score, studyTime),
      recommendedTopics: this.getRecommendedTopics(weakAreas, allTopics),
      difficultyLevel: this.getDifficultyLevel(score, goals.experienceLevel),
      studyPlan: this.generateStudyPlan(weakAreas, {
        timeCommitment: goals.timeCommitment,
        experienceLevel: goals.experienceLevel,
        focusAreas: allTopics,
        studyTime,
      }),
    };
  }

  private analyzeWeakAreas(answers: QuizAnswersMap): string[] {
    return Object.entries(answers)
      .filter(([, familiarity]) => familiarity === TopicFamiliarity.UNFAMILIAR)
      .map(([topic]) => topic);
  }

  private calculateDailyAlgorithms(score: number, studyTime: number): number {
    const baseCount = Math.max(1, Math.floor(studyTime / 30));
    const scoreMultiplier = score < 50 ? 0.5 : score < 75 ? 0.75 : 1;
    return Math.max(1, Math.round(baseCount * scoreMultiplier));
  }

  private getRecommendedTopics(
    weakAreas: string[],
    allTopics: string[],
  ): string[] {
    const recommended = [...new Set([...weakAreas, ...allTopics])];
    return recommended.slice(0, 5);
  }

  private getDifficultyLevel(score: number, experienceLevel: string): string {
    if (score < 40) return 'beginner';
    if (score < 70)
      return experienceLevel === 'beginner' ? 'beginner' : 'intermediate';
    return experienceLevel;
  }

  private generateStudyPlan(weakAreas: string[], input: StudyPlanInput) {
    return {
      focusAreas: weakAreas.slice(0, 3),
      suggestedTimeAllocation: {
        practice: Math.round(input.studyTime * 0.6),
        theory: Math.round(input.studyTime * 0.2),
        review: Math.round(input.studyTime * 0.2),
      },
      milestones: this.generateMilestones(input),
    };
  }

  private generateMilestones(input: StudyPlanInput) {
    return [
      {
        week: 1,
        focus: 'Fundamentals and Basic Problem Solving',
        targetTopics: input.focusAreas.slice(0, 2),
      },
      {
        week: 2,
        focus: 'Advanced Concepts and Pattern Recognition',
        targetTopics: input.focusAreas.slice(2, 4),
      },
      {
        week: 3,
        focus: 'Problem-Solving Strategies and Optimization',
        targetTopics: input.focusAreas.slice(4),
      },
      {
        week: 4,
        focus: 'Review and Real-world Applications',
        targetTopics: input.focusAreas,
      },
    ];
  }
}
