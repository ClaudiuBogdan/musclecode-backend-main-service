export class MaxHeap {
  private heap: number[];

  constructor(array: number[]) {
    this.heap = array;
    this.buildMaxHeap(this.heap);
  }

  private buildMaxHeap(array: number[]): void {
    const n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapify(array, n, i);
    }
  }

  private heapify(array: number[], n: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
      largest = left;
    }

    if (right < n && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== i) {
      this.swap(array, i, largest);
      this.heapify(array, n, largest);
    }
  }

  insert(value: number): void {
    this.heap.push(value);
    this.heapifyUp(this.heap, this.heap.length - 1);
  }

  private heapifyUp(array: number[], i: number): void {
    const parent = Math.floor((i - 1) / 2);

    if (i > 0 && array[i] > array[parent]) {
      this.swap(array, i, parent);
      this.heapifyUp(array, parent);
    }
  }

  extractMax(): number | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapify(this.heap, this.heap.length, 0);
    return max;
  }

  peek(): number | undefined {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  size(): number {
    return this.heap.length;
  }

  private swap(array: number[], i: number, j: number): void {
    [array[i], array[j]] = [array[j], array[i]];
  }
}
