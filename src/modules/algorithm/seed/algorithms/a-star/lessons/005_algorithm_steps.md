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

| State After Initialization |
|---------------------------|
| Open list: [[0,0] (f=8)]  |
| Closed list: []           |

Visualization:
```
[S] . . # .   [S] = Start node (in open list)
 .  # . . .    #  = Obstacle
 .  # . # .    .  = Unexplored space
 .  . . # .    G  = Goal
 .  # . . G
```

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

| State After Selection |
|------------------------|
| Open list: []          |
| Closed list: [[0,0]]   |
| Current: [0,0]         |

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

| Neighbor Analysis for [0,0] |
|----------------------------|
| Neighbor | g | h | f | Parent |
|-----------|---|---|---|--------|
| [0,1]    | 1 | 7 | 8 | [0,0]  |
| [1,0]    | 1 | 7 | 8 | [0,0]  |

| State After Exploration |
|-------------------------|
| Open list: [[0,1] (f=8), [1,0] (f=8)] |
| Closed list: [[0,0]] |

Visualization:
```
{S} 1  . # .   {S} = Node in closed list
 2  # . . .     1,2 = Nodes in open list with their order
 .  # . # .     → = Parent relationship
 .  . . # .
 .  # . . G
```

### Step 3: Handling Ties in F-Values 🎲

Notice that both [0,1] and [1,0] have the same f-value (8). In such cases, we need a tie-breaking strategy. Common approaches include:

1. **First-In, First-Out (FIFO)**: Choose the node that entered the open list first
2. **Last-In, First-Out (LIFO)**: Choose the node that entered the open list most recently
3. **Prefer lower h-value**: Choose the node that's estimated to be closer to the goal
4. **Prefer higher g-value**: Choose the node that's farther along a path
5. **Direction bias**: Add a tiny bias based on the direction of movement

For this example, we'll use the "prefer lower h-value" strategy (though in this case both have equal h-values, so we'll arbitrarily choose [0,1]).

#### Iteration 2:
- Current node = [0,1] (f=8)
- Neighbors: [0,2], [1,1]
- [1,1] has an obstacle, so we skip it
- [0,2]: g=2, h=6, f=8, parent=[0,1]

| State After Iteration 2 |
|-------------------------|
| Open list: [[1,0] (f=8), [0,2] (f=8)] |
| Closed list: [[0,0], [0,1]] |

Visualization:
```
{S}{1} 3  # .   {S},{1} = Nodes in closed list
 2   #  . . .    2,3 = Nodes in open list
 .   #  . # .
 .   .  . # .
 .   #  . . G
```

#### Iteration 3:
- Current node = [1,0] (f=8)
- Neighbors: [2,0] (since [1,1] is an obstacle and [0,0] is in closed list)
- [2,0]: g=2, h=6, f=8, parent=[1,0]

| State After Iteration 3 |
|-------------------------|
| Open list: [[0,2] (f=8), [2,0] (f=8)] |
| Closed list: [[0,0], [0,1], [1,0]] |

## Interactive Exercise: Your Turn to Trace! ✏️

Now it's your turn! Based on what we've covered so far, try to determine:

1. Which node will be selected next from the open list?
2. What are its neighbors?
3. What are the f, g, and h values for each neighbor?
4. What is the state of the open and closed lists after this iteration?

Take a moment to work this out before checking the answer below.

<details>
<summary>Click to see the answer</summary>

#### Iteration 4:
- Current node = [0,2] (f=8)
- Neighbors: [0,3] is an obstacle, so we skip it
- Other neighbors: [1,2]
- [1,2]: g=3, h=5, f=8, parent=[0,2]

| State After Your Iteration |
|---------------------------|
| Open list: [[2,0] (f=8), [1,2] (f=8)] |
| Closed list: [[0,0], [0,1], [1,0], [0,2]] |

Visualization:
```
{S}{1}{4} # .
{3} #  5  . .
 2  #  . # .
 .  .  . # .
 .  #  . . G
```
</details>

## Continuing the Process 🔄

The algorithm continues in this manner, always selecting the node with the lowest f-value, exploring its neighbors, and updating the open and closed lists accordingly.

As A* progresses through the grid, it may seem like it's taking a meandering path, but it's actually exploring the most promising routes first, based on the combination of known path cost (g) and estimated remaining cost (h).

To visualize the full execution, here's a table showing several more iterations:

| Iteration | Current Node | Neighbors | Updates to Open List | Closed List |
|-----------|--------------|------------|---------------------|------------|
| 5 | [2,0] (f=8) | [3,0] | Add [3,0] (g=3, h=5, f=8) | Add [2,0] |
| 6 | [1,2] (f=8) | [1,3], [2,2] | Add [1,3] (f=8), [2,2] (f=8) | Add [1,2] |
| 7 | [3,0] (f=8) | [3,1], [4,0] | Add [3,1] (f=8), [4,0] (f=8) | Add [3,0] |
| 8 | [1,3] (f=8) | [0,3] is obstacle, [2,3] | Add [2,3] (f=8) | Add [1,3] |
| ... | ... | ... | ... | ... |

## Path Reconstruction 🧩

Once we reach the goal node [4,4], we follow the parent pointers backward to reconstruct the path:

```
Goal [4,4] → parent [4,3] → parent [3,3] → ... → parent [0,0] Start
```

Then we reverse this to get the path from start to goal:
```
Start [0,0] → [0,1] → [0,2] → [1,2] → [2,2] → [2,3] → [3,3] → [4,3] → [4,4] Goal
```

Visual representation of the final path:
```
*→*→*  #  .    * = Path
↓  #  *  .  .
↓  #  *→*  .
↓  .  .  #  .
.  #  .  *→*
```

## Key Observations 🔑

1. A* always expands the node with the lowest f-value first
2. The algorithm naturally balances "what we know" (g-value) with "what we estimate" (h-value)
3. With an admissible heuristic, A* guarantees the optimal path
4. Tie-breaking strategies can significantly affect performance but not optimality

## Effect of Different Heuristics 🔮

If we used a zero heuristic (h(n) = 0), A* would explore in all directions like Dijkstra's algorithm:
```
1→2→3→ ... →19
↓         ↑
20→21→...→36
```

If we used a very large heuristic (much larger than the actual cost), A* would behave like greedy best-first search, potentially finding suboptimal paths:
```
1→2→3  #  .
↓  #  .  .  .
↓  #  .  #  .
↓  .  .  #  .
4→5→6→7→8
```

In the next section, we'll look at implementation details and code examples to bring A* to life!