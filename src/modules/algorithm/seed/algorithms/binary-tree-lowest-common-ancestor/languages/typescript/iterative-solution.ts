import { TreeNode } from './exercise';

/**
 * Finds the lowest common ancestor of two nodes in a binary tree using an iterative approach.
 * @param root - The root of the binary tree.
 * @param p - The first node.
 * @param q - The second node.
 * @returns The lowest common ancestor node, or null if not found.
 */
export function lowestCommonAncestorIterative(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode,
): TreeNode | null {
  if (!root) return null;

  const parent = new Map<TreeNode, TreeNode | null>();
  parent.set(root, null);
  const stack: TreeNode[] = [root];

  while (!parent.has(p) || !parent.has(q)) {
    const node = stack.pop();
    if (!node) break; // safety check
    if (node.left) {
      parent.set(node.left, node);
      stack.push(node.left);
    }
    if (node.right) {
      parent.set(node.right, node);
      stack.push(node.right);
    }
  }

  const ancestors = new Set<TreeNode>();
  let current: TreeNode | null = p;
  while (current) {
    ancestors.add(current);
    current = parent.get(current) || null;
  }

  current = q;
  while (current) {
    if (ancestors.has(current)) return current;
    current = parent.get(current) || null;
  }

  return null;
}
