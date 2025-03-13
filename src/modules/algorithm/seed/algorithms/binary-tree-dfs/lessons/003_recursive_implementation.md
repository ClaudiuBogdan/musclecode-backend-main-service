---
title: Recursive Implementation of DFS
---

# 🔄 Recursive Implementation of DFS

## The Power of Recursion

Recursion is a natural fit for tree traversal because trees themselves are recursive structures. Each node in a tree can be viewed as the root of its own subtree.

> [!NOTE]
> Recursion allows us to express complex tree traversal logic in just a few lines of code!

## 🧩 The Building Blocks

Before we dive into the code, let's understand the structure of our binary tree:

```javascript
// A binary tree node
{
  val: 42,        // The value stored in this node
  left: {...},    // Reference to the left child (or null)
  right: {...}    // Reference to the right child (or null)
}
```

## 📝 Pre-order DFS Implementation

Here's how we implement pre-order DFS recursively:

```javascript
function binaryTreeDFS(root) {
  const result = [];
  
  function dfs(node) {
    // Base case: if node is null, return
    if (!node) return;
    
    // 1. Process current node (pre-order)
    result.push(node.val);
    
    // 2. Recursively process left subtree
    dfs(node.left);
    
    // 3. Recursively process right subtree
    dfs(node.right);
  }
  
  dfs(root);
  return result;
}
```

> [!TIP]
> The order of these three operations determines the traversal type. For pre-order, we process the node first, then left, then right.

## 🔍 How It Works: Step by Step

Let's trace through this algorithm with a simple tree:

```
    A
   / \
  B   C
```

1. Call `binaryTreeDFS(A)`
   - Initialize `result = []`
   - Call `dfs(A)`
     - Process A: `result = [A]`
     - Call `dfs(A.left)` which is `dfs(B)`
       - Process B: `result = [A, B]`
       - Call `dfs(B.left)` which is `null` → return
       - Call `dfs(B.right)` which is `null` → return
     - Call `dfs(A.right)` which is `dfs(C)`
       - Process C: `result = [A, B, C]`
       - Call `dfs(C.left)` which is `null` → return
       - Call `dfs(C.right)` which is `null` → return
   - Return `result = [A, B, C]`

## 🧠 The Call Stack Visualization

When we use recursion, the computer uses a "call stack" to keep track of function calls:

```mermaid
graph TD;
    A[dfs(A)]-->B[dfs(B)];
    B-->C[dfs(null) - return];
    B-->D[dfs(null) - return];
    A-->E[dfs(C)];
    E-->F[dfs(null) - return];
    E-->G[dfs(null) - return];
```

<details>
<summary>What happens in memory?</summary>

1. `dfs(A)` is called and pushed onto the call stack
2. Inside `dfs(A)`, we call `dfs(B)`, which is pushed on top
3. `dfs(B)` calls `dfs(null)` for both children, which return immediately
4. `dfs(B)` completes and is popped from the stack
5. Back in `dfs(A)`, we call `dfs(C)`, which is pushed onto the stack
6. `dfs(C)` calls `dfs(null)` for both children, which return immediately
7. `dfs(C)` completes and is popped from the stack
8. `dfs(A)` completes and is popped from the stack

</details>

## 🔄 Implementing Other Traversal Orders

We can easily modify our recursive function to implement other traversal orders:

### In-order Traversal (Left → Root → Right)

```javascript
function dfs(node) {
  if (!node) return;
  
  dfs(node.left);           // 1. Process left subtree
  result.push(node.val);    // 2. Process current node
  dfs(node.right);          // 3. Process right subtree
}
```

### Post-order Traversal (Left → Right → Root)

```javascript
function dfs(node) {
  if (!node) return;
  
  dfs(node.left);           // 1. Process left subtree
  dfs(node.right);          // 2. Process right subtree
  result.push(node.val);    // 3. Process current node
}
```

## ⚠️ Potential Pitfalls

While recursion is elegant, be aware of these potential issues:

1. **Stack Overflow**: For very deep trees, you might exceed the call stack limit
2. **Performance**: Recursive calls have slightly more overhead than iterative approaches
3. **Debugging**: Recursive code can be harder to debug than iterative code

> [!WARNING]
> For extremely large trees, consider using an iterative approach instead to avoid stack overflow errors.

## 🤔 Think About It

How would you modify the recursive DFS function to find a specific value in the tree? What would you return when the value is found?

In the next lesson, we'll explore the iterative implementation of DFS! 