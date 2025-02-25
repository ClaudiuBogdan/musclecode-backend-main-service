/**
 * Definition for a binary tree node.
 */
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

/**
 * Searches for a key in the binary search tree.
 * @param root - The root of the BST.
 * @param key - The value to search for.
 * @returns True if the key exists in the tree, false otherwise.
 */
export function search(root: TreeNode | null, key: number): boolean {
  // TODO: Implement the binary search in BST (iterative or recursive).
  return false;
}

/**
 * Inserts a key into the binary search tree and returns the new root.
 * @param root - The root of the BST.
 * @param key - The value to insert.
 * @returns The new/root of the BST after insertion.
 */
export function insert(root: TreeNode | null, key: number): TreeNode {
  // TODO: Implement the BST insertion.
  return new TreeNode(key);
}

/**
 * Deletes a key from the binary search tree and returns the new root.
 * @param root - The root of the BST.
 * @param key - The value to delete.
 * @returns The new/root of the BST after deletion.
 */
export function deleteNode(
  root: TreeNode | null,
  key: number,
): TreeNode | null {
  // TODO: Implement the BST deletion.
  return root;
}
