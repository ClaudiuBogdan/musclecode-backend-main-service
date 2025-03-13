import { TreeNode, lowestCommonAncestor } from './exercise';

describe('Lowest Common Ancestor (LCA) - Binary Tree', () => {
  let root: TreeNode;
  let nodes: Record<number, TreeNode>;

  beforeEach(() => {
    // Constructing the tree:
    //         3
    //        / \
    //       5   1
    //      / \  / \
    //     6   2 0  8
    //        / \
    //       7   4
    const three = new TreeNode(3);
    const five = new TreeNode(5);
    const one = new TreeNode(1);
    const six = new TreeNode(6);
    const two = new TreeNode(2);
    const zero = new TreeNode(0);
    const eight = new TreeNode(8);
    const seven = new TreeNode(7);
    const four = new TreeNode(4);

    three.left = five;
    three.right = one;
    five.left = six;
    five.right = two;
    one.left = zero;
    one.right = eight;
    two.left = seven;
    two.right = four;

    root = three;
    nodes = {
      3: three,
      5: five,
      1: one,
      6: six,
      2: two,
      0: zero,
      8: eight,
      7: seven,
      4: four,
    };
  });

  test('LCA of nodes 5 and 1 is 3', () => {
    const lca = lowestCommonAncestor(root, nodes[5], nodes[1]);
    expect(lca?.val).toBe(3);
  });

  test('LCA of nodes 5 and 4 is 5', () => {
    const lca = lowestCommonAncestor(root, nodes[5], nodes[4]);
    expect(lca?.val).toBe(5);
  });
});
