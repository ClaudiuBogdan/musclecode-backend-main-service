import {
  TreeNode,
  inOrderTraversal,
  preOrderTraversal,
  postOrderTraversal,
} from './exercise';

function createSampleTree(): TreeNode {
  // Constructing the sample binary tree:
  //      1
  //     / \
  //    2   3
  //   / \   \
  //  4   5   6
  const node4: TreeNode = { val: 4, left: null, right: null };
  const node5: TreeNode = { val: 5, left: null, right: null };
  const node6: TreeNode = { val: 6, left: null, right: null };
  const node2: TreeNode = { val: 2, left: node4, right: node5 };
  const node3: TreeNode = { val: 3, left: null, right: node6 };
  const root: TreeNode = { val: 1, left: node2, right: node3 };

  return root;
}

describe('Binary Tree Traversal', () => {
  let root: TreeNode;

  beforeEach(() => {
    root = createSampleTree();
  });

  it('should correctly perform in-order traversal', () => {
    // Expected in-order: [4, 2, 5, 1, 3, 6]
    expect(inOrderTraversal(root)).toEqual([4, 2, 5, 1, 3, 6]);
  });

  it('should correctly perform pre-order traversal', () => {
    // Expected pre-order: [1, 2, 4, 5, 3, 6]
    expect(preOrderTraversal(root)).toEqual([1, 2, 4, 5, 3, 6]);
  });

  it('should correctly perform post-order traversal', () => {
    // Expected post-order: [4, 5, 2, 6, 3, 1]
    expect(postOrderTraversal(root)).toEqual([4, 5, 2, 6, 3, 1]);
  });
});
