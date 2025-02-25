class AVLNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None
        self.height = 1

class AVLTree:
    def __init__(self):
        self.root = None

    def get_height(self, node: AVLNode) -> int:
        return node.height if node else 0

    def right_rotate(self, y: AVLNode) -> AVLNode:
        x = y.left
        T2 = x.right
        x.right = y
        y.left = T2
        y.height = max(self.get_height(y.left), self.get_height(y.right)) + 1
        x.height = max(self.get_height(x.left), self.get_height(x.right)) + 1
        return x

    def left_rotate(self, x: AVLNode) -> AVLNode:
        y = x.right
        T2 = y.left
        y.left = x
        x.right = T2
        x.height = max(self.get_height(x.left), self.get_height(x.right)) + 1
        y.height = max(self.get_height(y.left), self.get_height(y.right)) + 1
        return y

    def get_balance(self, node: AVLNode) -> int:
        if not node:
            return 0
        return self.get_height(node.left) - self.get_height(node.right)

    def _insert(self, node: AVLNode, value: int) -> AVLNode:
        if not node:
            return AVLNode(value)
        if value < node.value:
            node.left = self._insert(node.left, value)
        else:
            node.right = self._insert(node.right, value)

        node.height = 1 + max(self.get_height(node.left), self.get_height(node.right))
        balance = self.get_balance(node)

        # Left Left Case
        if balance > 1 and value < node.left.value:
            return self.right_rotate(node)
        # Right Right Case
        if balance < -1 and value > node.right.value:
            return self.left_rotate(node)
        # Left Right Case
        if balance > 1 and value > node.left.value:
            node.left = self.left_rotate(node.left)
            return self.right_rotate(node)
        # Right Left Case
        if balance < -1 and value < node.right.value:
            node.right = self.right_rotate(node.right)
            return self.left_rotate(node)
        return node

    def insert(self, value: int) -> None:
        self.root = self._insert(self.root, value)

    def _search(self, node: AVLNode, value: int):
        if node is None:
            return None
        if node.value == value:
            return node
        return self._search(node.left, value) if value < node.value else self._search(node.right, value)

    def search(self, value: int):
        return self._search(self.root, value) 