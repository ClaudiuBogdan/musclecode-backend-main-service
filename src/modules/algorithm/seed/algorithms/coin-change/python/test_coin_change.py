import unittest
from exercise import coin_change

class TestCoinChange(unittest.TestCase):
    def test_basic_functionality(self):
        self.assertEqual(coin_change([1, 2, 5], 11), 3)
        self.assertEqual(coin_change([2], 3), -1)
    
    def test_edge_cases(self):
        self.assertEqual(coin_change([1, 2, 5], 0), 0)
        self.assertEqual(coin_change([], 10), -1)

    def test_additional(self):
        self.assertEqual(coin_change([1], 2), 2)

if __name__ == '__main__':
    unittest.main() 