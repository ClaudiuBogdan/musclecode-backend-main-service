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
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return undefined;
}
