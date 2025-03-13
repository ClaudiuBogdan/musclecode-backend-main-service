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

  // Recursively insert a value into the red-black tree.
  insert(value: number): void {
    const newNode = new Node(value);
    this.root = this.recursiveInsert(this.root, newNode, null);
    newNode.color = Color.RED;
    this.insertFixup(newNode);
  }

  private recursiveInsert(root: Node | null, node: Node, parent: Node | null): Node {
    if (root === null) {
      node.parent = parent;
      return node;
    }
    if (node.value < root.value) {
      root.left = this.recursiveInsert(root.left, node, root);
    } else {
      root.right = this.recursiveInsert(root.right, node, root);
    }
    return root;
  }

  // Fix the red-black tree properties after insertion (same as iterative version).
  private insertFixup(z: Node): void {
    while (z.parent !== null && z.parent.color === Color.RED) {
      if (z.parent === z.parent.parent?.left) {
        let y = z.parent.parent.right;
        if (y !== null && y.color === Color.RED) {
          z.parent.color = Color.BLACK;
          y.color = Color.BLACK;
          z.parent.parent.color = Color.RED;
          z = z.parent.parent;
        } else {
          if (z === z.parent.right) {
            z = z.parent;
            this.leftRotate(z);
          }
          if (z.parent) {
            z.parent.color = Color.BLACK;
            if (z.parent.parent) {
              z.parent.parent.color = Color.RED;
              this.rightRotate(z.parent.parent);
            }
          }
        }
      } else {
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
          if (z.parent) {
            z.parent.color = Color.BLACK;
            if (z.parent.parent) {
              z.parent.parent.color = Color.RED;
              this.leftRotate(z.parent.parent);
            }
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

  // Recursive search for a value in the red-black tree.
  search(value: number): Node | null {
    return this.recursiveSearch(this.root, value);
  }

  private recursiveSearch(node: Node | null, value: number): Node | null {
    if (node === null) return null;
    if (node.value === value) return node;
    if (value < node.value) {
      return this.recursiveSearch(node.left, value);
    } else {
      return this.recursiveSearch(node.right, value);
    }
  }
} 