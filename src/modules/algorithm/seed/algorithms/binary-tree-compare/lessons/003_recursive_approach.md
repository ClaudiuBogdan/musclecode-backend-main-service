---
title: The Recursive Approach
---

# 🔄 The Recursive Approach: Elegance in Simplicity 🔄

## 🧠 Thinking Recursively

Trees have a naturally recursive structure - each subtree is itself a tree! This makes recursion a perfect fit for tree problems.

> [!NOTE]
> Recursion is a technique where a function calls itself to solve smaller instances of the same problem.

## 🧩 Breaking Down the Problem

To compare two binary trees recursively, we need to:

1. **Compare the current nodes** (roots of the current subtrees)
2. **Recursively compare the left subtrees**
3. **Recursively compare the right subtrees**

The trees are identical only if all three comparisons return true.

## 🚦 Base Cases

Every recursive solution needs base cases to prevent infinite recursion. For tree comparison, we have these base cases:

1. **Both nodes are null**: If we've reached the end of both trees simultaneously, this part is identical.
2. **One node is null, the other isn't**: The trees have different structures, so they're not identical.
3. **Values are different**: If the current nodes have different values, the trees are not identical.

## 📝 The Recursive Algorithm

Here's the recursive algorithm in pseudocode:

```
function isSameTree(p, q):
    // Base case 1: Both nodes are null
    if p is null AND q is null:
        return true
        
    // Base case 2: One node is null, the other isn't
    if p is null OR q is null:
        return false
        
    // Base case 3: Values are different
    if p.val ≠ q.val:
        return false
        
    // Recursive case: Check both subtrees
    return isSameTree(p.left, q.left) AND isSameTree(p.right, q.right)
```

The beauty of this solution is how it mirrors the problem definition:
- Trees are identical if their roots have the same value AND
- Their left subtrees are identical AND
- Their right subtrees are identical

## 📊 Visualizing the Recursion

Let's visualize the recursive calls for comparing these two identical trees:

```mermaid
graph TD;
    A1[1] --> B1[2]
    A1 --> C1[3]
    
    A2[1] --> B2[2]
    A2 --> C2[3]
    
    style A1 fill:#f9f,stroke:#333,stroke-width:2px
    style A2 fill:#f9f,stroke:#333,stroke-width:2px
```

The recursion tree showing function calls:

```mermaid
graph TD;
    A["isSameTree(A1, A2)"] --> B["isSameTree(B1, B2)"]
    A --> C["isSameTree(C1, C2)"]
    B --> D["isSameTree(null, null)"]
    B --> E["isSameTree(null, null)"]
    C --> F["isSameTree(null, null)"]
    C --> G["isSameTree(null, null)"]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:1px
    style C fill:#bbf,stroke:#333,stroke-width:1px
    style D fill:#bfb,stroke:#333,stroke-width:1px
    style E fill:#bfb,stroke:#333,stroke-width:1px
    style F fill:#bfb,stroke:#333,stroke-width:1px
    style G fill:#bfb,stroke:#333,stroke-width:1px
```

Each function call returns a boolean value that propagates up the tree. Green nodes return `true`, and the final result is `true` only if all calls return `true`.

## 🔍 Tracing the Algorithm

Let's trace through the algorithm with a simple example:

```mermaid
graph TD;
    A1[1] --> B1[2]
    A1 --> C1[3]
    
    A2[1] --> B2[2]
    A2 --> C2[3]
    
    style A1 fill:#f9f,stroke:#333,stroke-width:2px
    style A2 fill:#f9f,stroke:#333,stroke-width:2px
```

<details>
<summary>Step-by-step execution</summary>

1. **Call `isSameTree(A1, A2)`**
   - A1 and A2 are both non-null ✓
   - A1.val = A2.val = 1 ✓
   - Recursively call `isSameTree(B1, B2)` AND `isSameTree(C1, C2)`

2. **Call `isSameTree(B1, B2)`**
   - B1 and B2 are both non-null ✓
   - B1.val = B2.val = 2 ✓
   - Recursively call `isSameTree(null, null)` AND `isSameTree(null, null)`
     - Both return true ✓

3. **Call `isSameTree(C1, C2)`**
   - C1 and C2 are both non-null ✓
   - C1.val = C2.val = 3 ✓
   - Recursively call `isSameTree(null, null)` AND `isSameTree(null, null)`
     - Both return true ✓

4. **Result**: true AND true = true ✓
</details>

## ⚠️ Common Pitfalls in Recursive Tree Algorithms

When implementing recursive tree algorithms, watch out for these common mistakes:

1. **Forgetting base cases**: Always handle null nodes explicitly to avoid null pointer exceptions.

2. **Incorrect return value propagation**: Make sure to properly combine and return the results of recursive calls.

   ```javascript
   // INCORRECT - doesn't properly propagate results
   function incorrectSameTree(p, q) {
     if (p === null && q === null) return true;
     if (p === null || q === null) return false;
     if (p.val !== q.val) return false;
     
     // Missing return statement! Results won't propagate up
     isSameTree(p.left, q.left);
     isSameTree(p.right, q.right);
   }
   
   // CORRECT
   function correctSameTree(p, q) {
     if (p === null && q === null) return true;
     if (p === null || q === null) return false;
     if (p.val !== q.val) return false;
     
     // Properly return combined results
     return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
   }
   ```

3. **Inefficient recursion**: Not using early returns can lead to unnecessary recursive calls.

4. **Stack overflow**: For very deep trees, the recursion stack might exceed its limit.

## 💻 Implementation in JavaScript

Here's how we implement the algorithm in JavaScript:

```javascript
function isSameTree(p, q) {
  // If both nodes are null, they are identical
  if (p === null && q === null) {
    return true;
  }

  // If one node is null but the other isn't, they are not identical
  if (p === null || q === null) {
    return false;
  }

  // If the values are different, they are not identical
  if (p.val !== q.val) {
    return false;
  }

  // Recursively check left and right subtrees
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

## ⚖️ Complexity Analysis

- **Time Complexity**: O(n), where n is the number of nodes in the tree
  - In the worst case, we need to visit every node in both trees
  - We perform constant-time operations at each node

- **Space Complexity**: O(h), where h is the height of the tree
  - This accounts for the recursion stack
  - For a balanced tree, this would be O(log n)
  - For a skewed tree (essentially a linked list), this could be O(n)

## 🧪 Testing the Recursive Approach

Let's test our algorithm with a few examples:

```javascript
// Example 1: Identical trees
const tree1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
const tree2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.log(isSameTree(tree1, tree2)); // true

// Example 2: Different values
const tree3 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
const tree4 = new TreeNode(1, new TreeNode(2), new TreeNode(4));
console.log(isSameTree(tree3, tree4)); // false

// Example 3: Different structures
const tree5 = new TreeNode(1, new TreeNode(2), null);
const tree6 = new TreeNode(1, null, new TreeNode(2));
console.log(isSameTree(tree5, tree6)); // false
```

## 🤔 Think About It

1. What happens if the trees have the same values but different structures?
2. Could we optimize this algorithm further?
3. What are the advantages of the recursive approach for this problem?
4. How would the algorithm behave with very large or unbalanced trees?

> [!TIP]
> The recursive approach is elegant and mirrors the structure of the problem, making it intuitive to understand and implement.

In the next lesson, we'll explore an alternative iterative approach to comparing binary trees. 