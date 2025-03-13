import unittest
from exercise import bfs_matrix

class TestBFSMatrix(unittest.TestCase):
    def test_simple_graph(self):
        graph = [
            [0, 1, 0, 1, 0],
            [1, 0, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [1, 0, 0, 0, 1],
            [0, 0, 0, 1, 0],
        ]
        start_vertex = 0
        expected = [0, 1, 3, 2, 4]
        self.assertEqual(bfs_matrix(graph, start_vertex), expected)

    def test_disconnected_graph(self):
        graph = [
            [0, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 1],
            [0, 0, 1, 0],
        ]
        start_vertex = 0
        expected = [0, 1]
        self.assertEqual(bfs_matrix(graph, start_vertex), expected)

    def test_single_node_graph(self):
        graph = [[0]]
        start_vertex = 0
        expected = [0]
        self.assertEqual(bfs_matrix(graph, start_vertex), expected)

    def test_empty_graph(self):
        graph = []
        start_vertex = 0
        expected = []
        self.assertEqual(bfs_matrix(graph, start_vertex), expected)

    def test_larger_complex_graph(self):
        graph = [
            [0, 1, 1, 0, 0, 0, 0],
            [1, 0, 0, 1, 1, 0, 0],
            [1, 0, 0, 0, 0, 1, 1],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0]
        ]
        start_vertex = 0;
        expected = [0, 1, 2, 3, 4, 5, 6]
        self.assertEqual(bfs_matrix(graph, start_vertex), expected)

    def test_different_start_vertex(self):
        graph = [
            [0, 1, 1, 0, 0, 0, 0],
            [1, 0, 0, 1, 1, 0, 0],
            [1, 0, 0, 0, 0, 1, 1],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0]
        ]
        start_vertex = 3
        expected = [3, 1, 4]
        self.assertEqual(bfs_matrix(graph, start_vertex), expected)

if __name__ == '__main__':
    unittest.main() 