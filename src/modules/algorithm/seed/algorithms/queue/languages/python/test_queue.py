import unittest
from exercise import Queue

class TestQueue(unittest.TestCase):
    def test_enqueue(self):
        queue = Queue(5)
        queue.enqueue(10)
        self.assertEqual(queue.peek(), 10)

    def test_dequeue(self):
        queue = Queue(5)
        queue.enqueue(10)
        self.assertEqual(queue.dequeue(), 10)
        self.assertTrue(queue.is_empty())

    def test_peek(self):
        queue = Queue(5)
        queue.enqueue(10)
        queue.enqueue(20)
        self.assertEqual(queue.peek(), 10)

    def test_is_empty(self):
        queue = Queue(5)
        self.assertTrue(queue.is_empty())
        queue.enqueue(10)
        self.assertFalse(queue.is_empty())

    def test_is_full(self):
        queue = Queue(2)
        queue.enqueue(10)
        queue.enqueue(20)
        self.assertTrue(queue.is_full())

    def test_peek_empty_queue(self):
        queue = Queue(5)
        self.assertIsNone(queue.peek())

    def test_dequeue_empty_queue(self):
        queue = Queue(5)
        self.assertIsNone(queue.dequeue())

    def test_enqueue_and_dequeue(self):
        queue = Queue(3)
        queue.enqueue(1)
        queue.enqueue(2)
        self.assertEqual(queue.dequeue(), 1)
        queue.enqueue(3)
        self.assertTrue(queue.is_full())
        self.assertEqual(queue.dequeue(), 2)
        self.assertEqual(queue.dequeue(), 3)
        self.assertTrue(queue.is_empty()) 