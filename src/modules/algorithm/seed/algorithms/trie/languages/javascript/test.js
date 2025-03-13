const { Trie } = require('./exercise');

describe('Trie Data Structure', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  test('insert, search, and startsWith', () => {
    trie.insert('apple');
    expect(trie.search('apple')).toBe(true);
    expect(trie.search('app')).toBe(false);
    expect(trie.startsWith('app')).toBe(true);

    trie.insert('app');
    expect(trie.search('app')).toBe(true);
  });

  test('countWords and erase operations', () => {
    trie.insert('apple');
    trie.insert('apple');
    trie.insert('apps');

    expect(trie.countWordsEqualTo('apple')).toBe(2);
    expect(trie.countWordsStartingWith('app')).toBe(3);

    trie.erase('apple');
    expect(trie.countWordsEqualTo('apple')).toBe(1);
  });
});
