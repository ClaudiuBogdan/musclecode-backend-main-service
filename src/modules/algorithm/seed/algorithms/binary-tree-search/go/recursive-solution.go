package binarytresearch

// Recursive implementation of BST search.
func Search(root *Node, key int) bool {
	if root == nil {
		return false
	}
	if root.Val == key {
		return true
	}
	if key < root.Val {
		return Search(root.Left, key)
	}
	return Search(root.Right, key)
}

// Recursive implementation of BST insertion.
func Insert(root *Node, key int) *Node {
	if root == nil {
		return &Node{Val: key}
	}
	if key < root.Val {
		root.Left = Insert(root.Left, key)
	} else if key > root.Val {
		root.Right = Insert(root.Right, key)
	}
	return root
}

// Recursive implementation of BST deletion.
func Delete(root *Node, key int) *Node {
	if root == nil {
		return nil
	}
	if key < root.Val {
		root.Left = Delete(root.Left, key)
	} else if key > root.Val {
		root.Right = Delete(root.Right, key)
	} else {
		// Node to be deleted found.
		if root.Left == nil {
			return root.Right
		}
		if root.Right == nil {
			return root.Left
		}
		// Get inorder successor (smallest in the right subtree).
		succ := root.Right
		for succ.Left != nil {
			succ = succ.Left
		}
		root.Val = succ.Val
		root.Right = Delete(root.Right, succ.Val)
	}
	return root
} 