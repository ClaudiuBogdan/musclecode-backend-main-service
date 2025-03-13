import unittest
from exercise import bfs

class TestBFS(unittest.TestCase):
    def test_simple_graph(self):
        """Test BFS on a simple graph"""
        graph = {
            'A': ['B', 'C'],
            'B': ['D', 'E'],
            'C': ['F'],
            'D': [],
            'E': [],
            'F': []
        }
        self.assertEqual(bfs(graph, 'A'), ['A', 'B', 'C', 'D', 'E', 'F'])

    def test_numeric_vertices(self):
        """Test BFS with numeric vertex identifiers"""
        graph = {
            0: [1, 2],
            1: [0, 3, 4],
            2: [0, 4],
            3: [1],
            4: [1, 2]
        }
        self.assertEqual(bfs(graph, 0), [0, 1, 2, 3, 4])

    def test_single_vertex(self):
        """Test BFS on a graph with a single vertex"""
        graph = {'A': []}
        self.assertEqual(bfs(graph, 'A'), ['A'])

    def test_disconnected_graph(self):
        """Test BFS on a disconnected graph"""
        graph = {
            'A': ['B'],
            'B': ['A'],
            'C': ['D'],
            'D': ['C']
        }
        self.assertEqual(bfs(graph, 'A'), ['A', 'B'])

    def test_cyclic_graph(self):
        """Test BFS on a cyclic graph"""
        graph = {
            'A': ['B', 'C'],
            'B': ['A', 'D'],
            'C': ['A', 'D'],
            'D': ['B', 'C']
        }
        self.assertEqual(bfs(graph, 'A'), ['A', 'B', 'C', 'D'])

    def test_larger_graph(self):
        """Test BFS on a larger graph"""
        graph = {
            'A': ['B', 'C', 'D'],
            'B': ['A', 'E', 'F'],
            'C': ['A', 'G', 'H'],
            'D': ['A', 'I', 'J'],
            'E': ['B', 'K'],
            'F': ['B'],
            'G': ['C'],
            'H': ['C'],
            'I': ['D'],
            'J': ['D'],
            'K': ['E']
        }
        result = bfs(graph, 'A')
        
        # Check first level neighbors are visited first
        self.assertEqual(result[:4], ['A', 'B', 'C', 'D'])
        
        # Check all vertices are visited
        self.assertEqual(sorted(result), sorted(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']))
        
        # Check result length
        self.assertEqual(len(result), 11)

if __name__ == '__main__':
    unittest.main() 