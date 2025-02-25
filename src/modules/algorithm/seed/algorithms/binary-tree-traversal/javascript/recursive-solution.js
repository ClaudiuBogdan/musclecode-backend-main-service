/**
 * Recursive in-order traversal.
 * @param {TreeNode} root - The root of the binary tree
 * @returns {number[]} Array of node values in in-order.
 */
function inOrderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (node === null) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  traverse(root);
  return result;
}

/**
 * Recursive pre-order traversal.
 * @param {TreeNode} root - The root of the binary tree
 * @returns {number[]} Array of node values in pre-order.
 */
function preOrderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (node === null) return;
    result.push(node.val);
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  return result;
}

/**
 * Recursive post-order traversal.
 * @param {TreeNode} root - The root of the binary tree
 * @returns {number[]} Array of node values in post-order.
 */
function postOrderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (node === null) return;
    traverse(node.left);
    traverse(node.right);
    result.push(node.val);
  }
  traverse(root);
  return result;
}

module.exports = {
  inOrderTraversal,
  preOrderTraversal,
  postOrderTraversal,
};
