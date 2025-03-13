from typing import List, Union, Optional

class TreeNode:
    def __init__(self, val: Union[int, str], left: Optional['TreeNode'] = None, right: Optional['TreeNode'] = None):
        self.val = val
        self.left = left
        self.right = right

def binary_tree_dfs(root: Optional[TreeNode]) -> List[Union[int, str]]:
    """
    Performs a depth-first search (pre-order traversal) on a binary tree using an iterative approach.
    
    Args:
        root: The root node of the binary tree.
        
    Returns:
        A list of values representing the DFS pre-order traversal.
    """
    result = []
    if not root:
        return result
    stack = [root]
    while stack:
        node = stack.pop()
        result.append(node.val)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
    return result 