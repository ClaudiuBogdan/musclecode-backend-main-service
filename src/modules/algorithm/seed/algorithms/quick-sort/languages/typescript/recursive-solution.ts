/**
 * Implements Quick Sort algorithm using a recursive approach.
 *
 * @param nums - An array of numbers to sort.
 * @returns The array sorted in ascending order.
 */
export function quickSort(nums: number[]): number[] {
  const arr = [...nums]; // copy the array to avoid mutating the original
  quickSortHelper(arr, 0, arr.length - 1);
  return arr;
}

function quickSortHelper(arr: number[], low: number, high: number): void {
  if (low < high) {
    const p = partition(arr, low, high);
    quickSortHelper(arr, low, p - 1);
    quickSortHelper(arr, p + 1, high);
  }
}

function partition(arr: number[], low: number, high: number): number {
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
