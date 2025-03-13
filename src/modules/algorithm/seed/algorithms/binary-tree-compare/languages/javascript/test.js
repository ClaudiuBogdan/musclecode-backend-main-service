const { isSameTree, TreeNode } = require('./exercise');

describe('Binary Tree Compare Algorithm', () => {
  describe('Basic Functionality', () => {
    test('should return true for identical trees', () => {
      // Tree1: [1,2,3]
      const tree1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
      // Tree2: [1,2,3]
      const tree2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));

      expect(isSameTree(tree1, tree2)).toBe(true);
    });

    test('should return false for different trees', () => {
      // Tree1: [1,2,3]
      const tree1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
      // Tree2: [1,2,null,3]
      const tree2 = new TreeNode(
        1,
        new TreeNode(2, new TreeNode(3), null),
        null,
      );

      expect(isSameTree(tree1, tree2)).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    test('should handle null trees', () => {
      expect(isSameTree(null, null)).toBe(true);

      const tree = new TreeNode(1);
      expect(isSameTree(tree, null)).toBe(false);
      expect(isSameTree(null, tree)).toBe(false);
    });

    test('should handle single node trees', () => {
      const tree1 = new TreeNode(1);
      const tree2 = new TreeNode(1);
      const tree3 = new TreeNode(2);

      expect(isSameTree(tree1, tree2)).toBe(true);
      expect(isSameTree(tree1, tree3)).toBe(false);
    });
  });

  describe('Complex Trees', () => {
    test('should handle complex identical trees', () => {
      // Tree1: [1,2,3,4,5,6,7]
      const tree1 = new TreeNode(
        1,
        new TreeNode(2, new TreeNode(4), new TreeNode(5)),
        new TreeNode(3, new TreeNode(6), new TreeNode(7)),
      );

      // Tree2: [1,2,3,4,5,6,7]
      const tree2 = new TreeNode(
        1,
        new TreeNode(2, new TreeNode(4), new TreeNode(5)),
        new TreeNode(3, new TreeNode(6), new TreeNode(7)),
      );

      expect(isSameTree(tree1, tree2)).toBe(true);
    });

    test('should detect differences in complex trees', () => {
      // Tree1: [1,2,3,4,5,6,7]
      const tree1 = new TreeNode(
        1,
        new TreeNode(2, new TreeNode(4), new TreeNode(5)),
        new TreeNode(3, new TreeNode(6), new TreeNode(7)),
      );

      // Tree2: [1,2,3,4,5,6,8] - different value at last node
      const tree2 = new TreeNode(
        1,
        new TreeNode(2, new TreeNode(4), new TreeNode(5)),
        new TreeNode(3, new TreeNode(6), new TreeNode(8)),
      );

      expect(isSameTree(tree1, tree2)).toBe(false);
    });
  });
});
