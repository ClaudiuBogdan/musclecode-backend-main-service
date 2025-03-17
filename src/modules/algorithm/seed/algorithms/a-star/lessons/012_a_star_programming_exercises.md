---
title: "A* Programming Exercises"
---
# A* Programming Exercises

## Hands-On Learning with A* 💪

Reading about A* is valuable, but the best way to truly understand it is through implementation. This set of exercises will guide you through building, testing, and extending your own A* pathfinder—from basic implementation to advanced optimizations.

## Exercise Structure 📝

Each exercise includes:
- **Objective**: What you'll build or solve
- **Difficulty Level**: To help you choose where to start
- **Starter Code**: A template to get you going
- **Expected Output**: What your solution should produce
- **Hints**: Guidance if you get stuck
- **Extension Challenges**: Ways to take your solution further

Let's begin!

## Exercise 1: Basic A* Grid Pathfinder 🧩

**Objective**: Implement a basic A* algorithm to find the shortest path on a 2D grid with obstacles.

**Difficulty**: Beginner

**Starter Code (JavaScript)**:

```javascript
// Grid representation: 0 = open, 1 = obstacle
const grid = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

// Start and goal positions [row, col]
const start = [0, 0];
const goal = [6, 7];

// Node class for A*
class Node {
  constructor(position, parent = null) {
    this.position = position; // [row, col]
    this.parent = parent;     // Parent node
    this.g = 0;               // Cost from start to current node
    this.h = 0;               // Estimated cost from current to goal
    this.f = 0;               // Total cost (g + h)
  }
  
  // Check if two nodes have the same position
  equals(other) {
    return this.position[0] === other.position[0] && 
           this.position[1] === other.position[1];
  }
}

// TODO: Implement the Manhattan distance heuristic function
function manhattanDistance(pos1, pos2) {
  // Your code here
}

// TODO: Implement the A* algorithm
function aStar(grid, start, goal) {
  // Create start and goal nodes
  const startNode = new Node(start);
  const goalNode = new Node(goal);
  
  // Initialize open and closed lists
  const openList = [];
  const closedList = [];
  
  // Add the start node to the open list
  openList.push(startNode);
  
  // Main loop
  while (openList.length > 0) {
    // TODO: Find the node with the lowest f value in the open list
    
    // TODO: Check if we've reached the goal
    
    // TODO: Generate valid neighbors and process them
    
  }
  
  // No path found
  return null;
}

// Helper function to get neighboring positions
function getNeighbors(grid, position) {
  const neighbors = [];
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, Right, Down, Left
  
  for (const [dx, dy] of directions) {
    const newRow = position[0] + dx;
    const newCol = position[1] + dy;
    
    // Check if the position is valid
    if (newRow >= 0 && newRow < grid.length && 
        newCol >= 0 && newCol < grid[0].length && 
        grid[newRow][newCol] === 0) {
      neighbors.push([newRow, newCol]);
    }
  }
  
  return neighbors;
}

// Helper function to reconstruct the path
function reconstructPath(node) {
  const path = [];
  let current = node;
  
  while (current !== null) {
    path.unshift(current.position);
    current = current.parent;
  }
  
  return path;
}

// Test the implementation
const path = aStar(grid, start, goal);
console.log("Path found:", path);

// Visualize the path on the grid
function visualizePath(grid, path) {
  const visual = grid.map(row => row.map(cell => cell === 1 ? '⬛' : '⬜'));
  
  for (const [row, col] of path) {
    visual[row][col] = '🟦';
  }
  
  // Mark start and goal
  const [startRow, startCol] = start;
  const [goalRow, goalCol] = goal;
  visual[startRow][startCol] = 'S';
  visual[goalRow][goalCol] = 'G';
  
  return visual.map(row => row.join('')).join('\n');
}

console.log(visualizePath(grid, path || []));
```

**Starter Code (Python)**:

