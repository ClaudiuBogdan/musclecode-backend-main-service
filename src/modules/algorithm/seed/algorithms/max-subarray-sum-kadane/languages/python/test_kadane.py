import unittest
from exercise import max_subarray_sum

class TestKadaneAlgorithm(unittest.TestCase):
    def test_basic_functionality(self):
        self.assertEqual(max_subarray_sum([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6)
        self.assertEqual(max_subarray_sum([5, 4, -1, 7, 8]), 23)
        self.assertEqual(max_subarray_sum([-1, -2, -3]), -1)

    def test_all_negative_numbers(self):
        self.assertEqual(max_subarray_sum([-2, -3, -4, -1, -2, -1, -5, -3]), -1)

    def test_empty_array(self):
        self.assertIsNone(max_subarray_sum([]))

    def test_single_element_array(self):
        self.assertEqual(max_subarray_sum([5]), 5)
        self.assertEqual(max_subarray_sum([-5]), -5) 