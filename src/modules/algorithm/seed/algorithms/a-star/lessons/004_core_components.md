---
title: "The Core Components"
---
# The Core Components

## Building Blocks of A* 🧱

Before we dive into the algorithm itself, let's understand the key components that make A* work. Think of these as the tools and data structures that A* uses to find optimal paths.

## 1. The Search Space 🌐

The search space is the environment through which we're trying to find a path. This could be:

- A grid map (like in a 2D game)
- A road network (like in GPS navigation)
- A graph representing states in a puzzle

Each location or state in this space is called a **node**. 

In our grid example:
```
S . . # .
. # . . .
. # . # .
. . . # .
. # . . G
```
Each cell is a node that can be identified by its coordinates (row, column).

## 2. Open and Closed Lists 📋

A* maintains two lists to keep track of nodes:

### Open List (Frontier)

🔍 This contains nodes that have been discovered but not yet fully explored. These are the nodes A* is considering to explore next.

- The open list is typically implemented as a **priority queue**
- Nodes are sorted by their f-value (lowest f-value gets explored first)
- When we start, only the start node is in the open list

### Closed List (Explored)

✅ This contains nodes that have already been fully explored. We keep this list to avoid revisiting nodes.

- The closed list helps prevent cycles and redundant work
- A node moves from the open list to the closed list after all its neighbors have been examined

### Visualizing Open and Closed Lists

Let's visualize the open and closed lists after a few steps of A* on our example grid:

```
S → . → .  #  .
↓   #  ↑   .  .
.   #  .   #  .
.   .  .   #  .
.   #  .   .  G
```

After exploring nodes (0,0), (0,1), and (1,0):

```
Open List: [(0,2), (2,0)]
Closed List: [(0,0), (0,1), (1,0)]

Grid Visualization:
C C O # .    C = Closed List
C # . . .    O = Open List
O # . # .    . = Unexplored
. . . # .
. # . . G
```

## 3. Node Properties 📊

Each node in A* carries several important pieces of information:

### Position/State
The location or state this node represents.

### g-value: g(n)
The exact cost of the path from the start node to this node.

### h-value: h(n)
The estimated cost (heuristic) from this node to the goal.

### f-value: f(n)
The sum of g(n) and h(n), representing the estimated total path cost through this node.

### Parent Node
A reference to the node that led to this one, used to reconstruct the path once the goal is reached.

### Node Example

Let's examine the properties of node (0,2) in our grid:
```
Position: (0,2)
g-value: 2 (cost to reach from start: (0,0) → (0,1) → (0,2))
h-value: 6 (Manhattan distance to goal: |0-4| + |2-4| = 6)
f-value: 8 (g + h = 2 + 6)
Parent: Node (0,1)
```

## 4. Neighbors and Successors 🔄

For each node, A* needs to know which other nodes can be reached directly from it:

- In a grid, neighbors might be the adjacent cells (up, down, left, right, and possibly diagonals)
- In a graph, neighbors are nodes connected by edges
- Each connection may have a cost (e.g., moving diagonally might cost more than moving horizontally/vertically)

### Example Neighbor Generation

For a node at position (1,2) in our grid, the neighbors (assuming 4-directional movement) would be:
```
. . . . .
. . N . .    N = Potential neighbors
. N C N .    C = Current node (1,2)
. . N . .    # = Obstacle (not a valid neighbor)
. . . . .

Valid neighbors: (0,2), (1,1), (1,3), (2,2)
After filtering obstacles: (0,2), (1,3), (2,2)  (since (1,1) is an obstacle)
```

## 5. Path Reconstruction 🗺️

Once A* reaches the goal, it uses the parent references to trace back the path from the goal to the start.

### Path Reconstruction Visualization

```
Step 1: Start at the goal node G (4,4)
Step 2: Follow parent references backward
           ┌───┐
G → (4,3) → (3,3) → (2,3) → (2,2) → (1,2) → (0,2) → (0,1) → (0,0) → S
           └───┘

Final path: S → (0,1) → (0,2) → (1,2) → (2,2) → (2,3) → (3,3) → (4,3) → G
```

## Data Structure Efficiency 🚀

The choice of data structures significantly impacts A*'s performance:

### Priority Queue for the Open List

A priority queue allows us to efficiently find the node with the lowest f-value in O(log n) time instead of O(n) time with a regular list. This is critical because:

```
// With regular list (inefficient)
let bestNodeIndex = 0;
for (let i = 1; i < openList.length; i++) {
  if (openList[i].f < openList[bestNodeIndex].f) {
    bestNodeIndex = i;
  }
}
// Time complexity: O(n) for each node expanded

// With priority queue (efficient)
const nextNode = priorityQueue.extractMin();
// Time complexity: O(log n) for each node expanded
```

For complex pathfinding problems with thousands of nodes, this difference is dramatic!

### Hash Map for the Closed List

Using a hash map for the closed list enables O(1) lookups instead of O(n) linear searches:

```
// With array (inefficient)
function isInClosedList(node) {
  for (let i = 0; i < closedList.length; i++) {
    if (closedList[i].equals(node)) return true;
  }
  return false;
}
// Time complexity: O(n)

// With hash map (efficient)
function isInClosedList(node) {
  const key = `${node.position.x},${node.position.y}`;
  return closedMap.has(key);
}
// Time complexity: O(1)
```

## Connecting to Heuristics 🧩

Remember our discussion of heuristics from the previous lesson? Here's how they directly feed into A*'s decision-making process:

1. The **g-value** represents the actual path cost so far
2. The **h-value** is calculated using one of our heuristic functions (Manhattan, Euclidean, etc.)
3. The **f-value** combines these to prioritize which nodes to explore next

A* always selects the node with the lowest f-value from the open list, which means:
- Nodes with low g-values (close to the start) are favored by Dijkstra's approach
- Nodes with low h-values (close to the goal) are favored by the greedy approach
- A* naturally balances these priorities based on the situation

❓ **Think about it**: How might the data structure choices change if we were pathfinding in an extremely large game world with millions of nodes? What if memory was very limited?

In the next section, we'll walk through the actual steps of the A* algorithm and see how these components work together!