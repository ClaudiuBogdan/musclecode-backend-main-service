import unittest
from exercise import Trie

class TestTrie(unittest.TestCase):
    def setUp(self):
        self.trie = Trie()

    def test_basic_operations(self):
        self.trie.insert("apple")
        self.assertTrue(self.trie.search("apple"))
        self.assertFalse(self.trie.search("app"))
        self.assertTrue(self.trie.startsWith("app"))
        self.trie.insert("app")
        self.assertTrue(self.trie.search("app"))

    def test_count_and_erase(self):
        self.trie.insert("apple")
        self.trie.insert("apple")
        self.trie.insert("apps")
        
        self.assertEqual(self.trie.countWordsEqualTo("apple"), 2)
        self.assertEqual(self.trie.countWordsStartingWith("app"), 3)

        self.trie.erase("apple")
        self.assertEqual(self.trie.countWordsEqualTo("apple"), 1)

if __name__ == '__main__':
    unittest.main() 