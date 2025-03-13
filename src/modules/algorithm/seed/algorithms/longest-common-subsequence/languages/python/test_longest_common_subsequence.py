import unittest
from exercise import longest_common_subsequence

class TestLongestCommonSubsequence(unittest.TestCase):
    def test_basic_examples(self):
        self.assertEqual(longest_common_subsequence("abcde", "ace"), 3)
        self.assertEqual(longest_common_subsequence("abc", "abc"), 3)
        self.assertEqual(longest_common_subsequence("abc", "def"), 0)

    def test_empty_strings(self):
        self.assertEqual(longest_common_subsequence("", "abc"), 0)
        self.assertEqual(longest_common_subsequence("abc", ""), 0)

if __name__ == '__main__':
    unittest.main() 