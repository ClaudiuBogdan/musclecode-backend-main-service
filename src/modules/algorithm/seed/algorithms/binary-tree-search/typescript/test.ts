import { TreeNode, search, insert, deleteNode } from './exercise';

function buildBST(values: number[]): TreeNode | null {
  let root: TreeNode | null = null;
  for (const val of values) {
    root = insert(root, val);
  }
  return root;
}

function inorderTraversal(root: TreeNode | null, arr: number[] = []): number[] {
  if (root) {
    inorderTraversal(root.left, arr);
    arr.push(root.val);
    inorderTraversal(root.right, arr);
  }
  return arr;
}

describe('Binary Search Tree Operations', () => {
  let bst: TreeNode | null;

  beforeEach(() => {
    // Build BST with initial values: 7, 3, 9, 1, 5
    bst = buildBST([7, 3, 9, 1, 5]);
  });

  test('Search operation - existing and non-existing', () => {
    expect(search(bst, 5)).toBe(true);
    expect(search(bst, 4)).toBe(false);
  });

  test('Insert operation', () => {
    bst = insert(bst, 4);
    expect(search(bst, 4)).toBe(true);
    // Verify BST property via inorder traversal (should be sorted)
    const inorder = inorderTraversal(bst);
    expect(inorder).toEqual([1, 3, 4, 5, 7, 9]);
  });

  test('Delete operation', () => {
    bst = deleteNode(bst, 3);
    expect(search(bst, 3)).toBe(false);
    // Verify BST property via inorder traversal
    const inorder = inorderTraversal(bst);
    expect(inorder).toEqual([1, 5, 7, 9]);
  });
});
