---
title: Understanding the Problem - Binary Tree BFS
---

# 🌳 Binary Tree Breadth-First Search (BFS)

> [!NOTE]
> In this lesson, we'll understand what Binary Tree BFS is and why it's important.

## What is Breadth-First Search? 🤔

Breadth-First Search (BFS) is a tree/graph traversal algorithm that explores nodes **level-by-level**, starting from the root node and moving downward. Unlike depth-first search which explores as far as possible along each branch before backtracking, BFS traverses the tree horizontally, visiting all nodes at the current depth before moving to nodes at the next depth level.

Think of it like exploring a family tree generation by generation, rather than following one family line all the way down.

## The Challenge 🎯

Given a binary tree, implement a function to traverse it in level order using the Breadth-First Search algorithm. The function should return an array containing the values of all nodes in the order they were visited.

### Example 1

```
Input: 
    1
   / \
  2   3
 / \   \
4   5   6

Output: [1, 2, 3, 4, 5, 6]
```

_Explanation: The nodes are visited level by level from top to bottom and left to right._

### Example 2

```
Input: 
    1
     \
      2
     /
    3

Output: [1, 2, 3]
```

_Explanation: Each level is traversed from left to right before moving to the next level._

## Why is BFS Important? 💡

BFS is a fundamental algorithm with many real-world applications:

- 🔍 Finding the shortest path in unweighted graphs
- 🌐 Web crawling to discover pages level by level
- 🧩 Solving puzzles where the shortest solution is desired
- 🔄 Level-order processing in hierarchical structures
- 🤝 Social network analysis (finding friends within a certain number of connections)

> [!TIP]
> BFS is particularly useful when you need to find the shortest path between two points in an unweighted graph or when you need to process nodes level by level.

## What's Coming Next? 🚀

In the upcoming lessons, we'll break down the BFS algorithm step by step, understand its implementation, analyze its efficiency, and explore its applications. By the end, you'll have a deep understanding of how BFS works and when to use it.

<details>
<summary>🤔 Think About This</summary>

Before moving on, consider these questions:
- How would you manually perform a BFS on a simple binary tree?
- What data structure might be useful for implementing BFS?
- How is BFS different from depth-first search (DFS)?

We'll address these questions in the upcoming lessons!
</details> 