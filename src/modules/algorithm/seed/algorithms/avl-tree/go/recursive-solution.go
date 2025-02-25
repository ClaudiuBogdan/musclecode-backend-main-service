package avltree

import "math"

// insertNode recursively inserts a value and returns the new subtree root.
func insertNode(node *AVLNode, value int) *AVLNode {
	if node == nil {
		return &AVLNode{Value: value, Height: 1}
	}

	if value < node.Value {
		node.Left = insertNode(node.Left, value)
	} else {
		node.Right = insertNode(node.Right, value)
	}

	node.Height = int(math.Max(float64(getHeight(node.Left)), float64(getHeight(node.Right)))) + 1
	balance := getBalance(node)

	// Left Left Case
	if balance > 1 && value < node.Left.Value {
		return rightRotate(node)
	}

	// Right Right Case
	if balance < -1 && value > node.Right.Value {
		return leftRotate(node)
	}

	// Left Right Case
	if balance > 1 && value > node.Left.Value {
		node.Left = leftRotate(node.Left)
		return rightRotate(node)
	}

	// Right Left Case
	if balance < -1 && value < node.Right.Value {
		node.Right = rightRotate(node.Right)
		return leftRotate(node)
	}

	return node
}

// Insert inserts a value into the AVL tree using a recursive approach.
func (t *AVLTree) Insert(value int) {
	t.Root = insertNode(t.Root, value)
}

// searchNode recursively searches for a value in the AVL tree.
func searchNode(node *AVLNode, value int) *AVLNode {
	if node == nil || node.Value == value {
		return node
	}
	if value < node.Value {
		return searchNode(node.Left, value)
	}
	return searchNode(node.Right, value)
}

// Search searches for a value in the AVL tree recursively.
func (t *AVLTree) Search(value int) *AVLNode {
	return searchNode(t.Root, value)
} 