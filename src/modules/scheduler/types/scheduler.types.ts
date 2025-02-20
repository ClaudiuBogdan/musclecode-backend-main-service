export enum Rating {
  Again = 1, // Should represent complete forgetting
  Hard = 2, // Should indicate difficult recall
  Good = 3, // Default successful recall
  Easy = 4, // Effortless recall
}

export interface FSRSParameters {
  /** Target retention rate (0-1), default: 0.9 */
  requestRetention: number;
  /** Maximum interval in days, default: 36500 */
  maximumInterval: number;
  /** Weights array for FSRS algorithm (13 elements) */
  w: [
    number, // w0: Initial stability for Again
    number, // w1: Initial stability for Hard
    number, // w2: Again review base
    number, // w3: Again difficulty weight
    number, // w4: Again retrievability weight
    number, // w5: Hard review base
    number, // w6: Hard difficulty weight
    number, // w7: Hard retrievability weight
    number, // w8: Good review base
    number, // w9: Good difficulty weight
    number, // w10: Good retrievability weight
    number, // w11: Easy review base
    number, // w12: Easy difficulty/retrievability weight
  ];
  /** Initial stability values for each rating */
  initialStability: {
    [Rating.Again]: 0.1 | 1 | 2;
    [Rating.Hard]: 1 | 2 | 3;
    [Rating.Good]: 3 | 4 | 5;
    [Rating.Easy]: 4 | 5 | 6;
  };
}

export interface SchedulingState {
  /** Next review date */
  due: Date;
  /** Current stability (days) */
  stability: number;
  /** Item difficulty (-5 to 5) */
  difficulty: number;
  /** Days since last review */
  elapsedDays: number;
  /** Days until next review */
  scheduledDays: number;
  /** Number of successful repetitions */
  reps: number;
  /** Number of times forgotten */
  lapses: number;
  /**
   * Learning state:
   * 0: New, 1: Relearning, 2: Review
   */
  state: 0 | 1 | 2 | 3; // 0:New, 1:Learning, 2:Review, 3:Relearning
  /** Last review timestamp */
  lastReview: Date;
}

export interface SchedulingResult {
  /** Updated scheduling state */
  state: SchedulingState;
  /** Next due date */
  nextDue: Date;
  /** Computed interval in days */
  interval: number;
}
