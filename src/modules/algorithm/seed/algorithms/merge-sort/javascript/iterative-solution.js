/**
 * Iterative (bottom-up) implementation of the Merge Sort algorithm.
 *
 * @param {number[]} nums - An array of integers
 * @returns {number[]} A new sorted array in ascending order
 */
function merge(left, right) {
  const result = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  // Append any remaining elements
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);
  return result;
}

function mergeSort(nums) {
  if (nums.length <= 1) return nums;
  // Initialize work array with single-element arrays.
  let work = nums.map((n) => [n]);
  while (work.length > 1) {
    const temp = [];
    for (let i = 0; i < work.length; i += 2) {
      if (i + 1 < work.length) {
        temp.push(merge(work[i], work[i + 1]));
      } else {
        temp.push(work[i]);
      }
    }
    work = temp;
  }
  return work[0];
}

module.exports = { mergeSort };
