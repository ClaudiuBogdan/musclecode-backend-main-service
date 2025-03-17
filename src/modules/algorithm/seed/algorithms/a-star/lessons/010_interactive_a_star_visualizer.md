---
title: "Interactive A* Visualizer"
---
# Interactive A* Visualizer

## Seeing A* in Action 👁️

Reading about A* is helpful, but there's nothing like watching it work in real-time to truly understand its behavior. In this additional lesson, we'll explore tools and techniques to visualize A* in action and experiment with different parameters to deepen your understanding.

## Online A* Visualizers 🌐

Let's start with some excellent online visualizers that require no setup:

### 1. PathFinding.js Visualizer

**Link**: [PathFinding.js](https://qiao.github.io/PathFinding.js/visual/)

This powerful interactive tool lets you:
- Compare A* with other algorithms side-by-side
- Use different heuristics (Manhattan, Euclidean, etc.)
- Adjust grid size and add obstacles
- Control animation speed
- View the exact path being taken

**Suggested Experiments**:
- Compare how A*, Dijkstra's, and Greedy Best-First Search explore the grid
- Create a maze with bottlenecks and watch how each algorithm performs
- Switch between different heuristics and observe the changes in exploration patterns

### 2. A* Pathfinding Visualization

**Link**: [A* Pathfinding Visualization](https://clementmihailescu.github.io/Pathfinding-Visualizer/)

This clean visualizer offers:
- Intuitive maze drawing interface
- Multiple algorithms including A*
- Clear visualization of visited nodes vs. shortest path
- Ability to generate random mazes

**Suggested Experiments**:
- Create a maze with multiple possible paths and see which one A* finds
- Generate a completely random maze and observe A*'s behavior
- Place the start and end points far apart and note the exploration pattern

### 3. Red Blob Games A* Interactive Tutorial

**Link**: [Introduction to A*](https://www.redblobgames.com/pathfinding/a-star/introduction.html)

This is more of an educational tool than just a visualizer, offering:
- Step-by-step visualization of the algorithm's internals
- Interactive diagrams showing exactly how the algorithm works
- Adjustable heuristic weights and their effects
- Comparison of different search algorithms

**Suggested Experiments**:
- Adjust the heuristic weight slider to see how it affects the search (setting it to 0 makes it behave like Dijkstra's)
- Observe the exact order in which nodes are visited
- Try different map types from the examples provided

## Building Your Own A* Visualizer 🛠️

Ready for a challenge? Building your own A* visualizer is an excellent way to cement your understanding of the algorithm. Here's a simplified guide to get you started with a web-based visualizer:

### Step 1: Set Up Your Project

Create a basic HTML file with a canvas element:

```html
<!DOCTYPE html>
<html>
<head>
  <title>A* Visualizer</title>
  <style>
    body { 
      font-family: Arial, sans-serif;
      text-align: center;
    }
    canvas { 
      border: 1px solid #000;
      margin: 20px;
    }
    .controls {
      margin: 20px;
    }
  </style>
</head>
<body>
  <h1>A* Pathfinding Visualizer</h1>
  <div class="controls">
    <button id="startBtn">Start</button>
    <button id="resetBtn">Reset</button>
    <select id="heuristicSelect">
      <option value="manhattan">Manhattan Distance</option>
      <option value="euclidean">Euclidean Distance</option>
      <option value="diagonal">Diagonal Distance</option>
    </select>
    <button id="addObstacleBtn">Add Obstacles</button>
  </div>
  <canvas id="gridCanvas" width="600" height="600"></canvas>
  <script src="astar.js"></script>
</body>
</html>
```

### Step 2: Create the Grid

In your JavaScript file (`astar.js`), set up the grid:

```javascript
// Initialize the canvas and grid
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20; // Number of cells in each dimension
const cellSize = canvas.width / gridSize;

// Grid representation 
// 0 = open, 1 = obstacle, 2 = start, 3 = goal, 4 = visited, 5 = path
const grid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));

// Set start and goal positions
let start = [0, 0];
let goal = [gridSize-1, gridSize-1];
grid[start[0]][start[1]] = 2;
grid[goal[0]][goal[1]] = 3;

// Draw the grid
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Set color based on cell type
      switch (grid[i][j]) {
        case 0: ctx.fillStyle = '#fff'; break; // Open cell
        case 1: ctx.fillStyle = '#333'; break; // Obstacle
        case 2: ctx.fillStyle = '#0f0'; break; // Start
        case 3: ctx.fillStyle = '#f00'; break; // Goal
        case 4: ctx.fillStyle = '#99f'; break; // Visited
        case 5: ctx.fillStyle = '#ff0'; break; // Path
      }
      
      // Draw cell
      ctx.fillRect(j * cellSize, i * cellSize, cellSize-1, cellSize-1);
    }
  }
}

// Initial draw
drawGrid();
```

### Step 3: Implement the A* Algorithm

Add the core A* implementation:

```javascript
// Node class for A*
class Node {
  constructor(position, parent = null) {
    this.position = position;
    this.parent = parent;
    this.g = 0;
    this.h = 0;
    this.f = 0;
  }
  
  equals(other) {
    return this.position[0] === other.position[0] && 
           this.position[1] === other.position[1];
  }
}

// Heuristic functions
const heuristics = {
  manhattan: (pos1, pos2) => {
    return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]);
  },
  euclidean: (pos1, pos2) => {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + 
      Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  diagonal: (pos1, pos2) => {
    const dx = Math.abs(pos1[0] - pos2[0]);
    const dy = Math.abs(pos1[1] - pos2[1]);
    return (dx + dy) + (Math.sqrt(2) - 2) * Math.min(dx, dy);
  }
};

// A* algorithm implementation
async function astar(start, goal, heuristicName = 'manhattan') {
  const heuristic = heuristics[heuristicName];
  const startNode = new Node(start);
  const goalNode = new Node(goal);
  
  const openList = [];
  const closedList = [];
  
  startNode.g = 0;
  startNode.h = heuristic(start, goal);
  startNode.f = startNode.h;
  
  openList.push(startNode);
  
  // Animation delay
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  while (openList.length > 0) {
    // Find node with lowest f value
    let currentIndex = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[currentIndex].f) {
        currentIndex = i;
      }
    }
    const currentNode = openList[currentIndex];
    
    // Remove from open list and add to closed list
    openList.splice(currentIndex, 1);
    closedList.push(currentNode);
    
    // Visualize
    if (!(currentNode.position[0] === start[0] && currentNode.position[1] === start[1]) &&
        !(currentNode.position[0] === goal[0] && currentNode.position[1] === goal[1])) {
      grid[currentNode.position[0]][currentNode.position[1]] = 4; // Visited
      drawGrid();
      await delay(50); // Animation delay
    }
    
    // Check if reached goal
    if (currentNode.position[0] === goal[0] && currentNode.position[1] === goal[1]) {
      // Reconstruct path
      let current = currentNode;
      while (current) {
        if (!(current.position[0] === start[0] && current.position[1] === start[1]) &&
            !(current.position[0] === goal[0] && current.position[1] === goal[1])) {
          grid[current.position[0]][current.position[1]] = 5; // Path
        }
        current = current.parent;
        drawGrid();
        await delay(100);
      }
      return true;
    }
    
    // Generate neighbors
    const neighbors = [];
    const movements = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // 4-direction movement
    
    for (const [dx, dy] of movements) {
      const newPosition = [
        currentNode.position[0] + dx,
        currentNode.position[1] + dy
      ];
      
      // Check if valid
      if (newPosition[0] < 0 || newPosition[0] >= gridSize || 
          newPosition[1] < 0 || newPosition[1] >= gridSize ||
          grid[newPosition[0]][newPosition[1]] === 1) { // Obstacle
        continue;
      }
      
      const newNode = new Node(newPosition, currentNode);
      neighbors.push(newNode);
    }
    
    // Process neighbors
    for (const neighbor of neighbors) {
      // Skip if in closed list
      if (closedList.some(node => node.equals(neighbor))) {
        continue;
      }
      
      // Calculate g, h, and f values
      neighbor.g = currentNode.g + 1;
      neighbor.h = heuristic(neighbor.position, goal);
      neighbor.f = neighbor.g + neighbor.h;
      
      // Skip if not better path
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
  }
  
  // No path found
  return false;
}
```

### Step 4: Add Interactivity

Finally, add event listeners for user interaction:

```javascript
// Add event listeners
document.getElementById('startBtn').addEventListener('click', () => {
  const heuristicSelect = document.getElementById('heuristicSelect');
  const heuristicName = heuristicSelect.value;
  astar(start, goal, heuristicName);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  // Reset grid to initial state (keeping obstacles)
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] !== 1) { // Keep obstacles
        grid[i][j] = 0;
      }
    }
  }
  grid[start[0]][start[1]] = 2;
  grid[goal[0]][goal[1]] = 3;
  drawGrid();
});

// Toggle obstacle placement mode
let placingObstacles = false;
document.getElementById('addObstacleBtn').addEventListener('click', () => {
  placingObstacles = !placingObstacles;
  document.getElementById('addObstacleBtn').textContent = 
    placingObstacles ? 'Done Adding' : 'Add Obstacles';
});

// Handle canvas clicks
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / cellSize);
  const y = Math.floor((event.clientY - rect.top) / cellSize);
  
  if (placingObstacles) {
    // Don't place obstacles on start or goal
    if ((y === start[0] && x === start[1]) || (y === goal[0] && x === goal[1])) {
      return;
    }
    
    // Toggle obstacle
    grid[y][x] = grid[y][x] === 1 ? 0 : 1;
    drawGrid();
  }
});
```

This simplified implementation gives you a working A* visualizer with:
- Multiple heuristic options
- The ability to add obstacles
- Step-by-step visualization of the search process
- Path reconstruction animation

## Experimentation Challenges 🔬

With your visualizer (or one of the online tools), try these experiments to deepen your understanding:

### 1. Heuristic Comparison

Set up the same maze multiple times and run A* with different heuristics. Record:
- How many nodes were explored before finding the path?
- Was the same path found each time?
- Which heuristic was fastest for this particular maze?

### 2. Maze Design Challenge

Create a maze specifically designed to trick a specific heuristic:
- Can you create a maze where Manhattan distance performs poorly?
- What about a maze where Euclidean distance is clearly superior?
- Is there a maze configuration where all heuristics perform equally?

### 3. Weight Exploration

If your visualizer supports it, experiment with weighted A*:
- Start with a weight of 1.0 (standard A*)
- Gradually increase to 1.5, 2.0, and beyond
- Observe how the path and exploration pattern changes
- Record the tradeoff between optimality and efficiency

### 4. Beyond the Grid

For advanced users, try extending your visualizer:
- Add support for diagonal movement
- Implement variable terrain costs
- Create a 3D visualization for a cube-based environment

## Discussion Questions 🤔

After experimenting with A* visualizations, consider these questions:

1. **Exploration Patterns**: How does the exploration pattern change between Dijkstra's algorithm, Greedy Best-First Search, and A*? What does this tell us about the strengths of each algorithm?

2. **Heuristic Impact**: When you switch between Manhattan and Euclidean distance, what changes do you observe in terms of nodes explored? Why does this happen?

3. **Path Quality**: In what situations might A* not find the absolute shortest path? How can you verify whether a path is truly optimal?

4. **Algorithm Efficiency**: Based on your visualizations, what seems to be the most computationally intensive part of A*? How might you optimize this?

5. **Real-World Applications**: How would the visualization of A* change if you were navigating a real-world map with varying terrain? What other factors would need to be visualized?

## Take It Further 🚀

Once you're comfortable with basic A* visualization, consider these advanced projects:

1. **Multi-Agent Pathfinding**: Visualize multiple agents finding paths simultaneously while avoiding collisions

2. **Dynamic Obstacles**: Create moving obstacles that force the algorithm to recalculate paths

3. **Hierarchical Pathfinding**: Implement and visualize a hierarchical version of A* that works on multiple levels of abstraction

4. **3D Visualization**: Extend your visualizer to work in 3D space, perhaps for a drone navigation scenario

5. **Learning Component**: Add a machine learning component that learns to predict good heuristics based on maze characteristics

## Conclusion

Visualization is an invaluable tool for understanding algorithms like A*. By seeing the algorithm in action—watching how it explores the space, makes decisions, and constructs paths—you gain insights that are difficult to obtain from text descriptions alone.

Whether you use online tools or build your own visualizer, take time to experiment with different parameters and configurations. This hands-on experience will solidify your understanding of A* and prepare you to apply it effectively in your own projects.

Remember: The best way to learn is to experiment, observe, and ask questions about what you see! 