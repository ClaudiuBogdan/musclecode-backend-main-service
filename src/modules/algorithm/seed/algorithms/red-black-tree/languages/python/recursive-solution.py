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
        self.root = self._recursive_insert(self.root, new_node, None)
        new_node.color = RED
        self._insert_fixup(new_node)

    def _recursive_insert(self, root, node, parent):
        if root is None:
            node.parent = parent
            return node
        if node.value < root.value:
            root.left = self._recursive_insert(root.left, node, root)
        else:
            root.right = self._recursive_insert(root.right, node, root)
        return root

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
        return self._recursive_search(self.root, value)

    def _recursive_search(self, node, value: int):
        if node is None:
            return None
        if node.value == value:
            return node
        if value < node.value:
            return self._recursive_search(node.left, value)
        else:
            return self._recursive_search(node.right, value) 