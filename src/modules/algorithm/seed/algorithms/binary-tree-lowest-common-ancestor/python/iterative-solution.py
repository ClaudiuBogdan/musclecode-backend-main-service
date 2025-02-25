from typing import Optional

class TreeNode:
    def __init__(self, val: int = 0, left: Optional['TreeNode']=None, right: Optional['TreeNode']=None):
        self.val = val
        self.left = left
        self.right = right

def lowest_common_ancestor_iterative(root: Optional[TreeNode], p: TreeNode, q: TreeNode) -> Optional[TreeNode]:
    """
    Finds the lowest common ancestor of two nodes in a binary tree using an iterative approach.
    
    Args:
        root: The root of the binary tree.
        p: The first node.
        q: The second node.
    
    Returns:
        The lowest common ancestor node, or None if not found.
    """
    if root is None:
        return None

    parent = {root: None}
    stack = [root]

    while p not in parent or q not in parent:
        node = stack.pop()
        if node.left:
            parent[node.left] = node
            stack.append(node.left)
        if node.right:
            parent[node.right] = node
            stack.append(node.right)

    ancestors = set()
    while p:
        ancestors.add(p)
        p = parent[p]
    while q:
        if q in ancestors:
            return q
        q = parent[q]
    return None 