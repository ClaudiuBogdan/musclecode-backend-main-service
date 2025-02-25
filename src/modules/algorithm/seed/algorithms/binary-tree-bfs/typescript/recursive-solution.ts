export interface TreeNode {
  val: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
}

/**
 * Recursively performs a breadth-first (level order) traversal on a binary tree.
 *
 * @param root - The root node of the binary tree.
 * @returns An array of node values in level order.
 */
export function bfs(root: TreeNode | null): number[] {
  if (!root) return [];

  function helper(level: TreeNode[]): number[] {
    if (level.length === 0) return [];
    const nextLevel: TreeNode[] = [];
    const values: number[] = [];
    for (const node of level) {
      values.push(node.val);
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    }
    return values.concat(helper(nextLevel));
  }

  return helper([root]);
}
