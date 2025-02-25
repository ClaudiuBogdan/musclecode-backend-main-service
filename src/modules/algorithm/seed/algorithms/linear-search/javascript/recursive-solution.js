/**
 * Implements linear search algorithm to find a target number in an array using a recursive approach.
 *
 * @param {number[]} nums - An array of integers
 * @param {number} target - The integer to search for in the array
 * @returns {number} The index of the target if found, -1 otherwise
 *
 * Time Complexity: O(n)
 */
function linearSearch(nums, target) {
  return linearSearchHelper(nums, target, 0);
}

/**
 * Helper function for recursive linear search.
 * @param {number[]} nums - The array to search in.
 * @param {number} target - The target value.
 * @param {number} index - The current index.
 * @returns {number} The index if found, -1 otherwise.
 */
function linearSearchHelper(nums, target, index) {
  if (index >= nums.length) {
    return -1;
  }
  if (nums[index] === target) {
    return index;
  }
  return linearSearchHelper(nums, target, index + 1);
}

module.exports = { linearSearch };
