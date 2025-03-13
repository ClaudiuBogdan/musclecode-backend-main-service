class TrieNode {
  constructor() {
    this.children = new Map();
    this.wordCount = 0;
    this.prefixCount = 0;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    this._insert(this.root, word, 0);
  }

  _insert(node, word, index) {
    if (index === word.length) {
      node.wordCount++;
      return;
    }
    const char = word[index];
    if (!node.children.has(char)) {
      node.children.set(char, new TrieNode());
    }
    const child = node.children.get(char);
    child.prefixCount++;
    this._insert(child, word, index + 1);
  }

  search(word) {
    return this._search(this.root, word, 0);
  }

  _search(node, word, index) {
    if (index === word.length) {
      return node.wordCount > 0;
    }
    const char = word[index];
    if (!node.children.has(char)) return false;
    return this._search(node.children.get(char), word, index + 1);
  }

  startsWith(prefix) {
    return this._startsWith(this.root, prefix, 0);
  }

  _startsWith(node, prefix, index) {
    if (index === prefix.length) {
      return true;
    }
    const char = prefix[index];
    if (!node.children.has(char)) return false;
    return this._startsWith(node.children.get(char), prefix, index + 1);
  }

  countWordsEqualTo(word) {
    return this._countWordsEqualTo(this.root, word, 0);
  }

  _countWordsEqualTo(node, word, index) {
    if (index === word.length) {
      return node.wordCount;
    }
    const char = word[index];
    if (!node.children.has(char)) return 0;
    return this._countWordsEqualTo(node.children.get(char), word, index + 1);
  }

  countWordsStartingWith(prefix) {
    return this._countWordsStartingWith(this.root, prefix, 0);
  }

  _countWordsStartingWith(node, prefix, index) {
    if (index === prefix.length) {
      return node.prefixCount;
    }
    const char = prefix[index];
    if (!node.children.has(char)) return 0;
    return this._countWordsStartingWith(
      node.children.get(char),
      prefix,
      index + 1,
    );
  }

  erase(word) {
    if (!this.search(word)) return;
    this._erase(this.root, word, 0);
  }

  _erase(node, word, index) {
    if (index === word.length) {
      node.wordCount--;
      return;
    }
    const char = word[index];
    const child = node.children.get(char);
    child.prefixCount--;
    this._erase(child, word, index + 1);
  }
}

module.exports = { Trie };
