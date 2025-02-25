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
 * Determines if two binary trees are identical using an iterative approach.
 * Two binary trees are considered identical if they are structurally identical
 * and the nodes have the same value.
 *
 * @param p - Root of the first binary tree
 * @param q - Root of the second binary tree
 * @returns True if the trees are identical, false otherwise
 *
 * Time Complexity: O(n) where n is the number of nodes in the tree
 * Space Complexity: O(n) in the worst case for the queue
 */
export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // Create a queue to store pairs of nodes to compare
  const queue: Array<[TreeNode | null, TreeNode | null]> = [[p, q]];

  while (queue.length > 0) {
    const [node1, node2] = queue.shift()!;

    // If both nodes are null, continue to the next pair
    if (node1 === null && node2 === null) {
      continue;
    }

    // If one node is null but the other isn't, they are not identical
    if (node1 === null || node2 === null) {
      return false;
    }

    // If the values are different, they are not identical
    if (node1.val !== node2.val) {
      return false;
    }

    // Add the left and right children to the queue
    queue.push([node1.left, node2.left]);
    queue.push([node1.right, node2.right]);
  }

  // If we've processed all nodes without finding differences, the trees are identical
  return true;
}
