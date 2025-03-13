const { TreeNode } = require('./exercise');

/**
 * Iteratively inverts a binary tree using level-order traversal.
 *
 * @param {TreeNode|null} root - The root node of the binary tree.
 * @returns {TreeNode|null} The root node of the inverted binary tree.
 */
function invertTree(root) {
  if (!root) return null;
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    // Swap the children
    const temp = node.left;
    node.left = node.right;
    node.right = temp;
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return root;
}

module.exports = { invertTree }; 