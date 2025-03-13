import { Maze, Point } from './exercise';

/**
 * Solves a maze using Depth-First Search (DFS).
 *
 * @param maze - The maze represented as a 2D array.
 * @param start - The starting point in the maze [row, col].
 * @param end - The ending point in the maze [row, col].
 * @returns The path from start to end as an array of [row, col] coordinates, or null if no solution exists.
 */
export function solveMaze(
  maze: Maze,
  start: Point,
  end: Point,
): Point[] | null {
  const rows = maze.length;
  const cols = maze[0].length;
  const path: Point[] = [];
  const visited: boolean[][] = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(false));

  function dfs(row: number, col: number): boolean {
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      maze[row][col] === 1 ||
      visited[row][col]
    ) {
      return false;
    }

    visited[row][col] = true;
    path.push([row, col]);

    if (row === end[0] && col === end[1]) {
      return true;
    }

    // Explore in all four directions
    if (
      dfs(row - 1, col) || // Up
      dfs(row + 1, col) || // Down
      dfs(row, col - 1) || // Left
      dfs(row, col + 1)
    ) {
      // Right
      return true;
    }

    // Backtrack if no solution is found
    path.pop();
    return false;
  }

  if (dfs(start[0], start[1])) {
    return path;
  }

  return null;
}
