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
 * Searches for a key in the binary search tree.
 * @param {TreeNode|null} root - The root of the BST.
 * @param {number} key - The value to search for.
 * @returns {boolean} True if the key exists in the tree, false otherwise.
 */
function search(root, key) {
  // TODO: Implement the BST search operation.
  return false;
}

/**
 * Inserts a key into the binary search tree.
 * @param {TreeNode|null} root - The root of the BST.
 * @param {number} key - The value to insert.
 * @returns {TreeNode} The new/root of the BST after insertion.
 */
function insert(root, key) {
  // TODO: Implement the BST insertion.
  return new TreeNode(key);
}

/**
 * Deletes a key from the binary search tree.
 * @param {TreeNode|null} root - The root of the BST.
 * @param {number} key - The value to delete.
 * @returns {TreeNode|null} The new/root of the BST after deletion.
 */
function deleteNode(root, key) {
  // TODO: Implement the BST deletion.
  return root;
}

module.exports = {
  TreeNode,
  search,
  insert,
  deleteNode,
};
