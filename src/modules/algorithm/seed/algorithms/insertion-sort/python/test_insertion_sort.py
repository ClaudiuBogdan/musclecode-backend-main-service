import unittest
from exercise import insertion_sort

class TestInsertionSort(unittest.TestCase):
    def test_basic(self):
        self.assertEqual(insertion_sort([29, 10, 14, 37, 14]), [10, 14, 14, 29, 37])
        self.assertEqual(insertion_sort([6, 2, 10, 7]), [2, 6, 7, 10])
    
    def test_edge_cases(self):
        self.assertEqual(insertion_sort([]), [])
        self.assertEqual(insertion_sort([5]), [5])

if __name__ == '__main__':
    unittest.main() 