```python
# Grid representation: 0 = open, 1 = obstacle
grid = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
]

# Start and goal positions (row, col)
start = (0, 0)
goal = (6, 7)

class Node:
    def __init__(self, position, parent=None):
        self.position = position  # (row, col)
        self.parent = parent      # Parent node
        self.g = 0                # Cost from start to current node
        self.h = 0                # Estimated cost from current to goal
        self.f = 0                # Total cost (g + h)
    
    def __eq__(self, other):
        return self.position == other.position

# TODO: Implement the Manhattan distance heuristic function
def manhattan_distance(pos1, pos2):
    # Your code here
    pass

# TODO: Implement the A* algorithm
def a_star(grid, start, goal):
    # Create start and goal nodes
    start_node = Node(start)
    goal_node = Node(goal)
    
    # Initialize open and closed lists
    open_list = []
    closed_list = []
    
    # Add the start node to the open list
    open_list.append(start_node)
    
    # Main loop
    while open_list:
        # TODO: Find the node with the lowest f value in the open list
        
        # TODO: Check if we've reached the goal
        
        # TODO: Generate valid neighbors and process them
    
    # No path found
    return None

# Helper function to get neighboring positions
def get_neighbors(grid, position):
    neighbors = []
    directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]  # Up, Right, Down, Left
    
    for dx, dy in directions:
        new_row, new_col = position[0] + dx, position[1] + dy
        
        # Check if the position is valid
        if (0 <= new_row < len(grid) and 
            0 <= new_col < len(grid[0]) and 
            grid[new_row][new_col] == 0):
            neighbors.append((new_row, new_col))
    
    return neighbors

# Helper function to reconstruct the path
def reconstruct_path(node):
    path = []
    current = node
    
    while current:
        path.insert(0, current.position)
        current = current.parent
    
    return path

# Test the implementation
path = a_star(grid, start, goal)
print("Path found:", path)

# Visualize the path on the grid
def visualize_path(grid, path):
    visual = [['⬛' if cell == 1 else '⬜' for cell in row] for row in grid]
    
    if path:
        for row, col in path:
            visual[row][col] = '🟦'
    
    # Mark start and goal
    start_row, start_col = start
    goal_row, goal_col = goal
    visual[start_row][start_col] = 'S'
    visual[goal_row][goal_col] = 'G'
    
    return '\n'.join([''.join(row) for row in visual])

print(visualize_path(grid, path or []))
```

**Expected Output**:

```
Path found: [
  [0, 0], [0, 1], [1, 1], [2, 1], [3, 0], 
  [4, 0], [5, 0], [6, 1], [6, 2], [6, 3], 
  [6, 4], [6, 5], [6, 6], [6, 7]
]

S🟦⬜⬜⬜⬜⬜⬜
⬜🟦⬛⬜⬜⬜⬛⬜
⬜🟦⬛⬜⬜⬜⬛⬜
🟦⬜⬛⬛⬛⬜⬛⬜
🟦⬜⬜⬜⬛⬜⬜⬜
🟦⬛⬛⬜⬛⬛⬛⬜
⬜🟦🟦🟦🟦🟦🟦G
```

**Solution Hints**:

1. **Manhattan Distance**: The Manhattan distance between two points (x1, y1) and (x2, y2) is |x1 - x2| + |y1 - y2|.

2. **Finding the Node with Lowest F Value**:
   ```javascript
   // JavaScript
   let currentIndex = 0;
   for (let i = 0; i < openList.length; i++) {
     if (openList[i].f < openList[currentIndex].f) {
       currentIndex = i;
     }
   }
   const currentNode = openList[currentIndex];
   openList.splice(currentIndex, 1);
   closedList.push(currentNode);
   ```
   
   ```python
   # Python
   current_index = 0
   for i, item in enumerate(open_list):
       if item.f < open_list[current_index].f:
           current_index = i
   
   current_node = open_list[current_index]
   open_list.pop(current_index)
   closed_list.append(current_node)
   ```

3. **Checking for Goal**:
   ```javascript
   // JavaScript
   if (currentNode.equals(goalNode)) {
     return reconstructPath(currentNode);
   }
   ```
   
   ```python
   # Python
   if current_node == goal_node:
       return reconstruct_path(current_node)
   ```

