/**
 * Given an array of integers nums and an integer target, find the indices of the two numbers
 * such that they add up to target.
 *
 * You may assume that each input would have exactly one solution, and you may not use the same
 * element twice.
 *
 * @param {number[]} nums
 * @param {number} target
 * @returns {number[] | undefined} An array of two indices that add up to the target, or undefined if no such pair exists.
 */
function twoSum(nums, target) {
  const numMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }
    numMap.set(nums[i], i);
  }

  return undefined;
}
