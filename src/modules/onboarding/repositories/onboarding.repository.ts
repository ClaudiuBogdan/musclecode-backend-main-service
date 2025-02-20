import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import {
  OnboardingStep,
  UserGoalsDto,
  TimeCommitment,
  QuizAnswersMap,
} from '../dto/onboarding.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class OnboardingRepository {
  constructor(private prisma: PrismaService) {}

  async getOnboardingState(userId: string) {
    return this.prisma.userOnboarding.findUnique({
      where: { userId },
      include: {
        goals: true,
        quizResults: true,
      },
    });
  }

  async createOnboardingState(userId: string) {
    return this.prisma.userOnboarding.create({
      data: {
        userId,
        currentStep: OnboardingStep.WELCOME,
        isCompleted: false,
      },
      include: {
        goals: true,
        quizResults: true,
      },
    });
  }

  async updateOnboardingState(
    userId: string,
    currentStep: OnboardingStep,
    isCompleted?: boolean,
  ) {
    return this.prisma.userOnboarding.update({
      where: { userId },
      data: {
        currentStep,
        ...(isCompleted !== undefined && { isCompleted }),
      },
      include: {
        goals: true,
        quizResults: true,
      },
    });
  }

  async saveUserGoals(userId: string, goals: UserGoalsDto) {
    const onboarding = await this.prisma.userOnboarding.findUnique({
      where: { userId },
    });

    if (!onboarding) {
      throw new NotFoundException('Onboarding state not found');
    }

    // Convert time commitment to study time in minutes
    const studyTimeMap: Record<TimeCommitment, number> = {
      [TimeCommitment.LOW]: 30,
      [TimeCommitment.MEDIUM]: 60,
      [TimeCommitment.HIGH]: 120,
    };

    const studyTime = studyTimeMap[goals.timeCommitment];

    // Use focus areas as both learning goals and preferred topics
    const learningGoals = goals.focusAreas;
    const preferredTopics = goals.focusAreas;

    return this.prisma.userGoals.upsert({
      where: { userId },
      create: {
        userId,
        onboardingId: onboarding.id,
        learningGoals,
        studyTime,
        experienceLevel: goals.experienceLevel,
        preferredTopics,
      },
      update: {
        learningGoals,
        studyTime,
        experienceLevel: goals.experienceLevel,
        preferredTopics,
      },
    });
  }

  async saveQuizResults(
    userId: string,
    answers: QuizAnswersMap,
    score: number,
    recommendations: any,
  ) {
    const onboarding = await this.prisma.userOnboarding.findUnique({
      where: { userId },
    });

    if (!onboarding) {
      throw new NotFoundException('Onboarding state not found');
    }

    // Prepare the data as a proper JSON structure
    const answersData = {
      topics: Object.entries(answers).map(([topic, familiarity]) => ({
        topic,
        familiarity,
      })),
      metadata: {
        count: Object.keys(answers).length,
        version: '1.0',
        timestamp: new Date().toISOString(),
      },
    };

    const recommendationsData = {
      ...recommendations,
      metadata: {
        generatedAt: new Date().toISOString(),
        version: '1.0',
      },
    };

    const data: Prisma.QuizResultsCreateInput = {
      userId,
      onboarding: {
        connect: {
          id: onboarding.id,
        },
      },
      answers: answersData as Prisma.InputJsonValue,
      score,
      recommendations: recommendationsData as Prisma.InputJsonValue,
    };

    return this.prisma.quizResults.upsert({
      where: { userId },
      create: data,
      update: {
        answers: data.answers,
        score: data.score,
        recommendations: data.recommendations,
      },
    });
  }

  async getQuizQuestions(difficulty: string, topics: string[], limit: number) {
    return this.prisma.onboardingQuizQuestion.findMany({
      where: {
        difficulty,
        topic: { in: topics },
      },
      take: limit,
    });
  }
}
