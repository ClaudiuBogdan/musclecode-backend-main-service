export type TreeNode = {
  val: number | string;
  left: TreeNode | null;
  right: TreeNode | null;
};

/**
 * Performs depth-first search (pre-order traversal) on a binary tree.
 *
 * @param root The root node of the binary tree.
 * @returns An array of values representing the DFS pre-order traversal.
 */
export function binaryTreeDFS(root: TreeNode | null): (number | string)[] {
  // TODO: Implement the DFS traversal algorithm
}
