// Stub for the Red-Black Tree implementation.
// Implement the Red-Black Tree with insert and search methods.
// You may need to implement rotations and fix-up functions to maintain the red-black properties.

export class RedBlackTree {
  // The tree's root node
  root: Node | null = null;

  insert(value: number): void {
    // TODO: Implement the insert operation for the red-black tree.
  }

  search(value: number): Node | null {
    // TODO: Implement the search operation for the red-black tree.
    return null;
  }
}

export enum Color {
  RED = 'RED',
  BLACK = 'BLACK',
}

export class Node {
  value: number;
  color: Color;
  left: Node | null;
  right: Node | null;
  parent: Node | null;

  constructor(value: number) {
    this.value = value;
    this.color = Color.RED; // new nodes are red by default
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}
