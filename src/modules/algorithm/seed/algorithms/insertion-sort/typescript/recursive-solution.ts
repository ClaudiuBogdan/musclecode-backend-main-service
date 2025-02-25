/**
 * Implements the Insertion Sort algorithm recursively.
 *
 * @param nums - An array of numbers to sort.
 * @returns The sorted array.
 */
export function insertionSort(nums: number[]): number[] {
  return recursiveInsertionSort(nums, nums.length);
}

/**
 * Helper function to recursively sort the array.
 *
 * @param nums - The array to sort.
 * @param n - The number of elements to consider.
 * @returns The sorted array.
 */
function recursiveInsertionSort(nums: number[], n: number): number[] {
  if (n <= 1) {
    return nums;
  }

  // Recursively sort first n-1 elements
  recursiveInsertionSort(nums, n - 1);

  // Insert last element into its correct position
  const last = nums[n - 1];
  let j = n - 2;
  while (j >= 0 && nums[j] > last) {
    nums[j + 1] = nums[j];
    j--;
  }
  nums[j + 1] = last;
  return nums;
}
