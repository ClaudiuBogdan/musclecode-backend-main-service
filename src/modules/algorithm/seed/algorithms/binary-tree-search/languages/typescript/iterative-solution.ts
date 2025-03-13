import { TreeNode } from './exercise';

/**
 * Iterative implementation of BST search.
 */
export function search(root: TreeNode | null, key: number): boolean {
  let current = root;
  while (current) {
    if (current.val === key) {
      return true;
    } else if (key < current.val) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  return false;
}

/**
 * Iterative implementation of BST insertion.
 */
export function insert(root: TreeNode | null, key: number): TreeNode {
  const newNode = new TreeNode(key);
  if (!root) {
    return newNode;
  }
  let current = root;
  let parent: TreeNode | null = null;
  while (current) {
    parent = current;
    if (key < current.val) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  if (parent) {
    if (key < parent.val) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
  }
  return root;
}

/**
 * Iterative implementation of BST deletion.
 */
export function deleteNode(
  root: TreeNode | null,
  key: number,
): TreeNode | null {
  let parent: TreeNode | null = null;
  let current = root;

  // Find the node to delete
  while (current && current.val !== key) {
    parent = current;
    if (key < current.val) {
      current = current.left;
    } else {
      current = current.right;
    }
  }

  // Node not found
  if (!current) return root;

  // Helper function to remove the node
  function removeNode(node: TreeNode): TreeNode | null {
    if (!node.left) return node.right;
    if (!node.right) return node.left;
    // Node with two children: find the inorder successor
    let succParent = node;
    let succ = node.right;
    while (succ.left) {
      succParent = succ;
      succ = succ.left;
    }
    // Copy successor's value to node
    node.val = succ.val;
    // Delete successor node
    if (succParent.left === succ) {
      succParent.left = succ.right;
    } else {
      succParent.right = succ.right;
    }
    return node;
  }

  if (!parent) {
    // Deleting the root node
    return removeNode(current);
  }

  if (parent.left === current) {
    parent.left = removeNode(current);
  } else {
    parent.right = removeNode(current);
  }
  return root;
}
