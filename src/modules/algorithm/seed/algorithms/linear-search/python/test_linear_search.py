import unittest
from exercise import linear_search

class TestLinearSearch(unittest.TestCase):
    def test_basic_functionality(self):
        self.assertEqual(linear_search([13, 9, 21, 15, 39, 19, 27], 21), 2)
        self.assertEqual(linear_search([13, 9, 21, 15, 39, 19, 27], 99), -1)

    def test_edge_cases(self):
        self.assertEqual(linear_search([], 10), -1)
        self.assertEqual(linear_search([5], 5), 0)
        self.assertEqual(linear_search([5], 3), -1)

    def test_large_array(self):
        large_array = list(range(1000))
        self.assertEqual(linear_search(large_array, 500), 500)

if __name__ == '__main__':
    unittest.main() 