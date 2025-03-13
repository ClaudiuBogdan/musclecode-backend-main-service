// Recursive AVL Tree Implementation in JavaScript

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

  // Utility function to get height
  getHeight(node) {
    return node ? node.height : 0;
  }

  // Right rotate
  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    return x;
  }

  // Left rotate
  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    return y;
  }

  // Get balance factor
  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  // Recursive insertion helper
  insertNode(node, value) {
    if (!node) {
      return new AVLNode(value);
    }
    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else {
      node.right = this.insertNode(node.right, value);
    }
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    const balance = this.getBalance(node);
    // Left Left Case
    if (balance > 1 && value < node.left.value) {
      return this.rightRotate(node);
    }
    // Right Right Case
    if (balance < -1 && value > node.right.value) {
      return this.leftRotate(node);
    }
    // Left Right Case
    if (balance > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    // Right Left Case
    if (balance < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }
    return node;
  }

  // Recursive insertion
  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  // Recursive search
  search(value) {
    return this.searchNode(this.root, value);
  }

  searchNode(node, value) {
    if (!node) return null;
    if (node.value === value) return node;
    return value < node.value ? this.searchNode(node.left, value) : this.searchNode(node.right, value);
  }
}

module.exports = { AVLTree, AVLNode }; 