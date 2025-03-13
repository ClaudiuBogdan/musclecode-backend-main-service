package binarytreecompare

// TreeNode represents a node in a binary tree.
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// IsSameTreeIterative implements the binary tree compare algorithm using an iterative approach.
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
// Space Complexity: O(n) in the worst case.
func IsSameTreeIterative(p *TreeNode, q *TreeNode) bool {
	// Create a queue to store pairs of nodes to compare.
	queue := [][2]*TreeNode{{p, q}}

	for len(queue) > 0 {
		// Pop the first pair
		pair := queue[0]
		queue = queue[1:]
		node1, node2 := pair[0], pair[1]

		// If both nodes are nil, continue to the next pair.
		if node1 == nil && node2 == nil {
			continue
		}

		// If only one node is nil, trees differ.
		if node1 == nil || node2 == nil {
			return false
		}

		// If values differ, trees are not identical.
		if node1.Val != node2.Val {
			return false
		}

		// Enqueue children pairs.
		queue = append(queue, [2]*TreeNode{node1.Left, node2.Left})
		queue = append(queue, [2]*TreeNode{node1.Right, node2.Right})
	}
	return true
} 