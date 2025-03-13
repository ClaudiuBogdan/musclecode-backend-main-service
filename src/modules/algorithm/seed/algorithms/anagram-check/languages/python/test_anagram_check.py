import unittest
from exercise import is_anagram

class TestAnagramCheck(unittest.TestCase):
    def test_anagrams(self):
        self.assertTrue(is_anagram("listen", "silent"))
        self.assertTrue(is_anagram("triangle", "integral"))

    def test_non_anagrams(self):
        self.assertFalse(is_anagram("hello", "world"))
        self.assertFalse(is_anagram("abc", "ab"))

    def test_empty_strings(self):
        self.assertTrue(is_anagram("", ""))

if __name__ == "__main__":
    unittest.main() 