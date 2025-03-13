// Iterative AVL Tree Implementation in JavaScript

class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  // Utility function to get the height of a node
  getHeight(node) {
    return node ? node.height : 0;
  }

  // Right rotate
  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    // Rotate
    x.right = y;
    y.left = T2;

    // Update heights
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  // Left rotate
  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    // Rotate
    y.left = x;
    x.right = T2;

    // Update heights
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y;
  }

  // Get balance factor of node
  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  // Iterative insert
  insert(value) {
    if (!this.root) {
      this.root = new AVLNode(value);
      return;
    }

    const path = [];
    let current = this.root;
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

    // Rebalance from bottom-up
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
        node.left = this.leftRotate(node.left);
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
        node.right = this.rightRotate(node.right);
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

  // Iterative search
  search(value) {
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

module.exports = { AVLTree, AVLNode }; 