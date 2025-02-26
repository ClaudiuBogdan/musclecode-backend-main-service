import { fractionalKnapsack } from './exercise';

describe('Fractional Knapsack Algorithm', () => {
  it('should handle basic test case', () => {
    const weights = [10, 20, 30];
    const values = [60, 100, 120];
    const capacity = 50;
    expect(fractionalKnapsack(weights, values, capacity)).toBe(240);
  });

  it('should handle another test case', () => {
    const weights = [3, 3, 2, 5, 1];
    const values = [10, 15, 10, 12, 8];
    const capacity = 10;
    expect(fractionalKnapsack(weights, values, capacity)).toBe(43);
  });

  it('should handle a case where capacity is smaller than any weight', () => {
    const weights = [10, 20, 30];
    const values = [60, 100, 120];
    const capacity = 5;
    expect(fractionalKnapsack(weights, values, capacity)).toBeCloseTo(30, 6);
  });

  it('should handle a case where all items can be taken', () => {
    const weights = [10, 20, 30];
    const values = [60, 100, 120];
    const capacity = 100;
    expect(fractionalKnapsack(weights, values, capacity)).toBe(280);
  });

  it('should handle empty input arrays', () => {
    expect(fractionalKnapsack([], [], 50)).toBe(0);
  });
});
