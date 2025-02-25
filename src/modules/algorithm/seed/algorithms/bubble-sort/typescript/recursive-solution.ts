/**
 * Implements the Bubble Sort algorithm using a recursive approach.
 * @param nums - An array of numbers
 * @returns The sorted array in ascending order
 */
export function bubbleSort(nums: number[]): number[] {
  return bubbleSortRecursive(nums, nums.length);
}

/**
 * Helper function that recursively sorts the array.
 * @param nums - The array to sort
 * @param n - The length of the portion of the array to consider
 * @returns The sorted array
 */
function bubbleSortRecursive(nums: number[], n: number): number[] {
  if (n === 1) {
    return nums;
  }
  for (let i = 0; i < n - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
    }
  }
  return bubbleSortRecursive(nums, n - 1);
} 