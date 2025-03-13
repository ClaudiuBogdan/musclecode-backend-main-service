const { RedBlackTree: IterativeRBTree } = require('./iterative-solution');
const { RedBlackTree: RecursiveRBTree } = require('./recursive-solution');

describe('Red-Black Tree (Iterative Solution)', () => {
  let tree;
  beforeEach(() => {
    tree = new IterativeRBTree();
  });

  test('should insert values and find them', () => {
    tree.insert(10);
    tree.insert(20);
    tree.insert(30);
    expect(tree.search(10)).not.toBeNull();
    expect(tree.search(20)).not.toBeNull();
    expect(tree.search(30)).not.toBeNull();
  });

  test('should return null when value is not found', () => {
    tree.insert(15);
    expect(tree.search(100)).toBeNull();
  });
});

describe('Red-Black Tree (Recursive Solution)', () => {
  let tree;
  beforeEach(() => {
    tree = new RecursiveRBTree();
  });

  test('should insert values and find them', () => {
    tree.insert(5);
    tree.insert(2);
    tree.insert(8);
    expect(tree.search(5)).not.toBeNull();
    expect(tree.search(2)).not.toBeNull();
    expect(tree.search(8)).not.toBeNull();
  });

  test('should return null when value is not found', () => {
    tree.insert(7);
    expect(tree.search(10)).toBeNull();
  });
}); 