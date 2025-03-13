---
title: Insertion - Adding Nodes to an AVL Tree
---

# 📥 Insertion in AVL Trees

Insertion is one of the fundamental operations in AVL trees. It involves adding a new node to the tree while maintaining the binary search tree property and the AVL balance property.

## The Insertion Process 🔍

The insertion process in an AVL tree consists of two main steps:

1. **Standard BST Insertion**: Insert the new node as you would in a regular binary search tree.
2. **Rebalancing**: Check if the insertion has caused any imbalance, and if so, perform the appropriate rotations to restore balance.

Let's break down this process step by step.

## Step 1: Standard BST Insertion 🌱

The first step is to insert the new node as you would in a regular binary search tree:

1. If the tree is empty, create a new node and make it the root.
2. If the tree is not empty, compare the value to be inserted with the root's value:
   - If the value is less than the root's value, recursively insert it into the left subtree.
   - If the value is greater than the root's value, recursively insert it into the right subtree.
   - If the value is equal to the root's value, handle it according to your requirements (e.g., ignore it or update the node).

```javascript
insertNode(node, value) {
  // Step 1: Standard BST insertion
  if (!node) {
    return new AVLNode(value);
  }
  
  if (value < node.value) {
    node.left = this.insertNode(node.left, value);
  } else if (value > node.value) {
    node.right = this.insertNode(node.right, value);
  } else {
    // Value already exists, return the node (no duplicates)
    return node;
  }
  
  // Step 2: Update height and rebalance (coming next)
  // ...
}
```

> [!NOTE]
> This is a recursive implementation. Each recursive call returns the root of the modified subtree, which is then assigned to the appropriate child pointer of the parent node.

## Step 2: Update Height and Rebalance 🔄

After inserting the new node, we need to update the height of each node in the path from the insertion point to the root, and check if any node has become unbalanced:

```javascript
insertNode(node, value) {
  // Step 1: Standard BST insertion (from above)
  // ...
  
  // Step 2: Update height of current node
  node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  
  // Step 3: Get the balance factor to check if this node became unbalanced
  const balance = this.getBalance(node);
  
  // Step 4: If unbalanced, perform rotations
  // Left Left Case
  if (balance > 1 && value < node.left.value) {
    return this.rightRotate(node);
  }
  
  // Right Right Case
  if (balance < -1 && value > node.right.value) {
    return this.leftRotate(node);
  }
  
  // Left Right Case
  if (balance > 1 && value > node.left.value) {
    node.left = this.leftRotate(node.left);
    return this.rightRotate(node);
  }
  
  // Right Left Case
  if (balance < -1 && value < node.right.value) {
    node.right = this.rightRotate(node.right);
    return this.leftRotate(node);
  }
  
  // Return the unchanged node pointer
  return node;
}
```

## Complete Insertion Method 🧩

Here's the complete insertion method that combines both steps:

```javascript
insert(value) {
  this.root = this.insertNode(this.root, value);
}

insertNode(node, value) {
  // Step 1: Standard BST insertion
  if (!node) {
    return new AVLNode(value);
  }
  
  if (value < node.value) {
    node.left = this.insertNode(node.left, value);
  } else if (value > node.value) {
    node.right = this.insertNode(node.right, value);
  } else {
    // Value already exists, return the node (no duplicates)
    return node;
  }
  
  // Step 2: Update height of current node
  node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  
  // Step 3: Get the balance factor to check if this node became unbalanced
  const balance = this.getBalance(node);
  
  // Step 4: If unbalanced, perform rotations
  // Left Left Case
  if (balance > 1 && value < node.left.value) {
    return this.rightRotate(node);
  }
  
  // Right Right Case
  if (balance < -1 && value > node.right.value) {
    return this.leftRotate(node);
  }
  
  // Left Right Case
  if (balance > 1 && value > node.left.value) {
    node.left = this.leftRotate(node.left);
    return this.rightRotate(node);
  }
  
  // Right Left Case
  if (balance < -1 && value < node.right.value) {
    node.right = this.rightRotate(node.right);
    return this.leftRotate(node);
  }
  
  // Return the unchanged node pointer
  return node;
}
```

## Visual Example: Inserting 15, 10, 20, 25, 8, 12 🖼️

Let's trace through the insertion of these values into an initially empty AVL tree:

1. Insert 15: Tree is balanced
```
15
```

2. Insert 10: Tree is balanced
```
  15
 /
10
```

3. Insert 20: Tree is balanced
```
  15
 / \
10  20
```

4. Insert 25: Tree is balanced
```
  15
 / \
10  20
      \
      25
```

5. Insert 8: Tree is balanced
```
   15
  / \
 10  20
/     \
8     25
```

6. Insert 12: Tree is balanced
```
    15
   / \
  10  20
 / \   \
8  12  25
```

> [!TIP]
> Notice how the tree remains balanced after each insertion. This is the power of AVL trees!

## Insertion Time Complexity ⏱️

- **Time Complexity**: O(log n) - We need to traverse the height of the tree to find the insertion point, and then perform at most one rotation operation.
- **Space Complexity**: O(log n) - Due to the recursive call stack.

## Common Pitfalls to Avoid ⚠️

1. **Forgetting to update heights**: Always update the height of each node after any operation that might change the structure of its subtrees.
2. **Incorrect rotation selection**: Make sure to choose the correct rotation based on the balance factor and the value being inserted.
3. **Not handling duplicates**: Decide how to handle duplicate values (ignore, update, or allow duplicates with a different approach).

## Practice Exercise 💪

Try to trace through the insertion of the following values into an initially empty AVL tree, drawing the tree after each insertion:

1. Insert 50
2. Insert 25
3. Insert 75
4. Insert 10
5. Insert 30
6. Insert 60
7. Insert 80
8. Insert 5
9. Insert 15

<details>
<summary>Solution</summary>

1. Insert 50: Tree is balanced
```
50
```

2. Insert 25: Tree is balanced
```
  50
 /
25
```

3. Insert 75: Tree is balanced
```
  50
 / \
25  75
```

4. Insert 10: Tree is balanced
```
   50
  / \
 25  75
/
10
```

5. Insert 30: Tree is balanced
```
   50
  / \
 25  75
/ \
10 30
```

6. Insert 60: Tree is balanced
```
   50
  / \
 25  75
/ \ /
10 30 60
```

7. Insert 80: Tree is balanced
```
   50
  / \
 25  75
/ \ / \
10 30 60 80
```

8. Insert 5: Tree becomes unbalanced (balance factor of 25 is 2), perform right rotation on 25
```
Before rotation:
     50
    / \
   25  75
  / \ / \
 10 30 60 80
/
5

After right rotation on 25:
     50
    / \
   10  75
  / \ / \
 5  25 60 80
    /
   30
```

9. Insert 15: Tree is balanced
```
     50
    / \
   10  75
  / \ / \
 5  25 60 80
   /
  15
```

</details>

In the next section, we'll explore the search operation in AVL trees, which is identical to the search operation in regular binary search trees. 