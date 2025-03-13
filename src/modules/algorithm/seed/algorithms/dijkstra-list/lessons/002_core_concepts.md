---
title: Core Concepts of Dijkstra's Algorithm
---

# 🧠 Core Concepts of Dijkstra's Algorithm

Before diving into the step-by-step implementation, let's understand the key principles that make Dijkstra's algorithm work.

## 💡 Fundamental Principles

Dijkstra's algorithm is built on several powerful concepts:

### 1. Greedy Choice Property

> [!NOTE]
> At each step, Dijkstra's algorithm makes the locally optimal choice by selecting the node with the smallest known distance from the source.

This greedy approach works because of a key property of shortest paths: **if the shortest path from S to T passes through node X, then the portion from S to X must also be a shortest path**.

### 2. Progressive Certainty

As the algorithm runs, it divides nodes into two categories:
- **Settled nodes**: Nodes whose shortest distance from the source is definitively known
- **Unsettled nodes**: Nodes whose distance might still be improved

Once a node becomes "settled," its shortest distance will never change again!

### 3. Edge Relaxation

![Edge Relaxation Process](https://i.imgur.com/7BzKxcF.png)

**Edge relaxation** is the process of updating the tentative distance to a node if we find a shorter path:

```
if (distance[current] + weight(current, neighbor) < distance[neighbor]):
    distance[neighbor] = distance[current] + weight(current, neighbor)
```

This operation is called "relaxation" because it's like relaxing a constraint, allowing the estimated distance to get closer to the true shortest distance.

## 🔑 Data Structures

Dijkstra's algorithm relies on two main data structures:

1. **Distance Array/Map**: Stores the current shortest known distance from the source to each node
2. **Priority Queue**: Efficiently selects the unvisited node with the smallest tentative distance

> [!TIP]
> The choice of priority queue implementation greatly affects performance! A binary heap implementation gives us O((V + E) log V) time complexity, where V is the number of vertices and E is the number of edges.

## 🧮 The Algorithm at a Glance

1. Initialize distances: source = 0, all others = infinity
2. Add source node to the priority queue
3. While the queue is not empty:
   - Extract the node with minimum distance
   - For each neighbor of this node:
     - Calculate potential new distance
     - If new distance is shorter, update the distance and add to queue

## 🤔 Thought Exercise

<details>
<summary>Why does Dijkstra's algorithm fail with negative edge weights?</summary>

With negative weights, a longer path (with more edges) might actually result in a shorter total distance. Dijkstra's algorithm assumes that once a node is marked as "settled," we've found the shortest path to it. With negative weights, this assumption breaks down because we might find a better path later.

For negative weights, we need to use alternatives like the Bellman-Ford algorithm.
</details>

## 🎯 Key Takeaways

- Dijkstra's algorithm uses a greedy approach that works because of the non-negative weight requirement
- The algorithm progressively builds certainty about shortest paths
- Edge relaxation is the core operation that updates distances
- A priority queue is essential for efficiently selecting the next node to process

In the next lesson, we'll start implementing Dijkstra's algorithm step by step! 