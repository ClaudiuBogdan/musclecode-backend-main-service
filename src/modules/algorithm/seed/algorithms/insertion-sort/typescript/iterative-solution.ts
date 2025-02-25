/**
 * Implements the Insertion Sort algorithm iteratively.
 *
 * @param nums - An array of numbers to sort.
 * @returns The sorted array.
 */
export function insertionSort(nums: number[]): number[] {
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
