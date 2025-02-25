/**
 * Implements linear search algorithm to find a target number in an array using an iterative approach.
 *
 * @param nums - An array of integers
 * @param target - The integer to search for in the array
 * @returns The index of the target if found, -1 otherwise
 *
 * Time Complexity: O(n) where n is the length of the array
 * Space Complexity: O(1) as it uses constant extra space
 *
 * The implementation:
 * - Iterates through each element of the array from left to right
 * - Compares each element with the target value
 * - Returns the index when the target is found
 * - Returns -1 if the entire array is traversed without finding the target
 */
export function linearSearch(nums: number[], target: number): number {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      return i;
    }
  }
  return -1;
}
