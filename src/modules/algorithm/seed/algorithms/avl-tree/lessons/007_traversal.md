---
title: Traversal - Visiting Nodes in an AVL Tree
---

# 🚶 Traversal in AVL Trees

Traversal operations allow us to visit all nodes in a tree in a specific order. These operations are identical for AVL trees and regular binary search trees, as they don't affect the structure of the tree.

## Types of Traversals 🔄

There are four main types of tree traversals:

1. **In-order Traversal**: Visit left subtree, then root, then right subtree (LNR)
2. **Pre-order Traversal**: Visit root, then left subtree, then right subtree (NLR)
3. **Post-order Traversal**: Visit left subtree, then right subtree, then root (LRN)
4. **Level-order Traversal**: Visit nodes level by level, from left to right

Let's explore each of these traversals in detail.

## In-order Traversal 📊

In-order traversal visits the nodes in ascending order of their values in a binary search tree. It follows the pattern: left subtree, root, right subtree (LNR).

### Implementation:

```javascript
inOrderTraversal(callback) {
  this.inOrderTraversalHelper(this.root, callback);
}

inOrderTraversalHelper(node, callback) {
  if (node) {
    // First, visit the left subtree
    this.inOrderTraversalHelper(node.left, callback);
    
    // Then, visit the current node
    callback(node.value);
    
    // Finally, visit the right subtree
    this.inOrderTraversalHelper(node.right, callback);
  }
}
```

### Example:

For the following AVL tree:

```
     20
    /  \
   10   30
  / \   / \
 5  15 25  40
```

The in-order traversal would visit nodes in this order: 5, 10, 15, 20, 25, 30, 40.

```mermaid
graph TD;
    A[Start] --> B[Visit left subtree of 20]
    B --> C[Visit left subtree of 10]
    C --> D[Visit left subtree of 5]
    D --> E[Visit 5]
    E --> F[Visit 10]
    F --> G[Visit right subtree of 10]
    G --> H[Visit 15]
    H --> I[Visit 20]
    I --> J[Visit right subtree of 20]
    J --> K[Visit left subtree of 30]
    K --> L[Visit 25]
    L --> M[Visit 30]
    M --> N[Visit right subtree of 30]
    N --> O[Visit 40]
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#dfd,stroke:#333,stroke-width:2px
    style F fill:#dfd,stroke:#333,stroke-width:2px
    style H fill:#dfd,stroke:#333,stroke-width:2px
    style I fill:#dfd,stroke:#333,stroke-width:2px
    style L fill:#dfd,stroke:#333,stroke-width:2px
    style M fill:#dfd,stroke:#333,stroke-width:2px
    style O fill:#dfd,stroke:#333,stroke-width:2px
```

> [!TIP]
> In-order traversal of a binary search tree (including AVL trees) always visits nodes in ascending order of their values. This is useful for tasks like printing all elements in sorted order.

## Pre-order Traversal 📊

Pre-order traversal visits the root before its children. It follows the pattern: root, left subtree, right subtree (NLR).

### Implementation:

```javascript
preOrderTraversal(callback) {
  this.preOrderTraversalHelper(this.root, callback);
}

preOrderTraversalHelper(node, callback) {
  if (node) {
    // First, visit the current node
    callback(node.value);
    
    // Then, visit the left subtree
    this.preOrderTraversalHelper(node.left, callback);
    
    // Finally, visit the right subtree
    this.preOrderTraversalHelper(node.right, callback);
  }
}
```

### Example:

For the same AVL tree:

```
     20
    /  \
   10   30
  / \   / \
 5  15 25  40
```

The pre-order traversal would visit nodes in this order: 20, 10, 5, 15, 30, 25, 40.

> [!TIP]
> Pre-order traversal is useful for creating a copy of the tree or for generating a prefix expression from an expression tree.

## Post-order Traversal 📊

Post-order traversal visits the root after its children. It follows the pattern: left subtree, right subtree, root (LRN).

### Implementation:

```javascript
postOrderTraversal(callback) {
  this.postOrderTraversalHelper(this.root, callback);
}

postOrderTraversalHelper(node, callback) {
  if (node) {
    // First, visit the left subtree
    this.postOrderTraversalHelper(node.left, callback);
    
    // Then, visit the right subtree
    this.postOrderTraversalHelper(node.right, callback);
    
    // Finally, visit the current node
    callback(node.value);
  }
}
```

### Example:

For the same AVL tree:

```
     20
    /  \
   10   30
  / \   / \
 5  15 25  40
```

The post-order traversal would visit nodes in this order: 5, 15, 10, 25, 40, 30, 20.

> [!TIP]
> Post-order traversal is useful for deleting the tree (as we delete children before parents) or for generating a postfix expression from an expression tree.

