"""
Tests for the Cycle Detection Algorithm
"""
import unittest
from exercise import has_cycle_in_graph, has_cycle_in_linked_list, ListNode


class TestCycleDetection(unittest.TestCase):
    """Test cases for cycle detection algorithms"""

    def test_graph_with_cycle(self):
        """Test detecting a cycle in a simple graph"""
        # Graph: 0 -> 1 -> 2 -> 3 -> 1 (cycle)
        graph = [
            [1],      # 0 -> 1
            [2],      # 1 -> 2
            [3],      # 2 -> 3
            [1]       # 3 -> 1 (creates a cycle)
        ]
        self.assertTrue(has_cycle_in_graph(graph))

    def test_graph_without_cycle(self):
        """Test a graph without cycles"""
        # Graph: 0 -> 1 -> 2 -> 3
        graph = [
            [1],      # 0 -> 1
            [2],      # 1 -> 2
            [3],      # 2 -> 3
            []        # 3 has no outgoing edges
        ]
        self.assertFalse(has_cycle_in_graph(graph))

    def test_empty_graph(self):
        """Test an empty graph"""
        graph = []
        self.assertFalse(has_cycle_in_graph(graph))

    def test_graph_with_self_loop(self):
        """Test a graph with a self-loop"""
        # Graph: 0 -> 1 -> 2 -> 2 (self-loop)
        graph = [
            [1],      # 0 -> 1
            [2],      # 1 -> 2
            [2]       # 2 -> 2 (self-loop)
        ]
        self.assertTrue(has_cycle_in_graph(graph))

    def test_complex_graph_without_cycle(self):
        """Test a complex graph with multiple paths but no cycles"""
        graph = [
            [1, 2],   # 0 -> 1, 2
            [3, 4],   # 1 -> 3, 4
            [5],      # 2 -> 5
            [],       # 3 has no outgoing edges
            [],       # 4 has no outgoing edges
            []        # 5 has no outgoing edges
        ]
        self.assertFalse(has_cycle_in_graph(graph))

    def test_linked_list_with_cycle(self):
        """Test detecting a cycle in a linked list"""
        # Create a linked list with a cycle: 1 -> 2 -> 3 -> 4 -> 2
        node1 = ListNode(1)
        node2 = ListNode(2)
        node3 = ListNode(3)
        node4 = ListNode(4)
        
        node1.next = node2
        node2.next = node3
        node3.next = node4
        node4.next = node2  # Creates a cycle
        
        self.assertTrue(has_cycle_in_linked_list(node1))

    def test_linked_list_without_cycle(self):
        """Test a linked list without cycles"""
        # Create a linked list without cycles: 1 -> 2 -> 3 -> 4
        node1 = ListNode(1)
        node2 = ListNode(2)
        node3 = ListNode(3)
        node4 = ListNode(4)
        
        node1.next = node2
        node2.next = node3
        node3.next = node4
        
        self.assertFalse(has_cycle_in_linked_list(node1))

    def test_empty_linked_list(self):
        """Test an empty linked list"""
        self.assertFalse(has_cycle_in_linked_list(None))

    def test_single_node_linked_list(self):
        """Test a linked list with a single node and no cycle"""
        node = ListNode(1)
        self.assertFalse(has_cycle_in_linked_list(node))

    def test_linked_list_with_self_loop(self):
        """Test a linked list with a self-loop"""
        # Create a linked list with a self-loop: 1 -> 1
        node = ListNode(1)
        node.next = node  # Self-loop
        
        self.assertTrue(has_cycle_in_linked_list(node))


if __name__ == '__main__':
    unittest.main() 