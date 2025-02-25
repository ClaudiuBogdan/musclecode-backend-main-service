export type TreeNode = {
  val: number | string;
  left: TreeNode | null;
  right: TreeNode | null;
};

/**
 * Performs depth-first search (pre-order traversal) on a binary tree using a recursive approach.
 *
 * @param root The root node of the binary tree.
 * @returns An array of values representing the DFS pre-order traversal.
 */
export function binaryTreeDFS(root: TreeNode | null): (number | string)[] {
  const result: (number | string)[] = [];

  function dfs(node: TreeNode | null): void {
    if (!node) return;
    result.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  return result;
}
