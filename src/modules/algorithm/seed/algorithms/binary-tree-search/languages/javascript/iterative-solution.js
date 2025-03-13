/**
 * Constructor for a binary tree node.
 * @param {number} val - The node's value.
 */
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

/**
 * Iterative implementation of BST search.
 * @param {TreeNode|null} root - The root of the BST.
 * @param {number} key - The value to search for.
 * @returns {boolean} True if the key is found, false otherwise.
 */
function search(root, key) {
  let current = root;
  while (current) {
    if (current.val === key) {
      return true;
    } else if (key < current.val) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  return false;
}

/**
 * Iterative implementation of BST insertion.
 * @param {TreeNode|null} root - The root of the BST.
 * @param {number} key - The value to insert.
 * @returns {TreeNode} The root of the BST after insertion.
 */
function insert(root, key) {
  const newNode = new TreeNode(key);
  if (!root) {
    return newNode;
  }
  let current = root;
  let parent = null;
  while (current) {
    parent = current;
    if (key < current.val) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  if (key < parent.val) {
    parent.left = newNode;
  } else {
    parent.right = newNode;
  }
  return root;
}

/**
 * Iterative implementation of BST deletion.
 * @param {TreeNode|null} root - The root of the BST.
 * @param {number} key - The value to delete.
 * @returns {TreeNode|null} The root of the BST after deletion.
 */
function deleteNode(root, key) {
  let parent = null;
  let current = root;

  // Find the node to delete.
  while (current && current.val !== key) {
    parent = current;
    if (key < current.val) {
      current = current.left;
    } else {
      current = current.right;
    }
  }

  if (!current) return root;

  // Helper function to remove a node.
  function removeNode(node) {
    if (!node.left) return node.right;
    if (!node.right) return node.left;

    // Node with two children: find inorder successor.
    let succParent = node;
    let succ = node.right;
    while (succ.left) {
      succParent = succ;
      succ = succ.left;
    }
    node.val = succ.val;
    if (succParent.left === succ) {
      succParent.left = succ.right;
    } else {
      succParent.right = succ.right;
    }
    return node;
  }

  if (!parent) {
    return removeNode(current);
  }
  if (parent.left === current) {
    parent.left = removeNode(current);
  } else {
    parent.right = removeNode(current);
  }
  return root;
}

module.exports = { TreeNode, search, insert, deleteNode };
