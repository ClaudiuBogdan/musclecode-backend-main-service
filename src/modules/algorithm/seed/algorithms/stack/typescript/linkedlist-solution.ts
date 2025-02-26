export interface Stack {
  push(value: number): void;
  pop(): number | undefined;
  peek(): number | undefined;
  isEmpty(): boolean;
}

class Node {
  data: number;
  next: Node | null;

  constructor(data: number) {
    this.data = data;
    this.next = null;
  }
}

export class StackImpl implements Stack {
  private top: Node | null = null;

  push(value: number): void {
    const newNode = new Node(value);
    newNode.next = this.top;
    this.top = newNode;
  }

  pop(): number | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const value = this.top!.data;
    this.top = this.top!.next;
    return value;
  }

  peek(): number | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.top!.data;
  }

  isEmpty(): boolean {
    return this.top === null;
  }
}
