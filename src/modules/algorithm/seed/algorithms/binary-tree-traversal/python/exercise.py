from typing import List, Optional

class TreeNode:
    def __init__(self, val: int, left: Optional['TreeNode'] = None, right: Optional['TreeNode'] = None):
        self.val = val
        self.left = left
        self.right = right

def in_order_traversal(root: Optional[TreeNode]) -> List[int]:
    """
    Performs in-order traversal (left, root, right) of a binary tree.
    
    Args:
        root: The root of the binary tree.
        
    Returns:
        A list of node values in in-order.
    """
    # TODO: Implement in-order traversal
    return []

def pre_order_traversal(root: Optional[TreeNode]) -> List[int]:
    """
    Performs pre-order traversal (root, left, right) of a binary tree.
    
    Args:
        root: The root of the binary tree.
        
    Returns:
        A list of node values in pre-order.
    """
    # TODO: Implement pre-order traversal
    return []

def post_order_traversal(root: Optional[TreeNode]) -> List[int]:
    """
    Performs post-order traversal (left, right, root) of a binary tree.
    
    Args:
        root: The root of the binary tree.
        
    Returns:
        A list of node values in post-order.
    """
    # TODO: Implement post-order traversal
    return [] 