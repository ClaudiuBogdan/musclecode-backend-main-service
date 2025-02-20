import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerService } from './scheduler.service';
import {
  FSRSParameters,
  Rating,
  SchedulingState,
} from '../types/scheduler.types';
import { addDays, subDays, differenceInDays } from 'date-fns';

describe('SchedulerService', () => {
  let service: SchedulerService;
  let fixedDate: Date;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulerService],
    }).compile();

    service = module.get<SchedulerService>(SchedulerService);
    fixedDate = new Date('2024-01-01T12:00:00Z');
    jest.useFakeTimers();
    jest.setSystemTime(fixedDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Initialization', () => {
    it('should initialize state correctly with default rating (Good)', () => {
      const state = service.initializeState();
      expect(state.stability).toBe(4); // Initial stability for 'Good'
      expect(state.difficulty).toBe(0);
      expect(state.reps).toBe(0);
      expect(state.lapses).toBe(0);
      expect(state.state).toBe(0); // New card state
      expect(state.elapsedDays).toBe(0);
      expect(state.scheduledDays).toBe(0);
      expect(state.due).toEqual(state.lastReview);
    });

    it('should initialize state correctly with different ratings', () => {
      expect(service.initializeState(Rating.Again).stability).toBe(1);
      expect(service.initializeState(Rating.Hard).stability).toBe(2);
      expect(service.initializeState(Rating.Good).stability).toBe(4);
      expect(service.initializeState(Rating.Easy).stability).toBe(5);
    });
  });

  describe('New Card Scheduling', () => {
    it('should schedule a new card correctly with Good rating', () => {
      const result = service.schedule(null, Rating.Good);
      expect(result.state.reps).toBe(1);
      expect(result.state.lapses).toBe(0);
      expect(result.state.state).toBe(2); // Review state
      expect(result.state.stability).toBe(4); // Initial stability for Good
      expect(result.state.difficulty).toBeCloseTo(-0.1, 1);
      expect(result.interval).toBe(4); // Expected interval based on stability
      expect(result.nextDue).toEqual(
        addDays(result.state.lastReview, result.interval),
      );
    });

    it('should schedule a new card correctly with Again rating', () => {
      const result = service.schedule(null, Rating.Again);
      expect(result.state.reps).toBe(1);
      expect(result.state.lapses).toBe(1);
      expect(result.state.state).toBe(1);
      expect(result.state.stability).toBe(1);
      expect(result.state.difficulty).toBe(5);
      expect(result.interval).toBe(1);
      expect(result.nextDue).toEqual(addDays(result.state.lastReview, 1));
    });
  });

  describe('Parameter Management', () => {
    it('should get default parameters correctly', () => {
      const params = service.getParameters();
      expect(params.requestRetention).toBe(0.9);
      expect(params.maximumInterval).toBe(36500);
      expect(params.w.length).toBe(13);
      expect(params.initialStability).toEqual({
        [Rating.Again]: 1,
        [Rating.Hard]: 2,
        [Rating.Good]: 4,
        [Rating.Easy]: 5,
      });
    });

    it('should update parameters correctly', () => {
      const newParams = {
        requestRetention: 0.8,
        w: [
          0.5, 0.7, 2.5, 5.9, -5.7, -0.7, 1.7, -0.1, -0.1, -0.1, -0.1, -0.1,
          -0.1,
        ] as [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
        ],
        initialStability: {
          [Rating.Again]: 1 as const,
          [Rating.Hard]: 2 as const,
          [Rating.Good]: 4 as const,
          [Rating.Easy]: 5 as const,
        },
      };
      service.setParameters(newParams);
      const params = service.getParameters();
      expect(params.requestRetention).toBe(0.8);
      expect(params.w).toEqual(newParams.w);
      expect(params.initialStability[Rating.Again]).toBe(1);
      expect(params.initialStability[Rating.Hard]).toBe(2);
      expect(params.initialStability[Rating.Good]).toBe(4);
      expect(params.initialStability[Rating.Easy]).toBe(5);
    });

    it('should throw error when setting invalid weights array', () => {
      expect(() => {
        // Create an array with incorrect length to test error handling
        const invalidWeights = Array(3).fill(1);
        service.setParameters({
          w: invalidWeights as unknown as [
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
          ],
        });
      }).toThrowError(/Weights array must contain exactly/);
    });

    it('should return deep copy of parameters', () => {
      const params1 = service.getParameters();
      const params2 = service.getParameters();
      params1.w[0] = 999;
      expect(params2.w[0]).not.toBe(999);
    });
  });

  describe('Edge Cases', () => {
    it('should handle maximum interval correctly', () => {
      const state: SchedulingState = {
        due: new Date(),
        stability: 100000, // Very high stability
        difficulty: 0,
        elapsedDays: 1,
        scheduledDays: 1000,
        reps: 1,
        lapses: 0,
        state: 2,
        lastReview: new Date(),
      };
      const result = service.schedule(state, Rating.Good);
      expect(result.interval).toBe(36500); // Capped at maximumInterval
    });

    it('should handle minimum interval correctly', () => {
      const state: SchedulingState = {
        due: new Date(),
        stability: 0.1, // Very low stability
        difficulty: 0,
        elapsedDays: 1,
        scheduledDays: 1,
        reps: 1,
        lapses: 0,
        state: 2,
        lastReview: new Date(),
      };
      const result = service.schedule(state, Rating.Good);
      expect(result.interval).toBe(1); // Minimum interval
    });

    it('should handle sequential scheduling correctly', () => {
      const result1 = service.schedule(null, Rating.Good);
      const result2 = service.schedule(result1.state, Rating.Hard);
      const result3 = service.schedule(result2.state, Rating.Again);

      expect(result2.state.reps).toBe(2);
      expect(result2.state.lapses).toBe(0);
      expect(result2.state.state).toBe(2);

      expect(result3.state.reps).toBe(3);
      expect(result3.state.lapses).toBe(1);
      expect(result3.state.state).toBe(1);
    });
  });

  describe('updateDifficulty', () => {
    const testCases = [
      {
        description: 'Again rating with default parameters',
        rating: Rating.Again,
        initialDifficulty: 0,
        expected: 5, // 0 + 5.8 (w[3]) = 5.8 → clamped to 5
      },
      {
        description: 'Hard rating with minimum difficulty',
        rating: Rating.Hard,
        initialDifficulty: -5,
        expected: -4.2, // -5 + (1.6/2) = -5 + 0.8 = -4.2
      },
      {
        description: 'Good rating with maximum difficulty',
        rating: Rating.Good,
        initialDifficulty: 5,
        expected: 4.9, // 5 + (-0.2/2) = 5 - 0.1 = 4.9
      },
      {
        description: 'Easy rating with negative adjustment',
        rating: Rating.Easy,
        initialDifficulty: 2.5,
        expected: 2.4, // 2.5 + (-0.2/2) = 2.5 - 0.1 = 2.4
      },
      {
        description: 'Custom parameters with high weight',
        rating: Rating.Again,
        initialDifficulty: 3,
        paramsOverride: { w: [0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0] }, // w[3] = 10
        expected: 5, // 3 + 10 = 13 → clamped to 5
      },
    ];

    testCases.forEach(
      ({
        description,
        rating,
        initialDifficulty,
        expected,
        paramsOverride,
      }) => {
        it(description, () => {
          if (paramsOverride) {
            service.setParameters(paramsOverride as Partial<FSRSParameters>);
          }

          const result = service['updateDifficulty'](initialDifficulty, rating);
          expect(result).toBeCloseTo(expected, 1);

          if (paramsOverride) {
            service.setParameters({}); // Reset to defaults
          }
        });
      },
    );

    it('should handle all rating types with boundary values', () => {
      const ratings = [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy];
      ratings.forEach((rating) => {
        expect(service['updateDifficulty'](5, rating)).toBeLessThanOrEqual(5);
        expect(service['updateDifficulty'](-5, rating)).toBeGreaterThanOrEqual(
          -5,
        );
      });
    });
  });

  describe('Review Card Scheduling', () => {
    it('should update an existing review card correctly with Good rating', () => {
      // Create an existing review card state with an elapsed time of 2 days
      const initialState = service.initializeState(Rating.Good);
      const twoDaysAgo = new Date(fixedDate);
      twoDaysAgo.setDate(fixedDate.getDate() - 2);
      initialState.reps = 1; // simulate a card that has been reviewed once
      initialState.lastReview = twoDaysAgo;

      const result = service.schedule(initialState, Rating.Good);

      // Expect the review to increment reps without a lapse
      expect(result.state.reps).toBe(2);
      expect(result.state.lapses).toBe(0);
      expect(result.state.state).toBe(2); // review state for Good rating

      // Calculate expected interval:
      // With default parameters: stability starts at 4 for Good, elapsed = 2 days,
      // retrievability = exp((ln(0.9)*2)/4) = (0.9)^0.5 ~0.949, newStability = 4 * exp(-0.2 + -0.2*0 + -0.2*0.949) ~ 4 * exp(-0.3898) ~ 2.71,
      // newInterval = round(2.71) = 3
      expect(result.interval).toBe(3);
      expect(result.nextDue).toEqual(addDays(fixedDate, 3));

      // For Good rating, difficulty update is: 0 + (-0.2/2) = -0.1
      expect(result.state.difficulty).toBeCloseTo(-0.1, 1);
      // Check that new stability is approximately 2.7
      expect(result.state.stability).toBeCloseTo(2.7, 1);
    });

    it('should update an existing review card correctly with Again rating', () => {
      const initialState = service.initializeState(Rating.Good);
      const oneDayAgo = new Date(fixedDate);
      oneDayAgo.setDate(fixedDate.getDate() - 1);
      initialState.reps = 1; // simulate a reviewed card
      initialState.lastReview = oneDayAgo;

      const result = service.schedule(initialState, Rating.Again);

      // For an 'Again' review, expect reps increment and lapses increment
      expect(result.state.reps).toBe(2);
      expect(result.state.lapses).toBe(1);
      expect(result.state.state).toBe(1); // relearning state for Again rating

      // updateDifficulty for Again: 0 + w[3] = 0 + 5.8 clamped to 5
      expect(result.state.difficulty).toBe(5);

      // With a low stability and elapsed 1 day, interval is expected to be 1
      expect(result.interval).toBe(1);
      expect(result.nextDue).toEqual(addDays(fixedDate, 1));
    });
  });

  describe('Comprehensive Review Card Scheduling', () => {
    let baseState: SchedulingState;

    beforeEach(() => {
      // Base state representing a previously reviewed card
      baseState = {
        due: fixedDate,
        stability: 10,
        difficulty: 0,
        elapsedDays: 0,
        scheduledDays: 10,
        reps: 3,
        lapses: 0,
        state: 2, // review state
        lastReview: subDays(fixedDate, 10),
      };
    });

    describe('Rating-Based Scheduling', () => {
      it('should handle Hard rating correctly', () => {
        const result = service.schedule(baseState, Rating.Hard);
        // For Hard rating:
        // newStability = 10 * exp(w[5] + w[6]*0 + w[7]*retrievability)
        // retrievability = exp((ln(0.9)*10)/10) = 0.9
        // => newStability = 10 * exp(-0.8 + (-0.2)*0.9) = 10 * exp(-0.98) ~ 3.75
        expect(result.state.stability).toBeCloseTo(3.75, 2);
        // updateDifficulty for Hard: 0 + (1.6/2) = 0.8
        expect(result.state.difficulty).toBeCloseTo(0.8, 2);
        expect(result.state.state).toBe(2);
        expect(result.state.lapses).toBe(0);
        expect(result.state.elapsedDays).toBe(10);
        expect(result.nextDue).toEqual(addDays(fixedDate, result.interval));
      });

      it('should handle Easy rating correctly', () => {
        const result = service.schedule(baseState, Rating.Easy);
        // For Easy rating:
        // newStability = 10 * exp(w[11] + w[12]*0 + w[12]*retrievability)
        // retrievability = 0.9
        // => newStability = 10 * exp(-0.2 + (-0.2)*0.9) = 10 * exp(-0.38) ~ 6.84
        expect(result.state.stability).toBeCloseTo(6.84, 2);
        // updateDifficulty for Easy: 0 + (-0.2/2) = -0.1
        expect(result.state.difficulty).toBeCloseTo(-0.1, 2);
        expect(result.state.state).toBe(2);
        expect(result.state.lapses).toBe(0);
        expect(result.state.elapsedDays).toBe(10);
        expect(result.nextDue).toEqual(addDays(fixedDate, result.interval));
      });
    });

    describe('Time-Based Scenarios', () => {
      it('should handle overdue reviews correctly', () => {
        const overdueState = {
          ...baseState,
          lastReview: subDays(fixedDate, 15), // 15 days ago
        };
        const result = service.schedule(overdueState, Rating.Good);
        const elapsed = differenceInDays(fixedDate, overdueState.lastReview);
        expect(result.state.elapsedDays).toBe(elapsed);
        expect(result.nextDue).toEqual(addDays(fixedDate, result.interval));
      });

      it('should handle early reviews correctly', () => {
        const earlyState = {
          ...baseState,
          lastReview: subDays(fixedDate, 5), // 5 days ago
        };
        const result = service.schedule(earlyState, Rating.Good);
        const elapsed = differenceInDays(fixedDate, earlyState.lastReview);
        expect(result.state.elapsedDays).toBe(elapsed);
        // The computed interval should be greater than the elapsed days
        expect(result.interval).toBeGreaterThan(elapsed);
        expect(result.nextDue).toEqual(addDays(fixedDate, result.interval));
      });
    });

    describe('State Transitions', () => {
      it('should transition from relearning to review', () => {
        const relearningState = { ...baseState, state: 1 as const }; // relearning state
        const result = service.schedule(relearningState, Rating.Good);
        // On a successful Good rating, the state should transition to review (2)
        expect(result.state.state).toBe(2);
      });

      it('should maintain review state on successful ratings', () => {
        const result = service.schedule(baseState, Rating.Easy);
        expect(result.state.state).toBe(2);
      });

      it('should reset to relearning state on Again rating', () => {
        const result = service.schedule(baseState, Rating.Again);
        expect(result.state.state).toBe(1);
      });
    });
  });

  describe('Parameter Customization', () => {
    it('should respect custom weights', () => {
      const customWeights = [
        0.5, 0.7, 3.0, 6.0, -6.0, -0.8, 1.6, -0.2, -0.2, -0.2, -0.2, -0.2, -0.2,
      ] as [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
      ];
      service.setParameters({ w: customWeights });

      // Define a scheduling state with known values
      const state: SchedulingState = {
        due: fixedDate,
        stability: 10,
        difficulty: 0,
        elapsedDays: 0,
        scheduledDays: 10,
        reps: 3,
        lapses: 0,
        state: 2,
        lastReview: subDays(fixedDate, 10),
      };

      const result = service.schedule(state, Rating.Again);
      const elapsed = differenceInDays(fixedDate, state.lastReview); // should be 10
      const retrievability = Math.exp(
        (Math.log(0.9) * elapsed) / state.stability,
      ); // exp(ln(0.9)) = 0.9
      const expectedStability =
        state.stability *
        Math.exp(
          customWeights[2] +
            customWeights[3] * state.difficulty +
            customWeights[4] * retrievability,
        );

      expect(result.state.stability).toBeCloseTo(expectedStability, 4);
    });

    it('should handle custom retention targets', () => {
      service.setParameters({ requestRetention: 0.8 });

      // Define a scheduling state with known values
      const state: SchedulingState = {
        due: fixedDate,
        stability: 10,
        difficulty: 0,
        elapsedDays: 0,
        scheduledDays: 10,
        reps: 3,
        lapses: 0,
        state: 2,
        lastReview: subDays(fixedDate, 10),
      };

      const result = service.schedule(state, Rating.Good);
      // Expected interval calculation using the formula:
      // interval = round(stability * log(requestRetention) / log(0.9))
      const expectedInterval = Math.round(
        (result.state.stability * Math.log(0.8)) / Math.log(0.9),
      );
      expect(result.interval).toBeCloseTo(expectedInterval, 0);
    });
  });

  describe('Boundary Conditions', () => {
    let baseState: SchedulingState;
    beforeEach(() => {
      // Base state representing a previously reviewed card
      baseState = {
        due: fixedDate,
        stability: 10,
        difficulty: 0,
        elapsedDays: 0,
        scheduledDays: 10,
        reps: 3,
        lapses: 0,
        state: 2,
        lastReview: subDays(fixedDate, 10),
      };
    });
    it('should clamp stability at minimum value', () => {
      // For a Good rating with a very low stability, the calculated new stability would be below MIN_STABILITY.
      // The expected behavior is to clamp it at 0.1.
      const lowStabilityState = {
        ...baseState,
        stability: 0.1,
        difficulty: 5, // maximum difficulty
      };
      const result = service.schedule(lowStabilityState, Rating.Good);
      expect(result.state.stability).toBe(0.1);
    });
    it('should clamp difficulty at maximum value', () => {
      // For an 'Again' review, the difficulty can exceed 5; it must be clamped to 5.
      const maxDiffState = { ...baseState, difficulty: 5 };
      const result = service.schedule(maxDiffState, Rating.Again);
      expect(result.state.difficulty).toBe(5);
    });
    it('should clamp interval at maximum value', () => {
      // When the computed stability is very high, the interval should be clamped to the maximum value.
      // Increase initial stability to force the computed new stability to exceed the maximumInterval.
      const highStabilityState = {
        ...baseState,
        stability: 55000, // 55000 * exp(-0.4) ~ 36866 which is above maximumInterval (36500)
      };
      const result = service.schedule(highStabilityState, Rating.Good);
      expect(result.interval).toBe(service.getParameters().maximumInterval);
    });
  });
});
