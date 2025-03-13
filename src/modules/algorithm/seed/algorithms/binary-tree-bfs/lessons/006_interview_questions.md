---
title: BFS in Coding Interviews
---

# 🎯 BFS in Coding Interviews

> [!NOTE]
> In this lesson, we'll explore common interview questions that use BFS and strategies to solve them effectively.

## Common BFS Interview Questions 📝

BFS is a popular topic in coding interviews. Here are some common questions you might encounter:

### 1. Binary Tree Level Order Traversal 🌲

**Problem**: Given a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).

**Example**:
```
Input:
    3
   / \
  9  20
    /  \
   15   7

Output: [[3], [9, 20], [15, 7]]
```

**Solution**:
```javascript
function levelOrder(root) {
  if (!root) return [];
  
  const queue = [root];
  const result = [];
  
  while (queue.length) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(currentLevel);
  }
  
  return result;
}
```

### 2. Minimum Depth of Binary Tree 📏

**Problem**: Find the minimum depth of a binary tree (the number of nodes along the shortest path from the root node down to the nearest leaf node).

**Example**:
```
Input:
    3
   / \
  9  20
    /  \
   15   7

Output: 2
```

**Solution**:
```javascript
function minDepth(root) {
  if (!root) return 0;
  
  const queue = [{ node: root, depth: 1 }];
  
  while (queue.length) {
    const { node, depth } = queue.shift();
    
    // If we found a leaf node, return its depth
    if (!node.left && !node.right) {
      return depth;
    }
    
    if (node.left) queue.push({ node: node.left, depth: depth + 1 });
    if (node.right) queue.push({ node: node.right, depth: depth + 1 });
  }
  
  return 0;
}
```

### 3. Binary Tree Right Side View 👁️

**Problem**: Given a binary tree, imagine yourself standing on the right side of it. Return the values of the nodes you can see ordered from top to bottom.

**Example**:
```
Input:
    1
   / \
  2   3
   \   \
    5   4

Output: [1, 3, 4]
```

**Solution**:
```javascript
function rightSideView(root) {
  if (!root) return [];
  
  const queue = [root];
  const result = [];
  
  while (queue.length) {
    const levelSize = queue.length;
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      
      // If it's the last node in the current level, add it to the result
      if (i === levelSize - 1) {
        result.push(node.val);
      }
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  
  return result;
}
```

### 4. Zigzag Level Order Traversal ↗️↘️

**Problem**: Given a binary tree, return the zigzag level order traversal of its nodes' values (i.e., from left to right, then right to left for the next level and alternate between).

**Example**:
```
Input:
    3
   / \
  9  20
    /  \
   15   7

Output: [[3], [20, 9], [15, 7]]
```

**Solution**:
```javascript
function zigzagLevelOrder(root) {
  if (!root) return [];
  
  const queue = [root];
  const result = [];
  let leftToRight = true;
  
  while (queue.length) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      
      // Add to current level based on direction
      if (leftToRight) {
        currentLevel.push(node.val);
      } else {
        currentLevel.unshift(node.val);
      }
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(currentLevel);
    leftToRight = !leftToRight;  // Toggle direction for next level
  }
  
  return result;
}
```

## BFS in Graph Problems 🕸️

BFS is also commonly used for graph problems in interviews:

### 5. Word Ladder 🔤

**Problem**: Given two words (beginWord and endWord) and a dictionary, find the length of the shortest transformation sequence from beginWord to endWord, such that:
- Only one letter can be changed at a time.
- Each transformed word must exist in the word list.

**Example**:
```
Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]

Output: 5
Explanation: The shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog"
```

