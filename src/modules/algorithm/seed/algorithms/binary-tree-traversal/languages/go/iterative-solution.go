package binarytreetraversal

// InOrderTraversal performs an iterative in-order traversal using a stack.
func InOrderTraversal(root *TreeNode) []int {
	var result []int
	stack := []*TreeNode{}
	current := root

	for len(stack) > 0 || current != nil {
		for current != nil {
			stack = append(stack, current)
			current = current.Left
		}
		// Pop from stack
		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		result = append(result, current.Val)
		current = current.Right
	}

	return result
}

// PreOrderTraversal performs an iterative pre-order traversal using a stack.
func PreOrderTraversal(root *TreeNode) []int {
	var result []int
	if root == nil {
		return result
	}
	stack := []*TreeNode{root}

	for len(stack) > 0 {
		// Pop the last element
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		result = append(result, node.Val)
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
	}
	return result
}

// PostOrderTraversal performs an iterative post-order traversal using two stacks.
func PostOrderTraversal(root *TreeNode) []int {
	var result []int
	if root == nil {
		return result
	}
	stack := []*TreeNode{root}
	var output []int

	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		output = append(output, node.Val)
		if node.Left != nil {
			stack = append(stack, node.Left)
		}
		if node.Right != nil {
			stack = append(stack, node.Right)
		}
	}
	// Reverse the output slice to get post-order
	for i := len(output) - 1; i >= 0; i-- {
		result = append(result, output[i])
	}
	return result
} 