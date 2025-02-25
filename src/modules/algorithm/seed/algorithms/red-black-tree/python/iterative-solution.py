RED = "RED"
BLACK = "BLACK"

class Node:
    def __init__(self, value: int):
        self.value = value
        self.color = RED
        self.left = None
        self.right = None
        self.parent = None

class RedBlackTree:
    def __init__(self):
        self.root = None

    def insert(self, value: int) -> None:
        new_node = Node(value)
        y = None
        x = self.root

        while x is not None:
            y = x
            if value < x.value:
                x = x.left
            else:
                x = x.right

        new_node.parent = y
        if y is None:
            self.root = new_node
        elif value < y.value:
            y.left = new_node
        else:
            y.right = new_node

        new_node.color = RED
        self._insert_fixup(new_node)

    def _insert_fixup(self, z: Node) -> None:
        while z.parent is not None and z.parent.color == RED:
            if z.parent == getattr(z.parent.parent, 'left', None):
                y = z.parent.parent.right if z.parent.parent else None
                if y is not None and y.color == RED:
                    z.parent.color = BLACK
                    y.color = BLACK
                    z.parent.parent.color = RED
                    z = z.parent.parent
                else:
                    if z == z.parent.right:
                        z = z.parent
                        self._left_rotate(z)
                    z.parent.color = BLACK
                    if z.parent.parent:
                        z.parent.parent.color = RED
                        self._right_rotate(z.parent.parent)
            else:
                y = z.parent.parent.left if z.parent.parent else None
                if y is not None and y.color == RED:
                    z.parent.color = BLACK
                    y.color = BLACK
                    z.parent.parent.color = RED
                    z = z.parent.parent
                else:
                    if z == z.parent.left:
                        z = z.parent
                        self._right_rotate(z)
                    z.parent.color = BLACK
                    if z.parent.parent:
                        z.parent.parent.color = RED
                        self._left_rotate(z.parent.parent)
        if self.root:
            self.root.color = BLACK

    def _left_rotate(self, x: Node) -> None:
        y = x.right
        if y is None:
            return
        x.right = y.left
        if y.left is not None:
            y.left.parent = x
        y.parent = x.parent
        if x.parent is None:
            self.root = y
        elif x == x.parent.left:
            x.parent.left = y
        else:
            x.parent.right = y
        y.left = x
        x.parent = y

    def _right_rotate(self, y: Node) -> None:
        x = y.left
        if x is None:
            return
        y.left = x.right
        if x.right is not None:
            x.right.parent = y
        x.parent = y.parent
        if y.parent is None:
            self.root = x
        elif y == y.parent.left:
            y.parent.left = x
        else:
            y.parent.right = x
        x.right = y
        y.parent = x

    def search(self, value: int):
        current = self.root
        while current is not None:
            if value == current.value:
                return current
            elif value < current.value:
                current = current.left
            else:
                current = current.right
        return None 