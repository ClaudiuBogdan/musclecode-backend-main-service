// Define the TreeNode constructor
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

/**
 * Performs in-order traversal (left, root, right) of a binary tree.
 * @param {TreeNode} root - The root of the binary tree
 * @returns {number[]} Array of node values in in-order.
 */
function inOrderTraversal(root) {
  // TODO: Implement in-order traversal
  return [];
}

/**
 * Performs pre-order traversal (root, left, right) of a binary tree.
 * @param {TreeNode} root - The root of the binary tree
 * @returns {number[]} Array of node values in pre-order.
 */
function preOrderTraversal(root) {
  // TODO: Implement pre-order traversal
  return [];
}

/**
 * Performs post-order traversal (left, right, root) of a binary tree.
 * @param {TreeNode} root - The root of the binary tree
 * @returns {number[]} Array of node values in post-order.
 */
function postOrderTraversal(root) {
  // TODO: Implement post-order traversal
  return [];
}

module.exports = {
  TreeNode,
  inOrderTraversal,
  preOrderTraversal,
  postOrderTraversal,
};
