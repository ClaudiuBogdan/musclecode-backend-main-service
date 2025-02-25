/**
 * Implements the Bubble Sort algorithm using an iterative approach.
 * @param {number[]} nums - An array of numbers
 * @returns {number[]} The sorted array in ascending order
 */
function bubbleSort(nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        // Swap elements
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return nums;
}

module.exports = { bubbleSort }; 