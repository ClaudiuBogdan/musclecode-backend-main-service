const { maxSubarraySum } = require('./exercise');

describe('Max Subarray Sum (Sliding Window)', () => {
  it('should return the maximum sum of a subarray with size k', () => {
    expect(maxSubarraySum([2, 1, 5, 1, 3, 2], 3)).toBe(9);
  });

  it('should return the maximum sum of a subarray with size k', () => {
    expect(maxSubarraySum([5, 6, 1, 2, 6, 6, 4, 3], 3)).toBe(16);
  });

  it('should handle edge case where k is larger than the array length', () => {
    expect(maxSubarraySum([1, 2, 3], 4)).toBe(undefined);
  });

  it('should handle edge case where array is empty', () => {
    expect(maxSubarraySum([], 2)).toBe(undefined);
  });

  it('should handle edge case where k is 1', () => {
    expect(maxSubarraySum([1, 2, 3, 4, 5], 1)).toBe(5);
  });
});
