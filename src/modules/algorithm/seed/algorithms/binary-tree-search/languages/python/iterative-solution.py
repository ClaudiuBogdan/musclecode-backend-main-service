from typing import Optional
from exercise import TreeNode

def search(root: Optional[TreeNode], key: int) -> bool:
    """
    Iteratively searches for a key in the BST.
    """
    current = root
    while current:
        if current.val == key:
            return True
        elif key < current.val:
            current = current.left
        else:
            current = current.right
    return False

def insert(root: Optional[TreeNode], key: int) -> TreeNode:
    """
    Iteratively inserts a key into the BST.
    """
    new_node = TreeNode(key)
    if not root:
        return new_node
    current = root
    parent = None
    while current:
        parent = current
        if key < current.val:
            current = current.left
        else:
            current = current.right
    if parent:
        if key < parent.val:
            parent.left = new_node
        else:
            parent.right = new_node
    return root

def delete_node(root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
    """
    Iteratively deletes a key from the BST.
    """
    parent = None
    current = root
    while current and current.val != key:
        parent = current
        if key < current.val:
            current = current.left
        else:
            current = current.right
    if not current:
        return root  # Key not found
    
    def remove_node(node: TreeNode) -> Optional[TreeNode]:
        if not node.left:
            return node.right
        if not node.right:
            return node.left
        # Node with two children: find inorder successor
        succ_parent = node
        succ = node.right
        while succ.left:
            succ_parent = succ
            succ = succ.left
        node.val = succ.val
        if succ_parent.left == succ:
            succ_parent.left = succ.right
        else:
            succ_parent.right = succ.right
        return node
    
    if not parent:
        return remove_node(current)
    if parent.left == current:
        parent.left = remove_node(current)
    else:
        parent.right = remove_node(current)
    return root 