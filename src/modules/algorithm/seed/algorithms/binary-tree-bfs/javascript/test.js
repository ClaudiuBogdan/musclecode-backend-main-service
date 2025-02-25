const { TreeNode, bfs } = require('./exercise');

describe('Breadth-First Search (BFS)', () => {
  test('should return an empty array for an empty tree', () => {
    expect(bfs(null)).toEqual([]);
  });

  test('should return correct BFS for a single node tree', () => {
    const root = new TreeNode(1);
    expect(bfs(root)).toEqual([1]);
  });

  test('should return correct BFS for a binary tree', () => {
    // Constructing the tree:
    //       1
    //      / \
    //     2   3
    //    / \   \
    //   4   5   6
    const root = new TreeNode(
      1,
      new TreeNode(2, new TreeNode(4), new TreeNode(5)),
      new TreeNode(3, null, new TreeNode(6)),
    );
    expect(bfs(root)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
