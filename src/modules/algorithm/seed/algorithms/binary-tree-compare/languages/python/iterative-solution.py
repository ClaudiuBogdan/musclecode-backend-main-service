from typing import Optional
from collections import deque

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_same_tree(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    """
    Determines if two binary trees are identical using an iterative approach.
    Two binary trees are considered identical if they are structurally identical
    and the nodes have the same value.
    
    Args:
        p: Root of the first binary tree
        q: Root of the second binary tree
    
    Returns:
        True if the trees are identical, False otherwise
    
    Time Complexity: O(n) where n is the number of nodes in the tree
    Space Complexity: O(n) in the worst case for the queue
    """
    # Create a queue to store pairs of nodes to compare
    queue = deque([(p, q)])
    
    while queue:
        node1, node2 = queue.popleft()
        
        # If both nodes are null, continue to the next pair
        if node1 is None and node2 is None:
            continue
        
        # If one node is null but the other isn't, they are not identical
        if node1 is None or node2 is None:
            return False
        
        # If the values are different, they are not identical
        if node1.val != node2.val:
            return False
        
        # Add the left and right children to the queue
        queue.append((node1.left, node2.left))
        queue.append((node1.right, node2.right))
    
    # If we've processed all nodes without finding differences, the trees are identical
    return True 