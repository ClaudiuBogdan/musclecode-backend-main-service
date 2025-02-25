/**
 * Implements Quick Sort algorithm using an iterative approach.
 *
 * @param nums - An array of numbers to sort.
 * @returns The array sorted in ascending order.
 */
export function quickSort(nums: number[]): number[] {
  const arr = [...nums]; // copy the array to avoid modifying the original
  const stack: [number, number][] = [];
  stack.push([0, arr.length - 1]);

  while (stack.length) {
    const [low, high] = stack.pop()!;
    if (low < high) {
      const p = partition(arr, low, high);
      stack.push([low, p - 1]);
      stack.push([p + 1, high]);
    }
  }
  return arr;
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