4. **Generating and Processing Neighbors**:
   ```javascript
   // JavaScript
   const neighbors = getNeighbors(grid, currentNode.position);
   
   for (const neighborPos of neighbors) {
     const neighbor = new Node(neighborPos, currentNode);
     
     // Skip if in closed list
     if (closedList.some(node => node.equals(neighbor))) {
       continue;
     }
     
     // Calculate g, h, and f values
     neighbor.g = currentNode.g + 1;
     neighbor.h = manhattanDistance(neighborPos, goal);
     neighbor.f = neighbor.g + neighbor.h;
     
     // Skip if not a better path
     const openNode = openList.find(node => node.equals(neighbor));
     if (openNode && neighbor.g >= openNode.g) {
       continue;
     }
     
     // Add to open list
     if (!openNode) {
       openList.push(neighbor);
     } else {
       openNode.g = neighbor.g;
       openNode.f = neighbor.f;
       openNode.parent = currentNode;
     }
   }
   ```
   
   ```python
   # Python
   neighbors = get_neighbors(grid, current_node.position)
   
   for neighbor_pos in neighbors:
       neighbor = Node(neighbor_pos, current_node)
       
       # Skip if in closed list
       if neighbor in closed_list:
           continue
       
       # Calculate g, h, and f values
       neighbor.g = current_node.g + 1
       neighbor.h = manhattan_distance(neighbor_pos, goal)
       neighbor.f = neighbor.g + neighbor.h
       
       # Skip if not a better path
       if any(open_node == neighbor and neighbor.g >= open_node.g for open_node in open_list):
           continue
       
       # Add to open list
       open_node = next((node for node in open_list if node == neighbor), None)
       if not open_node:
           open_list.append(neighbor)
       else:
           open_node.g = neighbor.g
           open_node.f = neighbor.f
           open_node.parent = current_node
   ```

**Extension Challenges**:

1. **Diagonal Movement**: Modify your implementation to allow diagonal movement. Remember to update the heuristic accordingly (consider using Euclidean or Diagonal distance).

2. **Variable Terrain Costs**: Modify the grid to include different movement costs (not just 0 and 1) and update the A* algorithm to account for these costs.

3. **Animated Visualization**: Create a step-by-step visualization of the A* algorithm that shows the exploration of nodes and the final path.

## Exercise 2: Maze Solver 🧠

**Objective**: Build a maze solver that can find the shortest path through any valid maze using A*.

**Difficulty**: Intermediate

**Starter Code (JavaScript)**:

```javascript
// Read a maze from a string
// '#' = wall, ' ' = open path, 'S' = start, 'G' = goal
function parseMaze(mazeString) {
  const rows = mazeString.trim().split('\n');
  const maze = [];
  let start = null;
  let goal = null;
  
  for (let i = 0; i < rows.length; i++) {
    const row = [];
    for (let j = 0; j < rows[i].length; j++) {
      const char = rows[i][j];
      if (char === '#') {
        row.push(1); // Wall
      } else {
        row.push(0); // Open path
        if (char === 'S') {
          start = [i, j];
        } else if (char === 'G') {
          goal = [i, j];
        }
      }
    }
    maze.push(row);
  }
  
  return { maze, start, goal };
}

// Sample maze
const mazeString = `
###############
#S#       #   #
# # ##### # # #
# #     # # # #
# ##### # # # #
#   #   # # # #
### # ### # # #
#   #     # # #
# ######### # #
#           #G#
###############
`;

const { maze, start, goal } = parseMaze(mazeString);

// TODO: Implement the A* algorithm to solve the maze
// You can use your code from Exercise 1 as a starting point

// TODO: Implement visualization for the maze solution
```

**Starter Code (Python)**:

```python
# Read a maze from a string
# '#' = wall, ' ' = open path, 'S' = start, 'G' = goal
def parse_maze(maze_string):
    rows = maze_string.strip().split('\n')
    maze = []
    start = None
    goal = None
    
    for i, row_str in enumerate(rows):
        row = []
        for j, char in enumerate(row_str):
            if char == '#':
                row.append(1)  # Wall
            else:
                row.append(0)  # Open path
                if char === 'S':
                    start = (i, j)
                elif char === 'G':
                    goal = (i, j)
        maze.append(row)
    
    return maze, start, goal

# Sample maze
maze_string = """
###############
#S#       #   #
# # ##### # # #
# #     # # # #
# ##### # # # #
#   #   # # # #
### # ### # # #
#   #     # # #
# ######### # #
#           #G#
###############
"""

maze, start, goal = parse_maze(maze_string)

# TODO: Implement the A* algorithm to solve the maze
# You can use your code from Exercise 1 as a starting point

# TODO: Implement visualization for the maze solution
```

