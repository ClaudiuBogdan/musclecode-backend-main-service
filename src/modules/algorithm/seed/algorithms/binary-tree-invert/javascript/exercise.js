/**
 * Definition for a binary tree node.
 * @constructor
 * @param {number} val - The value of the node.
 * @param {TreeNode|null} left - The left child node.
 * @param {TreeNode|null} right - The right child node.
 */
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

/**
 * Inverts a binary tree.
 *
 * Given the root of a binary tree, invert the tree and return its root.
 *
 * @param {TreeNode|null} root - The root node of the binary tree.
 * @returns {TreeNode|null} The root node of the inverted binary tree.
 */
function invertTree(root) {
  // TODO: Implement the binary tree inversion algorithm
}

module.exports = { TreeNode, invertTree }; 