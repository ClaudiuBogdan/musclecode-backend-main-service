import unittest
from exercise import quick_sort

class TestQuickSort(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(quick_sort([20, 13, 3, 2, 10, 1, 5, 6]), [1, 2, 3, 5, 6, 10, 13, 20])

    def test_example2(self):
        self.assertEqual(quick_sort([64, 34, 25, 12, 22, 11, 90, 5]), [5, 11, 12, 22, 25, 34, 64, 90])

    def test_empty(self):
        self.assertEqual(quick_sort([]), [])

    def test_single_element(self):
        self.assertEqual(quick_sort([42]), [42])

if __name__ == '__main__':
    unittest.main() 