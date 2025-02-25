from collections import deque
from typing import List, Optional

class TreeNode:
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right

def bfs(root: Optional[TreeNode]) -> List[int]:
    """
    Iteratively performs BFS traversal on a binary tree using a queue.
    
    Args:
        root: The root node of the binary tree.
        
    Returns:
        A list of node values in level order.
    """
    if root is None:
        return []
    result = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        result.append(node.val)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return result 