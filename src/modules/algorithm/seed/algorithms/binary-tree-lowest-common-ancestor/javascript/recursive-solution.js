const { TreeNode } = require('./exercise');

/**
 * Finds the lowest common ancestor of two nodes in a binary tree using a recursive approach.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @param {TreeNode} p - The first node.
 * @param {TreeNode} q - The second node.
 * @returns {TreeNode|null} The lowest common ancestor node, or null if not found.
 */
function lowestCommonAncestorRecursive(root, p, q) {
  if (root === null || root === p || root === q) {
    return root;
  }

  const left = lowestCommonAncestorRecursive(root.left, p, q);
  const right = lowestCommonAncestorRecursive(root.right, p, q);

  if (left && right) {
    return root;
  }

  return left ? left : right;
}

module.exports = { lowestCommonAncestorRecursive };
