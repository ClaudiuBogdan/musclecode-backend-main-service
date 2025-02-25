const { AVLTree } = require('./exercise');
const IterativeAVL = require('./iterative-solution').AVLTree;
const RecursiveAVL = require('./recursive-solution').AVLTree;

describe('AVL Tree (Exercise - Stub)', () => {
  let tree;

  beforeEach(() => {
    tree = new AVLTree();
  });

  test('search in empty tree should return null', () => {
    expect(tree.search(10)).toBeNull();
  });

  test('insert and search (stub, expected to fail)', () => {
    tree.insert(40);
    tree.insert(20);
    tree.insert(10);
    tree.insert(25);
    tree.insert(30);
    tree.insert(22);
    const node = tree.search(25);
    // Since exercise is not implemented, this test will fail
    expect(node).toBeNull();
  });
});

describe('AVL Tree Iterative Solution', () => {
  let tree;

  beforeEach(() => {
    tree = new IterativeAVL();
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
  let tree;

  beforeEach(() => {
    tree = new RecursiveAVL();
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