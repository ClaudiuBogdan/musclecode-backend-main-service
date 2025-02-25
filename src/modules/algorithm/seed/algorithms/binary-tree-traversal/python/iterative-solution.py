from typing import List, Optional
from exercise import TreeNode

def in_order_traversal(root: Optional[TreeNode]) -> List[int]:
    result: List[int] = []
    stack: List[TreeNode] = []
    current = root

    while stack or current is not None:
        while current is not None:
            stack.append(current)
            current = current.left
        current = stack.pop()
        result.append(current.val)
        current = current.right

    return result

def pre_order_traversal(root: Optional[TreeNode]) -> List[int]:
    if root is None:
        return []
    result: List[int] = []
    stack: List[TreeNode] = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
    return result

def post_order_traversal(root: Optional[TreeNode]) -> List[int]:
    if root is None:
        return []
    stack: List[TreeNode] = [root]
    output: List[int] = []

    while stack:
        node = stack.pop()
        output.append(node.val)
        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)
    return output[::-1] 