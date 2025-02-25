from typing import Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_same_tree(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    """
    Determines if two binary trees are identical using a recursive approach.
    Two binary trees are considered identical if they are structurally identical
    and the nodes have the same value.
    
    Args:
        p: Root of the first binary tree
        q: Root of the second binary tree
    
    Returns:
        True if the trees are identical, False otherwise
    
    Time Complexity: O(n) where n is the number of nodes in the tree
    Space Complexity: O(h) where h is the height of the tree (due to recursion stack)
    """
    # If both nodes are null, they are identical
    if p is None and q is None:
        return True
    
    # If one node is null but the other isn't, they are not identical
    if p is None or q is None:
        return False
    
    # If the values are different, they are not identical
    if p.val != q.val:
        return False
    
    # Recursively check left and right subtrees
    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right) 