export enum Rating {
  Again = 1,
  Hard = 2,
  Good = 3,
  Easy = 4,
}

export interface FSRSParameters {
  requestRetention: number; // Target retention rate (default: 0.9)
  maximumInterval: number; // Maximum interval in days (default: 36500)
  w: number[]; // Weights array for the neural network
  initialStability: number; // Initial stability for new items
}

export interface SchedulingState {
  due: Date; // Next review date
  stability: number; // Current stability
  difficulty: number; // Item difficulty
  elapsedDays: number; // Days since last review
  scheduledDays: number; // Days until next review
  reps: number; // Number of repetitions
  lapses: number; // Number of failures
  state: number; // Current learning state (0: New, 1: Learning, 2: Review, 3: Relearning)
  lastReview: Date | string; // Date of last review
}

export interface SchedulingResult {
  state: SchedulingState;
  nextDue: Date;
  interval: number;
}
