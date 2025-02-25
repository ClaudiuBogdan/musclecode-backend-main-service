from typing import List, Union, Optional

class TreeNode:
    def __init__(self, val: Union[int, str], left: Optional['TreeNode'] = None, right: Optional['TreeNode'] = None):
        self.val = val
        self.left = left
        self.right = right

def binary_tree_dfs(root: Optional[TreeNode]) -> List[Union[int, str]]:
    """
    Performs a depth-first search (pre-order traversal) on a binary tree using a recursive approach.
    
    Args:
        root: The root node of the binary tree.
        
    Returns:
        A list of values representing the DFS pre-order traversal.
    """
    result = []
    
    def dfs(node: Optional[TreeNode]):
        if not node:
            return
        result.append(node.val)
        dfs(node.left)
        dfs(node.right)
    
    dfs(root)
    return result 