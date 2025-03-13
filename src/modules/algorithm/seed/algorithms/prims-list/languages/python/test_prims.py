import unittest
from typing import List, Tuple, Dict
from exercise import prims_algorithm

Graph = Dict[int, List[Tuple[int, int]]]  # Node -> List of (neighbor, weight) tuples

class TestPrimsAlgorithm(unittest.TestCase):
    def test_simple_graph(self):
        graph: Graph = {
            0: [(1, 4), (7, 8)],
            1: [(0, 4), (2, 8), (7, 11)],
            2: [(1, 8), (3, 7), (8, 2)],
            3: [(2, 7), (4, 9), (5, 14)],
            4: [(3, 9), (5, 10)],
            5: [(3, 14), (4, 10), (6, 2)],
            6: [(5, 2), (7, 1), (8, 6)],
            7: [(0, 8), (1, 11), (6, 1), (8, 7)],
            8: [(2, 2), (6, 6), (7, 7)]
        }
        weight, edges = prims_algorithm(graph)
        self.assertEqual(weight, 37)
        expected_edges = [(0, 1), (0, 7), (7, 6), (6, 5), (5, 4), (2, 8), (2, 3)]
        for edge in expected_edges:
            self.assertIn(edge, edges)
        self.assertEqual(len(edges), 7)

    def test_empty_graph(self):
        graph: Graph = {}
        weight, edges = prims_algorithm(graph)
        self.assertEqual(weight, 0)
        self.assertEqual(edges, [])

    def test_single_node_graph(self):
        graph: Graph = {0: []}
        weight, edges = prims_algorithm(graph)
        self.assertEqual(weight, 0)
        self.assertEqual(edges, [])

if __name__ == '__main__':
    unittest.main() 