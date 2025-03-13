from typing import List, Optional

class TreeNode:
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right

def bfs(root: Optional[TreeNode]) -> List[int]:
    """
    Performs a breadth-first search (BFS) on a binary tree.
    
    Args:
        root: The root node of the binary tree.
    
    Returns:
        A list of integers representing the level order traversal of the tree.
    """
    # TODO: Implement the BFS traversal algorithm (iterative approach)
    pass 