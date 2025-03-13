---
title: Implementing Your Own Maze Solver
---

# 💻 Hands-On: Implementing a Maze Solver

> [!NOTE]
> Let's put theory into practice by implementing a complete maze solver. We'll use BFS since it guarantees the shortest path while being relatively straightforward to implement.

## 🏗️ Setting Up the Project

First, let's define our types and interfaces:

```typescript
// Type definitions
type Maze = number[][];  // 0 = path, 1 = wall
type Point = [number, number];  // [row, col]

/**
 * Solves a maze represented as a 2D array.
 * 
 * @param maze - The maze where 0 represents a path and 1 represents a wall
 * @param start - The starting position [row, col]
 * @param end - The ending position [row, col]
 * @returns The path from start to end, or null if no path exists
 */
function solveMaze(maze: Maze, start: Point, end: Point): Point[] | null {
  // Implementation will go here
}
```

## 🧠 Step 1: Input Validation

Always start by validating the input:

```typescript
function solveMaze(maze: Maze, start: Point, end: Point): Point[] | null {
  // Get maze dimensions
  const rows = maze.length;
  const cols = maze[0]?.length || 0;
  
  // Validate maze
  if (rows === 0 || cols === 0) {
    return null; // Invalid maze
  }
  
  // Validate start and end points
  const [startRow, startCol] = start;
  const [endRow, endCol] = end;
  
  if (
    startRow < 0 || startRow >= rows || startCol < 0 || startCol >= cols ||
    endRow < 0 || endRow >= rows || endCol < 0 || endCol >= cols ||
    maze[startRow][startCol] === 1 || maze[endRow][endCol] === 1
  ) {
    return null; // Invalid start or end position
  }
  
  // Special case: start and end are the same
  if (startRow === endRow && startCol === endCol) {
    return [start]; // Already at the destination
  }
  
  // The rest of the implementation will go here
}
```

## 🔄 Step 2: Setting Up the BFS

Let's set up the core of our BFS algorithm:

```typescript
// Initialize the queue with the start position
const queue: { point: Point; path: Point[] }[] = [{ point: start, path: [start] }];

// Initialize the visited array
const visited: boolean[][] = Array(rows).fill(null).map(() => Array(cols).fill(false));
visited[startRow][startCol] = true;

// Define the four possible directions: up, right, down, left
const directions: [number, number][] = [[-1, 0], [0, 1], [1, 0], [0, -1]];
```

> [!TIP]
> We're using a queue of objects that contain both the current position and the path taken to reach it. While this uses more memory, it simplifies path tracking.

## 🔍 Step 3: Implementing the BFS Loop

Now, let's implement the main BFS loop:

```typescript
// BFS loop
while (queue.length > 0) {
  // Dequeue the first element
  const { point, path } = queue.shift()!;
  const [row, col] = point;
  
  // Check if we've reached the end
  if (row === endRow && col === endCol) {
    return path; // Found the path
  }
  
  // Explore all four directions
  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    
    // Check if the new position is valid
    if (
      newRow >= 0 && newRow < rows &&
      newCol >= 0 && newCol < cols &&
      maze[newRow][newCol] === 0 &&
      !visited[newRow][newCol]
    ) {
      // Mark as visited and enqueue
      visited[newRow][newCol] = true;
      const newPoint: Point = [newRow, newCol];
      const newPath = [...path, newPoint];
      queue.push({ point: newPoint, path: newPath });
    }
  }
}

// If we get here, no path exists
return null;
```

## 🧩 Step 4: The Complete Solution

Putting it all together, here's our complete BFS maze solver:

```typescript
function solveMaze(maze: Maze, start: Point, end: Point): Point[] | null {
  // Get maze dimensions
  const rows = maze.length;
  const cols = maze[0]?.length || 0;
  
  // Validate maze
  if (rows === 0 || cols === 0) {
    return null; // Invalid maze
  }
  
  // Validate start and end points
  const [startRow, startCol] = start;
  const [endRow, endCol] = end;
  
  if (
    startRow < 0 || startRow >= rows || startCol < 0 || startCol >= cols ||
    endRow < 0 || endRow >= rows || endCol < 0 || endCol >= cols ||
    maze[startRow][startCol] === 1 || maze[endRow][endCol] === 1
  ) {
    return null; // Invalid start or end position
  }
  
  // Special case: start and end are the same
  if (startRow === endRow && startCol === endCol) {
    return [start]; // Already at the destination
  }
  
  // Initialize the queue with the start position
  const queue: { point: Point; path: Point[] }[] = [{ point: start, path: [start] }];
  
  // Initialize the visited array
  const visited: boolean[][] = Array(rows).fill(null).map(() => Array(cols).fill(false));
  visited[startRow][startCol] = true;
  
  // Define the four possible directions: up, right, down, left
  const directions: [number, number][] = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  
  // BFS loop
  while (queue.length > 0) {
    // Dequeue the first element
    const { point, path } = queue.shift()!;
    const [row, col] = point;
    
    // Check if we've reached the end
    if (row === endRow && col === endCol) {
      return path; // Found the path
    }
    
    // Explore all four directions
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      
      // Check if the new position is valid
      if (
        newRow >= 0 && newRow < rows &&
        newCol >= 0 && newCol < cols &&
        maze[newRow][newCol] === 0 &&
        !visited[newRow][newCol]
      ) {
        // Mark as visited and enqueue
        visited[newRow][newCol] = true;
        const newPoint: Point = [newRow, newCol];
        const newPath = [...path, newPoint];
        queue.push({ point: newPoint, path: newPath });
      }
    }
  }
  
  // If we get here, no path exists
  return null;
}
```

