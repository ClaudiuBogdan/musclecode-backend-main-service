/**
 * Represents a node in a binary tree.
 * @constructor
 * @param {number} val - The node's value.
 * @param {TreeNode|null} [left=null] - Left child.
 * @param {TreeNode|null} [right=null] - Right child.
 */
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

/**
 * Recursively performs a breadth-first search (BFS) on a binary tree.
 *
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[]} An array of values in level order.
 */
function bfs(root) {
  if (!root) return [];

  function helper(level) {
    if (level.length === 0) return [];
    const nextLevel = [];
    const values = [];
    level.forEach((node) => {
      values.push(node.val);
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    });
    return values.concat(helper(nextLevel));
  }

  return helper([root]);
}

module.exports = { TreeNode, bfs };
