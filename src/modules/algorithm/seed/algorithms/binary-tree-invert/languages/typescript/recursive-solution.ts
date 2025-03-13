import { TreeNode } from './exercise';

/**
 * Recursively inverts a binary tree.
 * 
 * @param root - The root node of the binary tree
 * @returns The root node of the inverted binary tree
 */
export function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
} 