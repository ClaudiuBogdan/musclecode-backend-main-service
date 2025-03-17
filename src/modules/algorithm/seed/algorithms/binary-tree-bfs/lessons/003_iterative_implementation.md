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
  if (!root) return [];           // Handle empty tree case
  const queue = [root];           // Initialize queue with root
  const result = [];              // Initialize result array
  while (queue.length) {          // Continue until queue is empty
    const node = queue.shift();   // Dequeue front node
    result.push(node.val);        // Add current node's value to result
    if (node.left) queue.push(node.left);    // Enqueue left child if exists
    if (node.right) queue.push(node.right);  // Enqueue right child if exists
  }
  return result;                  // Return the final traversal result
}
```

## Implementations in Other Languages 🌍

<details>
<summary>Python Implementation</summary>

```python
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def bfs(root):
    if not root:
        return []
        
    queue = deque([root])
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node.val)
        
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
            
    return result
```
</details>

<details>
<summary>Java Implementation</summary>

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class BinaryTreeBFS {
    public static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        
        TreeNode() {}
        TreeNode(int val) { this.val = val; }
        TreeNode(int val, TreeNode left, TreeNode right) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }
    
    public static List<Integer> bfs(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            result.add(node.val);
            
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        
        return result;
    }
}
```
</details>

## Visual Execution Trace 👁️

Let's trace through the algorithm with our example tree:

```mermaid
graph TD;
    1((1)) --> 2((2))
    1 --> 3((3))
    2 --> 4((4))
    2 --> 5((5))
    3 -->|""|x((""))
    3 --> 6((6))
    
    classDef empty fill:#fff,stroke:#fff,stroke-width:0px;
    class x empty;
```

| Step | Current Node | Queue State | Result Array | Visualization |
|------|--------------|-------------|--------------|---------------|
| Initial | - | [1] | [] | ![Initial state](https://via.placeholder.com/150) |
| 1 | 1 | [2, 3] | [1] | ![Step 1](https://via.placeholder.com/150) |
| 2 | 2 | [3, 4, 5] | [1, 2] | ![Step 2](https://via.placeholder.com/150) |
| 3 | 3 | [4, 5, 6] | [1, 2, 3] | ![Step 3](https://via.placeholder.com/150) |
| 4 | 4 | [5, 6] | [1, 2, 3, 4] | ![Step 4](https://via.placeholder.com/150) |
| 5 | 5 | [6] | [1, 2, 3, 4, 5] | ![Step 5](https://via.placeholder.com/150) |
| 6 | 6 | [] | [1, 2, 3, 4, 5, 6] | ![Step 6](https://via.placeholder.com/150) |

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
   - Enqueue child: `queue = [4, 5, 6]`
5. Iteration 4:
   - Dequeue: `node = 4`, `queue = [5, 6]`
   - Process: `result = [1, 2, 3, 4]`
   - No children to enqueue: `queue = [5, 6]`
6. Iteration 5:
   - Dequeue: `node = 5`, `queue = [6]`
   - Process: `result = [1, 2, 3, 4, 5]`
   - No children to enqueue: `queue = [6]`
7. Iteration 6:
   - Dequeue: `node = 6`, `queue = []`
   - Process: `result = [1, 2, 3, 4, 5, 6]`
   - No children to enqueue: `queue = []`
8. Queue is empty, return `result = [1, 2, 3, 4, 5, 6]`
</details>

## Time and Space Complexity ⏱️

Let's analyze the efficiency of our implementation:

- **Time Complexity**: O(n) where n is the number of nodes in the tree
  - Each node is visited and processed exactly once
  - Each edge is traversed exactly once

- **Space Complexity**: O(n) in the worst case
  - The queue might contain up to n/2 nodes at its maximum size (the largest level in a binary tree can have up to n/2 nodes)
  - The result array stores all n node values

```mermaid
graph LR;
    A[Time Complexity] --> B[O(n)]
    C[Space Complexity] --> D[O(n)]
    B --> E[Each node visited once]
    D --> F[Queue and result array]
```

> [!WARNING]
> For very wide trees, the queue can grow quite large, potentially causing memory issues.

## Common Pitfalls to Avoid ⚠️

1. **Forgetting to check for null nodes**: Always check if a node exists before accessing its properties.
   ```javascript
   // Wrong
   queue.push(node.left);  // Might cause error if node.left is null
   
   // Correct
   if (node.left) queue.push(node.left);
   ```

2. **Using a stack instead of a queue**: This would result in depth-first search, not breadth-first search.
   ```javascript
   // BFS uses queue (shift/push)
   const node = queue.shift();  // Dequeue from front
   
   // DFS would use stack (pop/push)
   const node = queue.pop();  // Would take from back!
   ```

3. **Not handling the empty tree case**: Always check if the root is null before proceeding.
   ```javascript
   // Don't forget this check!
   if (!root) return [];
   ```

4. **Inefficient queue operations**: In some languages, array-based queue operations can be inefficient.
   ```javascript
   // JavaScript: shift() is O(n) - slow for large arrays
   // Better to use a dedicated queue implementation for large trees
   ```

## Practice Exercise: Level Grouping 🏋️‍♀️

Try modifying the BFS algorithm to return nodes grouped by level:

<details>
<summary>Problem Description</summary>

Instead of returning a flat array like `[1, 2, 3, 4, 5, 6]`, return an array of arrays where each inner array represents one level: `[[1], [2, 3], [4, 5, 6]]`.
</details>

<details>
<summary>Solution Hint</summary>

You'll need to keep track of how many nodes are in each level as you process them.
</details>

<details>
<summary>Complete Solution</summary>

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

This solution works by:
1. Processing the queue one level at a time
2. Using `levelSize` to know how many nodes are in the current level
3. Creating a new array for each level's values
4. Adding all children to the queue for the next level
</details>

## Knowledge Check ✅

<details>
<summary>Why do we use queue.shift() instead of queue.pop() in the BFS implementation?</summary>

We use `queue.shift()` to remove elements from the front of the queue, which follows the First-In-First-Out (FIFO) principle essential for BFS. 

Using `queue.pop()` would remove elements from the end of the queue, following a Last-In-First-Out (LIFO) principle, which would implement Depth-First Search (DFS) instead.
</details>

<details>
<summary>What would happen if we enqueued the right child before the left child?</summary>

If we enqueued the right child before the left child:
```javascript
if (node.right) queue.push(node.right);
if (node.left) queue.push(node.left);
```

The traversal would still be breadth-first, but within each level, nodes would be visited from right to left instead of left to right.

For our example tree, the traversal would be: [1, 3, 2, 6, 5, 4]
</details>

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

This would return: `[[1], [2, 3], [4, 5, 6]]` for the example tree.
</details>

In the next lesson, we'll explore an alternative recursive implementation of BFS! 