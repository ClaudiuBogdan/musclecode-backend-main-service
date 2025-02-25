import unittest
from exercise import articulation_points
from iterative_solution import articulation_points_iterative
from recursive_solution import articulation_points_recursive

class TestArticulationPoints(unittest.TestCase):
    def setUp(self):
        # Graph Example 1:
        # Graph with edges: (0,1), (1,2), (2,0), (1,3)
        # Adjacency list:
        #   0: [1, 2]
        #   1: [0, 2, 3]
        #   2: [0, 1]
        #   3: [1]
        self.graph1 = [
            [1, 2],
            [0, 2, 3],
            [0, 1],
            [1]
        ]
        # Expected articulation points: [1]
        
        # Graph Example 2:
        # Graph with edges: (0,1), (1,2), (2,3), (3,0)
        # Adjacency list:
        #   0: [1, 3]
        #   1: [0, 2]
        #   2: [1, 3]
        #   3: [2, 0]
        self.graph2 = [
            [1, 3],
            [0, 2],
            [1, 3],
            [2, 0]
        ]
        # Expected articulation points: []

        self.implementations = {
            'Exercise (stub)': articulation_points,
            'Iterative': articulation_points_iterative,
            'Recursive': articulation_points_recursive,
        }

    def test_articulation_points(self):
        for name, func in self.implementations.items():
            with self.subTest(name=name):
                result1 = sorted(func(self.graph1))
                self.assertEqual(result1, [1])
                result2 = sorted(func(self.graph2))
                self.assertEqual(result2, [])

if __name__ == '__main__':
    unittest.main() 