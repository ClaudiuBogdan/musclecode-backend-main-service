---
title: Traversal Comparison and Level-Order Traversal
---

# 🔄 Traversal Methods Compared & Level-Order Traversal

Now that we've explored the three main depth-first traversal methods, let's compare them side by side and introduce a new traversal method: level-order traversal.

## Comparing the Traversal Methods

Using our example tree:

```
    1
   / \
  2   3
 / \   \
4   5   6
```

Here's a summary of the three traversal methods:

| Traversal Method | Abbreviation | Order             | Result            | Key Characteristic                   |
|------------------|--------------|-------------------|-------------------|--------------------------------------|
| In-order         | LNR          | Left → Node → Right | [4, 2, 5, 1, 3, 6] | Gives sorted order in a BST         |
| Pre-order        | NLR          | Node → Left → Right | [1, 2, 4, 5, 3, 6] | Root is always first                |
| Post-order       | LRN          | Left → Right → Node | [4, 5, 2, 6, 3, 1] | Root is always last                 |

> [!NOTE]
> All three methods are forms of **depth-first traversal** – they explore as far down a branch as possible before backtracking.

## Visual Comparison

```mermaid
graph TD;
    subgraph "Pre-order (NLR)"
        A1((1))-->B1((2));
        A1-->C1((3));
        B1-->D1((4));
        B1-->E1((5));
        C1-->G1((6));
        
        classDef preorder fill:#f8cecc,stroke:#b85450;
        class A1,B1,D1,E1,C1,G1 preorder;
    end

    subgraph "In-order (LNR)"
        A2((1))-->B2((2));
        A2-->C2((3));
        B2-->D2((4));
        B2-->E2((5));
        C2-->G2((6));
        
        classDef inorder fill:#d5e8d4,stroke:#82b366;
        class D2,B2,E2,A2,C2,G2 inorder;
    end

    subgraph "Post-order (LRN)"
        A3((1))-->B3((2));
        A3-->C3((3));
        B3-->D3((4));
        B3-->E3((5));
        C3-->G3((6));
        
        classDef postorder fill:#fff2cc,stroke:#d6b656;
        class D3,E3,B3,G3,C3,A3 postorder;
    end
```

## Choosing the Right Traversal Method

The traversal method you choose depends on your specific requirements:

1. **Use in-order when:**
   - You need elements in sorted order (for BST)
   - You need to process a node between its subtrees
   - You're working with expressions in infix notation

2. **Use pre-order when:**
   - You need to explore roots before leaves
   - You're creating a copy of the tree
   - You need to print a structured document

3. **Use post-order when:**
   - You need to delete the tree
   - You need to calculate results from the bottom up
   - Children must be processed before parents

## Introducing Level-Order Traversal 👋

So far, we've explored depth-first traversal methods. Let's introduce a breadth-first approach called **level-order traversal**.

Level-order traversal visits nodes level by level, from top to bottom, and within each level from left to right.

```mermaid
graph TD;
    A((1))-->B((2));
    A-->C((3));
    B-->D((4));
    B-->E((5));
    C-->F[null];
    C-->G((6));
    
    classDef level1 fill:#f8cecc,stroke:#b85450;
    classDef level2 fill:#d5e8d4,stroke:#82b366;
    classDef level3 fill:#fff2cc,stroke:#d6b656;
    
    class A level1;
    class B,C level2;
    class D,E,G level3;
    
    linkStyle 0,1,2,3,4,5 stroke-width:2px;
```

For our example tree, the level-order traversal result would be: **[1, 2, 3, 4, 5, 6]**

## Implementing Level-Order Traversal

Unlike the three depth-first approaches, level-order traversal uses a **queue** instead of a stack:

```javascript
function levelOrderTraversal(root) {
  const result = [];
  if (root === null) return result;
  
  const queue = [root];
  
  while (queue.length > 0) {
    const node = queue.shift(); // Remove from the front (FIFO)
    result.push(node.val);
    
    // Add children to the queue
    if (node.left !== null) queue.push(node.left);
    if (node.right !== null) queue.push(node.right);
  }
  
  return result;
}
```

> [!TIP]
> The key difference: we use a queue (First-In-First-Out) instead of a stack (Last-In-First-Out), which gives us breadth-first behavior!

## Applications of Level-Order Traversal 🌐

Level-order traversal is particularly useful for:

1. **Finding the Minimum Depth**: Finding the shortest path to a leaf node
2. **Connecting Nodes at the Same Level**: Creating links between nodes at the same depth
3. **Creating a Level-by-Level View**: Visualizing the tree level by level
4. **Serializing a Tree**: Converting a tree to a string representation
5. **Finding the Nearest Nodes**: Ideal for finding the closest nodes to the root

## Extended Challenge: Level-by-Level Output 🏆

<details>
<summary>How would you modify level-order traversal to return a 2D array, where each inner array contains nodes from a single level?</summary>

```javascript
function levelByLevelTraversal(root) {
  const result = [];
  if (root === null) return result;
  
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    // Process all nodes at the current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
    
    result.push(currentLevel);
  }
  
  return result;
}
```

This would return `[[1], [2, 3], [4, 5, 6]]` for our example tree.

</details>

## Integration with Graph Algorithms 🔍

Binary tree traversal methods directly relate to broader graph traversal algorithms:

- **Depth-First Search (DFS)**: Pre-order, in-order, and post-order are all variations of DFS
- **Breadth-First Search (BFS)**: Level-order traversal is essentially BFS applied to a tree

In the next lesson, we'll look at practical challenges and advanced tree traversal techniques! 