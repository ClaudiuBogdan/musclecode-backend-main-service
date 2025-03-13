---
title: Iterative Implementation of BFS
---

# 🔄 Iterative Implementation of BFS

> [!NOTE]
> In this lesson, we'll implement BFS using an iterative approach with a queue.

## The Iterative Approach 🛠️

The most common and intuitive way to implement BFS is using an iterative approach with a queue. This method closely mirrors how we conceptually think about BFS: processing nodes level by level.

## Step-by-Step Implementation 📝

Let's break down the implementation into clear steps:

### Step 1: Handle Edge Cases ⚠️

First, we need to handle the edge case where the tree is empty:

```javascript
function bfs(root) {
  if (!root) return [];
  
  // Rest of the implementation...
}
```

> [!TIP]
> Always handle edge cases first! This makes your code more robust and prevents unexpected errors.

### Step 2: Initialize the Queue and Result Array 🏁

Next, we initialize a queue with the root node and create an empty array to store our results:

```javascript
function bfs(root) {
  if (!root) return [];
  
  const queue = [root];
  const result = [];
  
  // Rest of the implementation...
}
```

### Step 3: Process Nodes Level by Level 🔄

Now comes the core of the algorithm. We'll continue processing nodes as long as there are nodes in the queue:

```javascript
function bfs(root) {
  if (!root) return [];
  
  const queue = [root];
  const result = [];
  
  while (queue.length) {
    const node = queue.shift();  // Dequeue the front node
    result.push(node.val);       // Process the node
    
    // Enqueue the children
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  
  return result;
}
```

## The Complete Implementation 🏆

Here's the complete iterative implementation of BFS:

```javascript
/**
 * Represents a node in a binary tree.
 * @constructor
 * @param {number} val - The node's value.
 * @param {TreeNode|null} [left=null] - Left child.
 * @param {TreeNode|null} [right=null] - Right child.
 */
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

/**
 * Iteratively performs a breadth-first search (BFS) traversal on a binary tree.
 *
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[]} An array of values in level order.
 */
function bfs(root) {
  if (!root) return [];
  const queue = [root];
  const result = [];
  while (queue.length) {
    const node = queue.shift();
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}
```

## Tracing Through an Example 🔍

Let's trace through the algorithm with a simple example:

```
    1
   / \
  2   3
 / \
4   5
```

<details>
<summary>Step-by-Step Execution</summary>

1. Initialize: `queue = [1]`, `result = []`
2. Iteration 1:
   - Dequeue: `node = 1`, `queue = []`
   - Process: `result = [1]`
   - Enqueue children: `queue = [2, 3]`
3. Iteration 2:
   - Dequeue: `node = 2`, `queue = [3]`
   - Process: `result = [1, 2]`
   - Enqueue children: `queue = [3, 4, 5]`
4. Iteration 3:
   - Dequeue: `node = 3`, `queue = [4, 5]`
   - Process: `result = [1, 2, 3]`
   - No children to enqueue: `queue = [4, 5]`
5. Iteration 4:
   - Dequeue: `node = 4`, `queue = [5]`
   - Process: `result = [1, 2, 3, 4]`
   - No children to enqueue: `queue = [5]`
6. Iteration 5:
   - Dequeue: `node = 5`, `queue = []`
   - Process: `result = [1, 2, 3, 4, 5]`
   - No children to enqueue: `queue = []`
7. Queue is empty, return `result = [1, 2, 3, 4, 5]`
</details>

## Time and Space Complexity ⏱️

Let's analyze the efficiency of our implementation:

- **Time Complexity**: O(n) where n is the number of nodes in the tree
  - Each node is processed exactly once

- **Space Complexity**: O(n) in the worst case
  - The queue might contain up to n/2 nodes at its maximum size (the largest level in a binary tree can have up to n/2 nodes)

> [!WARNING]
> For very wide trees, the queue can grow quite large, potentially causing memory issues.

## Common Pitfalls to Avoid ⚠️

1. **Forgetting to check for null nodes**: Always check if a node exists before accessing its properties.
2. **Using a stack instead of a queue**: This would result in depth-first search, not breadth-first search.
3. **Not handling the empty tree case**: Always check if the root is null before proceeding.

## Think About This 🧠

<details>
<summary>How would you modify this algorithm to return the nodes grouped by level?</summary>

You could modify the algorithm to keep track of the current level:

```javascript
function levelOrderTraversal(root) {
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

This would return: `[[1], [2, 3], [4, 5]]` for the example tree.
</details>

In the next lesson, we'll explore an alternative recursive implementation of BFS! 