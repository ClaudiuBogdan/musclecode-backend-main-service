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
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
      node.prefixCount++;
    }
    node.wordCount++;
  }

  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char);
    }
    return node.wordCount > 0;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char);
    }
    return node.prefixCount > 0;
  }

  countWordsEqualTo(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        return 0;
      }
      node = node.children.get(char);
    }
    return node.wordCount;
  }

  countWordsStartingWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return 0;
      }
      node = node.children.get(char);
    }
    return node.prefixCount;
  }

  erase(word) {
    if (!this.search(word)) return;
    let node = this.root;
    for (const char of word) {
      let child = node.children.get(char);
      child.prefixCount--;
      node = child;
    }
    node.wordCount--;
  }
}

module.exports = { Trie };
