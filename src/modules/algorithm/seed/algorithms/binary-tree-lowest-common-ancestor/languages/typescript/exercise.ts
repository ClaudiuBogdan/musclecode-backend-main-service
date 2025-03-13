export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * Finds the lowest common ancestor of two nodes in a binary tree.
 * @param root - The root of the binary tree.
 * @param p - The first node.
 * @param q - The second node.
 * @returns The lowest common ancestor node, or null if not found.
 */
export function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode,
): TreeNode | null {
  // TODO: Implement the LCA algorithm
  return null;
}
