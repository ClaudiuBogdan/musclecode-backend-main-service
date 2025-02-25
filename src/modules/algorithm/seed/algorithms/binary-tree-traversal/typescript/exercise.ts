// Define the TreeNode interface
export interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

/**
 * Performs in-order traversal (left, root, right) of a binary tree.
 * @param root The root of the binary tree
 * @returns An array of node values in in-order.
 */
export function inOrderTraversal(root: TreeNode | null): number[] {
  // TODO: Implement in-order traversal
  return [];
}

/**
 * Performs pre-order traversal (root, left, right) of a binary tree.
 * @param root The root of the binary tree
 * @returns An array of node values in pre-order.
 */
export function preOrderTraversal(root: TreeNode | null): number[] {
  // TODO: Implement pre-order traversal
  return [];
}

/**
 * Performs post-order traversal (left, right, root) of a binary tree.
 * @param root The root of the binary tree
 * @returns An array of node values in post-order.
 */
export function postOrderTraversal(root: TreeNode | null): number[] {
  // TODO: Implement post-order traversal
  return [];
}
