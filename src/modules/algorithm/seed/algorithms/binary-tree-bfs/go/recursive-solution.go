package binarytreebfs

// getHeight computes the height of the binary tree.
func getHeight(root *TreeNode) int {
	if root == nil {
		return 0
	}
	leftHeight := getHeight(root.Left)
	rightHeight := getHeight(root.Right)
	if leftHeight > rightHeight {
		return leftHeight + 1
	}
	return rightHeight + 1
}

// appendLevel appends all nodes at the given level to res.
func appendLevel(root *TreeNode, level int, res *[]int) {
	if root == nil {
		return
	}
	if level == 1 {
		*res = append(*res, root.Val)
	} else if level > 1 {
		appendLevel(root.Left, level-1, res)
		appendLevel(root.Right, level-1, res)
	}
}

// BFSRecursive performs a recursive level order (BFS) traversal of a binary tree.
func BFSRecursive(root *TreeNode) []int {
	height := getHeight(root)
	result := []int{}
	for i := 1; i <= height; i++ {
		appendLevel(root, i, &result)
	}
	return result
} 