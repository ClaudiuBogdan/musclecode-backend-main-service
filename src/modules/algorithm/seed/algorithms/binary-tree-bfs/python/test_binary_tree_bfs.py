import unittest
from iterative_solution import bfs as bfs_iterative
from recursive_solution import bfs as bfs_recursive

class TreeNode:
    def __init__(self, val: int = 0, left: 'TreeNode' = None, right: 'TreeNode' = None):
        self.val = val
        self.left = left
        self.right = right

def build_tree_1() -> TreeNode:
    # Constructing the tree:
    #       1
    #      / \
    #     2   3
    #    / \   \
    #   4   5   6
    return TreeNode(1,
                    TreeNode(2, TreeNode(4), TreeNode(5)),
                    TreeNode(3, None, TreeNode(6))
                   )

def build_tree_2() -> TreeNode:
    # Constructing the tree:
    #   1
    #    \
    #     2
    #    /
    #   3
    return TreeNode(1, None, TreeNode(2, TreeNode(3)))

class TestBinaryTreeBFS(unittest.TestCase):
    def test_empty_tree(self):
        for bfs in [bfs_iterative, bfs_recursive]:
            self.assertEqual(bfs(None), [])

    def test_single_node(self):
        root = TreeNode(1)
        for bfs in [bfs_iterative, bfs_recursive]:
            self.assertEqual(bfs(root), [1])
    
    def test_tree_1(self):
        root = build_tree_1()
        expected = [1, 2, 3, 4, 5, 6]
        for bfs in [bfs_iterative, bfs_recursive]:
            self.assertEqual(bfs(root), expected)
    
    def test_tree_2(self):
        root = build_tree_2()
        expected = [1, 2, 3]
        for bfs in [bfs_iterative, bfs_recursive]:
            self.assertEqual(bfs(root), expected)

if __name__ == '__main__':
    unittest.main() 