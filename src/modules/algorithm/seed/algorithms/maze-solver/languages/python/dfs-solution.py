from typing import List, Tuple

Maze = List[List[int]]
Point = Tuple[int, int]

def solve_maze(maze: Maze, start: Point, end: Point) -> List[Point] | None:
    """
    Solves a maze using Depth-First Search (DFS).

    Args:
        maze: The maze represented as a 2D list.
        start: The starting point in the maze (row, col).
        end: The ending point in the maze (row, col).

    Returns:
        The path from start to end as a list of (row, col) coordinates, or None if no solution exists.
    """
    rows = len(maze)
    cols = len(maze[0])
    path: List[Point] = []
    visited: List[List[bool]] = [[False for _ in range(cols)] for _ in range(rows)]

    def dfs(row: int, col: int) -> bool:
        if row < 0 or row >= rows or col < 0 or col >= cols or maze[row][col] == 1 or visited[row][col]:
            return False

        visited[row][col] = True
        path.append((row, col))

        if (row, col) == end:
            return True

        # Explore in all four directions
        if (dfs(row - 1, col) or  # Up
            dfs(row + 1, col) or  # Down
            dfs(row, col - 1) or  # Left
            dfs(row, col + 1)):   # Right
            return True

        # Backtrack if no solution is found
        path.pop()
        return False

    if dfs(start[0], start[1]):
        return path
    return None 