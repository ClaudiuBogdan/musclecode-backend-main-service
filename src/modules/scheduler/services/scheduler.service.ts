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
    maximumInterval: 36500, // ~100 years
    enableFuzz: true,
    fuzzFactor: 0.95 + Math.random() * 0.1,
    w: [
      0.40255, // w0: For initStability("again")
      1.18385, // w1: For initStability("hard")
      3.173, // w2: For initStability("good")
      15.69105, // w3: For initStability("easy")
      7.1949, // w4: Used in initDifficulty
      0.5345, // w5: Exponential multiplier in initDifficulty
      1.4604, // w6: Difficulty adjustment multiplier
      0.0046, // w7: Mean reversion factor
      1.54575, // w8: Base for recall stability
      0.1192, // w9: Stability damping exponent
      1.01925, // w10: Retrievability multiplier
      1.9395, // w11: Base for forget stability
      0.11, // w12: Difficulty exponent in forget stability
      0.29605, // w13: Stability exponent in forget stability
      2.2698, // w14: Retrievability multiplier in forget stability
      0.2315, // w15: Hard penalty
      2.9898, // w16: Easy bonus
      0.51655, // w17: Short-term stability multiplier
      0.6621, // w18: Short-term stability offset
    ],
    initialStability: {
      [Rating.Again]: 0.40255, // w0
      [Rating.Hard]: 1.18385, // w1
      [Rating.Good]: 3.173, // w2
      [Rating.Easy]: 15.69105, // w3
    },
  };

  private parameters: FSRSParameters;
  private readonly DECAY = -0.5;
  private readonly FACTOR = Math.pow(0.9, 1 / -0.5) - 1;

  constructor() {
    this.parameters = structuredClone(this.defaultParameters);
  }

  getInitialState(rating: Rating): SchedulingState {
    const now = new Date();
    return {
      due: now,
      stability: this.initStability(rating),
      difficulty: this.initDifficulty(rating),
      elapsedDays: 0,
      scheduledDays: 0,
      reps: 0,
      lapses: 0,
      state: 0, // New card
      lastReview: now,
    };
  }

  getParameters(): FSRSParameters {
    return structuredClone(this.parameters);
  }

  setParameters(newParams: Partial<FSRSParameters>): void {
    if (newParams.w && newParams.w.length !== this.defaultParameters.w.length) {
      throw new Error(
        `Weights array must contain exactly ${this.defaultParameters.w.length} elements`,
      );
    }

    this.parameters = {
      ...this.parameters,
      ...newParams,
      ...(newParams.w && { w: [...newParams.w] }),
      ...(newParams.initialStability && {
        initialStability: {
          ...this.parameters.initialStability,
          ...newParams.initialStability,
        },
      }),
    };
  }

  private applyFuzz(interval: number): number {
    if (!this.parameters.enableFuzz) {
      return interval;
    }
    const fuzzFactor = 0.95 + Math.random() * 0.1; // Random between 0.95 and 1.05
    return interval * fuzzFactor;
  }

  private forgettingCurve(elapsedDays: number, stability: number): number {
    return Math.pow(1 + (this.FACTOR * elapsedDays) / stability, this.DECAY);
  }

  private nextInterval(stability: number): number {
    const interval =
      (stability / this.FACTOR) *
      (Math.pow(this.parameters.requestRetention, 1 / this.DECAY) - 1);

    const fuzzedInterval = this.applyFuzz(interval);
    return Math.min(
      Math.max(Math.round(fuzzedInterval), 1),
      this.parameters.maximumInterval,
    );
  }

  private constrainDifficulty(difficulty: number): number {
    return Math.min(Math.max(difficulty, -5), 5);
  }

  private meanReversion(init: number, current: number): number {
    return this.parameters.w[7] * init + (1 - this.parameters.w[7]) * current;
  }

  private nextDifficulty(currentDifficulty: number, rating: Rating): number {
    const ratingValue = 4 - (Rating.Easy - rating); // Maps Again:1, Hard:2, Good:3, Easy:4
    const deltaD = -this.parameters.w[6] * (ratingValue - 3);
    const dampedDelta = (deltaD * (10 - currentDifficulty)) / 9;
    const newD = currentDifficulty + dampedDelta;

    // Mean reversion toward initial difficulty based on the current rating
    const initD = this.initDifficulty(rating);
    return this.constrainDifficulty(this.meanReversion(initD, newD));
  }

  private nextRecallStability(
    difficulty: number,
    stability: number,
    retrievability: number,
    rating: Rating,
  ): number {
    const w = this.parameters.w;
    const hardPenalty = rating === Rating.Hard ? w[15] : 1;
    const easyBonus = rating === Rating.Easy ? w[16] : 1;

    const stabilityUpdate =
      1 +
      Math.exp(w[8]) *
        (11 - difficulty) *
        Math.pow(stability, -w[9]) *
        (Math.exp((1 - retrievability) * w[10]) - 1) *
        hardPenalty *
        easyBonus;

    return +(stability * stabilityUpdate).toFixed(2);
  }

  private nextForgetStability(
    difficulty: number,
    stability: number,
    retrievability: number,
  ): number {
    const w = this.parameters.w;
    const newStability =
      w[11] *
      Math.pow(difficulty, -w[12]) *
      (Math.pow(stability + 1, w[13]) - 1) *
      Math.exp((1 - retrievability) * w[14]);

    return +Math.min(newStability, stability).toFixed(2);
  }

  private initDifficulty(rating: Rating): number {
    const ratingValue = 4 - (Rating.Easy - rating);
    const w = this.parameters.w;
    return this.constrainDifficulty(
      w[4] - Math.exp(w[5] * (ratingValue - 1)) + 1,
    );
  }

  private initStability(rating: Rating): number {
    const index = 4 - (Rating.Easy - rating) - 1;
    return Math.max(this.parameters.w[index], 0.1);
  }

  schedule(
    currentState: SchedulingState | null,
    rating: Rating,
  ): SchedulingResult {
    const now = new Date();

    // Initialize state for new cards
    if (!currentState) {
      currentState = this.getInitialState(rating);
    }

    const state = { ...currentState };
    const elapsed = differenceInDays(now, state.lastReview);

    let newStability: number;

    if (rating === Rating.Again) {
      // For "Again" responses, we still increment reps but also count it as a lapse
      state.lapses += 1;
      state.reps += 1; // Increment reps even for "Again" ratings
      state.state = 1; // Learning/relearning state

      // Use forget stability calculation for "Again" responses
      const retrievability = this.forgettingCurve(elapsed, state.stability);
      newStability = this.nextForgetStability(
        state.difficulty,
        state.stability,
        retrievability,
      );
    } else {
      // For Hard/Good/Easy responses
      const retrievability = this.forgettingCurve(elapsed, state.stability);
      newStability = this.nextRecallStability(
        state.difficulty,
        state.stability,
        retrievability,
        rating,
      );
      state.reps += 1;
      state.state = 2; // Review state
    }

    const newDifficulty = this.nextDifficulty(state.difficulty, rating);
    const newInterval = this.nextInterval(newStability);

    const newState: SchedulingState = {
      due: addDays(now, newInterval),
      stability: newStability,
      difficulty: newDifficulty,
      elapsedDays: elapsed,
      scheduledDays: newInterval,
      reps: state.reps,
      lapses: state.lapses,
      state: state.state,
      lastReview: now,
    };

    return {
      state: newState,
      nextDue: newState.due,
      interval: newInterval,
    };
  }

  simulateSchedule(
    baseState: SchedulingState,
    rating: Rating,
  ): SchedulingResult {
    const stateClone = structuredClone(baseState);
    return this.schedule(stateClone, rating);
  }
}
