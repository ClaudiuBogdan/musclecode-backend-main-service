/**
 * Implements Quick Sort algorithm using a recursive approach.
 *
 * @param {number[]} nums - The array of numbers to sort.
 * @returns {number[]} The sorted array.
 */
function quickSort(nums) {
  const arr = [...nums]; // copy array to avoid mutation
  quickSortHelper(arr, 0, arr.length - 1);
  return arr;
}

function quickSortHelper(arr, low, high) {
  if (low < high) {
    const p = partition(arr, low, high);
    quickSortHelper(arr, low, p - 1);
    quickSortHelper(arr, p + 1, high);
  }
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i;
}

module.exports = { quickSort };
