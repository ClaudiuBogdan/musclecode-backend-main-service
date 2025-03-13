const { binaryTreeDFS } = require('./exercise');

describe('Binary Tree DFS (Pre-order Traversal)', () => {
  test('should perform DFS correctly for a numeric binary tree', () => {
    const tree = {
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

  test('should perform DFS correctly for a string binary tree', () => {
    const tree = {
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

  test('should return an empty array for a null tree', () => {
    expect(binaryTreeDFS(null)).toEqual([]);
  });
});
