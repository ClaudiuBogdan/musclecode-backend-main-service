import unittest
from iterative_solution import RedBlackTree as IterativeRBTree
from recursive_solution import RedBlackTree as RecursiveRBTree

class TestRedBlackTreeIterative(unittest.TestCase):
    def test_insert_and_search(self):
        tree = IterativeRBTree()
        tree.insert(10)
        tree.insert(20)
        tree.insert(30)
        self.assertIsNotNone(tree.search(10))
        self.assertIsNotNone(tree.search(20))
        self.assertIsNotNone(tree.search(30))

    def test_search_not_found(self):
        tree = IterativeRBTree()
        tree.insert(15)
        self.assertIsNone(tree.search(100))

class TestRedBlackTreeRecursive(unittest.TestCase):
    def test_insert_and_search(self):
        tree = RecursiveRBTree()
        tree.insert(5)
        tree.insert(2)
        tree.insert(8)
        self.assertIsNotNone(tree.search(5))
        self.assertIsNotNone(tree.search(2))
        self.assertIsNotNone(tree.search(8))

    def test_search_not_found(self):
        tree = RecursiveRBTree()
        tree.insert(7)
        self.assertIsNone(tree.search(10))

if __name__ == '__main__':
    unittest.main() 