**Expected Output**:

```
###############
#S#       #   #
#🟦# ##### # # #
#🟦#     # # # #
#🟦##### # # # #
#🟦🟦#   # # # #
###🟦# ### # # #
#  🟦#     # # #
# #########🟦# #
#          🟦#G#
###############
```

**Solution Hints**:

1. Reuse your A* implementation from Exercise 1.
2. Modify the maze parsing function to identify the start and goal positions.
3. For visualization, create a function that renders the maze with the path highlighted.

**Extension Challenges**:

1. **Multiple Paths**: Modify the algorithm to find all possible paths from start to goal, and then select the shortest.
2. **Maze Generator**: Create a function that generates random mazes with guaranteed solutions.
3. **Path Smoothing**: Implement an algorithm that smooths the path found by A* to make it look more natural.

## Exercise 3: Real-Time Pathfinding Game 🎮

**Objective**: Create a simple game where a character navigates toward a target using A* pathfinding, updating the path if obstacles are added or removed.

**Difficulty**: Advanced

**Starter Code (JavaScript with HTML Canvas)**:

```html
<!DOCTYPE html>
<html>
<head>
  <title>A* Pathfinding Game</title>
  <style>
    canvas {
      border: 1px solid black;
      display: block;
      margin: 20px auto;
    }
    .controls {
      text-align: center;
      margin: 10px;
    }
  </style>
</head>
<body>
  <div class="controls">
    <button id="resetBtn">Reset</button>
    <button id="randomObstaclesBtn">Random Obstacles</button>
    <label><input type="checkbox" id="showPathCheckbox" checked> Show Path</label>
  </div>
  <canvas id="gameCanvas" width="500" height="500"></canvas>
  
  <script>
    // Set up the canvas
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Game state
    const gridSize = 20;
    const cellSize = canvas.width / gridSize;
    
    let character = { x: 1, y: 1, size: cellSize * 0.8, color: 'blue' };
    let target = { x: gridSize - 2, y: gridSize - 2, size: cellSize * 0.8, color: 'green' };
    let obstacles = []; // Will store obstacles as {x, y} objects
    let currentPath = [];
    let showPath = true;
    
    // Initialize the game
    function init() {
      // Set up event listeners
      canvas.addEventListener('click', handleCanvasClick);
      document.getElementById('resetBtn').addEventListener('click', resetGame);
      document.getElementById('randomObstaclesBtn').addEventListener('click', addRandomObstacles);
      document.getElementById('showPathCheckbox').addEventListener('change', togglePathVisibility);
      
      // Start the game loop
      gameLoop();
    }
    
    // Game loop
    function gameLoop() {
      update();
      render();
      requestAnimationFrame(gameLoop);
    }
    
    // Update game state
    function update() {
      // TODO: Implement A* pathfinding and character movement
      // If character is not at target and path exists, move along path
    }
    
    // Render the game
    function render() {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          ctx.strokeStyle = '#ddd';
          ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
      
      // Draw path
      if (showPath && currentPath.length > 0) {
        ctx.strokeStyle = 'rgba(255, 165, 0, 0.7)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo((character.x + 0.5) * cellSize, (character.y + 0.5) * cellSize);
        
        for (const point of currentPath) {
          ctx.lineTo((point.x + 0.5) * cellSize, (point.y + 0.5) * cellSize);
        }
        
        ctx.stroke();
        ctx.lineWidth = 1;
      }
      
      // Draw obstacles
      ctx.fillStyle = 'black';
      for (const obstacle of obstacles) {
        ctx.fillRect(obstacle.x * cellSize, obstacle.y * cellSize, cellSize, cellSize);
      }
      
      // Draw character
      ctx.fillStyle = character.color;
      ctx.beginPath();
      ctx.arc(
        (character.x + 0.5) * cellSize, 
        (character.y + 0.5) * cellSize, 
        character.size / 2, 
        0, 
        Math.PI * 2
      );
      ctx.fill();
      
      // Draw target
      ctx.fillStyle = target.color;
      ctx.beginPath();
      ctx.arc(
        (target.x + 0.5) * cellSize, 
        (target.y + 0.5) * cellSize, 
        target.size / 2, 
        0, 
        Math.PI * 2
      );
      ctx.fill();
    }
    
    // Handle canvas clicks
    function handleCanvasClick(event) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      // Convert to grid coordinates
      const gridX = Math.floor(mouseX / cellSize);
      const gridY = Math.floor(mouseY / cellSize);
      
      // Toggle obstacle at this position
      const obstacleIndex = obstacles.findIndex(
        obs => obs.x === gridX && obs.y === gridY
      );
      
      if (obstacleIndex !== -1) {
        // Remove obstacle
        obstacles.splice(obstacleIndex, 1);
      } else {
        // Make sure we're not placing an obstacle on the character or target
        if ((gridX !== character.x || gridY !== character.y) && 
            (gridX !== target.x || gridY !== target.y)) {
          // Add obstacle
          obstacles.push({ x: gridX, y: gridY });
        }
      }
      
      // Recalculate path
      // TODO: Call your A* pathfinding function here
    }
    
    // Reset the game
    function resetGame() {
      character = { x: 1, y: 1, size: cellSize * 0.8, color: 'blue' };
      target = { x: gridSize - 2, y: gridSize - 2, size: cellSize * 0.8, color: 'green' };
      obstacles = [];
      currentPath = [];
    }
    
    // Add random obstacles
    function addRandomObstacles() {
      obstacles = [];
      
      // Add random obstacles
      for (let i = 0; i < gridSize * 3; i++) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        
        // Don't place obstacles on character or target
        if ((x !== character.x || y !== character.y) && 
            (x !== target.x || y !== target.y)) {
          obstacles.push({ x, y });
        }
      }
      
      // Recalculate path
      // TODO: Call your A* pathfinding function here
    }
    
    // Toggle path visibility
    function togglePathVisibility(event) {
      showPath = event.target.checked;
    }
    
    // TODO: Implement A* pathfinding for grid-based movement
    function findPath(startX, startY, goalX, goalY) {
      // Your A* implementation here
      // Return an array of {x, y} points representing the path
    }
    
    // Initialize the game when the page loads
    window.onload = init;
  </script>
</body>
</html>
```

