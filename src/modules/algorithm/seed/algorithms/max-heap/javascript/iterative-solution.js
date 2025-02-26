class MaxHeap {
  constructor(array) {
    this.heap = array;
    this.buildMaxHeap();
  }

  buildMaxHeap() {
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapify(i);
    }
  }

  heapify(i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
      largest = left;
    }

    if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
      largest = right;
    }

    if (largest !== i) {
      this.swap(i, largest);
      this.heapify(largest);
    }
  }

  insert(value) {
    this.heap.push(value);
    let i = this.heap.length - 1;
    while (i > 0 && this.heap[i] > this.heap[Math.floor((i - 1) / 2)]) {
      this.swap(i, Math.floor((i - 1) / 2));
      i = Math.floor((i - 1) / 2);
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
    this.heapify(0);
    return max;
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  size() {
    return this.heap.length;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

module.exports = { MaxHeap };
