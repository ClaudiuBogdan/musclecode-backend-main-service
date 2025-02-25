import { binaryTreeDFS, TreeNode } from './exercise';

describe('Binary Tree DFS (Pre-order Traversal)', () => {
  it('should perform DFS correctly for a numeric binary tree', () => {
    const tree: TreeNode = {
      val: 1,
      left: {
        val: 2,
        left: { val: 4, left: null, right: null },
        right: { val: 5, left: null, right: null },
      },
      right: {
        val: 3,
        left: null,
        right: { val: 6, left: null, right: null },
      },
    };
    expect(binaryTreeDFS(tree)).toEqual([1, 2, 4, 5, 3, 6]);
  });

  it('should perform DFS correctly for a string binary tree', () => {
    const tree: TreeNode = {
      val: 'A',
      left: { val: 'B', left: null, right: null },
      right: {
        val: 'C',
        left: { val: 'D', left: null, right: null },
        right: null,
      },
    };
    expect(binaryTreeDFS(tree)).toEqual(['A', 'B', 'C', 'D']);
  });

  it('should return an empty array for an empty tree', () => {
    expect(binaryTreeDFS(null)).toEqual([]);
  });
});
