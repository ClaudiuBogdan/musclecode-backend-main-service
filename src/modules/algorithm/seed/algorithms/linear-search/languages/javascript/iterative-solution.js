/**
 * Implements linear search algorithm to find a target number in an array using an iterative approach.
 *
 * @param {number[]} nums - An array of integers
 * @param {number} target - The integer to search for in the array
 * @returns {number} The index of the target if found, -1 otherwise
 *
 * Time Complexity: O(n)
 */
function linearSearch(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      return i;
    }
  }
  return -1;
}

module.exports = { linearSearch };
