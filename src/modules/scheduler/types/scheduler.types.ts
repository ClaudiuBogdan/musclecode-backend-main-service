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

  /** Whether to enable fuzzing, default: true */
  enableFuzz: boolean;

  /** Fuzz factor, random number*/
  fuzzFactor: number;

  /**
   * Weights array for FSRS algorithm (19 elements)
   * w0-w3: Initial stability for Again/Hard/Good/Easy
   * w4: Base difficulty
   * w5: Exponential multiplier in difficulty
   * w6: Difficulty adjustment multiplier
   * w7: Mean reversion factor
   * w8: Base for recall stability
   * w9: Stability damping exponent
   * w10: Retrievability multiplier
   * w11: Base for forget stability
   * w12: Difficulty exponent in forget stability
   * w13: Stability exponent in forget stability
   * w14: Retrievability multiplier in forget stability
   * w15: Hard penalty
   * w16: Easy bonus
   * w17: Short-term stability multiplier
   * w18: Short-term stability offset
   */
  w: [
    number, // w0
    number, // w1
    number, // w2
    number, // w3
    number, // w4
    number, // w5
    number, // w6
    number, // w7
    number, // w8
    number, // w9
    number, // w10
    number, // w11
    number, // w12
    number, // w13
    number, // w14
    number, // w15
    number, // w16
    number, // w17
    number, // w18
  ];

  /** Initial stability values for each rating */
  initialStability: {
    [Rating.Again]: number;
    [Rating.Hard]: number;
    [Rating.Good]: number;
    [Rating.Easy]: number;
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

  /** Number of repetitions (including failed reviews) */
  reps: number;

  /** Number of times forgotten */
  lapses: number;

  /**
   * Learning state:
   * 0: New card, never reviewed
   * 1: Learning/Relearning after lapse
   * 2: Review (graduated)
   */
  state: 0 | 1 | 2;

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
