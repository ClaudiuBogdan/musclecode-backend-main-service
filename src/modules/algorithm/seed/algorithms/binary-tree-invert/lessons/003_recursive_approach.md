---
title: The Recursive Approach to Binary Tree Inversion
---

# 🔄 The Recursive Approach

> [!NOTE]
> In this lesson, we'll explore how to use recursion to elegantly solve the binary tree inversion problem.

## Why Recursion Works Well for Trees 🌲

Trees have a naturally recursive structure:
- A tree consists of a root node and subtrees
- Each subtree is itself a tree
- This pattern repeats all the way down to the leaf nodes

This recursive structure makes recursion a natural fit for tree problems!

## The Recursive Thought Process 🧠

When approaching the binary tree inversion problem recursively, we need to:

1. **Define the base case**: What's the simplest version of the problem?
2. **Define the recursive case**: How can we break down the problem?
3. **Combine the results**: How do we build the solution from the subproblems?

Let's walk through this process step by step.

## Step 1: Define the Base Case ⚓

The simplest version of our problem is when we have an empty tree (null node):

```javascript
if (!root) return null;
```

If the tree is empty, there's nothing to invert, so we simply return null.

## Step 2: Define the Recursive Case 🔁

For a non-empty tree, we need to:
1. Recursively invert the left subtree
2. Recursively invert the right subtree
3. Swap the inverted subtrees

```javascript
// Recursively invert left and right subtrees
const left = invertTree(root.left);
const right = invertTree(root.right);
```

> [!TIP]
> Trust the recursion! Assume that `invertTree()` correctly inverts any subtree you pass to it.

## Step 3: Combine the Results 🔀

After inverting the subtrees, we swap them:

```javascript
// Swap the children
root.left = right;
root.right = left;
```

Finally, we return the root of the inverted tree:

```javascript
return root;
```

## The Complete Recursive Solution 🏆

Putting it all together:

```javascript
function invertTree(root) {
  // Base case: empty tree
  if (!root) return null;
  
  // Recursively invert subtrees
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  
  // Swap the children
  root.left = right;
  root.right = left;
  
  // Return the inverted tree
  return root;
}
```

## Visualizing the Recursion 👁️

Let's trace through the execution of this algorithm on a simple tree:

<details>
<summary>Recursive Execution Trace</summary>

For the tree:
```
    2
   / \
  1   3
```

1. Call `invertTree(node_2)`
   - `node_2` is not null, so we proceed
   - Call `invertTree(node_1)` for the left subtree
     - `node_1` has no children, so we just return `node_1`
   - Call `invertTree(node_3)` for the right subtree
     - `node_3` has no children, so we just return `node_3`
   - Swap: `node_2.left = node_3` and `node_2.right = node_1`
   - Return `node_2` (the new root)

Result:
```
    2
   / \
  3   1
```

</details>

## Time and Space Complexity ⏱️

- **Time Complexity**: O(n), where n is the number of nodes in the tree
  - We visit each node exactly once

- **Space Complexity**: O(h), where h is the height of the tree
  - This represents the maximum depth of the recursion stack
  - In the worst case (a completely unbalanced tree), this becomes O(n)

## Advantages of the Recursive Approach ✅

- **Elegant and concise**: The code is clean and easy to understand
- **Follows the natural structure** of the problem
- **Less bookkeeping**: No need to maintain an explicit stack or queue

## Think About It 🤔

Before moving on, consider these questions:

1. What happens if we swap the children first, before making the recursive calls?
2. How would the recursion work on a more complex tree with multiple levels?
3. Can you trace the algorithm on a tree with 3 levels?

In the next lesson, we'll explore an alternative approach using iteration! 