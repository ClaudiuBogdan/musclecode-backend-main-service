const { TreeNode } = require('./exercise');

/**
 * Recursively inverts a binary tree.
 *
 * @param {TreeNode|null} root - The root node of the binary tree.
 * @returns {TreeNode|null} The root node of the inverted binary tree.
 */
function invertTree(root) {
  if (!root) return null;
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
}

module.exports = { invertTree }; 