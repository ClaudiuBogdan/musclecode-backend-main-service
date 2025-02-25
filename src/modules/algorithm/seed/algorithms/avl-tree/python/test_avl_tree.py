import unittest
from iterative_solution import AVLTree as IterativeAVLTree
from recursive_solution import AVLTree as RecursiveAVLTree
from exercise import AVLTree as ExerciseAVLTree

class TestAVLTreeExercise(unittest.TestCase):
    def test_empty_search(self):
        tree = ExerciseAVLTree()
        self.assertIsNone(tree.search(10))

    def test_insert_search_stub(self):
        tree = ExerciseAVLTree()
        tree.insert(40)
        tree.insert(20)
        tree.insert(10)
        tree.insert(25)
        tree.insert(30)
        tree.insert(22)
        node = tree.search(25)
        # Since it's a stub, search will return None
        self.assertIsNone(node)

class TestAVLTreeIterative(unittest.TestCase):
    def test_iterative_insert_and_search(self):
        tree = IterativeAVLTree()
        values = [40, 20, 10, 25, 30, 22]
        for v in values:
            tree.insert(v)
        node = tree.search(22)
        self.assertIsNotNone(node)
        if node:
            self.assertEqual(node.value, 22)

class TestAVLTreeRecursive(unittest.TestCase):
    def test_recursive_insert_and_search(self):
        tree = RecursiveAVLTree()
        values = [40, 20, 10, 25, 30, 22]
        for v in values:
            tree.insert(v)
        node = tree.search(30)
        self.assertIsNotNone(node)
        if node:
            self.assertEqual(node.value, 30)

if __name__ == '__main__':
    unittest.main() 