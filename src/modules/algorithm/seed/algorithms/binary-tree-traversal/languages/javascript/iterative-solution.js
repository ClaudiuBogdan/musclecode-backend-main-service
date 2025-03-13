/**
 * Iterative in-order traversal using an explicit stack.
 * @param {TreeNode} root - The root of the binary tree
 * @returns {number[]} Array of node values in in-order.
 */
function inOrderTraversal(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (stack.length > 0 || current !== null) {
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }
  return result;
}

/**
 * Iterative pre-order traversal using a stack.
 * @param {TreeNode} root - The root of the binary tree
 * @returns {number[]} Array of node values in pre-order.
 */
function preOrderTraversal(root) {
  const result = [];
  if (root === null) return result;
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    if (node.right !== null) stack.push(node.right);
    if (node.left !== null) stack.push(node.left);
  }
  return result;
}

/**
 * Iterative post-order traversal using two stacks.
 * @param {TreeNode} root - The root of the binary tree
 * @returns {number[]} Array of node values in post-order.
 */
function postOrderTraversal(root) {
  const result = [];
  if (root === null) return result;
  const stack = [root];
  const output = [];

  while (stack.length) {
    const node = stack.pop();
    output.push(node.val);
    if (node.left !== null) stack.push(node.left);
    if (node.right !== null) stack.push(node.right);
  }
  return output.reverse();
}

module.exports = {
  inOrderTraversal,
  preOrderTraversal,
  postOrderTraversal,
};
