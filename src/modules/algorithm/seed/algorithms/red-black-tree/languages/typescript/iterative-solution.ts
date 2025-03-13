export enum Color {
  RED = "RED",
  BLACK = "BLACK"
}

export class Node {
  value: number;
  color: Color;
  left: Node | null;
  right: Node | null;
  parent: Node | null;

  constructor(value: number) {
    this.value = value;
    this.color = Color.RED;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

export class RedBlackTree {
  root: Node | null = null;

  // Iteratively insert a value into the red-black tree.
  insert(value: number): void {
    const newNode = new Node(value);
    let y: Node | null = null;
    let x = this.root;

    while (x !== null) {
      y = x;
      if (value < x.value) {
        x = x.left;
      } else {
        x = x.right;
      }
    }

    newNode.parent = y;
    if (y === null) {
      this.root = newNode;
    } else if (value < y.value) {
      y.left = newNode;
    } else {
      y.right = newNode;
    }

    newNode.color = Color.RED;
    this.insertFixup(newNode);
  }

  // Fix the red-black tree properties after insertion.
  private insertFixup(z: Node): void {
    while (z.parent !== null && z.parent.color === Color.RED) {
      if (z.parent === z.parent.parent?.left) {
        let y = z.parent.parent.right;
        if (y !== null && y.color === Color.RED) {
          // Case 1: uncle is red
          z.parent.color = Color.BLACK;
          y.color = Color.BLACK;
          z.parent.parent.color = Color.RED;
          z = z.parent.parent;
        } else {
          if (z === z.parent.right) {
            // Case 2: triangle formation
            z = z.parent;
            this.leftRotate(z);
          }
          // Case 3: line formation
          z.parent.color = Color.BLACK;
          if (z.parent.parent) {
            z.parent.parent.color = Color.RED;
            this.rightRotate(z.parent.parent);
          }
        }
      } else {
        // Mirror case: z.parent is the right child
        let y = z.parent.parent?.left;
        if (y !== null && y.color === Color.RED) {
          z.parent.color = Color.BLACK;
          y.color = Color.BLACK;
          z.parent.parent.color = Color.RED;
          z = z.parent.parent;
        } else {
          if (z === z.parent.left) {
            z = z.parent;
            this.rightRotate(z);
          }
          z.parent.color = Color.BLACK;
          if (z.parent.parent) {
            z.parent.parent.color = Color.RED;
            this.leftRotate(z.parent.parent);
          }
        }
      }
    }
    if (this.root) {
      this.root.color = Color.BLACK;
    }
  }

  private leftRotate(x: Node): void {
    let y = x.right;
    if (y === null) return;
    x.right = y.left;
    if (y.left !== null) {
      y.left.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    y.left = x;
    x.parent = y;
  }

  private rightRotate(y: Node): void {
    let x = y.left;
    if (x === null) return;
    y.left = x.right;
    if (x.right !== null) {
      x.right.parent = y;
    }
    x.parent = y.parent;
    if (y.parent === null) {
      this.root = x;
    } else if (y === y.parent.left) {
      y.parent.left = x;
    } else {
      y.parent.right = x;
    }
    x.right = y;
    y.parent = x;
  }

  // Iterative search for a value in the red-black tree.
  search(value: number): Node | null {
    let current = this.root;
    while (current !== null) {
      if (value === current.value) {
        return current;
      }
      current = value < current.value ? current.left : current.right;
    }
    return null;
  }
} 