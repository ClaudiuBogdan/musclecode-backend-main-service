import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerService } from './scheduler.service';
import { Rating, SchedulingState } from '../types/scheduler.types';

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

  describe('initializeState', () => {
    it('should initialize state with default values', () => {
      const state = service.initializeState();

      expect(state.due).toEqual(fixedDate);
      expect(state.stability).toEqual(4);
      expect(state.difficulty).toEqual(0);
      expect(state.elapsedDays).toEqual(0);
      expect(state.scheduledDays).toEqual(0);
      expect(state.reps).toEqual(0);
      expect(state.lapses).toEqual(0);
      expect(state.state).toEqual(0);
      expect(state.lastReview).toEqual(fixedDate);
    });
  });

  describe('schedule', () => {
    describe('new item scheduling', () => {
      it('should schedule a new item with Good rating', () => {
        const result = service.schedule(null, Rating.Good);

        expect(result.state.reps).toEqual(1);
        expect(result.state.lapses).toEqual(0);
        expect(result.state.state).toEqual(2); // Review state
        expect(result.interval).toBeGreaterThan(0);
        expect(result.nextDue).toBeInstanceOf(Date);
      });

      it('should schedule a new item with Again rating', () => {
        const result = service.schedule(null, Rating.Again);

        expect(result.state.reps).toEqual(1);
        expect(result.state.lapses).toEqual(1);
        expect(result.state.state).toEqual(3); // Relearning state
        expect(result.interval).toBeGreaterThan(0);
      });
    });

    describe('existing item scheduling', () => {
      let initialState: SchedulingState;

      beforeEach(() => {
        initialState = service.initializeState();
      });

      it('should handle Again rating correctly', () => {
        // Advance time by 5 days
        jest.advanceTimersByTime(5 * 24 * 60 * 60 * 1000);

        const result = service.schedule(initialState, Rating.Again);

        expect(result.state.reps).toEqual(1);
        expect(result.state.lapses).toEqual(1);
        expect(result.state.state).toEqual(3); // Relearning state
        expect(result.state.elapsedDays).toBeCloseTo(5);
        expect(result.interval).toBeGreaterThan(0);
      });

      it('should handle Hard rating correctly', () => {
        const result = service.schedule(initialState, Rating.Hard);

        expect(result.state.reps).toEqual(1);
        expect(result.state.lapses).toEqual(0);
        expect(result.state.state).toEqual(2); // Review state
        expect(result.interval).toBeGreaterThan(0);
      });

      it('should handle Good rating correctly', () => {
        const result = service.schedule(initialState, Rating.Good);

        expect(result.state.reps).toEqual(1);
        expect(result.state.lapses).toEqual(0);
        expect(result.state.state).toEqual(2); // Review state
        expect(result.interval).toBeGreaterThan(0);
      });

      it('should handle Easy rating correctly', () => {
        const result = service.schedule(initialState, Rating.Easy);

        expect(result.state.reps).toEqual(1);
        expect(result.state.lapses).toEqual(0);
        expect(result.state.state).toEqual(2); // Review state
        expect(result.interval).toBeGreaterThan(0);
      });

      it('should handle elapsed time correctly', () => {
        const elapsedDays = 10;
        jest.advanceTimersByTime(elapsedDays * 24 * 60 * 60 * 1000);

        const result = service.schedule(initialState, Rating.Good);

        expect(result.state.elapsedDays).toBeCloseTo(elapsedDays);
        expect(result.nextDue.getTime()).toBeGreaterThan(fixedDate.getTime());
      });
    });

    describe('edge cases', () => {
      it('should handle very short elapsed time', () => {
        const initialState = service.initializeState();
        jest.advanceTimersByTime(1000); // 1 second

        const result = service.schedule(initialState, Rating.Good);
        expect(result.state.elapsedDays).toBeCloseTo(0);
      });

      it('should handle very long elapsed time', () => {
        const initialState = service.initializeState();
        jest.advanceTimersByTime(365 * 24 * 60 * 60 * 1000); // 1 year

        const result = service.schedule(initialState, Rating.Good);
        expect(result.state.elapsedDays).toBeCloseTo(365);
      });

      it('should handle multiple consecutive reviews', () => {
        let state = service.initializeState();

        // First review - Again
        state = service.schedule(state, Rating.Again).state;
        expect(state.lapses).toEqual(1);
        expect(state.reps).toEqual(1);

        // Second review - Hard
        state = service.schedule(state, Rating.Hard).state;
        expect(state.reps).toEqual(2);

        // Third review - Good
        state = service.schedule(state, Rating.Good).state;
        expect(state.reps).toEqual(3);

        // Fourth review - Easy
        state = service.schedule(state, Rating.Easy).state;
        expect(state.reps).toEqual(4);
      });

      it('should maintain difficulty bounds', () => {
        let state = service.initializeState();

        // Try to push difficulty to extremes
        for (let i = 0; i < 20; i++) {
          state = service.schedule(state, Rating.Again).state;
        }
        expect(state.difficulty).toBeLessThanOrEqual(5);

        state = service.initializeState();
        for (let i = 0; i < 20; i++) {
          state = service.schedule(state, Rating.Easy).state;
        }
        expect(state.difficulty).toBeGreaterThanOrEqual(-5);
      });
    });
  });
});
