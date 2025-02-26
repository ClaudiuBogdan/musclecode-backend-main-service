import unittest
from exercise import LRUCache

class TestLRUCache(unittest.TestCase):
    def test_basic_functionality(self):
        lRUCache = LRUCache(2)
        lRUCache.put(1, 1)
        lRUCache.put(2, 2)
        self.assertEqual(lRUCache.get(1), 1)
        lRUCache.put(3, 3)
        self.assertEqual(lRUCache.get(2), -1)
        lRUCache.put(4, 4)
        self.assertEqual(lRUCache.get(1), -1)
        self.assertEqual(lRUCache.get(3), 3)
        self.assertEqual(lRUCache.get(4), 4)

    def test_capacity_of_one(self):
        lRUCache = LRUCache(1)
        lRUCache.put(1, 1)
        self.assertEqual(lRUCache.get(1), 1)
        lRUCache.put(2, 2)
        self.assertEqual(lRUCache.get(1), -1)
        self.assertEqual(lRUCache.get(2), 2)

    def test_update_existing_key(self):
        lRUCache = LRUCache(2)
        lRUCache.put(1, 1)
        lRUCache.put(2, 2)
        lRUCache.put(1, 3)
        self.assertEqual(lRUCache.get(1), 3) 