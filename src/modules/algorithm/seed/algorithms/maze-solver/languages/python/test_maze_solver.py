import unittest
from typing import List, Tuple

from exercise import solve_maze

Maze = List[List[int]]
Point = Tuple[int, int]

class TestMazeSolver(unittest.TestCase):
    def test_basic_functionality(self):
        maze: Maze = [
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 1],
            [0, 0, 0, 0, 0],
            [1, 1, 0, 1, 1],
            [0, 0, 0, 0, 0],
        ]
        start: Point = (0, 0)
        end: Point = (4, 4)
        result = solve_maze(maze, start, end)
        self.assertIsNotNone(result)

    def test_no_solution(self):
        maze: Maze = [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
        ]
        start: Point = (0, 0)
        end: Point = (0, 2)
        result = solve_maze(maze, start, end)
        self.assertIsNone(result)

    def test_start_and_end_next_to_walls(self):
        maze: Maze = [
            [0, 1],
            [0, 0],
        ]
        start: Point = (0, 0)
        end: Point = (1, 1)
        result = solve_maze(maze, start, end)
        self.assertIsNotNone(result)

    def test_single_cell_maze(self):
        maze: Maze = [[0]]
        start: Point = (0, 0)
        end: Point = (0, 0)
        result = solve_maze(maze, start, end)
        self.assertEqual(result, [(0, 0)])

    def test_larger_complex_maze(self):
        maze: Maze = [
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 1, 1, 0],
            [0, 0, 0, 1, 0, 0],
            [1, 1, 1, 1, 0, 1],
            [0, 0, 0, 0, 0, 0],
            [1, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ]
        start: Point = (0, 0)
        end: Point = (6, 5)
        result = solve_maze(maze, start, end)
        self.assertIsNotNone(result)

if __name__ == '__main__':
    unittest.main() 