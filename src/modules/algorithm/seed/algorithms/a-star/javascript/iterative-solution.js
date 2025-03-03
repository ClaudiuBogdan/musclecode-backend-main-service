/**
 * Iterative implementation of the A* search algorithm.
 *
 * @param {number[][]} grid - A 2D grid of numbers (0 = free, 1 = obstacle)
 * @param {number[]} start - Starting coordinates [x, y]
 * @param {number[]} goal - Goal coordinates [x, y]
 * @returns {number[][]} The shortest path from start to goal, or an empty array if no path exists.
 */
function aStarSearch(grid, start, goal) {
  function heuristic(x, y) {
    return Math.abs(x - goal[0]) + Math.abs(y - goal[1]);
  }

  function Node(x, y, g, h, parent) {
    this.x = x;
    this.y = y;
    this.g = g;
    this.h = h;
    this.f = g + h;
    this.parent = parent;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  const closed = Array.from({ length: rows }, () => new Array(cols).fill(false));

  let openList = [];
  const startNode = new Node(start[0], start[1], 0, heuristic(start[0], start[1]), null);
  openList.push(startNode);

  while (openList.length) {
    // Find the node with the minimum f value.
    let currentIndex = 0;
    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < openList[currentIndex].f) {
        currentIndex = i;
      }
    }
    const current = openList.splice(currentIndex, 1)[0];

    if (current.x === goal[0] && current.y === goal[1]) {
      let path = [];
      let curr = current;
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
      [-1, 0]
    ];

    for (const [dx, dy] of directions) {
      const newX = current.x + dx;
      const newY = current.y + dy;

      if (newY < 0 || newY >= rows || newX < 0 || newX >= cols) continue;
      if (grid[newY][newX] === 1 || closed[newY][newX]) continue;

      const gScore = current.g + 1;
      const hScore = heuristic(newX, newY);
      const fScore = gScore + hScore;

      if (openList.find(n => n.x === newX && n.y === newY && gScore >= n.g)) continue;

      const neighbor = new Node(newX, newY, gScore, hScore, current);
      openList.push(neighbor);
    }
  }
  return [];
}

module.exports = { aStarSearch }; 