**Expected Behavior**:

1. The character (blue circle) should find a path to the target (green circle) using A*.
2. Clicking on the grid should add or remove obstacles, causing the path to recalculate.
3. The character should move smoothly along the calculated path.
4. The "Reset" button should return the game to its initial state.
5. The "Random Obstacles" button should randomly place obstacles on the grid.

**Solution Hints**:

1. Use your A* implementation from previous exercises, but adapt it to work with the game's grid system.
2. Implement a function to convert the path returned by A* into character movement.
3. Use requestAnimationFrame for smooth animation.
4. Make sure to recalculate the path whenever obstacles change.

**Extension Challenges**:

1. **Moving Target**: Add functionality where the target moves, requiring path recalculation.
2. **Fog of War**: Implement a "fog of war" where only areas near the character are visible.
3. **Multiple Units**: Add support for multiple characters, each finding their own path.
4. **Path Smoothing**: Implement a path smoothing algorithm to make movement more natural.

## Exercise 4: A* Memory Optimization for Large Maps 🗺️

**Objective**: Optimize the A* algorithm to handle very large maps efficiently, focusing on memory usage.

**Difficulty**: Expert

**Starter Code (JavaScript)**:

```javascript
// Generate a large sparse grid (mostly open with some obstacles)
function generateLargeGrid(width, height, obstaclePercentage = 0.3) {
  const grid = new Array(height).fill().map(() => new Array(width).fill(0));
  
  // Add random obstacles
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (Math.random() < obstaclePercentage) {
        grid[y][x] = 1;
      }
    }
  }
  
  // Ensure start and end are open
  grid[0][0] = 0; // Start
  grid[height-1][width-1] = 0; // Goal
  
  return grid;
}

// Create a large grid (e.g., 1000x1000)
const largeGrid = generateLargeGrid(1000, 1000, 0.3);
const start = [0, 0];
const goal = [999, 999];

// Memory-efficient Node representation (optional)
class CompactNode {
  constructor(x, y, parentIndex = -1) {
    this.x = x;
    this.y = y;
    this.parentIndex = parentIndex; // Index in the closed list
    this.g = 0;
    this.h = 0;
    this.f = 0;
  }
  
  getPosition() {
    return [this.x, this.y];
  }
  
  // Utility function to create a unique string key for a position
  static positionKey(x, y) {
    return `${x},${y}`;
  }
}

// TODO: Implement an efficient A* variant (e.g., Iterative Deepening A*)
function efficientAStar(grid, start, goal) {
  // Your optimized A* implementation here
}

// Measure memory usage and time
function benchmarkPathfinding() {
  console.log("Grid size:", largeGrid.length, "x", largeGrid[0].length);
  console.log("Finding path from", start, "to", goal);
  
  const startTime = performance.now();
  const startMemory = process.memoryUsage().heapUsed / 1024 / 1024; // MB
  
  const path = efficientAStar(largeGrid, start, goal);
  
  const endTime = performance.now();
  const endMemory = process.memoryUsage().heapUsed / 1024 / 1024; // MB
  
  console.log("Path length:", path ? path.length : "No path found");
  console.log("Time taken:", (endTime - startTime).toFixed(2), "ms");
  console.log("Memory used:", (endMemory - startMemory).toFixed(2), "MB");
  
  return path;
}

// Run the benchmark
benchmarkPathfinding();
```

