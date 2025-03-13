import unittest
from exercise import SinglyLinkedList, Node

class TestSinglyLinkedList(unittest.TestCase):
    def setUp(self):
        self.list = SinglyLinkedList()

    def test_insert_at_beginning(self):
        self.list.insert_at_beginning(10)
        self.assertEqual(self.list.head.data, 10)

    def test_insert_at_end(self):
        self.list.insert_at_end(20)
        self.assertEqual(self.list.head.data, 20)
        self.list.insert_at_end(30)
        self.assertEqual(self.list.head.next.data, 30)

    def test_delete(self):
        self.list.insert_at_end(10)
        self.list.insert_at_end(20)
        self.list.delete(10)
        self.assertEqual(self.list.head.data, 20)

    def test_search(self):
        self.list.insert_at_end(10)
        self.list.insert_at_end(20)
        node = self.list.search(20)
        self.assertEqual(node.data, 20)

    def test_display(self):
        self.list.insert_at_end(10)
        self.list.insert_at_end(20)
        # This test needs to be improved to capture stdout
        self.list.display()

if __name__ == '__main__':
    unittest.main() 