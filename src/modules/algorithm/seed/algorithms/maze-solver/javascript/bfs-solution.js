/**
 * Solves a maze using Breadth-First Search (BFS).
 *
 * @param {number[][]} maze - The maze represented as a 2D array.
 * @param {number[]} start - The starting point in the maze [row, col].
 * @param {number[]} end - The ending point in the maze [row, col].
 * @returns {number[][]} The path from start to end as an array of [row, col] coordinates, or null if no solution exists.
 */
function solveMaze(maze, start, end) {
  const rows = maze.length;
  const cols = maze[0].length;
  const queue = [{ point: start, path: [start] }];
  const visited = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(false));

  visited[start[0]][start[1]] = true;

  while (queue.length > 0) {
    const { point, path } = queue.shift();
    const [row, col] = point;

    if (row === end[0] && col === end[1]) {
      return path;
    }

    // Explore in all four directions
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]; // Up, Down, Left, Right

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        maze[newRow][newCol] === 0 &&
        !visited[newRow][newCol]
      ) {
        const newPoint = [newRow, newCol];
        const newPath = [...path, newPoint];
        queue.push({ point: newPoint, path: newPath });
        visited[newRow][newCol] = true;
      }
    }
  }

  return null; // No solution found
}

module.exports = { solveMaze };
