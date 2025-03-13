import unittest
from exercise import TreeNode, is_same_tree

class TestBinaryTreeCompare(unittest.TestCase):
    def test_basic_functionality(self):
        # Tree1: [1,2,3]
        tree1 = TreeNode(1, TreeNode(2), TreeNode(3))
        # Tree2: [1,2,3]
        tree2 = TreeNode(1, TreeNode(2), TreeNode(3))
        # Tree3: [1,2,null,3]
        tree3 = TreeNode(1, TreeNode(2, TreeNode(3), None), None)
        
        self.assertTrue(is_same_tree(tree1, tree2))
        self.assertFalse(is_same_tree(tree1, tree3))

    def test_edge_cases(self):
        # Test null trees
        self.assertTrue(is_same_tree(None, None))
        
        tree = TreeNode(1)
        self.assertFalse(is_same_tree(tree, None))
        self.assertFalse(is_same_tree(None, tree))
        
        # Test single node trees
        tree1 = TreeNode(1)
        tree2 = TreeNode(1)
        tree3 = TreeNode(2)
        
        self.assertTrue(is_same_tree(tree1, tree2))
        self.assertFalse(is_same_tree(tree1, tree3))

    def test_complex_trees(self):
        # Tree1: [1,2,3,4,5,6,7]
        tree1 = TreeNode(
            1,
            TreeNode(2, TreeNode(4), TreeNode(5)),
            TreeNode(3, TreeNode(6), TreeNode(7))
        )
        
        # Tree2: [1,2,3,4,5,6,7]
        tree2 = TreeNode(
            1,
            TreeNode(2, TreeNode(4), TreeNode(5)),
            TreeNode(3, TreeNode(6), TreeNode(7))
        )
        
        # Tree3: [1,2,3,4,5,6,8] - different value at last node
        tree3 = TreeNode(
            1,
            TreeNode(2, TreeNode(4), TreeNode(5)),
            TreeNode(3, TreeNode(6), TreeNode(8))
        )
        
        self.assertTrue(is_same_tree(tree1, tree2))
        self.assertFalse(is_same_tree(tree1, tree3))

if __name__ == '__main__':
    unittest.main() 