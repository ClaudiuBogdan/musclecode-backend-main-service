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
    this._insert(this.root, word, 0);
  }

  private _insert(node: TrieNode, word: string, index: number): void {
    if (index === word.length) {
      node.wordCount++;
      return;
    }
    const char = word[index];
    if (!node.children.has(char)) {
      node.children.set(char, new TrieNode());
    }
    const child = node.children.get(char)!;
    child.prefixCount++;
    this._insert(child, word, index + 1);
  }

  search(word: string): boolean {
    return this._search(this.root, word, 0);
  }

  private _search(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      return node.wordCount > 0;
    }
    const char = word[index];
    if (!node.children.has(char)) {
      return false;
    }
    return this._search(node.children.get(char)!, word, index + 1);
  }

  startsWith(prefix: string): boolean {
    return this._startsWith(this.root, prefix, 0);
  }

  private _startsWith(node: TrieNode, prefix: string, index: number): boolean {
    if (index === prefix.length) {
      return true;
    }
    const char = prefix[index];
    if (!node.children.has(char)) {
      return false;
    }
    return this._startsWith(node.children.get(char)!, prefix, index + 1);
  }

  countWordsEqualTo(word: string): number {
    return this._countWordsEqualTo(this.root, word, 0);
  }

  private _countWordsEqualTo(
    node: TrieNode,
    word: string,
    index: number,
  ): number {
    if (index === word.length) {
      return node.wordCount;
    }
    const char = word[index];
    if (!node.children.has(char)) {
      return 0;
    }
    return this._countWordsEqualTo(node.children.get(char)!, word, index + 1);
  }

  countWordsStartingWith(prefix: string): number {
    return this._countWordsStartingWith(this.root, prefix, 0);
  }

  private _countWordsStartingWith(
    node: TrieNode,
    prefix: string,
    index: number,
  ): number {
    if (index === prefix.length) {
      return node.prefixCount;
    }
    const char = prefix[index];
    if (!node.children.has(char)) {
      return 0;
    }
    return this._countWordsStartingWith(
      node.children.get(char)!,
      prefix,
      index + 1,
    );
  }

  erase(word: string): void {
    if (!this.search(word)) return;
    this._erase(this.root, word, 0);
  }

  private _erase(node: TrieNode, word: string, index: number): void {
    if (index === word.length) {
      node.wordCount--;
      return;
    }
    const char = word[index];
    const child = node.children.get(char)!;
    child.prefixCount--;
    this._erase(child, word, index + 1);
  }
}
