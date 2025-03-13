import unittest
from exercise import RingBuffer

class TestRingBuffer(unittest.TestCase):
    def test_enqueue_and_dequeue_elements_correctly(self):
        buffer = RingBuffer[int](3)
        buffer.enqueue(1)
        buffer.enqueue(2)
        buffer.enqueue(3)
        self.assertEqual(buffer.dequeue(), 1)
        self.assertEqual(buffer.dequeue(), 2)
        self.assertEqual(buffer.dequeue(), 3)
        self.assertEqual(buffer.dequeue(), None)

    def test_overwrite_elements_when_the_buffer_is_full(self):
        buffer = RingBuffer[int](3)
        buffer.enqueue(1)
        buffer.enqueue(2)
        buffer.enqueue(3)
        buffer.enqueue(4)
        self.assertEqual(buffer.dequeue(), 2)
        self.assertEqual(buffer.dequeue(), 3)
        self.assertEqual(buffer.dequeue(), 4)

    def test_handle_enqueue_and_dequeue_operations_after_overwrite(self):
        buffer = RingBuffer[int](3)
        buffer.enqueue(1)
        buffer.enqueue(2)
        buffer.enqueue(3)
        buffer.enqueue(4)
        self.assertEqual(buffer.dequeue(), 2)
        buffer.enqueue(5)
        self.assertEqual(buffer.dequeue(), 3)
        self.assertEqual(buffer.dequeue(), 4)
        self.assertEqual(buffer.dequeue(), 5)
        self.assertTrue(buffer.is_empty())

    def test_report_correct_counts_and_empty_full_status(self):
        buffer = RingBuffer[int](3)
        self.assertTrue(buffer.is_empty())
        self.assertFalse(buffer.is_full())
        buffer.enqueue(1)
        self.assertEqual(buffer.get_count(), 1)
        self.assertFalse(buffer.is_empty())
        self.assertFalse(buffer.is_full())
        buffer.enqueue(2)
        buffer.enqueue(3)
        self.assertTrue(buffer.is_full())
        buffer.dequeue()
        self.assertFalse(buffer.is_full())
        self.assertEqual(buffer.get_count(), 2) 