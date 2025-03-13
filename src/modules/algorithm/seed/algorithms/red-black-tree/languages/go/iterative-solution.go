package redblacktree

const (
	RED   = "RED"
	BLACK = "BLACK"
)

type Node struct {
	Value  int
	Color  string
	Left   *Node
	Right  *Node
	Parent *Node
}

type RedBlackTree struct {
	Root *Node
}

// Insert inserts a value into the red-black tree using an iterative approach.
func (t *RedBlackTree) Insert(value int) {
	newNode := &Node{
		Value: value,
		Color: RED,
	}
	var y *Node = nil
	x := t.Root

	// Standard BST insert
	for x != nil {
		y = x
		if value < x.Value {
			x = x.Left
		} else {
			x = x.Right
		}
	}

	newNode.Parent = y
	if y == nil {
		t.Root = newNode
	} else if value < y.Value {
		y.Left = newNode
	} else {
		y.Right = newNode
	}

	// Fix red-black tree properties
	t.insertFixup(newNode)
}

func (t *RedBlackTree) insertFixup(z *Node) {
	for z.Parent != nil && z.Parent.Color == RED {
		if z.Parent == z.Parent.Parent.Left {
			y := z.Parent.Parent.Right
			if y != nil && y.Color == RED {
				// Case 1
				z.Parent.Color = BLACK
				y.Color = BLACK
				z.Parent.Parent.Color = RED
				z = z.Parent.Parent
			} else {
				if z == z.Parent.Right {
					// Case 2
					z = z.Parent
					t.leftRotate(z)
				}
				// Case 3
				z.Parent.Color = BLACK
				z.Parent.Parent.Color = RED
				t.rightRotate(z.Parent.Parent)
			}
		} else {
			y := z.Parent.Parent.Left
			if y != nil && y.Color == RED {
				// Case 1
				z.Parent.Color = BLACK
				y.Color = BLACK
				z.Parent.Parent.Color = RED
				z = z.Parent.Parent
			} else {
				if z == z.Parent.Left {
					// Case 2
					z = z.Parent
					t.rightRotate(z)
				}
				// Case 3
				z.Parent.Color = BLACK
				z.Parent.Parent.Color = RED
				t.leftRotate(z.Parent.Parent)
			}
		}
	}
	if t.Root != nil {
		t.Root.Color = BLACK
	}
}

func (t *RedBlackTree) leftRotate(x *Node) {
	y := x.Right
	if y == nil {
		return
	}
	x.Right = y.Left
	if y.Left != nil {
		y.Left.Parent = x
	}
	y.Parent = x.Parent
	if x.Parent == nil {
		t.Root = y
	} else if x == x.Parent.Left {
		x.Parent.Left = y
	} else {
		x.Parent.Right = y
	}
	y.Left = x
	x.Parent = y
}

func (t *RedBlackTree) rightRotate(y *Node) {
	x := y.Left
	if x == nil {
		return
	}
	y.Left = x.Right
	if x.Right != nil {
		x.Right.Parent = y
	}
	x.Parent = y.Parent
	if y.Parent == nil {
		t.Root = x
	} else if y == y.Parent.Left {
		y.Parent.Left = x
	} else {
		y.Parent.Right = x
	}
	x.Right = y
	y.Parent = x
}

// Search searches for a value in the red-black tree using an iterative approach.
func (t *RedBlackTree) Search(value int) *Node {
	current := t.Root
	for current != nil {
		if value == current.Value {
			return current
		} else if value < current.Value {
			current = current.Left
		} else {
			current = current.Right
		}
	}
	return nil
} 