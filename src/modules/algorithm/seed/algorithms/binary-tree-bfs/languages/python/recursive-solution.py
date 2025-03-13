from typing import List, Optional

class TreeNode:
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right

def bfs(root: Optional[TreeNode]) -> List[int]:
    """
    Recursively performs BFS traversal on a binary tree.
    
    Args:
        root: The root node of the binary tree.
    
    Returns:
        A list of node values in level order.
    """
    def helper(nodes: List[TreeNode]) -> List[int]:
        if not nodes:
            return []
        next_level = []
        values = []
        for node in nodes:
            values.append(node.val)
            if node.left:
                next_level.append(node.left)
            if node.right:
                next_level.append(node.right)
        return values + helper(next_level)
    
    if root is None:
        return []
    return helper([root]) 