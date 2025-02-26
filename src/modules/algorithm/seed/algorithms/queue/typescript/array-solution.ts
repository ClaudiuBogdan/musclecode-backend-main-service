export class Queue {
  private items: any[];
  private capacity: number;
  private front: number;
  private rear: number;
  private count: number;

  constructor(capacity: number) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.front = 0;
    this.rear = -1;
    this.count = 0;
  }

  enqueue(item: any): void {
    if (this.isFull()) {
      throw new Error('Queue Overflow');
    }
    this.rear = (this.rear + 1) % this.capacity;
    this.items[this.rear] = item;
    this.count++;
  }

  dequeue(): any {
    if (this.isEmpty()) {
      return undefined;
    }
    const item = this.items[this.front];
    this.front = (this.front + 1) % this.capacity;
    this.count--;
    return item;
  }

  peek(): any {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.front];
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  isFull(): boolean {
    return this.count === this.capacity;
  }

  size(): number {
    return this.count;
  }
}
