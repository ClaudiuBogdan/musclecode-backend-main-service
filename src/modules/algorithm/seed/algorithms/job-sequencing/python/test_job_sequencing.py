import unittest
from exercise import job_sequencing

class TestJobSequencing(unittest.TestCase):
    def test_optimal_sequence(self):
        jobs = [
            {'id': 'J1', 'profit': 85, 'deadline': 5},
            {'id': 'J2', 'profit': 25, 'deadline': 4},
            {'id': 'J3', 'profit': 16, 'deadline': 3},
            {'id': 'J4', 'profit': 40, 'deadline': 3},
        ]
        self.assertEqual(job_sequencing(jobs), ['J1', 'J4', 'J3'])

    def test_another_sequence(self):
        jobs = [
            {'id': 'a', 'profit': 100, 'deadline': 2},
            {'id': 'b', 'profit': 20, 'deadline': 2},
            {'id': 'c', 'profit': 40, 'deadline': 1},
            {'id': 'd', 'profit': 35, 'deadline': 3},
        ]
        self.assertEqual(job_sequencing(jobs), ['c', 'a', 'd'])

    def test_empty_list(self):
        self.assertEqual(job_sequencing([]), [])

    def test_same_deadlines(self):
        jobs = [
            {'id': 'a', 'profit': 10, 'deadline': 1},
            {'id': 'b', 'profit': 15, 'deadline': 1},
        ]
        self.assertEqual(job_sequencing(jobs), ['b']) 