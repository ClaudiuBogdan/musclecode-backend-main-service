import unittest
from exercise import TreeNode, search, insert, delete_node

def build_bst(values):
    root = None
    for val in values:
        root = insert(root, val)
    return root

def inorder_traversal(root, arr=None):
    if arr is None:
        arr = []
    if root:
        inorder_traversal(root.left, arr)
        arr.append(root.val)
        inorder_traversal(root.right, arr)
    return arr

class TestBinaryTreeSearch(unittest.TestCase):
    def setUp(self):
        # Build BST with values: 7, 3, 9, 1, 5
        self.bst = build_bst([7, 3, 9, 1, 5])
    
    def test_search(self):
        self.assertTrue(search(self.bst, 5))
        self.assertFalse(search(self.bst, 4))
    
    def test_insert(self):
        self.bst = insert(self.bst, 4)
        self.assertTrue(search(self.bst, 4))
        self.assertEqual(inorder_traversal(self.bst), [1, 3, 4, 5, 7, 9])
    
    def test_delete(self):
        self.bst = delete_node(self.bst, 3)
        self.assertFalse(search(self.bst, 3))
        self.assertEqual(inorder_traversal(self.bst), [1, 5, 7, 9])

if __name__ == '__main__':
    unittest.main() 