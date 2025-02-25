from typing import Optional
from exercise import TreeNode

def invert_tree(root: Optional[TreeNode]) -> Optional[TreeNode]:
    """
    Recursively inverts a binary tree.
    
    :param root: The root node of the binary tree.
    :return: The root node of the inverted binary tree.
    """
    if root is None:
        return None
    left = invert_tree(root.left)
    right = invert_tree(root.right)
    root.left = right
    root.right = left
    return root 