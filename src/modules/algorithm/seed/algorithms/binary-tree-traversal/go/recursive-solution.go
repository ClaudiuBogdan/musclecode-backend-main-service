package binarytreetraversal

// InOrderTraversal performs a recursive in-order traversal.
func InOrderTraversal(root *TreeNode) []int {
	var result []int
	var traverse func(node *TreeNode)
	traverse = func(node *TreeNode) {
		if node == nil {
			return
		}
		traverse(node.Left)
		result = append(result, node.Val)
		traverse(node.Right)
	}
	traverse(root)
	return result
}

// PreOrderTraversal performs a recursive pre-order traversal.
func PreOrderTraversal(root *TreeNode) []int {
	var result []int
	var traverse func(node *TreeNode)
	traverse = func(node *TreeNode) {
		if node == nil {
			return
		}
		result = append(result, node.Val)
		traverse(node.Left)
		traverse(node.Right)
	}
	traverse(root)
	return result
}

// PostOrderTraversal performs a recursive post-order traversal.
func PostOrderTraversal(root *TreeNode) []int {
	var result []int
	var traverse func(node *TreeNode)
	traverse = func(node *TreeNode) {
		if node == nil {
			return
		}
		traverse(node.Left)
		traverse(node.Right)
		result = append(result, node.Val)
	}
	traverse(root)
	return result
} 