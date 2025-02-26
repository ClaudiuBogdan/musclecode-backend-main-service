import unittest
from exercise import ArrayList

class TestArrayList(unittest.TestCase):
    def test_add_elements(self):
        list_ = ArrayList()
        list_.add(1)
        list_.add(2)
        list_.add(3)
        self.assertEqual(list_.size(), 3)
        self.assertEqual(list_.get(0), 1)
        self.assertEqual(list_.get(1), 2)
        self.assertEqual(list_.get(2), 3)

    def test_remove_elements(self):
        list_ = ArrayList()
        list_.add('apple')
        list_.add('banana')
        list_.add('orange')
        list_.remove(1)
        self.assertEqual(list_.size(), 2)
        self.assertEqual(list_.get(0), 'apple')
        self.assertEqual(list_.get(1), 'orange')
        with self.assertRaises(IndexError):
            list_.get(2)

    def test_remove_from_empty_list(self):
        list_ = ArrayList()
        with self.assertRaises(IndexError):
            list_.remove(0)
        self.assertEqual(list_.size(), 0)

    def test_remove_from_beginning_and_end(self):
        list_ = ArrayList()
        list_.add(1)
        list_.add(2)
        list_.add(3)
        list_.remove(0)
        self.assertEqual(list_.size(), 2)
        self.assertEqual(list_.get(0), 2)
        self.assertEqual(list_.get(1), 3)

        list_.remove(1)
        self.assertEqual(list_.size(), 1)
        self.assertEqual(list_.get(0), 2) 