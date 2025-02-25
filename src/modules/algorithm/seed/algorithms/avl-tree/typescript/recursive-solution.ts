// Recursive AVL Tree implementation

export class AVLNode {
  value: number;
  left: AVLNode | null;
  right: AVLNode | null;
  height: number;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

export class AVLTree {
  root: AVLNode | null;

  constructor() {
    this.root = null;
  }

  // Utility function to get height of a node
  private getHeight(node: AVLNode | null): number {
    return node ? node.height : 0;
  }

  // Right rotate around node y
  private rightRotate(y: AVLNode): AVLNode {
    const x = y.left!;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  // Left rotate around node x
  private leftRotate(x: AVLNode): AVLNode {
    const y = x.right!;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y;
  }

  // Get the balance factor of a node
  private getBalance(node: AVLNode | null): number {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  // Recursive helper for insertion
  private insertNode(node: AVLNode | null, value: number): AVLNode {
    // Standard BST insertion
    if (!node) {
      return new AVLNode(value);
    }
    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else {
      node.right = this.insertNode(node.right, value);
    }

    // Update height
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    // Check balance
    const balance = this.getBalance(node);

    // Left Left Case
    if (balance > 1 && value < (node.left ? node.left.value : 0)) {
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && value > (node.right ? node.right.value : 0)) {
      return this.leftRotate(node);
    }

    // Left Right Case
    if (balance > 1 && value > (node.left ? node.left.value : 0)) {
      node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && value < (node.right ? node.right.value : 0)) {
      node.right = this.rightRotate(node.right!);
      return this.leftRotate(node);
    }

    return node;
  }

  // Recursive insertion
  insert(value: number): void {
    this.root = this.insertNode(this.root, value);
  }

  // Recursive search for a value in the AVL Tree
  search(value: number): AVLNode | null {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: AVLNode | null, value: number): AVLNode | null {
    if (!node) return null;
    if (node.value === value) return node;
    return value < node.value ? this.searchNode(node.left, value) : this.searchNode(node.right, value);
  }
} 