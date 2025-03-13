import { TreeNode } from './exercise';

/**
 * Recursive implementation of BST search.
 */
export function search(root: TreeNode | null, key: number): boolean {
  if (!root) return false;
  if (root.val === key) return true;
  return key < root.val ? search(root.left, key) : search(root.right, key);
}

/**
 * Recursive implementation of BST insertion.
 */
export function insert(root: TreeNode | null, key: number): TreeNode {
  if (!root) return new TreeNode(key);
  if (key < root.val) {
    root.left = insert(root.left, key);
  } else if (key > root.val) {
    root.right = insert(root.right, key);
  }
  return root;
}

/**
 * Recursive implementation of BST deletion.
 */
export function deleteNode(
  root: TreeNode | null,
  key: number,
): TreeNode | null {
  if (!root) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Node found
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Node with two children: get the inorder successor (smallest in the right subtree)
    let successor = root.right;
    while (successor.left) {
      successor = successor.left;
    }
    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }
  return root;
}
