package binarytreelowestcommonancestor

// LowestCommonAncestorIterative finds the lowest common ancestor of two nodes in a binary tree using an iterative approach.
func LowestCommonAncestorIterative(root, p, q *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}

	parent := make(map[*TreeNode]*TreeNode)
	parent[root] = nil
	stack := []*TreeNode{root}

	// Ensure both p and q are present in the parent map.
	for {
		_, okP := parent[p]
		_, okQ := parent[q]
		if okP && okQ {
			break
		}
		if len(stack) == 0 {
			break
		}
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if node.Left != nil {
			parent[node.Left] = node
			stack = append(stack, node.Left)
		}
		if node.Right != nil {
			parent[node.Right] = node
			stack = append(stack, node.Right)
		}
	}

	ancestors := make(map[*TreeNode]bool)
	for p != nil {
		ancestors[p] = true
		p = parent[p]
	}

	for q != nil {
		if ancestors[q] {
			return q
		}
		q = parent[q]
	}

	return nil
} 