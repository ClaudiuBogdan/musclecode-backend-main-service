class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor(capacity = Infinity) {
    this.front = null;
    this.rear = null;
    this.count = 0;
    this.capacity = capacity;
  }

  enqueue(item) {
    if (this.count >= this.capacity) {
      throw new Error('Queue Overflow');
    }

    const newNode = new Node(item);

    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      if (this.rear) {
        this.rear.next = newNode;
      }
      this.rear = newNode;
    }

    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const item = this.front.data;
    this.front = this.front.next;
    this.count--;

    if (this.isEmpty()) {
      this.rear = null;
    }

    return item;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.front.data;
  }

  isEmpty() {
    return this.count === 0 && this.front === null;
  }

  isFull() {
    return this.count === this.capacity;
  }

  size() {
    return this.count;
  }
}

module.exports = { Queue };
