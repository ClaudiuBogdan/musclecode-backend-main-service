package binarytreelowestcommonancestor

// LowestCommonAncestorRecursive finds the lowest common ancestor of two nodes in a binary tree using a recursive approach.
func LowestCommonAncestorRecursive(root, p, q *TreeNode) *TreeNode {
	if root == nil || root == p || root == q {
		return root
	}

	left := LowestCommonAncestorRecursive(root.Left, p, q)
	right := LowestCommonAncestorRecursive(root.Right, p, q)

	if left != nil && right != nil {
		return root
	}

	if left != nil {
		return left
	}
	return right
} 