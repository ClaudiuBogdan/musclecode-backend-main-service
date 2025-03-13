import { TreeNode } from './exercise';

/**
 * Iterative in-order traversal using an explicit stack.
 */
export function inOrderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let current = root;

  while (stack.length > 0 || current !== null) {
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop()!;
    result.push(current.val);
    current = current.right;
  }

  return result;
}

/**
 * Iterative pre-order traversal using a stack.
 */
export function preOrderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  if (root === null) return result;
  const stack: TreeNode[] = [root];

  while (stack.length) {
    const node = stack.pop()!;
    result.push(node.val);
    if (node.right !== null) stack.push(node.right);
    if (node.left !== null) stack.push(node.left);
  }

  return result;
}

/**
 * Iterative post-order traversal using two stacks.
 */
export function postOrderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  if (root === null) return result;
  const stack: TreeNode[] = [root];
  const output: number[] = [];

  while (stack.length) {
    const node = stack.pop()!;
    output.push(node.val);
    if (node.left !== null) stack.push(node.left);
    if (node.right !== null) stack.push(node.right);
  }

  return output.reverse();
}
