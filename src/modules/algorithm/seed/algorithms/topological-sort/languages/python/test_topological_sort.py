import unittest
from typing import List
from exercise import topological_sort

class TestTopologicalSort(unittest.TestCase):
    def test_simple_dag(self):
        n = 4
        edges = [[0, 1], [0, 2], [1, 3], [2, 3]]
        result = topological_sort(n, edges)
        self.assertIsNotNone(result)
        self.assertEqual(len(result), n)

        index = {node: i for i, node in enumerate(result)}
        for u, v in edges:
            self.assertLess(index[u], index[v])

    def test_complex_dag(self):
        n = 6
        edges = [[5, 2], [5, 0], [4, 0], [4, 1], [2, 3], [3, 1]]
        result = topological_sort(n, edges)
        self.assertIsNotNone(result)
        self.assertEqual(len(result), n)

        index = {node: i for i, node in enumerate(result)}
        for u, v in edges:
            self.assertLess(index[u], index[v])

    def test_cycle(self):
        n = 3
        edges = [[0, 1], [1, 2], [2, 0]]
        result = topological_sort(n, edges)
        self.assertEqual(result, [])

    def test_no_edges(self):
        n = 5
        edges: List[List[int]] = []
        result = topological_sort(n, edges)
        self.assertIsNotNone(result)
        self.assertEqual(len(result), n)
        self.assertEqual(sorted(result), list(range(n))) 