import unittest
from exercise import TreeNode, in_order_traversal, pre_order_traversal, post_order_traversal

def create_sample_tree() -> TreeNode:
    # Constructing the sample binary tree:
    #      1
    #     / \
    #    2   3
    #   / \   \
    #  4   5   6
    node4 = TreeNode(4)
    node5 = TreeNode(5)
    node6 = TreeNode(6)
    node2 = TreeNode(2, node4, node5)
    node3 = TreeNode(3, None, node6)
    return TreeNode(1, node2, node3)

class TestBinaryTreeTraversal(unittest.TestCase):
    def setUp(self):
        self.root = create_sample_tree()

    def test_in_order_traversal(self):
        expected = [4, 2, 5, 1, 3, 6]
        self.assertEqual(in_order_traversal(self.root), expected)

    def test_pre_order_traversal(self):
        expected = [1, 2, 4, 5, 3, 6]
        self.assertEqual(pre_order_traversal(self.root), expected)

    def test_post_order_traversal(self):
        expected = [4, 5, 2, 6, 3, 1]
        self.assertEqual(post_order_traversal(self.root), expected)

if __name__ == '__main__':
    unittest.main() 