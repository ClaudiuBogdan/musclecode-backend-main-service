import unittest
from exercise import knapsack_01

class TestKnapsack01(unittest.TestCase):
    def test_example1(self):
        weights = [2, 3, 4, 5]
        values = [3, 4, 5, 6]
        capacity = 5
        self.assertEqual(knapsack_01(weights, values, capacity), 7)

    def test_example2(self):
        weights = [8, 2, 6, 1]
        values = [50, 150, 210, 30]
        capacity = 10
        self.assertEqual(knapsack_01(weights, values, capacity), 390)

    def test_empty(self):
        self.assertEqual(knapsack_01([], [], 10), 0)

    def test_single_item_fits(self):
        self.assertEqual(knapsack_01([5], [10], 5), 10)

    def test_single_item_not_fit(self):
        self.assertEqual(knapsack_01([5], [10], 4), 0)

if __name__ == '__main__':
    unittest.main() 