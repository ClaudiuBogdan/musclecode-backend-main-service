from typing import Optional

class TreeNode:
    def __init__(self, val: int):
        self.val = val
        self.left: Optional['TreeNode'] = None
        self.right: Optional['TreeNode'] = None

def search(root: Optional[TreeNode], key: int) -> bool:
    """
    Searches for a key in the binary search tree.
    
    Args:
        root: The root of the BST.
        key: The value to search for.
    
    Returns:
        True if key exists in the BST, False otherwise.
    """
    # TODO: Implement the BST search operation.
    return False

def insert(root: Optional[TreeNode], key: int) -> TreeNode:
    """
    Inserts a key into the binary search tree and returns the new root.
    
    Args:
        root: The root of the BST.
        key: The value to insert.
    
    Returns:
        The new root of the BST after insertion.
    """
    # TODO: Implement the BST insertion.
    return TreeNode(key)

def delete_node(root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
    """
    Deletes a key from the binary search tree and returns the new root.
    
    Args:
        root: The root of the BST.
        key: The value to delete.
    
    Returns:
        The new root of the BST after deletion.
    """
    # TODO: Implement the BST deletion.
    return root 