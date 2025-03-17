---
title: Deletion - Removing Nodes from an AVL Tree
---

# 🗑️ Deletion in AVL Trees

Deletion is the most complex operation in AVL trees. It involves removing a node from the tree while maintaining both the binary search tree property and the AVL balance property.

## The Surgical Approach to Deletion 🩺

Think of deletion as performing surgery on the tree:

1. **Diagnosis**: Find the node to be removed
2. **Surgical Plan**: Determine the best removal strategy based on the node's children
3. **Operation**: Remove the node according to the plan
4. **Recovery**: Update heights and rebalance the tree

Just as a good surgeon aims to minimize disruption to surrounding tissue, we want to maintain the tree's structure and balance as much as possible.

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
Before:                     After:
    50                         50
   /  \                       /  \
  30   70                    30   70
 /  \                       /
20  40                     20
```

This is the simplest case - just remove the node directly.

### Case 2: Node with One Child
Replace the node with its child.

```
Before:                     After:
    50                         50
   /  \                       /  \
  30   70                    20   70
 /
20
```

In this case, the node's parent adopts its grandchild.

### Case 3: Node with Two Children
Replace the node with its in-order successor (the smallest node in its right subtree) or its in-order predecessor (the largest node in its left subtree), then delete the successor/predecessor.

```
Before:                     After (using successor 60):
    50                         60
   /  \                       /  \
  30   70                    30   70
 / \   / \                  / \     \
20 40 60  80               20 40     80
```

This case is more complex because it involves two nodes - the one being deleted and its replacement.

## Visual Step-by-Step Example of Case 3

Let's trace through deleting node 50 (which has two children) step by step:

```
1. Initial tree:
       50
      /  \
     30   70
    / \   / \
   20 40 60  80

2. Find the in-order successor (smallest in right subtree):
   The successor is 60
       50
      /  \
     30   70
    / \   / \
   20 40 60  80
        ↑
    successor

3. Copy successor's value to node being deleted:
       60
      /  \
     30   70
    / \   / \
   20 40 60  80
            ↑
        duplicate 60

4. Delete the successor from its original position:
       60
      /  \
     30   70
    / \     \
   20 40     80

5. Final tree after deletion:
       60
      /  \
     30   70
    / \     \
   20 40     80
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

## The Key Difference in Rotation Selection

Notice that for deletion, we choose rotations based on the balance factors of both the unbalanced node and its child:

1. For a left-heavy node (balance > 1):
   - If the left child is left-heavy or balanced (balance >= 0), do a right rotation
   - If the left child is right-heavy (balance < 0), do a left-right rotation

2. For a right-heavy node (balance < -1):
   - If the right child is right-heavy or balanced (balance <= 0), do a left rotation
   - If the right child is left-heavy (balance > 0), do a right-left rotation

This differs from insertion, where we based the decision on the value being inserted.

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

## Handling Edge Cases 🧪

### Empty Tree

If the tree is empty or the node to be deleted is not found, the deletion operation should handle it gracefully:

```javascript
// If the tree is empty
if (!this.root) return null;

// If the node is not found, the function will return null
if (!node) return null;
```

### Deleting the Root

When deleting the root node, we need to be careful to update the tree's root reference:

```javascript
// The root might change after deletion, so we update it
this.root = this.deleteNode(this.root, value);
```

## Deletion Walkthrough: Removing 20 from an AVL Tree 🖼️

Consider the following AVL tree:

```
Initial tree:
    30
   /  \
  20   40
 /      \
10       50
```

Let's trace through the deletion of the node with value 20:

```
Step 1: Find the node to delete (20)
    30
   /  \
 [20]  40
 /      \
10       50

Step 2: 20 has one child (10), replace it with its child
    30
   /  \
  10   40
        \
        50

Step 3: Update heights
  - Height of 10: 1
  - Height of 40: 2
  - Height of 30: 3

Step 4: Check balance factors
  - Balance of 30: 1 - 2 = -1 (still balanced)

Result:
    30
   /  \
  10   40
        \
        50
```

The tree remains balanced after deletion, so no rotations are needed.

## Deletion Time Complexity ⏱️

- **Time Complexity**: O(log n) - We need to traverse the height of the tree to find the deletion point, and then perform at most O(log n) rotations to restore balance.
- **Space Complexity**: O(log n) - Due to the recursive call stack.

## Interactive Deletion Example 🎮

Let's trace through a more complex deletion that requires rebalancing:

```
Initial tree:
       50
      /  \
     30   70
    / \   / \
   20 40 60  80
  /
 10

Delete 80:
```

Let's go through the steps:

1. Remove 80 (a leaf node)
2. Update heights: Height of 70 becomes 2, height of 50 remains 3
3. Check balance factors: 50 has a balance factor of 1, 70 has a balance factor of 1 (still balanced)
4. Final tree:

```
       50
      /  \
     30   70
    / \   /
   20 40 60
  /
 10
```

Now, let's delete one more node:

```
Delete 60:
```

1. Remove 60 (a leaf node)
2. Update heights: Height of 70 becomes 1, height of 50 becomes 3
3. Check balance factors: 50 has a balance factor of 2 (unbalanced!)
4. Determine rotation: Left subtree (30) has a balance factor of 1 (left-heavy), so we need a right rotation on 50
5. After rotation:

```
       30
      /  \
     20   50
    /    /  \
   10   40   70
```

## Common Pitfalls to Avoid ⚠️

1. **Forgetting to update heights**: Always update the height of each node after any operation that might change the structure of its subtrees.
2. **Incorrect rotation selection**: Make sure to choose the correct rotation based on the balance factors of the unbalanced node and its children.
3. **Not handling the case of deleting the root**: The root of the tree can change after deletion, so make sure to update the root reference.
4. **Not handling the successor deletion correctly**: After replacing a node with its successor, make sure to delete the successor from its original position.

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

## Knowledge Check ✅

Before moving on, make sure you understand:

1. What are the three cases for deleting a node in a BST?
2. How do we handle deletion of a node with two children?
3. Why do we need to check the balance factor of child nodes when rebalancing after deletion?
4. What happens if we delete the root node?
5. How many rotations might be needed after deleting a single node?

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