## Level-order Traversal 📊

Level-order traversal visits nodes level by level, from left to right. It uses a queue to keep track of nodes to visit.

### Implementation:

```javascript
levelOrderTraversal(callback) {
  if (!this.root) return;
  
  const queue = [this.root];
  
  while (queue.length > 0) {
    const node = queue.shift();
    
    // Visit the current node
    callback(node.value);
    
    // Add children to the queue
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}
```

### Example:

For the same AVL tree:

```
     20
    /  \
   10   30
  / \   / \
 5  15 25  40
```

The level-order traversal would visit nodes in this order: 20, 10, 30, 5, 15, 25, 40.

```mermaid
graph TD;
    A[Queue: [20]] --> B[Visit 20, Queue: [10, 30]]
    B --> C[Visit 10, Queue: [30, 5, 15]]
    C --> D[Visit 30, Queue: [5, 15, 25, 40]]
    D --> E[Visit 5, Queue: [15, 25, 40]]
    E --> F[Visit 15, Queue: [25, 40]]
    F --> G[Visit 25, Queue: [40]]
    G --> H[Visit 40, Queue: []]
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#bbf,stroke:#333,stroke-width:2px
    style D fill:#bbf,stroke:#333,stroke-width:2px
    style E fill:#dfd,stroke:#333,stroke-width:2px
    style F fill:#dfd,stroke:#333,stroke-width:2px
    style G fill:#dfd,stroke:#333,stroke-width:2px
    style H fill:#dfd,stroke:#333,stroke-width:2px
```

> [!TIP]
> Level-order traversal is useful for tasks like printing the tree level by level or for breadth-first search algorithms.

## Iterative Implementations 🔄

While recursive implementations are elegant, they can lead to stack overflow for very deep trees. Here are iterative implementations for the traversals:

<details>
<summary>Iterative In-order Traversal</summary>

```javascript
inOrderTraversalIterative(callback) {
  if (!this.root) return;
  
  const stack = [];
  let current = this.root;
  
  while (current || stack.length > 0) {
    // Reach the leftmost node
    while (current) {
      stack.push(current);
      current = current.left;
    }
    
    // Current is now null, pop from stack
    current = stack.pop();
    
    // Visit the node
    callback(current.value);
    
    // Move to the right subtree
    current = current.right;
  }
}
```

</details>

<details>
<summary>Iterative Pre-order Traversal</summary>

```javascript
preOrderTraversalIterative(callback) {
  if (!this.root) return;
  
  const stack = [this.root];
  
  while (stack.length > 0) {
    // Pop from stack and visit
    const node = stack.pop();
    callback(node.value);
    
    // Push right child first (so that left child is processed first)
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
}
```

</details>

<details>
<summary>Iterative Post-order Traversal</summary>

```javascript
postOrderTraversalIterative(callback) {
  if (!this.root) return;
  
  const stack1 = [this.root];
  const stack2 = [];
  
  // First, we push nodes in stack2 in the order: root, right, left
  while (stack1.length > 0) {
    const node = stack1.pop();
    stack2.push(node);
    
    if (node.left) stack1.push(node.left);
    if (node.right) stack1.push(node.right);
  }
  
  // Then, we pop from stack2 to get the post-order traversal
  while (stack2.length > 0) {
    const node = stack2.pop();
    callback(node.value);
  }
}
```

</details>

## Applications of Traversals 🚀

Different traversals are useful for different applications:

- **In-order Traversal**: 
  - Printing elements in sorted order
  - Finding the kth smallest/largest element
  - Checking if the tree is a valid BST

- **Pre-order Traversal**:
  - Creating a copy of the tree
  - Serializing the tree structure
  - Prefix expression evaluation

- **Post-order Traversal**:
  - Deleting the tree
  - Calculating space used by each directory in a file system
  - Postfix expression evaluation

- **Level-order Traversal**:
  - Printing the tree level by level
  - Finding the minimum depth of the tree
  - Connecting nodes at the same level (e.g., in a perfect binary tree)

## Practice Exercise 💪

Consider the following AVL tree:

```
       50
      /  \
     30   70
    / \   / \
   20 40 60  80
  /       \
 10       65
```

Trace through each of the four traversals and list the order in which nodes are visited.

<details>
<summary>Solution</summary>

1. In-order Traversal: 10, 20, 30, 40, 50, 60, 65, 70, 80
2. Pre-order Traversal: 50, 30, 20, 10, 40, 70, 60, 65, 80
3. Post-order Traversal: 10, 20, 40, 30, 65, 60, 80, 70, 50
4. Level-order Traversal: 50, 30, 70, 20, 40, 60, 80, 10, 65

</details>

In the next section, we'll explore the time and space complexity of AVL tree operations and compare AVL trees with other balanced tree data structures. 