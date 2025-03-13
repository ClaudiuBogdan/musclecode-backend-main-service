/**
 * @typedef {Object} TreeNode
 * @property {number|string} val - The value of the node.
 * @property {TreeNode|null} left - The left child.
 * @property {TreeNode|null} right - The right child.
 */

/**
 * Performs depth-first search (pre-order traversal) on a binary tree using a recursive approach.
 *
 * @param {TreeNode|null} root - The root node of the binary tree.
 * @returns {(number|string)[]} An array of values representing the DFS pre-order traversal.
 */
function binaryTreeDFS(root) {
  const result = [];
  function dfs(node) {
    if (!node) return;
    result.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return result;
}

module.exports = { binaryTreeDFS };
