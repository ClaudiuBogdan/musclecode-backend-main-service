package binarytreecompare

// TreeNode represents a node in a binary tree.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// IsSameTreeRecursive implements the binary tree compare algorithm using recursion.
// Two binary trees are considered identical if they are structurally identical
// and the nodes have the same value.
//
// Parameters:
//   - p: pointer to the root of the first binary tree.
//   - q: pointer to the root of the second binary tree.
//
// Returns:
//   - true if the trees are identical, false otherwise.
//
// Time Complexity: O(n) where n is the number of nodes in the tree.
// Space Complexity: O(h) where h is the height of the tree.
func IsSameTreeRecursive(p *TreeNode, q *TreeNode) bool {
	if p == nil && q == nil {
		return true
	}
	if p == nil || q == nil {
		return false
	}
	if p.Val != q.Val {
		return false
	}
	return IsSameTreeRecursive(p.Left, q.Left) && IsSameTreeRecursive(p.Right, q.Right)
} 