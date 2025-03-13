import unittest
from exercise import find_hamiltonian_cycle

class TestHamiltonianCycle(unittest.TestCase):
    def test_find_hamiltonian_cycle(self):
        graph = [
            [0, 1, 0, 1, 0],
            [1, 0, 1, 1, 1],
            [0, 1, 0, 0, 1],
            [1, 1, 0, 0, 1],
            [0, 1, 1, 1, 0]
        ]
        cycle = find_hamiltonian_cycle(graph)
        self.assertEqual(cycle, [0, 1, 2, 4, 3, 0])

    def test_no_hamiltonian_cycle(self):
        graph = [
            [0, 1, 0, 0],
            [1, 0, 1, 0],
            [0, 1, 0, 1],
            [0, 0, 1, 0]
        ]
        cycle = find_hamiltonian_cycle(graph)
        self.assertIsNone(cycle)

    def test_single_node_graph(self):
        graph = [[0]]
        cycle = find_hamiltonian_cycle(graph)
        self.assertEqual(cycle, [0, 0])

    def test_complete_graph(self):
        graph = [
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 0]
        ]
        cycle = find_hamiltonian_cycle(graph)
        self.assertEqual(cycle, [0, 1, 2, 0]) 