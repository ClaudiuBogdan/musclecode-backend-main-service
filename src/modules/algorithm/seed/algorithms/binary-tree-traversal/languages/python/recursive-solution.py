from typing import List, Optional
from exercise import TreeNode

def in_order_traversal(root: Optional[TreeNode]) -> List[int]:
    result: List[int] = []
    def traverse(node: Optional[TreeNode]) -> None:
        if node is None:
            return
        traverse(node.left)
        result.append(node.val)
        traverse(node.right)
    traverse(root)
    return result

def pre_order_traversal(root: Optional[TreeNode]) -> List[int]:
    result: List[int] = []
    def traverse(node: Optional[TreeNode]) -> None:
        if node is None:
            return
        result.append(node.val)
        traverse(node.left)
        traverse(node.right)
    traverse(root)
    return result

def post_order_traversal(root: Optional[TreeNode]) -> List[int]:
    result: List[int] = []
    def traverse(node: Optional[TreeNode]) -> None:
        if node is None:
            return
        traverse(node.left)
        traverse(node.right)
        result.append(node.val)
    traverse(root)
    return result 