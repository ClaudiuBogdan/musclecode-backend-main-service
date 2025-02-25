import unittest
from exercise import invert_tree, TreeNode

def are_trees_equal(t1: TreeNode, t2: TreeNode) -> bool:
    if t1 is None and t2 is None:
        return True
    if t1 is None or t2 is None:
        return False
    return (t1.val == t2.val and 
            are_trees_equal(t1.left, t2.left) and 
            are_trees_equal(t1.right, t2.right))

class TestInvertBinaryTree(unittest.TestCase):
    def test_invert_binary_tree(self):
        # Construct the original tree:
        #         4
        #       /   \
        #      2     7
        #     / \   / \
        #    1   3 6   9
        root = TreeNode(
            4,
            TreeNode(2, TreeNode(1), TreeNode(3)),
            TreeNode(7, TreeNode(6), TreeNode(9))
        )
        # Expected inverted tree:
        #         4
        #       /   \
        #      7     2
        #     / \   / \
        #    9   6 3   1
        expected = TreeNode(
            4,
            TreeNode(7, TreeNode(9), TreeNode(6)),
            TreeNode(2, TreeNode(3), TreeNode(1))
        )
        result = invert_tree(root)
        self.assertTrue(are_trees_equal(result, expected))
    
    def test_empty_tree(self):
        self.assertIsNone(invert_tree(None))

if __name__ == '__main__':
    unittest.main() 