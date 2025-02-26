/**
 * Given an array of integers, find the contiguous subarray with the largest sum using Kadane's Algorithm (Iterative).
 *
 * @param {number[]} nums - An array of integers
 * @returns {number} The maximum subarray sum
 */
function maxSubarraySum(nums) {
  if (!nums || nums.length === 0) {
    return undefined;
  }

  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];

  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}
