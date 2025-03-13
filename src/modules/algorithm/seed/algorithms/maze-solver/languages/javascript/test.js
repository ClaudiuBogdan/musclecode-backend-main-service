const { solveMaze } = require('./exercise');

describe('Maze Solver Algorithm', () => {
  it('should find a path from start to end', () => {
    const maze = [
      [0, 0, 0, 0, 0],
      [1, 1, 0, 1, 1],
      [0, 0, 0, 0, 0],
      [1, 1, 0, 1, 1],
      [0, 0, 0, 0, 0],
    ];
    const start = [0, 0];
    const end = [4, 4];
    const result = solveMaze(maze, start, end);
    expect(result).not.toBeNull();
  });

  it('should return null if no solution exists', () => {
    const maze = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const start = [0, 0];
    const end = [0, 2];
    const result = solveMaze(maze, start, end);
    expect(result).toBeNull();
  });

  it('should handle mazes with start and end points next to walls', () => {
    const maze = [
      [0, 1],
      [0, 0],
    ];
    const start = [0, 0];
    const end = [1, 1];
    const result = solveMaze(maze, start, end);
    expect(result).not.toBeNull();
  });

  it('should handle single-cell maze', () => {
    const maze = [[0]];
    const start = [0, 0];
    const end = [0, 0];
    const result = solveMaze(maze, start, end);
    expect(result).toEqual([[0, 0]]);
  });

  it('should handle larger, more complex mazes', () => {
    const maze = [
      [0, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 0],
      [0, 0, 0, 1, 0, 0],
      [1, 1, 1, 1, 0, 1],
      [0, 0, 0, 0, 0, 0],
      [1, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    const start = [0, 0];
    const end = [6, 5];
    const result = solveMaze(maze, start, end);
    expect(result).not.toBeNull();
  });
});
