const { TreeNode } = require('./exercise');

/**
 * Finds the lowest common ancestor of two nodes in a binary tree using an iterative approach.
 * @param {TreeNode|null} root - The root of the binary tree.
 * @param {TreeNode} p - The first node.
 * @param {TreeNode} q - The second node.
 * @returns {TreeNode|null} The lowest common ancestor node, or null if not found.
 */
function lowestCommonAncestorIterative(root, p, q) {
  if (!root) return null;

  const parent = new Map();
  parent.set(root, null);
  const stack = [root];

  while (!parent.has(p) || !parent.has(q)) {
    const node = stack.pop();
    if (node.left) {
      parent.set(node.left, node);
      stack.push(node.left);
    }
    if (node.right) {
      parent.set(node.right, node);
      stack.push(node.right);
    }
  }

  const ancestors = new Set();
  let current = p;
  while (current) {
    ancestors.add(current);
    current = parent.get(current);
  }

  current = q;
  while (current) {
    if (ancestors.has(current)) return current;
    current = parent.get(current);
  }

  return null;
}

module.exports = { lowestCommonAncestorIterative };
