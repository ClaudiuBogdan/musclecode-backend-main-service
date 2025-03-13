export class RingBuffer<T> {
  private buffer: (T | undefined)[];
  private head: number;
  private tail: number;
  private count: number;
  private readonly capacity: number;

  constructor(capacity: number) {
    this.buffer = new Array(capacity).fill(undefined);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
    this.capacity = capacity;
  }

  enqueue(item: T): void {
    this.buffer[this.head] = item;
    this.head = (this.head + 1) % this.capacity;
    if (this.count === this.capacity) {
      this.tail = (this.tail + 1) % this.capacity;
    } else {
      this.count++;
    }
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const item = this.buffer[this.tail];
    this.buffer[this.tail] = undefined;
    this.tail = (this.tail + 1) % this.capacity;
    this.count--;
    return item;
  }

  isFull(): boolean {
    return this.count === this.capacity;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  getCount(): number {
    return this.count;
  }
}
