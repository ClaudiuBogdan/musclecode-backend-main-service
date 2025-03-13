class TrieNode:
    def __init__(self):
        self.children = {}
        self.word_count = 0
        self.prefix_count = 0

class Trie:
    def __init__(self):
        # TODO: Initialize your trie.
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        # TODO: Insert word into trie.
        pass

    def search(self, word: str) -> bool:
        # TODO: Return True if word is in the trie, False otherwise.
        return False

    def startsWith(self, prefix: str) -> bool:
        # TODO: Return True if any word in trie starts with the prefix.
        return False

    def countWordsEqualTo(self, word: str) -> int:
        # TODO: Return count of the exact word.
        return 0

    def countWordsStartingWith(self, prefix: str) -> int:
        # TODO: Return count of words starting with the prefix.
        return 0

    def erase(self, word: str) -> None:
        # TODO: Erase one occurrence of the word.
        pass 