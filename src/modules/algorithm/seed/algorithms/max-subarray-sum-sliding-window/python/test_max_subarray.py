import unittest
from exercise import max_subarray_sum

class TestMaxSubarraySum(unittest.TestCase):
    def test_basic_functionality(self):
        self.assertEqual(max_subarray_sum([2, 1, 5, 1, 3, 2], 3), 9)
        self.assertEqual(max_subarray_sum([5, 6, 1, 2, 6, 6, 4, 3], 3), 16)

    def test_edge_cases(self):
        self.assertEqual(max_subarray_sum([1, 2, 3], 4), None)
        self.assertEqual(max_subarray_sum([], 2), None)
        self.assertEqual(max_subarray_sum([1, 2, 3, 4, 5], 1), 5) 