package avltree

import "math"

// getHeight returns the height of a node.
func getHeight(node *AVLNode) int {
	if node == nil {
		return 0
	}
	return node.Height
}

// rightRotate performs a right rotation on y.
func rightRotate(y *AVLNode) *AVLNode {
	x := y.Left
	T2 := x.Right

	// Perform rotation
	x.Right = y
	y.Left = T2

	// Update heights
	y.Height = int(math.Max(float64(getHeight(y.Left)), float64(getHeight(y.Right)))) + 1
	x.Height = int(math.Max(float64(getHeight(x.Left)), float64(getHeight(x.Right)))) + 1

	return x
}

// leftRotate performs a left rotation on x.
func leftRotate(x *AVLNode) *AVLNode {
	y := x.Right
	T2 := y.Left

	// Perform rotation
	y.Left = x
	x.Right = T2

	// Update heights
	x.Height = int(math.Max(float64(getHeight(x.Left)), float64(getHeight(x.Right)))) + 1
	y.Height = int(math.Max(float64(getHeight(y.Left)), float64(getHeight(y.Right)))) + 1

	return y
}

// getBalance returns the balance factor of a node.
func getBalance(node *AVLNode) int {
	if node == nil {
		return 0
	}
	return getHeight(node.Left) - getHeight(node.Right)
}

// Insert inserts a value into the AVL tree using an iterative approach.
func (t *AVLTree) Insert(value int) {
	newNode := &AVLNode{Value: value, Height: 1}
	if t.Root == nil {
		t.Root = newNode
		return
	}

	// Traverse and maintain a stack of ancestors
	var path []*AVLNode
	curr := t.Root
	for {
		path = append(path, curr)
		if value < curr.Value {
			if curr.Left == nil {
				curr.Left = newNode
				path = append(path, newNode)
				break
			}
			curr = curr.Left
		} else {
			if curr.Right == nil {
				curr.Right = newNode
				path = append(path, newNode)
				break
			}
			curr = curr.Right
		}
	}

	// Rebalance from bottom-up
	for i := len(path) - 1; i >= 0; i-- {
		node := path[i]
		node.Height = int(math.Max(float64(getHeight(node.Left)), float64(getHeight(node.Right)))) + 1
		balance := getBalance(node)

		// Left Left Case
		if balance > 1 && value < node.Left.Value {
			if i == 0 {
				t.Root = rightRotate(node)
			} else {
				parent := path[i-1]
				if parent.Left == node {
					parent.Left = rightRotate(node)
				} else {
					parent.Right = rightRotate(node)
				}
			}
			continue
		}

		// Right Right Case
		if balance < -1 && value > node.Right.Value {
			if i == 0 {
				t.Root = leftRotate(node)
			} else {
				parent := path[i-1]
				if parent.Left == node {
					parent.Left = leftRotate(node)
				} else {
					parent.Right = leftRotate(node)
				}
			}
			continue
		}

		// Left Right Case
		if balance > 1 && value > node.Left.Value {
			node.Left = leftRotate(node.Left)
			if i == 0 {
				t.Root = rightRotate(node)
			} else {
				parent := path[i-1]
				if parent.Left == node {
					parent.Left = rightRotate(node)
				} else {
					parent.Right = rightRotate(node)
				}
			}
			continue
		}

		// Right Left Case
		if balance < -1 && value < node.Right.Value {
			node.Right = rightRotate(node.Right)
			if i == 0 {
				t.Root = leftRotate(node)
			} else {
				parent := path[i-1]
				if parent.Left == node {
					parent.Left = leftRotate(node)
				} else {
					parent.Right = leftRotate(node)
				}
			}
		}
	}
}

// Search searches for a value in the AVL tree iteratively.
func (t *AVLTree) Search(value int) *AVLNode {
	curr := t.Root
	for curr != nil {
		if value == curr.Value {
			return curr
		} else if value < curr.Value {
			curr = curr.Left
		} else {
			curr = curr.Right
		}
	}
	return nil
} 