import { Trie } from './exercise';

describe('Trie Data Structure', () => {
  let trie: Trie;

  beforeEach(() => {
    trie = new Trie();
  });

  test('Basic operations: insert, search, and startsWith', () => {
    trie.insert('apple');
    expect(trie.search('apple')).toBe(true);
    expect(trie.search('app')).toBe(false);
    expect(trie.startsWith('app')).toBe(true);

    trie.insert('app');
    expect(trie.search('app')).toBe(true);
  });

  test('Count words and erase operations', () => {
    trie.insert('apple');
    trie.insert('apple');
    trie.insert('apps');

    expect(trie.countWordsEqualTo('apple')).toBe(2);
    expect(trie.countWordsStartingWith('app')).toBe(3);

    trie.erase('apple');
    expect(trie.countWordsEqualTo('apple')).toBe(1);
  });
});
