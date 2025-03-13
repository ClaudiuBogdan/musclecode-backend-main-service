const Color = {
  RED: 'RED',
  BLACK: 'BLACK'
};

class Node {
  constructor(value) {
    this.value = value;
    this.color = Color.RED;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class RedBlackTree {
  constructor() {
    this.root = null;
  }

  // Recursively insert a value into the tree.
  insert(value) {
    const newNode = new Node(value);
    this.root = this.recursiveInsert(this.root, newNode, null);
    newNode.color = Color.RED;
    this.insertFixup(newNode);
  }

  recursiveInsert(root, node, parent) {
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

  insertFixup(z) {
    while (z.parent !== null && z.parent.color === Color.RED) {
      if (z.parent === z.parent.parent?.left) {
        let y = z.parent.parent.right;
        if (y && y.color === Color.RED) {
          z.parent.color = Color.BLACK;
          y.color = Color.BLACK;
          z.parent.parent.color = Color.RED;
          z = z.parent.parent;
        } else {
          if (z === z.parent.right) {
            z = z.parent;
            this.leftRotate(z);
          }
          z.parent.color = Color.BLACK;
          z.parent.parent.color = Color.RED;
          this.rightRotate(z.parent.parent);
        }
      } else {
        let y = z.parent.parent?.left;
        if (y && y.color === Color.RED) {
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
          z.parent.parent.color = Color.RED;
          this.leftRotate(z.parent.parent);
        }
      }
    }
    if (this.root) {
      this.root.color = Color.BLACK;
    }
  }

  leftRotate(x) {
    let y = x.right;
    if (!y) return;
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

  rightRotate(y) {
    let x = y.left;
    if (!x) return;
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

  // Recursive search for a value.
  search(value) {
    return this.recursiveSearch(this.root, value);
  }

  recursiveSearch(node, value) {
    if (node === null) return null;
    if (node.value === value) return node;
    return value < node.value
      ? this.recursiveSearch(node.left, value)
      : this.recursiveSearch(node.right, value);
  }
}

module.exports = { RedBlackTree, Node, Color }; 