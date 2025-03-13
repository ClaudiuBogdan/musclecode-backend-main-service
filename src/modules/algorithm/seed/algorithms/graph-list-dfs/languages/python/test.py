import unittest
from exercise import dfs

class TestDFS(unittest.TestCase):
    def test_example_1_simple_tree_like_graph(self):
        graph = {
            'A': ['B', 'C'],
            'B': ['D', 'E'],
            'C': [],
            'D': [],
            'E': []
        }
        start_vertex = 'A'
        expected = ['A', 'B', 'D', 'E', 'C']
        
        self.assertEqual(dfs(graph, start_vertex), expected)
    
    def test_example_2_graph_with_cycles(self):
        graph = {
            '0': ['1', '2'],
            '1': ['0', '3', '4'],
            '2': ['0'],
            '3': ['1'],
            '4': ['1', '5'],
            '5': ['4']
        }
        start_vertex = '0'
        expected = ['0', '1', '3', '4', '5', '2']
        
        self.assertEqual(dfs(graph, start_vertex), expected)
    
    def test_small_cyclic_graph(self):
        graph = {
            'X': ['Y', 'Z'],
            'Y': ['X'],
            'Z': ['X']
        }
        start_vertex = 'X'
        expected = ['X', 'Y', 'Z']
        
        self.assertEqual(dfs(graph, start_vertex), expected)
    
    def test_larger_graph_with_multiple_branches(self):
        graph = {
            '1': ['2', '3', '4'],
            '2': ['1', '5', '6'],
            '3': ['1'],
            '4': ['1', '7', '8'],
            '5': ['2'],
            '6': ['2'],
            '7': ['4'],
            '8': ['4']
        }
        start_vertex = '1'
        expected = ['1', '2', '5', '6', '3', '4', '7', '8']
        
        self.assertEqual(dfs(graph, start_vertex), expected)
    
    def test_single_vertex_graph(self):
        graph = {
            'S': []
        }
        start_vertex = 'S'
        expected = ['S']
        
        self.assertEqual(dfs(graph, start_vertex), expected)

if __name__ == '__main__':
    unittest.main() 