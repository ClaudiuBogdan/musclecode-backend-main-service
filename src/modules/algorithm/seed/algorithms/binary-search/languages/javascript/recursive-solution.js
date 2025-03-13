/**
 * Implements binary search algorithm to find a target number in a sorted array using a recursive approach.
 *
 * @param {number[]} nums - A sorted array of distinct integers in ascending order
 * @param {number} target - The integer to search for in the array
 * @returns {number} The index of the target if found, -1 otherwise
 *
 * Time Complexity: O(log n) where n is the length of the array
 * Space Complexity: O(log n) due to recursive call stack
 *
 * The implementation uses two pointers approach:
 * - left: points to the start of the current search range
 * - right: points to the end of the current search range
 *
 * In each iteration:
 * 1. Calculate the middle point
 * 2. Compare the middle element with the target
 * 3. If equal, we found our target
 * 4. If target is greater, search in right half
 * 5. If target is smaller, search in left half
 *
 * Note: We use left + Math.floor((right - left) / 2) instead of (left + right) / 2
 * to avoid potential integer overflow in languages where this might be an issue.
 */
function binarySearch(nums, target) {
  return binarySearchHelper(nums, target, 0, nums.length - 1);
}

/**
 * Helper function for recursive binary search
 * @param {number[]} nums - The sorted array to search in
 * @param {number} target - The target value to find
 * @param {number} left - left boundary index of current search space
 * @param {number} right - right boundary index of current search space
 * @returns {number} The index of the target if found, -1 otherwise
 */
function binarySearchHelper(nums, target, left, right) {
  if (left > right) {
    return -1;
  }

  const mid = left + Math.floor((right - left) / 2);

  if (nums[mid] === target) {
    return mid;
  }

  if (nums[mid] < target) {
    return binarySearchHelper(nums, target, mid + 1, right);
  }

  return binarySearchHelper(nums, target, left, mid - 1);
}

module.exports = { binarySearch };
