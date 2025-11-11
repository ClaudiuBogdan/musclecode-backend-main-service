export interface Stack {
  push(value: number): void;
  pop(): number | undefined;
  peek(): number | undefined;
  isEmpty(): boolean;
}

export class StackImpl implements Stack {
  constructor() {
    // TODO: Implement the stack data structure
  }

  push(value: number): void {
    // TODO: Implement the push method
  }

  pop(): number | undefined {
    // TODO: Implement the pop method
    throw new Error('Not implemented');
  }

  peek(): number | undefined {
    // TODO: Implement the peek method
    throw new Error('Not implemented');
  }

  isEmpty(): boolean {
    // TODO: Implement the isEmpty method
    throw new Error('Not implemented');
  }
}
