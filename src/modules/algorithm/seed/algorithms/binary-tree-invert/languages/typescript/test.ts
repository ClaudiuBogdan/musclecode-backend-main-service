import { invertTree, TreeNode } from './exercise';

function treeToArray(root: TreeNode | null): (number | null)[] {
  const result: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
    }
  }
  return result;
}

describe('Invert Binary Tree', () => {
  it('should invert the binary tree correctly', () => {
    // Construct the original tree:
    //         4
    //       /   \
    //      2     7
    //     / \   / \
    //    1   3 6   9
    const root = new TreeNode(
      4,
      new TreeNode(2, new TreeNode(1), new TreeNode(3)),
      new TreeNode(7, new TreeNode(6), new TreeNode(9))
    );
    
    // Expected inverted tree:
    //         4
    //       /   \
    //      7     2
    //     / \   / \
    //    9   6 3   1
    const expectedRoot = new TreeNode(
      4,
      new TreeNode(7, new TreeNode(9), new TreeNode(6)),
      new TreeNode(2, new TreeNode(3), new TreeNode(1))
    );
    
    const inverted = invertTree(root);
    
    // Compare level order traversal (ignoring trailing nulls)
    expect(treeToArray(inverted)).toEqual(treeToArray(expectedRoot));
  });

  it('should return null for an empty tree', () => {
    expect(invertTree(null)).toBeNull();
  });
}); 