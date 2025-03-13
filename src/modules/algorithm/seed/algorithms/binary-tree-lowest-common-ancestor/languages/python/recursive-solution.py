from typing import Optional

class TreeNode:
    def __init__(self, val: int = 0, left: Optional['TreeNode']=None, right: Optional['TreeNode']=None):
        self.val = val
        self.left = left
        self.right = right

def lowest_common_ancestor_recursive(root: Optional[TreeNode], p: TreeNode, q: TreeNode) -> Optional[TreeNode]:
    """
    Finds the lowest common ancestor of two nodes in a binary tree using a recursive approach.
    
    Args:
        root: The root of the binary tree.
        p: The first node.
        q: The second node.
    
    Returns:
        The lowest common ancestor node, or None if not found.
    """
    if root is None or root == p or root == q:
        return root
    
    left = lowest_common_ancestor_recursive(root.left, p, q)
    right = lowest_common_ancestor_recursive(root.right, p, q)
    
    if left and right:
        return root
    return left if left else right 