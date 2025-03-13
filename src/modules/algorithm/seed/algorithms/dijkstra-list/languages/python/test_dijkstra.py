import unittest
from exercise import dijkstra

class TestDijkstraAlgorithm(unittest.TestCase):
    def test_basic_functionality(self):
        """Test basic functionality with a simple graph."""
        graph = {
            'A': [{'node': 'B', 'weight': 2}, {'node': 'D', 'weight': 6}],
            'B': [{'node': 'C', 'weight': 3}, {'node': 'D', 'weight': 7}],
            'C': [{'node': 'E', 'weight': 5}],
            'D': [{'node': 'C', 'weight': 1}, {'node': 'E', 'weight': 2}],
            'E': []
        }
        
        result = dijkstra(graph, 'A')
        
        expected = {
            'A': 0,
            'B': 2,
            'C': 5,
            'D': 6,
            'E': 8
        }
        
        self.assertEqual(result, expected)
    
    def test_alternative_paths(self):
        """Test that the algorithm correctly chooses the shortest path when multiple paths exist."""
        graph = {
            'A': [{'node': 'B', 'weight': 4}, {'node': 'C', 'weight': 2}],
            'B': [{'node': 'D', 'weight': 5}],
            'C': [{'node': 'B', 'weight': 1}, {'node': 'D', 'weight': 8}],
            'D': []
        }
        
        result = dijkstra(graph, 'A')
        
        expected = {
            'A': 0,
            'B': 3,
            'C': 2,
            'D': 8
        }
        
        self.assertEqual(result, expected)
    
    def test_single_node_graph(self):
        """Test a graph with only the source node."""
        graph = {
            'A': []
        }
        
        result = dijkstra(graph, 'A')
        
        expected = {
            'A': 0
        }
        
        self.assertEqual(result, expected)
    
    def test_disconnected_nodes(self):
        """Test a graph with disconnected nodes."""
        graph = {
            'A': [{'node': 'B', 'weight': 1}],
            'B': [],
            'C': [{'node': 'D', 'weight': 1}],
            'D': []
        }
        
        result = dijkstra(graph, 'A')
        
        expected = {
            'A': 0,
            'B': 1,
            'C': float('inf'),
            'D': float('inf')
        }
        
        self.assertEqual(result, expected)
    
    def test_complex_graph(self):
        """Test a more complex graph with multiple paths."""
        graph = {
            'A': [{'node': 'B', 'weight': 4}, {'node': 'C', 'weight': 2}],
            'B': [{'node': 'C', 'weight': 1}, {'node': 'D', 'weight': 5}],
            'C': [{'node': 'D', 'weight': 8}, {'node': 'E', 'weight': 10}],
            'D': [{'node': 'E', 'weight': 2}],
            'E': [{'node': 'A', 'weight': 7}]
        }
        
        result = dijkstra(graph, 'A')
        
        expected = {
            'A': 0,
            'B': 4,
            'C': 2,
            'D': 9,
            'E': 11
        }
        
        self.assertEqual(result, expected)

if __name__ == '__main__':
    unittest.main() 