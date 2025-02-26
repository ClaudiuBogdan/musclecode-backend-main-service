import unittest
from exercise import two_crystal_balls

class TestTwoCrystalBalls(unittest.TestCase):
    def test_basic_functionality(self):
        breaks = [False, False, False, True, True, True]
        self.assertEqual(two_crystal_balls(breaks), 3)

    def test_no_break(self):
        breaks = [False, False, False, False, False]
        self.assertEqual(two_crystal_balls(breaks), -1)

    def test_large_array(self):
        breaks = [False] * 1000
        for i in range(500, 1000):
            breaks[i] = True
        self.assertEqual(two_crystal_balls(breaks), 500)

    def test_first_floor_breaks(self):
        breaks = [True, True, True]
        self.assertEqual(two_crystal_balls(breaks), 0) 