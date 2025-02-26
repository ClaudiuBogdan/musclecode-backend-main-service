from typing import List, Tuple

Maze = List[List[int]]
Point = Tuple[int, int]

def solve_maze(maze: Maze, start: Point, end: Point) -> List[Point] | None:
    """
    Solves a maze represented as a 2D list using a pathfinding algorithm.

    Args:
        maze: The maze represented as a 2D list where 0 is a path and 1 is a wall.
        start: The starting point in the maze (row, col).
        end: The ending point in the maze (row, col).

    Returns:
        The path from start to end as a list of (row, col) coordinates, or None if no solution exists.
    """
    # TODO: Implement the maze solving algorithm
    return None 