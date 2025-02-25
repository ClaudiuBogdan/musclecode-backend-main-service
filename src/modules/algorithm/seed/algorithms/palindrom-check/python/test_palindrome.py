import unittest
from exercise import is_palindrome

class TestPalindrome(unittest.TestCase):
    def test_simple_palindrome(self):
        self.assertTrue(is_palindrome("madam"))

    def test_odd_length_palindrome(self):
        self.assertTrue(is_palindrome("racecar"))

    def test_non_palindrome(self):
        self.assertFalse(is_palindrome("hello"))

    def test_ignore_case_spaces_punctuation(self):
        self.assertTrue(is_palindrome("A man, a plan, a canal: Panama"))

    def test_empty_string(self):
        self.assertTrue(is_palindrome(""))

if __name__ == '__main__':
    unittest.main() 