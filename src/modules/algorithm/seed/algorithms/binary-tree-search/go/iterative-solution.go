package binarytresearch

// Iterative implementation of BST search.
func Search(root *Node, key int) bool {
	current := root
	for current != nil {
		if current.Val == key {
			return true
		} else if key < current.Val {
			current = current.Left
		} else {
			current = current.Right
		}
	}
	return false
}

// Iterative implementation of BST insertion.
func Insert(root *Node, key int) *Node {
	newNode := &Node{Val: key}
	if root == nil {
		return newNode
	}
	current := root
	var parent *Node
	for current != nil {
		parent = current
		if key < current.Val {
			current = current.Left
		} else {
			current = current.Right
		}
	}
	if key < parent.Val {
		parent.Left = newNode
	} else {
		parent.Right = newNode
	}
	return root
}

// Iterative implementation of BST deletion.
func Delete(root *Node, key int) *Node {
	var parent *Node
	current := root

	// Find the node to be deleted.
	for current != nil && current.Val != key {
		parent = current
		if key < current.Val {
			current = current.Left
		} else {
			current = current.Right
		}
	}
	if current == nil {
		return root // key not found
	}

	// Helper function to remove a node.
	removeNode := func(node *Node) *Node {
		if node.Left == nil {
			return node.Right
		}
		if node.Right == nil {
			return node.Left
		}
		// Node with two children: find inorder successor.
		succParent := node
		succ := node.Right
		for succ.Left != nil {
			succParent = succ
			succ = succ.Left
		}
		node.Val = succ.Val
		if succParent.Left == succ {
			succParent.Left = succ.Right
		} else {
			succParent.Right = succ.Right
		}
		return node
	}

	if parent == nil {
		return removeNode(current)
	}
	if parent.Left == current {
		parent.Left = removeNode(current)
	} else {
		parent.Right = removeNode(current)
	}
	return root
} 