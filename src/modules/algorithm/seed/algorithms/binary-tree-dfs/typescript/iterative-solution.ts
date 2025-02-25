export type TreeNode = {
  val: number | string;
  left: TreeNode | null;
  right: TreeNode | null;
};

/**
 * Performs depth-first search (pre-order traversal) on a binary tree using an iterative approach.
 *
 * @param root The root node of the binary tree.
 * @returns An array of values representing the DFS pre-order traversal.
 */
export function binaryTreeDFS(root: TreeNode | null): (number | string)[] {
  const result: (number | string)[] = [];
  if (!root) return result;

  const stack: TreeNode[] = [root];
  while (stack.length > 0) {
    const node = stack.pop()!;
    result.push(node.val);
    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }
  return result;
}
