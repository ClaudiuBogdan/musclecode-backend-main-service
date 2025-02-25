import unittest
from exercise import fibonacci_sequence

class TestFibonacciSequence(unittest.TestCase):
    def test_fibonacci_7(self):
        self.assertEqual(fibonacci_sequence(7), [0, 1, 1, 2, 3, 5, 8])
    
    def test_fibonacci_10(self):
        self.assertEqual(fibonacci_sequence(10), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34])
    
    def test_non_positive(self):
        self.assertEqual(fibonacci_sequence(0), [])
        self.assertEqual(fibonacci_sequence(-5), [])

if __name__ == '__main__':
    unittest.main() 