export interface Stack {
  push(value: number): void;
  pop(): number | undefined;
  peek(): number | undefined;
  isEmpty(): boolean;
}

export class StackImpl implements Stack {
  private items: number[] = [];

  push(value: number): void {
    this.items.push(value);
  }

  pop(): number | undefined {
    return this.items.pop();
  }

  peek(): number | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
