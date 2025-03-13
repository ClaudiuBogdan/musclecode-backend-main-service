class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Finds the lowest common ancestor of two nodes in a binary tree.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @param {TreeNode} p - The first node.
 * @param {TreeNode} q - The second node.
 * @returns {TreeNode|null} The lowest common ancestor node, or null if not found.
 */
function lowestCommonAncestor(root, p, q) {
  // TODO: Implement the LCA algorithm
  return null;
}

module.exports = { TreeNode, lowestCommonAncestor };
