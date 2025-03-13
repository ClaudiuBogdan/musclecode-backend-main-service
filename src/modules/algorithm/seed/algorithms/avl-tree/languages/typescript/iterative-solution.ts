// Iterative AVL Tree implementation

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

  // Utility function to get height of node
  private getHeight(node: AVLNode | null): number {
    return node ? node.height : 0;
  }

  // Right rotate
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

  // Left rotate
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

  // Get balance factor of node
  private getBalance(node: AVLNode | null): number {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  // Iterative insertion
  insert(value: number): void {
    if (!this.root) {
      this.root = new AVLNode(value);
      return;
    }

    const path: AVLNode[] = [];
    let current = this.root;
    // Traverse down to find the position to insert
    while (true) {
      path.push(current);
      if (value < current.value) {
        if (!current.left) {
          current.left = new AVLNode(value);
          path.push(current.left);
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = new AVLNode(value);
          path.push(current.right);
          break;
        }
        current = current.right;
      }
    }

    // Update the nodes and rebalance from bottom-up
    for (let i = path.length - 1; i >= 0; i--) {
      const node = path[i];
      node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

      const balance = this.getBalance(node);

      // Left Left Case
      if (balance > 1 && value < (node.left ? node.left.value : 0)) {
        if (i === 0) {
          this.root = this.rightRotate(node);
        } else {
          const parent = path[i - 1];
          if (parent.left === node) {
            parent.left = this.rightRotate(node);
          } else {
            parent.right = this.rightRotate(node);
          }
        }
        continue;
      }

      // Right Right Case
      if (balance < -1 && value > (node.right ? node.right.value : 0)) {
        if (i === 0) {
          this.root = this.leftRotate(node);
        } else {
          const parent = path[i - 1];
          if (parent.left === node) {
            parent.left = this.leftRotate(node);
          } else {
            parent.right = this.leftRotate(node);
          }
        }
        continue;
      }

      // Left Right Case
      if (balance > 1 && value > (node.left ? node.left.value : 0)) {
        if (node.left) {
          node.left = this.leftRotate(node.left);
        }
        if (i === 0) {
          this.root = this.rightRotate(node);
        } else {
          const parent = path[i - 1];
          if (parent.left === node) {
            parent.left = this.rightRotate(node);
          } else {
            parent.right = this.rightRotate(node);
          }
        }
        continue;
      }

      // Right Left Case
      if (balance < -1 && value < (node.right ? node.right.value : 0)) {
        if (node.right) {
          node.right = this.rightRotate(node.right);
        }
        if (i === 0) {
          this.root = this.leftRotate(node);
        } else {
          const parent = path[i - 1];
          if (parent.left === node) {
            parent.left = this.leftRotate(node);
          } else {
            parent.right = this.leftRotate(node);
          }
        }
      }
    }
  }

  // Iterative search for a value; returns the node if found, else null
  search(value: number): AVLNode | null {
    let current = this.root;
    while (current) {
      if (value === current.value) {
        return current;
      }
      current = value < current.value ? current.left : current.right;
    }
    return null;
  }
} 