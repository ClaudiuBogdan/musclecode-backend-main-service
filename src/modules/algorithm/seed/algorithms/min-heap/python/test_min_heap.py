import unittest
from exercise import MinHeap

class TestMinHeap(unittest.TestCase):
    def setUp(self):
        self.min_heap = MinHeap()

    def test_insert(self):
        self.min_heap.insert(5)
        self.min_heap.insert(3)
        self.min_heap.insert(7)
        self.assertEqual(self.min_heap.size(), 3)

    def test_extract_min(self):
        self.min_heap.insert(5)
        self.min_heap.insert(3)
        self.min_heap.insert(7)
        self.assertEqual(self.min_heap.extract_min(), 3)
        self.assertEqual(self.min_heap.size(), 2)

    def test_peek(self):
        self.min_heap.insert(5)
        self.min_heap.insert(3)
        self.min_heap.insert(7)
        self.assertEqual(self.min_heap.peek(), 3)
        self.assertEqual(self.min_heap.size(), 3)

    def test_extract_min_empty(self):
        self.assertIsNone(self.min_heap.extract_min())

    def test_peek_empty(self):
        self.assertIsNone(self.min_heap.peek())

if __name__ == '__main__':
    unittest.main() 