import { TreeNode } from './exercise';

/**
 * Recursive in-order traversal.
 */
export function inOrderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  function traverse(node: TreeNode | null) {
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
 */
export function preOrderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  function traverse(node: TreeNode | null) {
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
 */
export function postOrderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  function traverse(node: TreeNode | null) {
    if (node === null) return;
    traverse(node.left);
    traverse(node.right);
    result.push(node.val);
  }
  traverse(root);
  return result;
}
