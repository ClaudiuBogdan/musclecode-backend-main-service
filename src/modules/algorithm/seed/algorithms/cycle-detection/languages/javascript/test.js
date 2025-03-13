const {
  hasCycleInGraph,
  hasCycleInLinkedList,
  ListNode,
} = require('./exercise');

describe('Cycle Detection Algorithm', () => {
  describe('Graph Cycle Detection', () => {
    it('should detect a cycle in a simple graph', () => {
      // Graph: 0 -> 1 -> 2 -> 3 -> 1 (cycle)
      const graph = [
        [1], // 0 -> 1
        [2], // 1 -> 2
        [3], // 2 -> 3
        [1], // 3 -> 1 (creates a cycle)
      ];
      expect(hasCycleInGraph(graph)).toBe(true);
    });

    it('should return false for a graph without cycles', () => {
      // Graph: 0 -> 1 -> 2 -> 3
      const graph = [
        [1], // 0 -> 1
        [2], // 1 -> 2
        [3], // 2 -> 3
        [], // 3 has no outgoing edges
      ];
      expect(hasCycleInGraph(graph)).toBe(false);
    });

    it('should handle an empty graph', () => {
      const graph = [];
      expect(hasCycleInGraph(graph)).toBe(false);
    });

    it('should detect a self-loop', () => {
      // Graph: 0 -> 1 -> 2 -> 2 (self-loop)
      const graph = [
        [1], // 0 -> 1
        [2], // 1 -> 2
        [2], // 2 -> 2 (self-loop)
      ];
      expect(hasCycleInGraph(graph)).toBe(true);
    });

    it('should handle a complex graph with multiple paths', () => {
      // Graph with multiple paths but no cycles
      const graph = [
        [1, 2], // 0 -> 1, 2
        [3, 4], // 1 -> 3, 4
        [5], // 2 -> 5
        [], // 3 has no outgoing edges
        [], // 4 has no outgoing edges
        [], // 5 has no outgoing edges
      ];
      expect(hasCycleInGraph(graph)).toBe(false);
    });
  });

  describe('Linked List Cycle Detection', () => {
    it('should detect a cycle in a linked list', () => {
      // Create a linked list with a cycle: 1 -> 2 -> 3 -> 4 -> 2
      const node1 = new ListNode(1);
      const node2 = new ListNode(2);
      const node3 = new ListNode(3);
      const node4 = new ListNode(4);

      node1.next = node2;
      node2.next = node3;
      node3.next = node4;
      node4.next = node2; // Creates a cycle

      expect(hasCycleInLinkedList(node1)).toBe(true);
    });

    it('should return false for a linked list without cycles', () => {
      // Create a linked list without cycles: 1 -> 2 -> 3 -> 4
      const node1 = new ListNode(1);
      const node2 = new ListNode(2);
      const node3 = new ListNode(3);
      const node4 = new ListNode(4);

      node1.next = node2;
      node2.next = node3;
      node3.next = node4;

      expect(hasCycleInLinkedList(node1)).toBe(false);
    });

    it('should handle an empty linked list', () => {
      expect(hasCycleInLinkedList(null)).toBe(false);
    });

    it('should handle a linked list with a single node and no cycle', () => {
      const node = new ListNode(1);
      expect(hasCycleInLinkedList(node)).toBe(false);
    });

    it('should detect a self-loop in a linked list', () => {
      // Create a linked list with a self-loop: 1 -> 1
      const node = new ListNode(1);
      node.next = node; // Self-loop

      expect(hasCycleInLinkedList(node)).toBe(true);
    });
  });
});
