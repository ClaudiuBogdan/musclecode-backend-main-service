---
title: "The A* Algorithm Steps"
---
# The A* Algorithm Steps

## The A* Process: Step by Step 🚶‍♂️

Now that we understand the core components, let's walk through the A* algorithm step by step. This is where all the pieces come together!

## High-Level Overview 🔭

At a high level, A* performs the following actions:

1. Initialize the open and closed lists
2. Add the start node to the open list
3. While the open list is not empty:
   - Select the node with the lowest f-value from the open list
   - If this node is the goal, reconstruct and return the path
   - Otherwise, explore this node's neighbors
4. If the open list becomes empty without finding the goal, no path exists

Let's dive into each step in more detail with a simple example!

## Detailed Steps with Example 📝

Let's use this 5×5 grid as an example:

```
S . . # .   (Start: [0,0], Goal: [4,4])
. # . . .   (# are obstacles)
. # . # .
. . . # .
. # . . G
```

### Step 1: Initialization ⚙️

```
- Create an empty open list (priority queue)
- Create an empty closed list (set)
- Add the start node to the open list with:
  - g(start) = 0
  - h(start) = heuristic distance to goal
  - f(start) = g(start) + h(start)
  - parent = null
```

For our example, using Manhattan distance as the heuristic:
- Start node: [0,0]
- Goal node: [4,4]
- h(start) = |0-4| + |0-4| = 8
- f(start) = 0 + 8 = 8

Open list: [[0,0] (f=8)]
Closed list: []

### Step 2: Main Loop 🔄

While the open list is not empty:

#### 2.1. Select Current Node 👇

```
- Pop the node with the lowest f-value from the open list
- This becomes our current node
- Add the current node to the closed list
```

In our first iteration:
- Current node = [0,0] (f=8)
- Move [0,0] from open list to closed list

Open list: []
Closed list: [[0,0]]

#### 2.2. Check if Goal Reached 🏁

```
- If the current node is the goal node:
  - Reconstruct the path by following parent pointers
  - Return the path and exit
```

[0,0] is not the goal [4,4], so we continue.

#### 2.3. Explore Neighbors 🔍

```
- Get all viable neighbors of the current node
- For each neighbor:
  - If the neighbor is in the closed list:
    - Skip it
  - Calculate the tentative g-value: g(current) + cost to move to neighbor
  - If the neighbor is not in the open list:
    - Add it to the open list
  - Else if the tentative g-value is better than the neighbor's current g-value:
    - Update the neighbor's g-value and parent
```

For [0,0], the neighbors are [0,1] and [1,0] (assuming we can only move horizontally and vertically).

For [0,1]:
- g = 0 + 1 = 1 (cost of 1 to move one step)
- h = |0-4| + |1-4| = 7
- f = 1 + 7 = 8
- parent = [0,0]

For [1,0]:
- g = 0 + 1 = 1
- h = |1-4| + |0-4| = 7
- f = 1 + 7 = 8
- parent = [0,0]

Open list: [[0,1] (f=8), [1,0] (f=8)]
Closed list: [[0,0]]

### Step 3: Continue the Process 🔄

Let's continue for a few more iterations:

#### Iteration 2:
- Current node = [0,1] (f=8) (arbitrary tiebreaker since both [0,1] and [1,0] have f=8)
- Neighbors: [0,2], [1,1]
- [1,1] has an obstacle, so we skip it
- [0,2]: g=2, h=6, f=8, parent=[0,1]

Open list: [[1,0] (f=8), [0,2] (f=8)]
Closed list: [[0,0], [0,1]]

#### Iteration 3:
- Current node = [1,0] (f=8)
- Neighbors: [2,0] (since [1,1] is an obstacle and [0,0] is in closed list)
- [2,0]: g=2, h=6, f=8, parent=[1,0]

Open list: [[0,2] (f=8), [2,0] (f=8)]
Closed list: [[0,0], [0,1], [1,0]]

And we continue this process, always selecting the node with the lowest f-value, until we either:
1. Reach the goal node [4,4], or
2. Empty the open list, indicating no path exists

### Step 4: Path Reconstruction 🧩

Once we reach the goal, we follow the parent pointers backward to reconstruct the path:

```
path = []
current = goal
while current != null:
    add current to the beginning of path
    current = current.parent
return path
```

## Visual Progress 👁️

Here's a visualization of how A* might explore the grid (numbers show the order of exploration):

```
1→2→3  #  .
↓  #  .  .  .
4→5  #  .  .
↓  .  .  #  .
.  #  . →6→7
```

The final path could look like:
```
*  .  .  #  .
*  #  .  .  .
*  #  .  #  .
*→*→*  #  .
.  #  *→*→*
```

## Key Observations 🔑

1. A* always expands the node with the lowest f-value first
2. The algorithm naturally balances "what we know" (g-value) with "what we estimate" (h-value)
3. With an admissible heuristic, A* guarantees the optimal path

💭 **Think about it**: What would happen if we used a heuristic that always returned 0? What about if we used a very large heuristic value?

In the next section, we'll look at implementation details and code examples to bring A* to life!