**Starter Code (Python)**:

```python
import random
import time
import sys
import psutil
import os

# Generate a large sparse grid (mostly open with some obstacles)
def generate_large_grid(width, height, obstacle_percentage=0.3):
    grid = [[0 for _ in range(width)] for _ in range(height)]
    
    # Add random obstacles
    for y in range(height):
        for x in range(width):
            if random.random() < obstacle_percentage:
                grid[y][x] = 1
    
    # Ensure start and end are open
    grid[0][0] = 0  # Start
    grid[height-1][width-1] = 0  # Goal
    
    return grid

# Create a large grid (e.g., 1000x1000)
large_grid = generate_large_grid(1000, 1000, 0.3)
start = (0, 0)
goal = (999, 999)

# Memory-efficient Node representation (optional)
class CompactNode:
    def __init__(self, x, y, parent_index=-1):
        self.x = x
        self.y = y
        self.parent_index = parent_index  # Index in the closed list
        self.g = 0
        self.h = 0
        self.f = 0
    
    def get_position(self):
        return (self.x, self.y)
    
    # Utility function to create a unique string key for a position
    @staticmethod
    def position_key(x, y):
        return f"{x},{y}"

# TODO: Implement an efficient A* variant (e.g., Iterative Deepening A*)
def efficient_a_star(grid, start, goal):
    # Your optimized A* implementation here
    pass

# Measure memory usage and time
def benchmark_pathfinding():
    print(f"Grid size: {len(large_grid)} x {len(large_grid[0])}")
    print(f"Finding path from {start} to {goal}")
    
    process = psutil.Process(os.getpid())
    start_memory = process.memory_info().rss / 1024 / 1024  # MB
    
    start_time = time.time()
    path = efficient_a_star(large_grid, start, goal)
    end_time = time.time()
    
    end_memory = process.memory_info().rss / 1024 / 1024  # MB
    
    print(f"Path length: {len(path) if path else 'No path found'}")
    print(f"Time taken: {(end_time - start_time):.2f} seconds")
    print(f"Memory used: {(end_memory - start_memory):.2f} MB")
    
    return path

# Run the benchmark
benchmark_pathfinding()
```

**Expected Output**:

The exact output will depend on the efficiency of your implementation, but you should aim for:

```
Grid size: 1000 x 1000
Finding path from [0, 0] to [999, 999]
Path length: 1423
Time taken: 874.32 ms
Memory used: 132.45 MB
```

**Optimization Ideas**:

