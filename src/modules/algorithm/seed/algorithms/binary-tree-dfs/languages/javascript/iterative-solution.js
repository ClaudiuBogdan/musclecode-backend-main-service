/**
 * @typedef {Object} TreeNode
 * @property {number|string} val - The value of the node.
 * @property {TreeNode|null} left - The left child.
 * @property {TreeNode|null} right - The right child.
 */

/**
 * Performs depth-first search (pre-order traversal) on a binary tree using an iterative approach.
 *
 * @param {TreeNode|null} root - The root node of the binary tree.
 * @returns {(number|string)[]} An array of values representing the DFS pre-order traversal.
 */
function binaryTreeDFS(root) {
  const result = [];
  if (!root) return result;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
}

module.exports = { binaryTreeDFS };
