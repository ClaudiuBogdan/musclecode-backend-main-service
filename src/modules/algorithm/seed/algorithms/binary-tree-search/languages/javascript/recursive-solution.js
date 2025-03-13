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
 * Recursive implementation of BST search.
 * @param {TreeNode|null} root - The root of the BST.
 * @param {number} key - The value to search for.
 * @returns {boolean} True if the key is found, false otherwise.
 */
function search(root, key) {
  if (!root) return false;
  if (root.val === key) return true;
  return key < root.val ? search(root.left, key) : search(root.right, key);
}

/**
 * Recursive implementation of BST insertion.
 * @param {TreeNode|null} root - The root of the BST.
 * @param {number} key - The value to insert.
 * @returns {TreeNode} The root of the BST after insertion.
 */
function insert(root, key) {
  if (!root) return new TreeNode(key);
  if (key < root.val) {
    root.left = insert(root.left, key);
  } else if (key > root.val) {
    root.right = insert(root.right, key);
  }
  return root;
}

/**
 * Recursive implementation of BST deletion.
 * @param {TreeNode|null} root - The root of the BST.
 * @param {number} key - The value to delete.
 * @returns {TreeNode|null} The root of the BST after deletion.
 */
function deleteNode(root, key) {
  if (!root) return null;
  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Node found.
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    // Node with two children: get the inorder successor.
    let successor = root.right;
    while (successor.left) {
      successor = successor.left;
    }
    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }
  return root;
}

module.exports = { TreeNode, search, insert, deleteNode };