1. **Efficient Data Structures**:
   - Use binary heaps for the open list
   - Use hash tables for faster lookups
   - Consider using bit arrays for the closed list

2. **Memory-Efficient Algorithm Variants**:
   - Implement Iterative Deepening A* (IDA*)
   - Consider Jump Point Search (JPS) if the grid is uniform
   - Implement a hierarchical pathfinding approach

3. **Representation Optimizations**:
   - Use integer coordinates instead of arrays
   - Use a flat array for the grid instead of a 2D array
   - Store parent indices rather than references

**Solution Hints**:

For a memory-efficient IDA* implementation:

```javascript
// JavaScript
function ida_star(grid, start, goal) {
  const heuristic = manhattanDistance;
  const threshold = heuristic(start, goal);
  
  function search(node, g, threshold) {
    const f = g + heuristic(node, goal);
    
    if (f > threshold) {
      return f;
    }
    
    if (node[0] === goal[0] && node[1] === goal[1]) {
      return true;
    }
    
    let min = Infinity;
    const neighbors = getNeighbors(grid, node);
    
    for (const neighbor of neighbors) {
      pathStack.push(neighbor);
      const result = search(neighbor, g + 1, threshold);
      
      if (result === true) {
        return true;
      }
      
      if (result < min) {
        min = result;
      }
      
      pathStack.pop();
    }
    
    return min;
  }
  
  const pathStack = [start];
  
  let t = threshold;
  while (t !== true && t < Infinity) {
    t = search(start, 0, t);
  }
  
  return t === true ? pathStack : null;
}
```

```python
# Python
def ida_star(grid, start, goal):
    heuristic = manhattan_distance
    threshold = heuristic(start, goal)
    
    def search(node, g, threshold):
        f = g + heuristic(node, goal)
        
        if f > threshold:
            return f
        
        if node == goal:
            return True
        
        min_cost = float('inf')
        neighbors = get_neighbors(grid, node)
        
        for neighbor in neighbors:
            path_stack.append(neighbor)
            result = search(neighbor, g + 1, threshold)
            
            if result is True:
                return True
            
            if result < min_cost:
                min_cost = result
            
            path_stack.pop()
        
        return min_cost
    
    path_stack = [start]
    
    t = threshold
    while t is not True and t < float('inf'):
        t = search(start, 0, t)
    
    return path_stack if t is True else None
```

**Extension Challenges**:

1. **Bidirectional Search**: Implement a bidirectional A* search that searches from both start and goal simultaneously.
2. **External Memory A***: Implement an A* variant that can store parts of the open and closed lists on disk for extremely large maps.
3. **Parallel A***: Implement a parallel version of A* that uses multiple threads or processes to find the path faster.
4. **Anytime A***: Implement an anytime A* variant that can return a valid path at any time, improving it as more time is allowed.

## Exercise 5: Real-World A* Application 🌍

**Objective**: Apply A* to a real-world navigation scenario using actual map data.

**Difficulty**: Expert

For this exercise, you would:

1. Obtain geographic data (e.g., from OpenStreetMap)
2. Parse the data into a graph structure
3. Implement A* to find routes between locations
4. Account for real-world constraints (e.g., one-way streets, traffic data)
5. Visualize the results on a map

This is an open-ended project that will require research and integration with external libraries. A full implementation is beyond the scope of this exercise file.

**Recommended Resources**:
- OpenStreetMap API (https://wiki.openstreetmap.org/wiki/API)
- Leaflet.js for map visualization (https://leafletjs.com/)
- OSRM (Open Source Routing Machine) for benchmarking

## Conclusion 🏁

By completing these exercises, you've gained hands-on experience with the A* algorithm across a range of applications—from simple grid pathfinding to memory-optimized variants for large maps. Each implementation builds on the core principles of A* while addressing different challenges and constraints.

Remember that proficiency comes with practice. Don't be discouraged if your first implementations aren't perfect; optimizing pathfinding algorithms is an ongoing process even for experienced developers.

As you continue to work with A*, consider how the principles you've learned apply to other problem domains beyond physical pathfinding, such as planning, scheduling, and optimization problems.

Happy pathfinding! 🧭 