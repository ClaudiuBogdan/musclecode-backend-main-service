const { fibonacciSequence } = require('./exercise');

describe('Fibonacci Sequence', () => {
  test('should generate first 7 Fibonacci numbers', () => {
    expect(fibonacciSequence(7)).toEqual([0, 1, 1, 2, 3, 5, 8]);
  });

  test('should generate first 10 Fibonacci numbers', () => {
    expect(fibonacciSequence(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  test('should return an empty array for n <= 0', () => {
    expect(fibonacciSequence(0)).toEqual([]);
    expect(fibonacciSequence(-1)).toEqual([]);
  });
});
