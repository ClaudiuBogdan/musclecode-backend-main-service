/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * Determines if two binary trees are identical using a recursive approach.
 * Two binary trees are considered identical if they are structurally identical
 * and the nodes have the same value.
 *
 * @param {TreeNode} p - Root of the first binary tree
 * @param {TreeNode} q - Root of the second binary tree
 * @return {boolean} - True if the trees are identical, false otherwise
 *
 * Time Complexity: O(n) where n is the number of nodes in the tree
 * Space Complexity: O(h) where h is the height of the tree (due to recursion stack)
 */
function isSameTree(p, q) {
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

// For testing purposes
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

module.exports = { isSameTree, TreeNode };
