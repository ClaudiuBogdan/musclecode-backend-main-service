from typing import Optional
from exercise import TreeNode

def search(root: Optional[TreeNode], key: int) -> bool:
    """
    Recursively searches for a key in the BST.
    """
    if not root:
        return False
    if root.val == key:
        return True
    return search(root.left, key) if key < root.val else search(root.right, key)

def insert(root: Optional[TreeNode], key: int) -> TreeNode:
    """
    Recursively inserts a key into the BST.
    """
    if not root:
        return TreeNode(key)
    if key < root.val:
        root.left = insert(root.left, key)
    elif key > root.val:
        root.right = insert(root.right, key)
    return root

def delete_node(root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
    """
    Recursively deletes a key from the BST.
    """
    if not root:
        return None
    if key < root.val:
        root.left = delete_node(root.left, key)
    elif key > root.val:
        root.right = delete_node(root.right, key)
    else:
        # Node found
        if not root.left:
            return root.right
        if not root.right:
            return root.left
        # Node with two children: find inorder successor
        succ = root.right
        while succ.left:
            succ = succ.left
        root.val = succ.val
        root.right = delete_node(root.right, succ.val)
    return root 