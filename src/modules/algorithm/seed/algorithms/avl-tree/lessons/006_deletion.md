---
title: Deletion - Removing Nodes from an AVL Tree
---

# 🗑️ Deletion in AVL Trees

Deletion is the most complex operation in AVL trees. It involves removing a node from the tree while maintaining both the binary search tree property and the AVL balance property.

## The Deletion Process 🔍

The deletion process in an AVL tree consists of three main steps:

1. **Standard BST Deletion**: Remove the node as you would in a regular binary search tree.
2. **Update Heights**: Update the height of each node in the path from the deletion point to the root.
3. **Rebalancing**: Check if the deletion has caused any imbalance, and if so, perform the appropriate rotations to restore balance.

Let's break down this process step by step.

## Step 1: Standard BST Deletion 🌱

The first step is to delete the node as you would in a regular binary search tree. There are three cases to consider:

### Case 1: Node with No Children (Leaf Node)
Simply remove the node by setting its parent's reference to null.

```
Before:
    50
   /  \
  30   70
 /  \
20  40

Delete 20:

After:
    50
   /  \
  30   70
    \
    40
```

### Case 2: Node with One Child
Replace the node with its child.

```
Before:
    50
   /  \
  30   70
 /
20

Delete 30:

After:
    50
   /  \
  20   70
```

### Case 3: Node with Two Children
Replace the node with its in-order successor (the smallest node in its right subtree) or its in-order predecessor (the largest node in its left subtree), then delete the successor/predecessor.

```
Before:
    50
   /  \
  30   70
 / \   / \
20 40 60  80

Delete 50:

After (using in-order successor 60):
    60
   /  \
  30   70
 / \     \
20 40    80
```

## Implementation of Standard BST Deletion 💻

Here's a recursive implementation of the standard BST deletion:

```javascript
deleteNode(root, value) {
  // Base case: If the tree is empty
  if (!root) return null;
  
  // Step 1: Standard BST deletion
  if (value < root.value) {
    // The value to be deleted is in the left subtree
    root.left = this.deleteNode(root.left, value);
  } else if (value > root.value) {
    // The value to be deleted is in the right subtree
    root.right = this.deleteNode(root.right, value);
  } else {
    // This is the node to be deleted
    
    // Case 1: Node with no children or Case 2: Node with one child
    if (!root.left) {
      return root.right;
    } else if (!root.right) {
      return root.left;
    }
    
    // Case 3: Node with two children
    // Get the inorder successor (smallest in the right subtree)
    root.value = this.findMinValue(root.right);
    
    // Delete the inorder successor
    root.right = this.deleteNode(root.right, root.value);
  }
  
  // Steps 2 and 3: Update height and rebalance (coming next)
  // ...
  
  return root;
}

// Helper function to find the minimum value in a tree
findMinValue(node) {
  let current = node;
  while (current.left) {
    current = current.left;
  }
  return current.value;
}
```

## Steps 2 & 3: Update Heights and Rebalance 🔄

After deleting the node, we need to update the height of each node in the path from the deletion point to the root, and check if any node has become unbalanced:

```javascript
deleteNode(root, value) {
  // Step 1: Standard BST deletion (from above)
  // ...
  
  // Step 2: Update height of current node
  root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
  
  // Step 3: Get the balance factor to check if this node became unbalanced
  const balance = this.getBalance(root);
  
  // Step 4: If unbalanced, perform rotations
  
  // Left Left Case
  if (balance > 1 && this.getBalance(root.left) >= 0) {
    return this.rightRotate(root);
  }
  
  // Left Right Case
  if (balance > 1 && this.getBalance(root.left) < 0) {
    root.left = this.leftRotate(root.left);
    return this.rightRotate(root);
  }
  
  // Right Right Case
  if (balance < -1 && this.getBalance(root.right) <= 0) {
    return this.leftRotate(root);
  }
  
  // Right Left Case
  if (balance < -1 && this.getBalance(root.right) > 0) {
    root.right = this.rightRotate(root.right);
    return this.leftRotate(root);
  }
  
  return root;
}
```

## Complete Deletion Method 🧩

Here's the complete deletion method that combines all steps:

