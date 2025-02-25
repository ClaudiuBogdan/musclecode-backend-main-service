const {
  TreeNode,
  inOrderTraversal,
  preOrderTraversal,
  postOrderTraversal,
} = require('./exercise');

function createSampleTree() {
  // Constructing the sample binary tree:
  //      1
  //     / \
  //    2   3
  //   / \   \
  //  4   5   6
  const node4 = new TreeNode(4);
  const node5 = new TreeNode(5);
  const node6 = new TreeNode(6);
  const node2 = new TreeNode(2, node4, node5);
  const node3 = new TreeNode(3, null, node6);
  return new TreeNode(1, node2, node3);
}

describe('Binary Tree Traversal', () => {
  const root = createSampleTree();

  test('in-order traversal', () => {
    // Expected in-order: [4, 2, 5, 1, 3, 6]
    expect(inOrderTraversal(root)).toEqual([4, 2, 5, 1, 3, 6]);
  });

  test('pre-order traversal', () => {
    // Expected pre-order: [1, 2, 4, 5, 3, 6]
    expect(preOrderTraversal(root)).toEqual([1, 2, 4, 5, 3, 6]);
  });

  test('post-order traversal', () => {
    // Expected post-order: [4, 5, 2, 6, 3, 1]
    expect(postOrderTraversal(root)).toEqual([4, 5, 2, 6, 3, 1]);
  });
});
