import unittest
from exercise import fractional_knapsack

class TestFractionalKnapsack(unittest.TestCase):
    def test_basic_functionality(self):
        weights = [10, 20, 30]
        values = [60, 100, 120]
        capacity = 50
        self.assertEqual(fractional_knapsack(weights, values, capacity), 240)

    def test_another_test_case(self):
        weights = [3, 3, 2, 5, 1]
        values = [10, 15, 10, 12, 8]
        capacity = 10
        self.assertEqual(fractional_knapsack(weights, values, capacity), 43)

    def test_capacity_smaller_than_any_weight(self):
        weights = [10, 20, 30]
        values = [60, 100, 120]
        capacity = 5
        self.assertAlmostEqual(fractional_knapsack(weights, values, capacity), 30, places=6)

    def test_all_items_can_be_taken(self):
        weights = [10, 20, 30]
        values = [60, 100, 120]
        capacity = 100
        self.assertEqual(fractional_knapsack(weights, values, capacity), 280)

    def test_empty_input_arrays(self):
        self.assertEqual(fractional_knapsack([], [], 50), 0) 