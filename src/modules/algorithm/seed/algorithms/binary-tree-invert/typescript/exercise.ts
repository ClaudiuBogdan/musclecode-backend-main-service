export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  
  constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Inverts a binary tree.
 * Given the root of a binary tree, invert the tree and return its root.
 * 
 * @param root - The root node of the binary tree
 * @returns The root node of the inverted binary tree
 */
export function invertTree(root: TreeNode | null): TreeNode | null {
  // TODO: Implement the binary tree inversion algorithm
} 