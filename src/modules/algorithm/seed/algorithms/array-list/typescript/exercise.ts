/**
 * Implement the following methods for an ArrayList:
 *
 * 1. add(element): Adds an element to the end of the list.
 * 2. remove(index): Removes the element at the specified index.
 */
export class ArrayList<T> {
  private data: T[];

  constructor() {
    this.data = [];
  }

  add(element: T): void {
    // TODO: Implement the add method
  }

  remove(index: number): void {
    // TODO: Implement the remove method
  }

  get(index: number): T | undefined {
    return this.data[index];
  }

  size(): number {
    return this.data.length;
  }
}
