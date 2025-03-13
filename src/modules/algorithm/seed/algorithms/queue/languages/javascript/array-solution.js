class Queue {
  constructor(capacity) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.front = 0;
    this.rear = -1;
    this.count = 0;
  }

  enqueue(item) {
    if (this.isFull()) {
      throw new Error('Queue Overflow');
    }
    this.rear = (this.rear + 1) % this.capacity;
    this.items[this.rear] = item;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const item = this.items[this.front];
    this.front = (this.front + 1) % this.capacity;
    this.count--;
    return item;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.front];
  }

  isEmpty() {
    return this.count === 0;
  }

  isFull() {
    return this.count === this.capacity;
  }

  size() {
    return this.count;
  }
}

module.exports = { Queue };
