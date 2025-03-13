class MaxHeap {
  constructor(array) {
    this.heap = array;
    this.buildMaxHeap(this.heap);
  }

  buildMaxHeap(array) {
    const n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapify(array, n, i);
    }
  }

  heapify(array, n, i) {
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

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap, this.heap.length - 1);
  }

  heapifyUp(array, i) {
    const parent = Math.floor((i - 1) / 2);

    if (i > 0 && array[i] > array[parent]) {
      this.swap(array, i, parent);
      this.heapifyUp(array, parent);
    }
  }

  extractMax() {
    if (this.heap.length === 0) {
      return undefined;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapify(this.heap, this.heap.length, 0);
    return max;
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  size() {
    return this.heap.length;
  }

  swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
  }
}

module.exports = { MaxHeap };
