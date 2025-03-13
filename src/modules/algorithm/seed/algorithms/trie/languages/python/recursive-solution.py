class TrieNode:
    def __init__(self):
        self.children = {}
        self.word_count = 0
        self.prefix_count = 0

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        self._insert(self.root, word, 0)

    def _insert(self, node: TrieNode, word: str, index: int) -> None:
        if index == len(word):
            node.word_count += 1
            return
        char = word[index]
        if char not in node.children:
            node.children[char] = TrieNode()
        child = node.children[char]
        child.prefix_count += 1
        self._insert(child, word, index + 1)

    def search(self, word: str) -> bool:
        return self._search(self.root, word, 0)

    def _search(self, node: TrieNode, word: str, index: int) -> bool:
        if index == len(word):
            return node.word_count > 0
        char = word[index]
        if char not in node.children:
            return False
        return self._search(node.children[char], word, index + 1)

    def startsWith(self, prefix: str) -> bool:
        return self._startsWith(self.root, prefix, 0)

    def _startsWith(self, node: TrieNode, prefix: str, index: int) -> bool:
        if index == len(prefix):
            return True
        char = prefix[index]
        if char not in node.children:
            return False
        return self._startsWith(node.children[char], prefix, index + 1)

    def countWordsEqualTo(self, word: str) -> int:
        return self._countWordsEqualTo(self.root, word, 0)

    def _countWordsEqualTo(self, node: TrieNode, word: str, index: int) -> int:
        if index == len(word):
            return node.word_count
        char = word[index]
        if char not in node.children:
            return 0
        return self._countWordsEqualTo(node.children[char], word, index + 1)

    def countWordsStartingWith(self, prefix: str) -> int:
        return self._countWordsStartingWith(self.root, prefix, 0)

    def _countWordsStartingWith(self, node: TrieNode, prefix: str, index: int) -> int:
        if index == len(prefix):
            return node.prefix_count
        char = prefix[index]
        if char not in node.children:
            return 0
        return self._countWordsStartingWith(node.children[char], prefix, index + 1)

    def erase(self, word: str) -> None:
        if not self.search(word):
            return
        self._erase(self.root, word, 0)

    def _erase(self, node: TrieNode, word: str, index: int) -> None:
        if index == len(word):
            node.word_count -= 1
            return
        char = word[index]
        child = node.children[char]
        child.prefix_count -= 1
        self._erase(child, word, index + 1) 