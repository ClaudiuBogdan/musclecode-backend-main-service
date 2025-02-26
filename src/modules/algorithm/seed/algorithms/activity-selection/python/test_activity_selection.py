import unittest
from exercise import activity_selection

class TestActivitySelection(unittest.TestCase):
    def test_basic_functionality(self):
        activities = [(1, 3), (2, 5), (4, 6), (6, 7), (5, 9), (8, 9)]
        expected = [(1, 3), (4, 6), (6, 7), (8, 9)]
        self.assertEqual(activity_selection(activities), expected)

    def test_empty_array(self):
        self.assertEqual(activity_selection([]), [])

    def test_single_activity(self):
        activities = [(1, 3)]
        self.assertEqual(activity_selection(activities), activities)

    def test_already_sorted(self):
        activities = [(1, 2), (3, 4), (5, 6)]
        self.assertEqual(activity_selection(activities), activities)

    def test_same_end_time(self):
        activities = [(1, 3), (0, 3), (2, 3)]
        expected = [(1, 3)]
        self.assertEqual(activity_selection(activities), expected)

if __name__ == '__main__':
    unittest.main() 