from typing import Optional

class TreeNode:
    def __init__(self, val: int = 0, left: Optional['TreeNode']=None, right: Optional['TreeNode']=None):
        self.val = val
        self.left = left
        self.right = right

def lowest_common_ancestor(root: Optional[TreeNode], p: TreeNode, q: TreeNode) -> Optional[TreeNode]:
    """
    Finds the lowest common ancestor of two nodes in a binary tree.
    
    Args:
        root: The root of the binary tree.
        p: The first node.
        q: The second node.
    
    Returns:
        The lowest common ancestor node, or None if not found.
    """
    # TODO: Implement the LCA algorithm
    return None 