class TrieNode {
  children: Map<string, TrieNode>;
  wordCount: number;
  prefixCount: number;

  constructor() {
    this.children = new Map();
    this.wordCount = 0;
    this.prefixCount = 0;
  }
}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
      node.prefixCount++;
    }
    node.wordCount++;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return node.wordCount > 0;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return node.prefixCount > 0;
  }

  countWordsEqualTo(word: string): number {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        return 0;
      }
      node = node.children.get(char)!;
    }
    return node.wordCount;
  }

  countWordsStartingWith(prefix: string): number {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return 0;
      }
      node = node.children.get(char)!;
    }
    return node.prefixCount;
  }

  erase(word: string): void {
    if (!this.search(word)) return;
    let node = this.root;
    for (const char of word) {
      const child = node.children.get(char)!;
      child.prefixCount--;
      node = child;
    }
    node.wordCount--;
  }
}