## 🧪 Step 5: Testing the Implementation

Let's test our solution with a few examples:

### Example 1: Simple Maze with Solution

```typescript
const maze1 = [
  [0, 0, 0, 0, 0],
  [1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0]
];
const start1: Point = [0, 0];
const end1: Point = [4, 4];
const path1 = solveMaze(maze1, start1, end1);
console.log(path1);
// Expected output: [[0,0], [0,1], [0,2], [0,3], [0,4], [1,4], [2,4], [3,4], [4,4]]
```

### Example 2: Maze with No Solution

```typescript
const maze2 = [
  [0, 1, 0],
  [0, 1, 0],
  [0, 1, 0]
];
const start2: Point = [0, 0];
const end2: Point = [0, 2];
const path2 = solveMaze(maze2, start2, end2);
console.log(path2);
// Expected output: null
```

## 🔍 Step 6: Visualizing the Path

To better understand the path, let's create a function to visualize it:

```typescript
function visualizePath(maze: Maze, path: Point[] | null): string {
  if (!path) {
    return "No solution exists";
  }
  
  const rows = maze.length;
  const cols = maze[0].length;
  
  // Create a copy of the maze for visualization
  const visual = Array(rows).fill(null).map((_, r) => 
    Array(cols).fill(null).map((_, c) => 
      maze[r][c] === 1 ? '⬛' : '⬜'
    )
  );
  
  // Mark the path
  for (let i = 0; i < path.length; i++) {
    const [r, c] = path[i];
    visual[r][c] = i === 0 ? '🟢' : i === path.length - 1 ? '🔴' : '🟦';
  }
  
  // Convert to a string
  return visual.map(row => row.join('')).join('\n');
}

// Test the visualization
console.log(visualizePath(maze1, path1));
```

Output might look like:
```
🟢🟦🟦🟦🟦
⬛⬛🟦⬛🟦
⬜⬜⬜⬜🟦
⬜⬛⬛⬛🟦
⬜⬜⬜⬜🔴
```

## 🚀 Further Improvements

Here are some ways to enhance the implementation:

### 1. Memory Optimization

Instead of storing the entire path at each step, use a parent map:

```typescript
// Instead of this:
const newPath = [...path, newPoint];
queue.push({ point: newPoint, path: newPath });

// Use a parent map:
const parentMap = new Map<string, Point>();
// When adding a new point:
parentMap.set(`${newRow},${newCol}`, [row, col]);

// Then reconstruct the path when found:
function reconstructPath(parentMap: Map<string, Point>, end: Point): Point[] {
  const path: Point[] = [end];
  let current = end;
  
  while (parentMap.has(`${current[0]},${current[1]}`)) {
    current = parentMap.get(`${current[0]},${current[1]}`)!;
    path.unshift(current);
  }
  
  return path;
}
```

### 2. Adding A* for Better Performance

For even better performance, especially on large mazes, consider implementing A*:

<details>
<summary>A* Implementation Sketch</summary>

```typescript
function manhattanDistance(a: Point, b: Point): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function solveMazeAStar(maze: Maze, start: Point, end: Point): Point[] | null {
  // ... (input validation like before) ...
  
  // Priority queue (simplified with an array + sort)
  const openSet: {point: Point; fScore: number}[] = [{point: start, fScore: manhattanDistance(start, end)}];
  
  // Maps for tracking
  const gScore = new Map<string, number>();
  const cameFrom = new Map<string, Point>();
  
  // Set initial scores
  gScore.set(`${start[0]},${start[1]}`, 0);
  
  // ... (A* implementation continues) ...
}
```
</details>

### 3. Support for Different Maze Representations

Add adapters for different maze representations:

```typescript
interface MazeAdapter {
  isWall(row: number, col: number): boolean;
  getRows(): number;
  getCols(): number;
}

class BinaryMazeAdapter implements MazeAdapter {
  constructor(private maze: number[][]) {}
  
  isWall(row: number, col: number): boolean {
    return this.maze[row][col] === 1;
  }
  
  getRows(): number {
    return this.maze.length;
  }
  
  getCols(): number {
    return this.maze[0]?.length || 0;
  }
}

// Then update solveMaze to use the adapter
```

## 🤔 Exercises to Try

1. Implement the DFS version of the maze solver
2. Modify the algorithm to find all possible paths
3. Add support for diagonal movement
4. Implement the A* algorithm with different heuristics
5. Create a visualization that shows the exploration progress step by step

> [!TIP]
> The best way to understand these algorithms is to implement them yourself and test them on various maze configurations!

In our final lesson, we'll wrap up with a review of key concepts and techniques. 