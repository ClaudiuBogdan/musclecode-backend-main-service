---
title: Recursive Implementation of BFS
---

# 🔁 Recursive Implementation of BFS

> [!NOTE]
> In this lesson, we'll explore an alternative recursive approach to implementing BFS.

## The Recursive Approach 🧩

While BFS is typically implemented iteratively with a queue, it can also be implemented recursively. The recursive approach is less common but provides an interesting alternative perspective on the algorithm.

> [!TIP]
> Understanding both iterative and recursive implementations deepens your grasp of the algorithm and expands your problem-solving toolkit.

## The Key Insight 💡

The key insight for a recursive BFS implementation is to:

1. Process all nodes at the current level
2. Collect all nodes for the next level
3. Recursively process the next level

Instead of using a queue to manage the traversal, we'll use recursion to process each level one at a time.

## Step-by-Step Implementation 📝

Let's break down the recursive implementation:

### Step 1: Handle Edge Cases ⚠️

First, we handle the empty tree case:

```javascript
function bfs(root) {
  if (!root) return [];
  
  // Rest of the implementation...
}
```

### Step 2: Create a Helper Function 🔧

We'll create a helper function that processes one level at a time:

```javascript
function bfs(root) {
  if (!root) return [];

  function helper(level) {
    // Implementation details...
  }
  
  return helper([root]);
}
```

### Step 3: Implement the Recursive Logic 🧠

The helper function will:
1. Process all nodes at the current level
2. Collect nodes for the next level
3. Recursively call itself with the next level

```javascript
function bfs(root) {
  if (!root) return [];

  function helper(level) {
    if (level.length === 0) return [];
    
    const nextLevel = [];
    const values = [];
    
    level.forEach((node) => {
      values.push(node.val);
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    });
    
    return values.concat(helper(nextLevel));
  }
  
  return helper([root]);
}
```

## The Complete Implementation 🏆

Here's the complete recursive implementation of BFS:

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
 * Recursively performs a breadth-first search (BFS) on a binary tree.
 *
 * @param {TreeNode|null} root - The root of the binary tree.
 * @returns {number[]} An array of values in level order.
 */
function bfs(root) {
  if (!root) return [];

  function helper(level) {
    if (level.length === 0) return [];
    const nextLevel = [];
    const values = [];
    level.forEach((node) => {
      values.push(node.val);
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    });
    return values.concat(helper(nextLevel));
  }

  return helper([root]);
}
```

## Tracing Through an Example 🔍

Let's trace through the recursive algorithm with a simple example:

```
    1
   / \
  2   3
 / \
4   5
```

<details>
<summary>Step-by-Step Execution</summary>

1. Call `bfs(root)` → `helper([1])`
2. Process level `[1]`:
   - `values = [1]`
   - `nextLevel = [2, 3]`
   - Return `[1].concat(helper([2, 3]))`
3. Process level `[2, 3]`:
   - `values = [2, 3]`
   - `nextLevel = [4, 5]`
   - Return `[2, 3].concat(helper([4, 5]))`
4. Process level `[4, 5]`:
   - `values = [4, 5]`
   - `nextLevel = []`
   - Return `[4, 5].concat(helper([]))`
5. Process level `[]`:
   - Return `[]`
6. Unwinding the recursion:
   - `[4, 5].concat([]) = [4, 5]`
   - `[2, 3].concat([4, 5]) = [2, 3, 4, 5]`
   - `[1].concat([2, 3, 4, 5]) = [1, 2, 3, 4, 5]`
7. Final result: `[1, 2, 3, 4, 5]`
</details>

## Comparing Iterative vs. Recursive Approaches 🔄

Let's compare the two approaches:

| Aspect | Iterative | Recursive |
|--------|-----------|-----------|
| **Readability** | More intuitive for BFS | Less common for BFS |
| **Memory Usage** | Uses a queue | Uses call stack |
| **Performance** | Generally faster | Potential stack overflow for deep trees |
| **Implementation** | Straightforward | More complex |

> [!WARNING]
> The recursive approach may cause stack overflow errors for very deep trees due to the call stack limitations.

## Time and Space Complexity ⏱️

- **Time Complexity**: O(n) where n is the number of nodes in the tree
  - Each node is processed exactly once

- **Space Complexity**: O(n) in the worst case
  - The recursive call stack and the arrays used to store levels and values

## Think About This 🧠

<details>
<summary>When might you prefer the recursive implementation over the iterative one?</summary>

You might prefer the recursive implementation when:

1. You want to clearly separate the logic for processing each level
2. You need to perform complex operations at each level that are easier to express recursively
3. You're working with a language that optimizes tail recursion
4. The tree is not very deep, so stack overflow is not a concern
5. You want to make the level-by-level nature of BFS more explicit in your code
</details>

In the next lesson, we'll explore practical applications and variations of the BFS algorithm! 