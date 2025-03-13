---
title: "Understanding Heuristics"
---
# Understanding Heuristics

## What is a Heuristic? 🧠

A heuristic is essentially an educated guess or a rule of thumb that helps us make decisions when we don't have perfect information. In the context of A*, a heuristic is a function that estimates the distance from any node to the goal.

Think of a heuristic as your "intuition" about which path looks most promising! 🔮

## The Role of Heuristics in A* 🛣️

The A* algorithm uses a combination of two values to decide which path to explore next:

1. **g(n)**: The exact cost of the path from the start node to the current node n
2. **h(n)**: The heuristic estimate of the cost from the current node n to the goal

The total evaluation function is:
**f(n) = g(n) + h(n)**

This is the genius of A*! It balances what we know for sure (the path so far) with what we're estimating (the remaining path).

## Common A* Heuristics 📏

Depending on your problem, different heuristics might be appropriate:

### 1. Manhattan Distance

```
h(n) = |x₁ - x₂| + |y₁ - y₂|
```

👣 This is the sum of horizontal and vertical distances (like walking in a city with a grid layout).

![Manhattan Distance](https://preview.redd.it/manhattan-distance-l-1-norm-v0-a27qbv0ljnqa1.png?width=1080&format=png&auto=webp&s=2d0e825d4f61dbe70b7cb7da33cc3a9bd3e0429e)

Best for: Grid-based environments where movement is restricted to four directions (up, down, left, right).

### 2. Euclidean Distance

```
h(n) = √[(x₁ - x₂)² + (y₁ - y₂)²]
```

🧵 This is the straight-line distance (as the crow flies).

![Euclidean Distance](https://miro.medium.com/v2/resize:fit:1400/1*tWaJLQ9wjjgrcRqMv4zG9A.png)

Best for: Environments where movement can be in any direction.

### 3. Diagonal Distance

```
h(n) = max(|x₁ - x₂|, |y₁ - y₂|) + (√2 - 1) × min(|x₁ - x₂|, |y₁ - y₂|)
```

↗️ This accounts for diagonal movement costs.

Best for: Grid-based environments where diagonal movement is allowed.

## Properties of a Good Heuristic 🌟

For A* to work effectively, the heuristic should be:

### 1. Admissible

A heuristic is admissible if it never overestimates the actual cost to reach the goal. This property ensures that A* will find the optimal path.

For example, straight-line distance is admissible because you can't reach the goal in less distance than a straight line (assuming no teleportation!).

### 2. Consistent (or Monotonic)

A heuristic is consistent if, for every node n and its successor m:
```
h(n) ≤ cost(n, m) + h(m)
```

This means the estimated cost to the goal from node n is no greater than the cost to go from n to any neighbor m plus the estimated cost to the goal from m.

Consistency implies admissibility and makes A* more efficient.

## The Impact of Heuristic Choice 🎯

The choice of heuristic greatly affects A*'s performance:

- **Weak heuristic (h(n) ≈ 0)**: A* behaves like Dijkstra's algorithm, exploring in all directions.
- **Perfect heuristic (h(n) = exact cost)**: A* would directly follow the optimal path without exploring unnecessary nodes.
- **Inadmissible heuristic (h(n) > actual cost)**: A* might find a suboptimal path but could run faster.

### Visual Comparison

![Heuristic Comparison](https://upload.wikimedia.org/wikipedia/commons/5/5d/Astar_progress_animation.gif)

In this animation, you can see how different heuristics affect which nodes A* explores.

💭 **Think about it**: In our grid example from earlier, if diagonal movement isn't allowed, which heuristic would be most appropriate? Why?

In the next section, we'll explore the core components that make up the A* algorithm!
