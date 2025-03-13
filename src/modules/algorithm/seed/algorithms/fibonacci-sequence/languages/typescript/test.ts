import { fibonacciSequence } from './exercise';

describe('Fibonacci Sequence', () => {
  it('should generate first 7 Fibonacci numbers', () => {
    expect(fibonacciSequence(7)).toEqual([0, 1, 1, 2, 3, 5, 8]);
  });

  it('should generate first 10 Fibonacci numbers', () => {
    expect(fibonacciSequence(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  it('should return an empty array for non-positive input', () => {
    expect(fibonacciSequence(0)).toEqual([]);
    expect(fibonacciSequence(-5)).toEqual([]);
  });
});
