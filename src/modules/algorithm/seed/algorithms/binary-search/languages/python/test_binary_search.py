import unittest
from typing import List
from exercise import binary_search

class TestBinarySearch(unittest.TestCase):
    def test_basic_functionality(self):
        """Test basic functionality of binary search"""
        self.assertEqual(binary_search([-1, 0, 2, 4, 6, 8], 4), 3)
        self.assertEqual(binary_search([-1, 0, 2, 4, 6, 8], -1), 0)
        self.assertEqual(binary_search([-1, 0, 2, 4, 6, 8], 8), 5)
        self.assertEqual(binary_search([-1, 0, 2, 4, 6, 8], 3), -1)

    def test_edge_cases(self):
        """Test edge cases"""
        self.assertEqual(binary_search([], 1), -1)
        self.assertEqual(binary_search([1], 1), 0)
        self.assertEqual(binary_search([1], 2), -1)
        self.assertEqual(binary_search([1, 2], 1), 0)
        self.assertEqual(binary_search([1, 2], 2), 1)

    def test_large_numbers_and_boundaries(self):
        """Test with large numbers and boundary conditions"""
        self.assertEqual(binary_search([1000000, 2000000, 3000000], 2000000), 1)
        self.assertEqual(binary_search([-5000, -3000, -1000, 0, 1000], -3000), 1)

    def test_additional_coverage(self):
        """Test additional scenarios for better coverage"""
        self.assertEqual(binary_search([1, 3, 5, 7, 9, 11], 7), 3)
        self.assertEqual(binary_search([1, 3, 5, 7, 9], 3), 1)
        self.assertEqual(binary_search([1, 2, 3, 4, 5], 2), 1)
        self.assertEqual(binary_search([1, 2, 3, 4, 5], 4), 3)
        self.assertEqual(binary_search([-10, -5, 0, 5, 10], -5), 1)

    def test_large_arrays(self):
        """Test with large arrays"""
        large_array = list(range(1000000))
        self.assertEqual(binary_search(large_array, 999999), 999999)

if __name__ == '__main__':
    unittest.main() 