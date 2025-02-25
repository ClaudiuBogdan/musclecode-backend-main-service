export interface TreeNode {
  val: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
}

/**
 * Iteratively performs a breadth-first (level order) traversal on a binary tree.
 *
 * @param root - The root node of the binary tree.
 * @returns An array of node values in level order.
 */
export function bfs(root: TreeNode | null): number[] {
  if (!root) return [];
  const queue: TreeNode[] = [root];
  const result: number[] = [];
  while (queue.length) {
    const node = queue.shift()!;
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}
