/**
 * Given an array of integers `nums` and a positive integer `k`, find the maximum sum of any contiguous subarray of size `k`.
 *
 * @param {number[]} nums - An array of integers
 * @param {number} k - The size of the subarray
 * @returns {number} The maximum sum of any contiguous subarray of size k
 */
export function maxSubarraySum(nums: number[], k: number): number {
  if (nums.length < k || k <= 0) {
    return undefined;
  }

  let maxSum = 0;
  let windowSum = 0;

  // Calculate the sum of the first window
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }
  maxSum = windowSum;

  // Slide the window and update maxSum
  for (let i = k; i < nums.length; i++) {
    windowSum = windowSum - nums[i - k] + nums[i];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
