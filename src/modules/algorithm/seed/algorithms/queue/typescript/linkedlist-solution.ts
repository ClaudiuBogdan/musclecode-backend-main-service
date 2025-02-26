class Node {
  data: any;
  next: Node | null;

  constructor(data: any) {
    this.data = data;
    this.next = null;
  }
}

export class Queue {
  private front: Node | null;
  private rear: Node | null;
  private count: number;
  private capacity: number;

  constructor(capacity: number = Infinity) {
    this.front = null;
    this.rear = null;
    this.count = 0;
    this.capacity = capacity;
  }

  enqueue(item: any): void {
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

  dequeue(): any {
    if (this.isEmpty()) {
      return undefined;
    }

    const item = this.front!.data;
    this.front = this.front!.next;
    this.count--;

    if (this.isEmpty()) {
      this.rear = null;
    }

    return item;
  }

  peek(): any {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.front!.data;
  }

  isEmpty(): boolean {
    return this.count === 0 && this.front === null;
  }

  isFull(): boolean {
    return this.count === this.capacity;
  }

  size(): number {
    return this.count;
  }
}
