import { Injectable } from '@nestjs/common';
import { addDays, differenceInDays } from 'date-fns';
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
      0.4, // w0  - Initial stability for Again
      0.6, // w1  - Initial stability for Hard
      2.4, // w2  - Again review: base
      5.8, // w3  - Again review: difficulty weight
      -5.8, // w4 - Again review: retrievability weight
      -0.8, // w5 - Hard review: base
      1.6, // w6  - Hard review: difficulty weight
      -0.2, // w7 - Hard review: retrievability weight
      -0.2, // w8 - Good review: base
      -0.2, // w9 - Good review: difficulty weight
      -0.2, // w10 - Good review: retrievability weight
      -0.2, // w11 - Easy review: base
      -0.2, // w12 - Easy review: difficulty & retrievability weight
    ],
    initialStability: {
      [Rating.Again]: 1,
      [Rating.Hard]: 2,
      [Rating.Good]: 4,
      [Rating.Easy]: 5,
    },
  };

  private parameters: FSRSParameters;

  constructor() {
    this.parameters = structuredClone(this.defaultParameters);
  }

  /**
   * Returns a deep copy of the current parameters to prevent external modification
   */
  getParameters(): FSRSParameters {
    return structuredClone(this.parameters);
  }

  /**
   * Updates the scheduling parameters
   * @param newParams - Partial parameters to update
   * @throws Error if the weights array length is invalid
   */
  setParameters(newParams: Partial<FSRSParameters>): void {
    // Validate weights array if provided
    if (newParams.w) {
      if (newParams.w.length !== this.defaultParameters.w.length) {
        throw new Error(
          `Weights array must contain exactly ${this.defaultParameters.w.length} elements`,
        );
      }
    }

    // Create new parameters object with deep cloning for nested objects
    this.parameters = {
      ...this.parameters,
      ...newParams,
      // If new weights provided, replace the entire array
      ...(newParams.w && { w: [...newParams.w] }),
      // If new initial stability provided, merge with existing values
      ...(newParams.initialStability && {
        initialStability: {
          ...this.parameters.initialStability,
          ...newParams.initialStability,
        },
      }),
    };
  }

  /**
   * Initializes the state for a new card
   * @param rating - Optional initial rating, defaults to Good
   */
  initializeState(rating: Rating = Rating.Good): SchedulingState {
    const now = new Date();
    return {
      due: now,
      stability: this.parameters.initialStability[rating],
      difficulty: rating === Rating.Again ? 5 : 0,
      elapsedDays: 0,
      scheduledDays: 0,
      reps: 0,
      lapses: 0,
      state: 0, // 0 for new cards
      lastReview: now,
    };
  }

  /**
   * Calculates the stability after a review
   * @private
   */
  private calculateStability(
    state: SchedulingState,
    rating: Rating,
    elapsed: number,
  ): number {
    const { w } = this.parameters;
    const { stability, difficulty, reps } = state;

    if (reps === 0) {
      return this.parameters.initialStability[rating];
    }

    const retrievability = Math.exp((Math.log(0.9) * elapsed) / stability);
    let newStability;

    switch (rating) {
      case Rating.Again:
        newStability =
          stability *
          Math.exp(w[2] + w[3] * difficulty + w[4] * retrievability);
        break;
      case Rating.Hard:
        newStability =
          stability *
          Math.exp(w[5] + w[6] * difficulty + w[7] * retrievability);
        break;
      case Rating.Good:
        newStability =
          stability *
          Math.exp(w[8] + w[9] * difficulty + w[10] * retrievability);
        break;
      case Rating.Easy:
        newStability =
          stability *
          Math.exp(w[11] + w[12] * difficulty + w[12] * retrievability);
        break;
      default:
        newStability = stability;
    }

    const MIN_STABILITY = 0.1;
    return Math.min(
      Math.max(newStability, MIN_STABILITY),
      this.parameters.maximumInterval,
    );
  }

  /**
   * Calculates the next review interval based on stability
   * @private
   */
  private calculateInterval(stability: number): number {
    if (stability <= 0) throw new Error('Invalid stability value');

    const interval =
      (stability * Math.log(this.parameters.requestRetention)) / Math.log(0.9);

    return Math.min(
      Math.max(1, Math.round(interval)),
      this.parameters.maximumInterval,
    );
  }

  /**
   * Updates card difficulty based on the review rating
   * @private
   */
  private updateDifficulty(difficulty: number, rating: Rating): number {
    let adjustment;
    switch (rating) {
      case Rating.Again:
        adjustment = this.parameters.w[3];
        break;
      case Rating.Hard:
        adjustment = this.parameters.w[6];
        break;
      case Rating.Good:
        adjustment = this.parameters.w[9];
        break;
      case Rating.Easy:
        adjustment = this.parameters.w[12];
        break;
    }

    let newDifficulty = difficulty;

    switch (rating) {
      case Rating.Again:
        newDifficulty += adjustment;
        break;
      case Rating.Hard:
        newDifficulty += adjustment / 2;
        break;
      case Rating.Good:
        newDifficulty += adjustment / 2;
        break;
      case Rating.Easy:
        newDifficulty += adjustment / 2;
        break;
    }

    return Math.min(Math.max(-5, newDifficulty), 5);
  }

  /**
   * Schedules the next review based on the current state and rating
   */
  schedule(
    currentState: SchedulingState | null,
    rating: Rating,
  ): SchedulingResult {
    const now = new Date();
    const state = currentState || this.initializeState(rating);
    const elapsed = currentState ? differenceInDays(now, state.lastReview) : 0;

    const newStability = this.calculateStability(state, rating, elapsed);
    const newInterval = this.calculateInterval(newStability);
    const newDifficulty = this.updateDifficulty(state.difficulty, rating);

    const newState: SchedulingState = {
      due: addDays(now, newInterval),
      stability: newStability,
      difficulty: newDifficulty,
      elapsedDays: elapsed,
      scheduledDays: newInterval,
      reps: state.reps + 1,
      lapses: rating === Rating.Again ? state.lapses + 1 : state.lapses,
      state: rating === Rating.Again ? 1 : 2, // 1 for relearning, 2 for review
      lastReview: now,
    };

    return {
      state: newState,
      nextDue: newState.due,
      interval: newInterval,
    };
  }
}
