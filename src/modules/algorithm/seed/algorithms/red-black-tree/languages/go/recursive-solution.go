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

// Insert inserts a value into the red-black tree using a recursive approach.
func (t *RedBlackTree) Insert(value int) {
	newNode := &Node{
		Value: value,
		Color: RED,
	}
	t.Root = t.recursiveInsert(t.Root, newNode, nil)
	t.insertFixup(newNode)
}

// recursiveInsert inserts the node into the tree recursively.
func (t *RedBlackTree) recursiveInsert(root, node, parent *Node) *Node {
	if root == nil {
		node.Parent = parent
		return node
	}
	if node.Value < root.Value {
		root.Left = t.recursiveInsert(root.Left, node, root)
	} else {
		root.Right = t.recursiveInsert(root.Right, node, root)
	}
	return root
}

func (t *RedBlackTree) insertFixup(z *Node) {
	for z.Parent != nil && z.Parent.Color == RED {
		if z.Parent == z.Parent.Parent.Left {
			y := z.Parent.Parent.Right
			if y != nil && y.Color == RED {
				z.Parent.Color = BLACK
				y.Color = BLACK
				z.Parent.Parent.Color = RED
				z = z.Parent.Parent
			} else {
				if z == z.Parent.Right {
					z = z.Parent
					t.leftRotate(z)
				}
				z.Parent.Color = BLACK
				z.Parent.Parent.Color = RED
				t.rightRotate(z.Parent.Parent)
			}
		} else {
			y := z.Parent.Parent.Left
			if y != nil && y.Color == RED {
				z.Parent.Color = BLACK
				y.Color = BLACK
				z.Parent.Parent.Color = RED
				z = z.Parent.Parent
			} else {
				if z == z.Parent.Left {
					z = z.Parent
					t.rightRotate(z)
				}
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

// Search searches for a value in the red-black tree using a recursive approach.
func (t *RedBlackTree) Search(value int) *Node {
	return t.recursiveSearch(t.Root, value)
}

func (t *RedBlackTree) recursiveSearch(node *Node, value int) *Node {
	if node == nil {
		return nil
	}
	if node.Value == value {
		return node
	} else if value < node.Value {
		return t.recursiveSearch(node.Left, value)
	} else {
		return t.recursiveSearch(node.Right, value)
	}
} 