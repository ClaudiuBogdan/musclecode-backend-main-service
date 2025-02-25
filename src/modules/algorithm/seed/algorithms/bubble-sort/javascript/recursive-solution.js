/**
 * Implements the Bubble Sort algorithm using a recursive approach.
 * @param {number[]} nums - An array of numbers
 * @returns {number[]} The sorted array in ascending order
 */
function bubbleSort(nums) {
  return bubbleSortRecursive(nums, nums.length);
}

/**
 * Helper function that recursively sorts the array.
 * @param {number[]} nums - The array to sort
 * @param {number} n - The length of the portion of the array to consider
 * @returns {number[]} The sorted array
 */
function bubbleSortRecursive(nums, n) {
  if (n === 1) return nums;
  for (let i = 0; i < n - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
    }
  }
  return bubbleSortRecursive(nums, n - 1);
}

module.exports = { bubbleSort }; 