import unittest
from exercise import MaxHeap

class TestMaxHeap(unittest.TestCase):
    def test_build_max_heap(self):
        heap = MaxHeap([5, 3, 8, 4, 1, 9, 7])
        self.assertEqual(heap.peek(), 9)

    def test_insert(self):
        heap = MaxHeap([5, 3, 8, 4, 1, 9, 7])
        heap.insert(10)
        self.assertEqual(heap.peek(), 10)

    def test_extract_max(self):
        heap = MaxHeap([5, 3, 8, 4, 1, 9, 7])
        self.assertEqual(heap.extract_max(), 9)
        self.assertEqual(heap.peek(), 8)

    def test_peek(self):
        heap = MaxHeap([5, 3, 8, 4, 1, 9, 7])
        self.assertEqual(heap.peek(), 9)

    def test_size(self):
        heap = MaxHeap([5, 3, 8, 4, 1, 9, 7])
        self.assertEqual(heap.size(), 7)

    def test_empty_heap(self):
        heap = MaxHeap([])
        self.assertEqual(heap.extract_max(), None)
        self.assertEqual(heap.peek(), None)
        self.assertEqual(heap.size(), 0) 