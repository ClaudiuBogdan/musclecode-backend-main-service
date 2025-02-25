/**
 * Implements the Bubble Sort algorithm using an iterative approach.
 * @param nums - An array of numbers
 * @returns The sorted array in ascending order
 */
export function bubbleSort(nums: number[]): number[] {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        // Swap adjacent elements
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // Array is already sorted
  }
  return nums;
} 