/**
 * Implements the Insertion Sort algorithm iteratively.
 *
 * @param {number[]} nums - An array of integers to sort.
 * @returns {number[]} The sorted array.
 */
function insertionSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    const key = nums[i];
    let j = i - 1;
    while (j >= 0 && nums[j] > key) {
      nums[j + 1] = nums[j];
      j--;
    }
    nums[j + 1] = key;
  }
  return nums;
}

module.exports = { insertionSort };
