import unittest
from exercise import hamiltonian_path

class TestHamiltonianPath(unittest.TestCase):
    def test_hamiltonian_path_exists(self):
        graph = [
            [0, 1, 1, 0, 0],
            [1, 0, 1, 1, 0],
            [1, 1, 0, 1, 1],
            [0, 1, 1, 0, 1],
            [0, 0, 1, 1, 0],
        ]
        self.assertTrue(hamiltonian_path(graph))

    def test_hamiltonian_path_does_not_exist(self):
        graph = [
            [0, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 1],
            [0, 0, 1, 0],
        ]
        self.assertFalse(hamiltonian_path(graph))

    def test_empty_graph(self):
        graph: List[List[int]] = []
        self.assertFalse(hamiltonian_path(graph))

    def test_single_node_graph(self):
        graph = [[0]]
        self.assertTrue(hamiltonian_path(graph)) 