import unittest
from exercise import binary_tree_dfs, TreeNode

class TestBinaryTreeDFS(unittest.TestCase):
    def test_numeric_tree(self):
        # Construct the following tree:
        #     1
        #    / \
        #   2   3
        #  / \   \
        # 4   5   6
        root = TreeNode(1, 
                        TreeNode(2, TreeNode(4), TreeNode(5)),
                        TreeNode(3, None, TreeNode(6)))
        self.assertEqual(binary_tree_dfs(root), [1, 2, 4, 5, 3, 6])
    
    def test_string_tree(self):
        # Construct the following tree:
        #   A
        #  / \
        # B   C
        #    /
        #   D
        root = TreeNode('A', 
                        TreeNode('B'),
                        TreeNode('C', TreeNode('D'), None))
        self.assertEqual(binary_tree_dfs(root), ['A', 'B', 'C', 'D'])
    
    def test_empty_tree(self):
        self.assertEqual(binary_tree_dfs(None), [])

if __name__ == '__main__':
    unittest.main() 