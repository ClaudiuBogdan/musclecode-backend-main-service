from collections import deque
from typing import Optional
from exercise import TreeNode

def invert_tree(root: Optional[TreeNode]) -> Optional[TreeNode]:
    """
    Iteratively inverts a binary tree using level-order traversal.
    
    :param root: The root node of the binary tree.
    :return: The root node of the inverted binary tree.
    """
    if root is None:
        return None
    queue = deque([root])
    while queue:
        node = queue.popleft()
        # Swap the left and right children
        node.left, node.right = node.right, node.left
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return root 