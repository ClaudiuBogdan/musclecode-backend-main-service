---
title: Insertion - Adding Nodes to an AVL Tree
---

# 📥 Insertion in AVL Trees

Insertion is one of the fundamental operations in AVL trees. It involves adding a new node to the tree while maintaining the binary search tree property and the AVL balance property.

## The Three-Step Dance of Insertion 💃

Think of insertion like carefully placing a new book on a balanced bookshelf:

1. **Find the Right Spot**: Just like in a regular BST, find where the new value belongs based on comparisons.
2. **Place the Node**: Put the new node in its correct position as a leaf.
3. **Check and Rebalance**: Walk back up the tree, checking if any node became unbalanced, and rebalance as needed.

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

### Visualizing Step 1:

```
Starting tree:        Insert 15:            After BST insertion: 
     20                   20                      20
    /  \                 /  \                    /  \
   10   30              10   30                 10   30
  /       \            /      \               /  \     \
 5         40         5        40            5    15    40
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

### Visualizing Step 2:

```
After BST insertion:    Check balance:       After rebalancing:
      20                    20                     15
     /  \                  /  \                   /  \
    10   30     →         10   30     →         10    20
   /  \     \            /  \     \            /     /  \
  5    15    40         5    15    40         5     null 30
                        BF=1 BF=0  BF=0                   \
                                                           40
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

## Handling Edge Cases 🧪

### Empty Tree Insertion

When inserting into an empty tree, the code above handles it correctly by simply creating a new node as the root. No balancing is needed for a single-node tree.

```javascript
// Empty tree: null
// Insert 10:
//      10
```

### Duplicate Values

The code above handles duplicates by ignoring them, which is a common approach. However, there are other strategies:

1. **Ignore duplicates** (as shown in the code)
2. **Replace the existing value** (useful if nodes contain additional data)
3. **Store count** (maintain a count field in each node for duplicates)
4. **Allow duplicates** (store duplicate values in the right subtree)

If you need to handle duplicates differently, modify the else condition:

```javascript
// For storing count:
} else {
  node.count++; // Increment counter for duplicates
  return node;
}

// For allowing duplicates in right subtree:
} else if (value >= node.value) {
  node.right = this.insertNode(node.right, value);
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

## Interactive Walk-Through: Insertion with Rotations 🔍

Let's walk through a more complex insertion that requires rotation:

1. Starting tree:
```
    30
   /  \
  20   40
 /
10
```

2. Insert 5:
```
    30                  30                   20
   /  \                /  \                 /  \
  20   40    →        20   40     →       10   30
 /                   /                    /    / \
10                  10                   5    null 40
                   /
                  5
```

In this example:
1. We first insert 5 as a left child of 10 (standard BST insertion)
2. Update heights: 10's height becomes 2, 20's height becomes 3
3. Check balance: 20 has a balance factor of 2 (left-heavy)
4. Determine rotation: Since 10 has a balance factor of 1 (left-heavy), we need a right rotation on 20
5. Perform the rotation: 20 becomes the new root, 10 becomes its left child, 30 becomes its right child

## Common Pitfalls to Avoid ⚠️

1. **Forgetting to update heights**: Always update the height of each node after any operation that might change the structure of its subtrees.
2. **Incorrect rotation selection**: Make sure to choose the correct rotation based on the balance factor and the value being inserted.
3. **Not handling duplicates**: Decide how to handle duplicate values (ignore, update, or allow duplicates with a different approach).
4. **Not updating the root**: Remember that rotations can change the root of the tree, so always update the root reference.

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

## Quick Knowledge Check ✅

Before moving on, make sure you understand:

1. What's the first step in AVL tree insertion?
2. When do we need to perform rotations during insertion?
3. How many rotations might be needed after inserting a single node?
4. How does insertion handle the empty tree case?
5. What options do we have for handling duplicate values?

In the next section, we'll explore the search operation in AVL trees, which is identical to the search operation in regular binary search trees. 