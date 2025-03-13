package binarytreedfs

// BinaryTreeDFSRecursive performs a depth-first search (pre-order traversal) on a binary tree using a recursive approach.
// It returns a slice of integers representing the traversal order.
func BinaryTreeDFSRecursive(root *TreeNode) []int {
	var result []int

	var dfs func(node *TreeNode)
	dfs = func(node *TreeNode) {
		if node == nil {
			return
		}
		result = append(result, node.Val)
		dfs(node.Left)
		dfs(node.Right)
	}

	dfs(root)
	return result
} 