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

    def insert(self, value: int) -> None:
        if not self.root:
            self.root = AVLNode(value)
            return

        path = []
        current = self.root
        # Traverse to insert new node
        while True:
            path.append(current)
            if value < current.value:
                if current.left is None:
                    current.left = AVLNode(value)
                    path.append(current.left)
                    break
                current = current.left
            else:
                if current.right is None:
                    current.right = AVLNode(value)
                    path.append(current.right)
                    break
                current = current.right

        # Rebalance the tree from bottom-up
        for i in range(len(path) - 1, -1, -1):
            node = path[i]
            node.height = 1 + max(self.get_height(node.left), self.get_height(node.right))
            balance = self.get_balance(node)

            # Left Left Case
            if balance > 1 and value < (node.left.value if node.left else 0):
                if i == 0:
                    self.root = self.right_rotate(node)
                else:
                    parent = path[i-1]
                    if parent.left == node:
                        parent.left = self.right_rotate(node)
                    else:
                        parent.right = self.right_rotate(node)
                continue

            # Right Right Case
            if balance < -1 and value > (node.right.value if node.right else 0):
                if i == 0:
                    self.root = self.left_rotate(node)
                else:
                    parent = path[i-1]
                    if parent.left == node:
                        parent.left = self.left_rotate(node)
                    else:
                        parent.right = self.left_rotate(node)
                continue

            # Left Right Case
            if balance > 1 and value > (node.left.value if node.left else 0):
                node.left = self.left_rotate(node.left)
                if i == 0:
                    self.root = self.right_rotate(node)
                else:
                    parent = path[i-1]
                    if parent.left == node:
                        parent.left = self.right_rotate(node)
                    else:
                        parent.right = self.right_rotate(node)
                continue

            # Right Left Case
            if balance < -1 and value < (node.right.value if node.right else 0):
                node.right = self.right_rotate(node.right)
                if i == 0:
                    self.root = self.left_rotate(node)
                else:
                    parent = path[i-1]
                    if parent.left == node:
                        parent.left = self.left_rotate(node)
                    else:
                        parent.right = self.left_rotate(node)
                continue

    def search(self, value: int):
        current = self.root
        while current:
            if current.value == value:
                return current
            current = current.left if value < current.value else current.right
        return None 