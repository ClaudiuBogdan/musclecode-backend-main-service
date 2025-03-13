import { bfs, TreeNode } from './exercise';

describe('Breadth-First Search (BFS) - Exercise', () => {
  it('should return an empty array for an empty tree', () => {
    expect(bfs(null)).toEqual([]);
  });

  it('should return correct BFS traversal for a tree with one node', () => {
    const root: TreeNode = { val: 1 };
    expect(bfs(root)).toEqual([1]);
  });

  it('should return correct level order traversal for a binary tree', () => {
    // Constructing the tree:
    //       1
    //      / \
    //     2   3
    //    / \   \
    //   4   5   6
    const root: TreeNode = {
      val: 1,
      left: {
        val: 2,
        left: { val: 4 },
        right: { val: 5 },
      },
      right: {
        val: 3,
        right: { val: 6 },
      },
    };
    expect(bfs(root)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
