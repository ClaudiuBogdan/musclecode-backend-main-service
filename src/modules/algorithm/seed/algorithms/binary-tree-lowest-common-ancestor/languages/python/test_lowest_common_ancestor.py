import unittest
from exercise import TreeNode, lowest_common_ancestor

class TestLowestCommonAncestor(unittest.TestCase):
    def setUp(self):
        # Constructing the tree:
        #         3
        #        / \
        #       5   1
        #      / \  / \
        #     6   2 0  8
        #        / \
        #       7   4
        self.three = TreeNode(3)
        self.five = TreeNode(5)
        self.one = TreeNode(1)
        self.six = TreeNode(6)
        self.two = TreeNode(2)
        self.zero = TreeNode(0)
        self.eight = TreeNode(8)
        self.seven = TreeNode(7)
        self.four = TreeNode(4)

        self.three.left = self.five
        self.three.right = self.one
        self.five.left = self.six
        self.five.right = self.two
        self.one.left = self.zero
        self.one.right = self.eight
        self.two.left = self.seven
        self.two.right = self.four

    def test_lca_case1(self):
        # LCA of nodes 5 and 1 is 3
        lca = lowest_common_ancestor(self.three, self.five, self.one)
        self.assertIsNotNone(lca)
        self.assertEqual(lca.val, 3)

    def test_lca_case2(self):
        # LCA of nodes 5 and 4 is 5
        lca = lowest_common_ancestor(self.three, self.five, self.four)
        self.assertIsNotNone(lca)
        self.assertEqual(lca.val, 5)

if __name__ == '__main__':
    unittest.main() 