import { maxSubarraySum } from './exercise';

describe("Kadane's Algorithm - Maximum Subarray Sum", () => {
  it('should return the correct maximum subarray sum', () => {
    expect(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
    expect(maxSubarraySum([5, 4, -1, 7, 8])).toBe(23);
    expect(maxSubarraySum([-1, -2, -3])).toBe(-1);
  });

  it('should handle an array with all negative numbers', () => {
    expect(maxSubarraySum([-2, -3, -4, -1, -2, -1, -5, -3])).toBe(-1);
  });

  it('should handle an empty array', () => {
    expect(maxSubarraySum([])).toBe(undefined);
  });

  it('should handle an array with a single element', () => {
    expect(maxSubarraySum([5])).toBe(5);
    expect(maxSubarraySum([-5])).toBe(-5);
  });
});
