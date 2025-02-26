import unittest
from exercise import HashMap

class TestHashMap(unittest.TestCase):
    def test_insert_and_retrieve_values(self):
        hash_map = HashMap(16)
        hash_map.put('key1', 'value1')
        hash_map.put('key2', 'value2')
        self.assertEqual(hash_map.get('key1'), 'value1')
        self.assertEqual(hash_map.get('key2'), 'value2')

    def test_return_none_for_non_existent_keys(self):
        hash_map = HashMap(16)
        self.assertIsNone(hash_map.get('nonExistentKey'))

    def test_update_values_for_existing_keys(self):
        hash_map = HashMap(16)
        hash_map.put('key1', 1)
        hash_map.put('key1', 2)
        self.assertEqual(hash_map.get('key1'), 2)

    def test_remove_key_value_pairs(self):
        hash_map = HashMap(16)
        hash_map.put('key1', 1)
        hash_map.remove('key1')
        self.assertIsNone(hash_map.get('key1'))
        self.assertEqual(hash_map.size(), 0)

    def test_return_the_correct_size(self):
        hash_map = HashMap(16)
        hash_map.put('key1', 1)
        hash_map.put('key2', 2)
        self.assertEqual(hash_map.size(), 2)

    def test_return_true_if_the_hash_map_is_empty_false_otherwise(self):
        hash_map = HashMap(16)
        self.assertTrue(hash_map.is_empty())
        hash_map.put('key1', 1)
        self.assertFalse(hash_map.is_empty()) 