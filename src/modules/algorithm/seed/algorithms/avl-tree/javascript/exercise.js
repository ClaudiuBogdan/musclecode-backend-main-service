// AVL Tree Exercise - Stub Implementation

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

  // Insert a value into the AVL Tree
  insert(value) {
    // TODO: Implement the AVL Tree insertion algorithm to maintain balance
  }

  // Search for a value in the AVL Tree; returns the node if found, otherwise null
  search(value) {
    // TODO: Implement the AVL Tree search function
    return null;
  }
}

module.exports = { AVLTree, AVLNode }; 