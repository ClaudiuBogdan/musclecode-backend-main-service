import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import {
  UserGoalsDto,
  QuizAnswerDto,
  OnboardingStep,
} from '../dto/onboarding.dto';

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
    const onboarding = await this.prisma.userOnboarding.findUnique({
      where: { userId },
      include: {
        goals: true,
        quizResults: true,
      },
    });

    if (!onboarding) {
      throw new NotFoundException('Onboarding state not found');
    }

    return this.prisma.userOnboarding.update({
      where: { userId },
      data: {
        currentStep: currentStep,
        isCompleted:
          isCompleted !== undefined ? isCompleted : onboarding.isCompleted,
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

    // Convert TimeCommitment enum to study time in minutes
    const studyTime = goals.studyTime;

    // Save the user goals
    const savedGoals = await this.prisma.userGoals.upsert({
      where: { userId },
      create: {
        userId,
        onboardingId: onboarding.id,
        studyTime,
      },
      update: {
        studyTime,
      },
    });

    // Store selected collections separately if needed
    if (goals.selectedCollections && goals.selectedCollections.length > 0) {
      // We'll store this information in the user's metadata or session
      // For now, we'll just log it
      console.log(
        `User ${userId} selected collections:`,
        goals.selectedCollections,
      );
    }

    return savedGoals;
  }

  async getAvailableCollections() {
    return this.prisma.collection.findMany({
      where: {
        userId: null, // System collections only
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }

  async getQuizQuestionsByLevel(level: number) {
    // Check if this model has been renamed or removed
    try {
      // Try to get questions based on level
      const result = await this.prisma.$queryRaw`
        SELECT * FROM "OnboardingQuizQuestion" 
        WHERE "level" = ${level}
      `;
      return result as any[];
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
      return [];
    }
  }

  async getMaxQuizLevel() {
    try {
      // Check the max level in the database
      const result = await this.prisma.$queryRaw`
        SELECT MAX("level") as "maxLevel" FROM "OnboardingQuizQuestion"
      `;
      return (result as any[])[0]?.maxLevel || 0;
    } catch (error) {
      console.error('Error getting max quiz level:', error);
      return 0;
    }
  }

  async getQuizState(userId: string) {
    const quizResults = await this.prisma.quizResults.findUnique({
      where: { userId },
    });

    // Since currentLevel and highestLevel were removed, we'll return a simplified structure
    return quizResults
      ? { answersSubmitted: true }
      : { answersSubmitted: false };
  }

  async saveQuizResults(userId: string, answers: QuizAnswerDto[]) {
    const onboarding = await this.prisma.userOnboarding.findUnique({
      where: { userId },
    });

    if (!onboarding) {
      throw new NotFoundException('Onboarding state not found');
    }

    // Convert answers to a format that can be stored as JSON
    const answersJson = {
      answers: answers.map((a) => ({
        questionId: a.questionId,
        selectedOption: a.selectedOption,
      })),
      timestamp: new Date().toISOString(),
    };

    // Since the schema was simplified, we'll just save the answers
    return this.prisma.quizResults.upsert({
      where: { userId },
      create: {
        userId,
        onboardingId: onboarding.id,
        answers: answersJson,
      },
      update: {
        answers: answersJson,
      },
    });
  }

  // TODO: FIXME: This is a temporary function to initialize the algorithm schedule. I need a better logic for scheduling algorithms.
  async initializeAlgorithmSchedule(userId: string) {
    const onboarding = await this.prisma.userOnboarding.findUnique({
      where: { userId },
      include: {
        goals: true,
        quizResults: true,
      },
    });

    if (!onboarding) {
      throw new NotFoundException('Onboarding state not found');
    }

    // Get all algorithm templates
    const algorithms = await this.prisma.algorithmTemplate.findMany({
      where: {
        userId: null, // System templates only
      },
    });

    // Initialize all algorithms with default schedule
    for (const algorithm of algorithms) {
      // Default due date based on algorithm level
      const level = algorithm.level || 1;
      const daysToAdd = level * 2;
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + daysToAdd);

      // The initial state should come from the algorithm scheduler.
      await this.prisma.algorithmUserData.create({
        data: {
          userId,
          algorithmId: algorithm.id,
          due: dueDate,
          scheduleData: {
            difficulty: 0,
            stability: 0,
            retrievability: 0,
          },
        },
      });
    }
  }
}
