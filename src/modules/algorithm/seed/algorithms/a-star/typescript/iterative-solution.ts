/**
 * Iterative implementation of the A* search algorithm.
 *
 * @param grid - A 2D grid of numbers (0 for free, 1 for obstacle)
 * @param start - Starting coordinates as [x, y]
 * @param goal - Goal coordinates as [x, y]
 * @returns The shortest path from start to goal as an array of coordinates, or an empty array if no path exists.
 */
export function aStarSearch(
  grid: number[][],
  start: number[],
  goal: number[],
): number[][] {
  function heuristic(x: number, y: number): number {
    return Math.abs(x - goal[0]) + Math.abs(y - goal[1]);
  }

  interface Node {
    x: number;
    y: number;
    g: number;
    h: number;
    f: number;
    parent: Node | null;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  const closed: boolean[][] = Array.from({ length: rows }, () =>
    new Array(cols).fill(false),
  );

  const startNode: Node = {
    x: start[0],
    y: start[1],
    g: 0,
    h: heuristic(start[0], start[1]),
    f: heuristic(start[0], start[1]),
    parent: null,
  };

  const openList: Node[] = [startNode];

  while (openList.length > 0) {
    // Find the node with the lowest f value.
    let currentIndex = 0;
    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < openList[currentIndex].f) {
        currentIndex = i;
      }
    }
    const current = openList.splice(currentIndex, 1)[0];

    // Check if we've reached the goal.
    if (current.x === goal[0] && current.y === goal[1]) {
      const path: number[][] = [];
      let curr: Node | null = current;
      while (curr) {
        path.unshift([curr.x, curr.y]);
        curr = curr.parent;
      }
      return path;
    }

    closed[current.y][current.x] = true;
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    for (const [dx, dy] of directions) {
      const newX = current.x + dx;
      const newY = current.y + dy;

      if (newY < 0 || newY >= rows || newX < 0 || newX >= cols) continue;
      if (grid[newY][newX] === 1 || closed[newY][newX]) continue;

      const gScore = current.g + 1;
      const hScore = heuristic(newX, newY);
      const fScore = gScore + hScore;

      const existing = openList.find(
        (node) => node.x === newX && node.y === newY,
      );
      if (existing && gScore >= existing.g) continue;

      const neighbor: Node = {
        x: newX,
        y: newY,
        g: gScore,
        h: hScore,
        f: fScore,
        parent: current,
      };

      if (existing) {
        existing.g = gScore;
        existing.h = hScore;
        existing.f = fScore;
        existing.parent = current;
      } else {
        openList.push(neighbor);
      }
    }
  }
  return [];
}
