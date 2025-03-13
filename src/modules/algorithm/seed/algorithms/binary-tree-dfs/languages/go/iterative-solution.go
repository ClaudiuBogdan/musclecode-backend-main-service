package binarytreedfs

// BinaryTreeDFSIterative performs a depth-first search (pre-order traversal) on a binary tree using an iterative approach.
// It returns a slice of integers representing the traversal order.
func BinaryTreeDFSIterative(root *TreeNode) []int {
	var result []int
	if root == nil {
		return result
	}

	stack := []*TreeNode{root}
	for len(stack) > 0 {
		// Pop the last node from the stack
		n := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		result = append(result, n.Val)
		// Push right child first so that left child is processed first
		if n.Right != nil {
			stack = append(stack, n.Right)
		}
		if n.Left != nil {
			stack = append(stack, n.Left)
		}
	}
	return result
} 