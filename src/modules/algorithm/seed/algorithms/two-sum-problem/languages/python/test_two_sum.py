import unittest
from exercise import two_sum

class TestTwoSum(unittest.TestCase):
    def test_basic_functionality(self):
        self.assertEqual(two_sum([2, 7, 11, 15], 9), [0, 1])
        self.assertEqual(two_sum([3, 2, 4], 6), [1, 2])
        self.assertEqual(two_sum([3, 3], 6), [0, 1])

    def test_no_solution(self):
        self.assertEqual(two_sum([1, 2, 3], 10), None) 