import { AVLTree } from './exercise';

describe('AVL Tree (Exercise - Incomplete Implementation)', () => {
  let tree: AVLTree;

  beforeEach(() => {
    tree = new AVLTree();
  });

  test('search in an empty tree should return null', () => {
    expect(tree.search(10)).toBeNull();
  });

  test('insert and search', () => {
    // Since exercise file is not implemented yet, these tests will fail.
    tree.insert(40);
    tree.insert(20);
    tree.insert(10);
    tree.insert(25);
    tree.insert(30);
    tree.insert(22);

    const node = tree.search(25);
    expect(node).not.toBeNull();
    if (node) {
      expect(node.value).toBe(25);
    }
  });
});

describe('AVL Tree Iterative Solution', () => {
  // Import the iterative solution version if needed. For testing, use one of them.
  const { AVLTree: IterativeAVLTree } = require('./iterative-solution');

  let tree: InstanceType<typeof IterativeAVLTree>;

  beforeEach(() => {
    tree = new IterativeAVLTree();
  });

  test('iterative insert and search', () => {
    tree.insert(40);
    tree.insert(20);
    tree.insert(10);
    tree.insert(25);
    tree.insert(30);
    tree.insert(22);

    const node = tree.search(22);
    expect(node).not.toBeNull();
    if (node) {
      expect(node.value).toBe(22);
    }
  });
});

describe('AVL Tree Recursive Solution', () => {
  const { AVLTree: RecursiveAVLTree } = require('./recursive-solution');

  let tree: InstanceType<typeof RecursiveAVLTree>;

  beforeEach(() => {
    tree = new RecursiveAVLTree();
  });

  test('recursive insert and search', () => {
    tree.insert(40);
    tree.insert(20);
    tree.insert(10);
    tree.insert(25);
    tree.insert(30);
    tree.insert(22);

    const node = tree.search(30);
    expect(node).not.toBeNull();
    if (node) {
      expect(node.value).toBe(30);
    }
  });
}); 