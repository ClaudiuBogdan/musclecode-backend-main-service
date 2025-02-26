import unittest
from exercise import huffman_encoding

class TestHuffmanEncoding(unittest.TestCase):
    def test_basic_functionality(self):
        characters = ['a', 'b', 'c', 'd', 'e', 'f']
        frequencies = [5, 2, 1, 1, 2, 4]
        result = huffman_encoding(characters, frequencies)
        self.assertEqual(result, {
            'f': '0',
            'c': '100',
            'd': '101',
            'a': '1100',
            'b': '1101',
            'e': '111'
        })

    def test_different_characters_and_frequencies(self):
        characters = ['a', 'b', 'r', 'c', 'd']
        frequencies = [5, 2, 2, 1, 1]
        result = huffman_encoding(characters, frequencies)
        self.assertEqual(result, {'a': '0', 'r': '10', 'b': '111', 'c': '1100', 'd': '1101'})

    def test_single_character_input(self):
        characters = ['a']
        frequencies = [1]
        result = huffman_encoding(characters, frequencies)
        self.assertEqual(result, {'a': '0'})

    def test_empty_input_arrays(self):
        characters = []
        frequencies = []
        result = huffman_encoding(characters, frequencies)
        self.assertEqual(result, {}) 