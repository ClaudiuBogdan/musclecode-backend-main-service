import unittest
from exercise import merge_sort

class TestMergeSort(unittest.TestCase):
    def test_example(self):
        self.assertEqual(
            merge_sort([38, 27, 43, 3, 9, 82, 10]),
            [3, 9, 10, 27, 38, 43, 82]
        )

    def test_empty_array(self):
        self.assertEqual(merge_sort([]), [])

    def test_single_element(self):
        self.assertEqual(merge_sort([5]), [5])
    
    def test_small_unsorted_array(self):
        self.assertEqual(merge_sort([4, 1, 3, 2]), [1, 2, 3, 4])

if __name__ == '__main__':
    unittest.main() 