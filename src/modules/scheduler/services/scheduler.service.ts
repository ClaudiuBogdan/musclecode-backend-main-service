import { Injectable } from '@nestjs/common';
import {
  Rating,
  FSRSParameters,
  SchedulingState,
  SchedulingResult,
} from '../types/scheduler.types';

@Injectable()
export class SchedulerService {
  private readonly defaultParameters: FSRSParameters = {
    requestRetention: 0.9,
    maximumInterval: 36500,
    w: [
      0.4, // w0
      0.6, // w1
      2.4, // w2
      5.8, // w3
      -5.8, // w4
      -0.8, // w5
      1.6, // w6
      -0.2, // w7
      -0.2, // w8
      -0.2, // w9
      -0.2, // w10
      -0.2, // w11
      -0.2, // w12
    ],
    initialStability: 4,
  };

  constructor() {
    this.parameters = this.defaultParameters;
  }

  private readonly parameters: FSRSParameters;

  initializeState(): SchedulingState {
    const now = new Date();
    return {
      due: now,
      stability: this.parameters.initialStability,
      difficulty: 0,
      elapsedDays: 0,
      scheduledDays: 0,
      reps: 0,
      lapses: 0,
      state: 0,
      lastReview: now,
    };
  }

  private calculateStability(
    state: SchedulingState,
    rating: Rating,
    elapsed: number,
  ): number {
    const { w } = this.parameters;
    const { stability, difficulty } = state;

    // Calculate memory strength at the time of review
    const retrievability = Math.exp((Math.log(0.9) * elapsed) / stability);

    // Calculate new stability based on the rating
    let newStability = stability;

    if (rating === Rating.Again) {
      newStability *= Math.exp(
        w[0] + w[1] * difficulty + w[2] * retrievability,
      );
    } else if (rating === Rating.Hard) {
      newStability *= Math.exp(
        w[3] + w[4] * difficulty + w[5] * retrievability,
      );
    } else if (rating === Rating.Good) {
      newStability *= Math.exp(
        w[6] + w[7] * difficulty + w[8] * retrievability,
      );
    } else if (rating === Rating.Easy) {
      newStability *= Math.exp(
        w[9] + w[10] * difficulty + w[11] * retrievability,
      );
    }

    return Math.max(newStability, this.parameters.initialStability);
  }

  private calculateInterval(stability: number): number {
    const interval =
      (stability * Math.log(this.parameters.requestRetention)) / Math.log(0.9);
    return Math.min(
      Math.max(1, Math.round(interval)),
      this.parameters.maximumInterval,
    );
  }

  private updateDifficulty(difficulty: number, rating: Rating): number {
    const { w } = this.parameters;
    let newDifficulty = difficulty;

    if (rating === Rating.Again) {
      newDifficulty += w[12];
    } else if (rating === Rating.Hard) {
      newDifficulty += w[12] / 2;
    } else if (rating === Rating.Easy) {
      newDifficulty -= w[12] / 2;
    }

    return Math.min(Math.max(-5, newDifficulty), 5);
  }

  schedule(
    currentState: SchedulingState | null,
    rating: Rating,
  ): SchedulingResult {
    const now = new Date();
    const state = currentState || this.initializeState();

    // Calculate elapsed time since last review
    const elapsed = currentState
      ? (now.getTime() - state.lastReview.getTime()) / (1000 * 60 * 60 * 24)
      : 0;

    // Update state based on rating
    const newStability = this.calculateStability(state, rating, elapsed);
    const newInterval = this.calculateInterval(newStability);
    const newDifficulty = this.updateDifficulty(state.difficulty, rating);

    // Calculate next due date
    const nextDue = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000);

    const newState: SchedulingState = {
      due: nextDue,
      stability: newStability,
      difficulty: newDifficulty,
      elapsedDays: elapsed,
      scheduledDays: newInterval,
      reps: state.reps + 1,
      lapses: rating === Rating.Again ? state.lapses + 1 : state.lapses,
      state: rating === Rating.Again ? 3 : 2, // 3 for relearning, 2 for review
      lastReview: now,
    };

    return {
      state: newState,
      nextDue,
      interval: newInterval,
    };
  }
}
