import unittest
from exercise import kruskal
from typing import List, Tuple

Edge = Tuple[int, int, int]

class TestKruskal(unittest.TestCase):
    def test_basic_functionality(self):
        vertices = 4
        edges: List[Edge] = [(0, 1, 10), (0, 2, 6), (0, 3, 5), (1, 3, 15), (2, 3, 4)]
        expected_mst: List[Edge] = [(2, 3, 4), (0, 3, 5), (0, 1, 10)]
        self.assertEqual(sorted(kruskal(vertices, edges)), sorted(expected_mst))

    def test_graph_with_5_vertices(self):
        vertices = 5
        edges: List[Edge] = [(0, 1, 2), (0, 3, 6), (1, 2, 3), (1, 3, 8), (1, 4, 5), (2, 4, 7)]
        expected_mst: List[Edge] = [(0, 1, 2), (1, 2, 3), (1, 4, 5), (0, 3, 6)]
        self.assertEqual(sorted(kruskal(vertices, edges)), sorted(expected_mst))

    def test_no_edges(self):
        vertices = 3
        edges: List[Edge] = []
        self.assertEqual(kruskal(vertices, edges), [])

    def test_single_vertex(self):
        vertices = 1
        edges: List[Edge] = []
        self.assertEqual(kruskal(vertices, edges), []) 