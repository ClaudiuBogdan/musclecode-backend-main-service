class RingBuffer {
  constructor(capacity) {
    this.buffer = new Array(capacity).fill(undefined);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
    this.capacity = capacity;
  }

  enqueue(item) {
    this.buffer[this.head] = item;
    this.head = (this.head + 1) % this.capacity;
    if (this.count === this.capacity) {
      this.tail = (this.tail + 1) % this.capacity;
    } else {
      this.count++;
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const item = this.buffer[this.tail];
    this.buffer[this.tail] = undefined;
    this.tail = (this.tail + 1) % this.capacity;
    this.count--;
    return item;
  }

  isFull() {
    return this.count === this.capacity;
  }

  isEmpty() {
    return this.count === 0;
  }

  getCount() {
    return this.count;
  }
}

module.exports = { RingBuffer };
