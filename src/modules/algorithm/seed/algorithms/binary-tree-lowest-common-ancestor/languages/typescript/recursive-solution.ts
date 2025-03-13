import { TreeNode } from './exercise';

/**
 * Finds the lowest common ancestor of two nodes in a binary tree using a recursive approach.
 * @param root - The root of the binary tree.
 * @param p - The first node.
 * @param q - The second node.
 * @returns The lowest common ancestor node, or null if not found.
 */
export function lowestCommonAncestorRecursive(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode,
): TreeNode | null {
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
