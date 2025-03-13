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

## 4. Neighbors and Successors 🔄

For each node, A* needs to know which other nodes can be reached directly from it:

- In a grid, neighbors might be the adjacent cells (up, down, left, right, and possibly diagonals)
- In a graph, neighbors are nodes connected by edges
- Each connection may have a cost (e.g., moving diagonally might cost more than moving horizontally/vertically)

## 5. Path Reconstruction 🗺️

Once A* reaches the goal, it uses the parent references to trace back the path from the goal to the start.

![Path Reconstruction](https://assets.interviewbit.com/assets/skill_interview_questions/data-structures/path-finding/path-reconstruction-animation-c3c65e39e15c1e70063f30c05ba9b0a00a77f4d5b3a6b0bbde3a73bf8c13af28.gif)

## Visual Representation

Here's how we might visualize these components during execution:

```
Open List:   [B (f=8), C (f=10), D (f=12)]  // Sorted by f-value
Closed List: [A, E, F]

Current State:
A  B  C
D  E  F
G  H  I

Where:
- 'A' is the start node
- 'I' is the goal node
- Node 'E' is being explored
- Bold nodes are in the closed list
- Italicized nodes are in the open list
```

💡 **Tip**: When implementing A*, it's helpful to use efficient data structures:
- A min-heap or priority queue for the open list
- A hash set or hash map for the closed list

❓ **Think about it**: Why might a priority queue be more efficient than a regular list for the open list? What operations need to be fast for A* to work efficiently?

In the next section, we'll walk through the actual steps of the A* algorithm and see how these components work together!