import unittest
from exercise import bubble_sort

class TestBubbleSort(unittest.TestCase):
    def test_example1(self):
        self.assertEqual(bubble_sort([5, 1, 8, 4, 2]), [1, 2, 4, 5, 8])
    
    def test_example2(self):
        self.assertEqual(bubble_sort([29, 10, 14, 37, 14]), [10, 14, 14, 29, 37])
    
    def test_empty_array(self):
        self.assertEqual(bubble_sort([]), [])
    
    def test_already_sorted(self):
        self.assertEqual(bubble_sort([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])

if __name__ == '__main__':
    unittest.main() 