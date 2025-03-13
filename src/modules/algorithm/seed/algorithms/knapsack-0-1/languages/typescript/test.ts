import { knapsack01 } from './exercise';

describe('0/1 Knapsack Problem', () => {
  it('should return 7 for example 1', () => {
    const weights = [2, 3, 4, 5];
    const values = [3, 4, 5, 6];
    const capacity = 5;
    expect(knapsack01(weights, values, capacity)).toBe(7);
  });

  it('should return 390 for example 2', () => {
    const weights = [8, 2, 6, 1];
    const values = [50, 150, 210, 30];
    const capacity = 10;
    expect(knapsack01(weights, values, capacity)).toBe(390);
  });

  it('should return 0 for empty inputs', () => {
    expect(knapsack01([], [], 10)).toBe(0);
  });

  it('should handle single item that fits', () => {
    expect(knapsack01([5], [10], 5)).toBe(10);
  });

  it('should handle single item that does not fit', () => {
    expect(knapsack01([5], [10], 4)).toBe(0);
  });
});
