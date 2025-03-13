/**
 * Implements linear search algorithm to find a target number in an array using a recursive approach.
 *
 * @param nums - An array of integers
 * @param target - The integer to search for in the array
 * @returns The index of the target if found, -1 otherwise
 *
 * Time Complexity: O(n) where n is the length of the array
 * Space Complexity: O(n) due to recursive call stack
 *
 * The implementation:
 * - Uses a helper function to track the current index
 * - Base case: if index reaches array length, return -1 (not found)
 * - If current element matches target, return current index
 * - Otherwise, recursively search the rest of the array
 */
export function linearSearch(nums: number[], target: number): number {
  return linearSearchHelper(nums, target, 0);
}

/**
 * Helper function for recursive linear search
 * @param nums - The array to search in
 * @param target - The value to search for
 * @param index - Current index being examined
 */
function linearSearchHelper(
  nums: number[],
  target: number,
  index: number,
): number {
  if (index >= nums.length) {
    return -1;
  }

  if (nums[index] === target) {
    return index;
  }

  return linearSearchHelper(nums, target, index + 1);
}
