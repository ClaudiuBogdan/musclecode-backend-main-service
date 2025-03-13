import unittest
from exercise import DoublyLinkedList

class TestDoublyLinkedList(unittest.TestCase):
    def setUp(self):
        self.list = DoublyLinkedList()

    def test_append(self):
        self.list.append(1)
        self.list.append(2)
        self.list.append(3)
        self.assertEqual(self.list.size, 3)

    def test_prepend(self):
        self.list.prepend(1)
        self.list.prepend(2)
        self.assertEqual(self.list.size, 2)

    def test_delete(self):
        self.list.append(1)
        self.list.append(2)
        self.list.append(3)
        self.list.delete(2)
        self.assertEqual(self.list.size, 2)

    def test_find(self):
        self.list.append(1)
        self.list.append(2)
        self.list.append(3)
        node = self.list.find(2)
        self.assertEqual(node.data, 2)

    def test_find_not_found(self):
        self.list.append(1)
        self.list.append(2)
        self.list.append(3)
        node = self.list.find(4)
        self.assertIsNone(node) 