```javascript
delete(value) {
  this.root = this.deleteNode(this.root, value);
}

deleteNode(root, value) {
  // Base case: If the tree is empty
  if (!root) return null;
  
  // Step 1: Standard BST deletion
  if (value < root.value) {
    // The value to be deleted is in the left subtree
    root.left = this.deleteNode(root.left, value);
  } else if (value > root.value) {
    // The value to be deleted is in the right subtree
    root.right = this.deleteNode(root.right, value);
  } else {
    // This is the node to be deleted
    
    // Case 1: Node with no children or Case 2: Node with one child
    if (!root.left) {
      return root.right;
    } else if (!root.right) {
      return root.left;
    }
    
    // Case 3: Node with two children
    // Get the inorder successor (smallest in the right subtree)
    root.value = this.findMinValue(root.right);
    
    // Delete the inorder successor
    root.right = this.deleteNode(root.right, root.value);
  }
  
  // Step 2: Update height of current node
  root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
  
  // Step 3: Get the balance factor to check if this node became unbalanced
  const balance = this.getBalance(root);
  
  // Step 4: If unbalanced, perform rotations
  
  // Left Left Case
  if (balance > 1 && this.getBalance(root.left) >= 0) {
    return this.rightRotate(root);
  }
  
  // Left Right Case
  if (balance > 1 && this.getBalance(root.left) < 0) {
    root.left = this.leftRotate(root.left);
    return this.rightRotate(root);
  }
  
  // Right Right Case
  if (balance < -1 && this.getBalance(root.right) <= 0) {
    return this.leftRotate(root);
  }
  
  // Right Left Case
  if (balance < -1 && this.getBalance(root.right) > 0) {
    root.right = this.rightRotate(root.right);
    return this.leftRotate(root);
  }
  
  return root;
}
```

> [!NOTE]
> The key difference in the rotation selection compared to insertion is that we need to check the balance factor of the child nodes to determine the appropriate rotation.

## Visual Example: Deleting 20 from an AVL Tree 🖼️

Consider the following AVL tree:

```
    30
   /  \
  20   40
 /      \
10       50
```

Let's trace through the deletion of the node with value 20:

1. Find the node to delete (20).
2. Since it has only one child (10), replace it with its child.
3. Update heights and check for imbalances.

```
After deletion (before rebalancing):
    30
   /  \
  10   40
        \
        50
```

The tree is still balanced (balance factor of 30 is -1), so no rotations are needed.

## Deletion Time Complexity ⏱️

- **Time Complexity**: O(log n) - We need to traverse the height of the tree to find the deletion point, and then perform at most O(log n) rotations to restore balance.
- **Space Complexity**: O(log n) - Due to the recursive call stack.

## Common Pitfalls to Avoid ⚠️

1. **Forgetting to update heights**: Always update the height of each node after any operation that might change the structure of its subtrees.
2. **Incorrect rotation selection**: Make sure to choose the correct rotation based on the balance factors of the unbalanced node and its children.
3. **Not handling the case of deleting the root**: The root of the tree can change after deletion, so make sure to update the root reference.

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

Trace through the deletion of the following nodes, drawing the tree after each deletion:
1. Delete 20
2. Delete 30
3. Delete 50

<details>
<summary>Solution</summary>

1. Delete 20:
   - 20 has one child (10), so replace it with 10.
   - After deletion (no rebalancing needed):
   ```
          50
         /  \
        30   70
       / \   / \
      10 40 60  80
             \
             65
   ```

2. Delete 30:
   - 30 has two children, so replace it with its in-order successor (40).
   - After deletion (no rebalancing needed):
   ```
          50
         /  \
        40   70
       /    / \
      10   60  80
            \
            65
   ```

3. Delete 50:
   - 50 has two children, so replace it with its in-order successor (60).
   - After replacing 50 with 60, we need to delete 60 from its original position.
   - After deletion (before rebalancing):
   ```
          60
         /  \
        40   70
       /      \
      10      80
              /
             65
   ```
   - The tree is still balanced, so no rotations are needed.

</details>

## Variations and Optimizations 🔧

While the basic deletion operation works well, there are several variations and optimizations that can be useful in different scenarios:

<details>
<summary>Using In-order Predecessor</summary>

Instead of using the in-order successor, we can use the in-order predecessor (the largest node in the left subtree) when deleting a node with two children:

```javascript
// Case 3: Node with two children
// Get the inorder predecessor (largest in the left subtree)
root.value = this.findMaxValue(root.left);

// Delete the inorder predecessor
root.left = this.deleteNode(root.left, root.value);
```

This can be useful in cases where the left subtree is deeper than the right subtree, as it might lead to fewer rotations.

</details>

<details>
<summary>Lazy Deletion</summary>

In some applications, we might want to avoid the overhead of physical deletion by using a "lazy deletion" approach:

```javascript
class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.isDeleted = false; // Flag to mark deleted nodes
  }
}

// Instead of physically removing the node
delete(value) {
  const node = this.search(value);
  if (node) {
    node.isDeleted = true;
  }
}

// Modify search to skip deleted nodes
search(value) {
  let node = this.searchNode(this.root, value);
  return node && !node.isDeleted ? node : null;
}
```

This approach is useful when deletions are frequent but the tree size remains relatively stable, or when we might need to "undelete" nodes later.

</details>

In the next section, we'll explore traversal operations in AVL trees, which allow us to visit all nodes in a specific order. 