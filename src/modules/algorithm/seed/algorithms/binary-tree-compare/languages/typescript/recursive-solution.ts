/**
 * Definition for a binary tree node.
 */
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(
    val: number = 0,
    left: TreeNode | null = null,
    right: TreeNode | null = null,
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Determines if two binary trees are identical using a recursive approach.
 * Two binary trees are considered identical if they are structurally identical
 * and the nodes have the same value.
 *
 * @param p - Root of the first binary tree
 * @param q - Root of the second binary tree
 * @returns True if the trees are identical, false otherwise
 *
 * Time Complexity: O(n) where n is the number of nodes in the tree
 * Space Complexity: O(h) where h is the height of the tree (due to recursion stack)
 */
export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // If both nodes are null, they are identical
  if (p === null && q === null) {
    return true;
  }

  // If one node is null but the other isn't, they are not identical
  if (p === null || q === null) {
    return false;
  }

  // If the values are different, they are not identical
  if (p.val !== q.val) {
    return false;
  }

  // Recursively check left and right subtrees
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
