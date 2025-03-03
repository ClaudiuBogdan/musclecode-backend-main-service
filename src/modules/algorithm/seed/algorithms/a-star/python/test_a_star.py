import unittest
from iterative_solution import a_star_search as iterative_a_star
from recursive_solution import a_star_search as recursive_a_star

class TestAStarSearch(unittest.TestCase):
    def setUp(self):
        self.grid1 = [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 1, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]
        self.start1 = [0, 0]
        self.goal1 = [4, 4]
        self.expected1 = [
            [0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [3, 2], [4, 2], [4, 3], [4, 4]
        ]

        self.grid2 = [
            [0, 1, 0],
            [1, 1, 0],
            [0, 0, 0]
        ]
        self.start2 = [0, 0]
        self.goal2 = [2, 0]
        self.expected2 = []

    def test_iterative_solution(self):
        self.assertEqual(iterative_a_star(self.grid1, self.start1, self.goal1), self.expected1)
        self.assertEqual(iterative_a_star(self.grid2, self.start2, self.goal2), self.expected2)

    def test_recursive_solution(self):
        self.assertEqual(recursive_a_star(self.grid1, self.start1, self.goal1), self.expected1)
        self.assertEqual(recursive_a_star(self.grid2, self.start2, self.goal2), self.expected2)

if __name__ == '__main__':
    unittest.main() 