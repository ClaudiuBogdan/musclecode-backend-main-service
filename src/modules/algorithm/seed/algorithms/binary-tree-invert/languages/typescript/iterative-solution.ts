import { TreeNode } from './exercise';

/**
 * Iteratively inverts a binary tree using level-order traversal.
 * 
 * @param root - The root node of the binary tree
 * @returns The root node of the inverted binary tree
 */
export function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  const queue: TreeNode[] = [root];
  while (queue.length) {
    const node = queue.shift()!;
    // Swap the left and right children
    [node.left, node.right] = [node.right, node.left];
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return root;
} 