**Solution**:
```javascript
function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  
  // If endWord is not in the dictionary, return 0
  if (!wordSet.has(endWord)) return 0;
  
  const queue = [{ word: beginWord, level: 1 }];
  const visited = new Set([beginWord]);
  
  while (queue.length) {
    const { word, level } = queue.shift();
    
    // Try changing each character of the word
    for (let i = 0; i < word.length; i++) {
      // Try all possible characters
      for (let c = 97; c <= 122; c++) {
        const newChar = String.fromCharCode(c);
        const newWord = word.slice(0, i) + newChar + word.slice(i + 1);
        
        // If we found the end word, return the level + 1
        if (newWord === endWord) return level + 1;
        
        // If the new word is in the dictionary and not visited, add it to the queue
        if (wordSet.has(newWord) && !visited.has(newWord)) {
          visited.add(newWord);
          queue.push({ word: newWord, level: level + 1 });
        }
      }
    }
  }
  
  return 0;  // No transformation sequence found
}
```

### 6. Number of Islands 🏝️

**Problem**: Given a 2D grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

**Example**:
```
Input:
[
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
```

**Solution**:
```javascript
function numIslands(grid) {
  if (!grid || !grid.length) return 0;
  
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;
  
  // Helper function to perform BFS from a land cell
  function bfs(r, c) {
    const queue = [[r, c]];
    grid[r][c] = '0';  // Mark as visited
    
    // Directions: up, right, down, left
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    
    while (queue.length) {
      const [row, col] = queue.shift();
      
      // Check all four directions
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        
        // Check if the new position is valid and is land
        if (
          newRow >= 0 && newRow < rows &&
          newCol >= 0 && newCol < cols &&
          grid[newRow][newCol] === '1'
        ) {
          queue.push([newRow, newCol]);
          grid[newRow][newCol] = '0';  // Mark as visited
        }
      }
    }
  }
  
  // Iterate through the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        bfs(r, c);  // Perform BFS from this land cell
      }
    }
  }
  
  return count;
}
```

## Interview Strategies for BFS Problems 🧠

Here are some strategies to help you tackle BFS problems in interviews:

### 1. Identify When to Use BFS 🔍

BFS is ideal for:
- Level-order traversal of trees
- Finding the shortest path in unweighted graphs
- Problems that require processing nodes level by level

> [!TIP]
> If the problem involves finding the shortest path or distance, BFS is often the way to go!

### 2. Master the BFS Template 📋

Most BFS solutions follow this template:

```javascript
function bfs(start) {
  const queue = [start];
  const visited = new Set([start]);
  
  while (queue.length) {
    const current = queue.shift();
    
    // Process current node
    
    // Add unvisited neighbors to the queue
    for (const neighbor of getNeighbors(current)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```

### 3. Track Additional Information 📊

Depending on the problem, you might need to track:
- The level or depth of each node
- The path taken to reach each node
- Parent-child relationships

### 4. Handle Edge Cases ⚠️

Always consider:
- Empty trees or graphs
- Single-node trees
- Disconnected graphs
- Cycles in graphs (use a visited set)

### 5. Optimize Your Solution ⚡

Look for ways to optimize:
- Early termination when the goal is found
- Bidirectional BFS for faster path finding
- Using more efficient data structures

## Think About This 🧠

<details>
<summary>How would you modify BFS to find all nodes at a distance K from a target node in a binary tree?</summary>

This is a common interview question. Here's a solution:

```javascript
function distanceK(root, target, K) {
  // First, build a graph representation with parent pointers
  const graph = new Map();
  
  function buildGraph(node, parent) {
    if (!node) return;
    
    if (!graph.has(node.val)) {
      graph.set(node.val, []);
    }
    
    if (parent) {
      graph.get(node.val).push(parent.val);
      graph.get(parent.val).push(node.val);
    }
    
    buildGraph(node.left, node);
    buildGraph(node.right, node);
  }
  
  buildGraph(root, null);
  
  // Now perform BFS from the target node
  const queue = [{ node: target.val, distance: 0 }];
  const visited = new Set([target.val]);
  const result = [];
  
  while (queue.length) {
    const { node, distance } = queue.shift();
    
    if (distance === K) {
      result.push(node);
      continue;
    }
    
    for (const neighbor of graph.get(node)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({ node: neighbor, distance: distance + 1 });
      }
    }
  }
  
  return result;
}
```

This solution first builds an undirected graph representation of the tree, then performs BFS to find all nodes at distance K from the target.
</details>

In the next and final lesson, we'll summarize what we've learned and provide resources for further study! 