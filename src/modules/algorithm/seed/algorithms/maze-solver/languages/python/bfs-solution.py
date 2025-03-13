from typing import List, Tuple, Optional
from collections import deque

Maze = List[List[int]]
Point = Tuple[int, int]


def solve_maze(maze: Maze, start: Point, end: Point) -> Optional[List[Point]]:
    """
    Solves a maze using Breadth-First Search (BFS).

    Args:
        maze: The maze represented as a 2D list.
        start: The starting point in the maze (row, col).
        end: The ending point in the maze (row, col).

    Returns:
        The path from start to end as a list of (row, col) coordinates, or None if no solution exists.
    """
    rows, cols = len(maze), len(maze[0])
    queue = deque([(start, [start])])  # Queue of (current point, path so far)
    visited = set()  # Set of visited points

    while queue:
        (row, col), path = queue.popleft()

        if (row, col) == end:
            return path

        visited.add((row, col))

        # Possible movements (up, down, left, right)
        movements = [(0, 1), (0, -1), (1, 0), (-1, 0)]

        for dr, dc in movements:
            new_row, new_col = row + dr, col + dc

            # Check boundaries and wall
            if (0 <= new_row < rows and 0 <= new_col < cols and
                    maze[new_row][new_col] == 0 and (new_row, new_col) not in visited):
                new_point = (new_row, new_col)
                new_path = path + [new_point]
                queue.append((new_point, new_path))

    return None  # No path found 