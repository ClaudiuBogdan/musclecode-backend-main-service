/**
 * Implements the Insertion Sort algorithm recursively.
 *
 * @param {number[]} nums - An array of integers to sort.
 * @returns {number[]} The sorted array.
 */
function insertionSort(nums) {
  return recursiveInsertionSort(nums, nums.length);
}

/**
 * Helper function to recursively sort the array.
 *
 * @param {number[]} nums - The array to sort.
 * @param {number} n - The number of elements to consider.
 * @returns {number[]} The sorted array.
 */
function recursiveInsertionSort(nums, n) {
  if (n <= 1) {
    return nums;
  }
  recursiveInsertionSort(nums, n - 1);
  const last = nums[n - 1];
  let j = n - 2;
  while (j >= 0 && nums[j] > last) {
    nums[j + 1] = nums[j];
    j--;
  }
  nums[j + 1] = last;
  return nums;
}

module.exports = { insertionSort };
