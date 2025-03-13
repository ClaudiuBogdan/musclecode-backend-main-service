package cycledetection

import (
	"testing"
)

func TestHasCycleInGraph(t *testing.T) {
	tests := []struct {
		name     string
		graph    [][]int
		expected bool
	}{
		{
			name: "Graph with cycle",
			// Graph: 0 -> 1 -> 2 -> 3 -> 1 (cycle)
			graph: [][]int{
				{1},      // 0 -> 1
				{2},      // 1 -> 2
				{3},      // 2 -> 3
				{1},      // 3 -> 1 (creates a cycle)
			},
			expected: true,
		},
		{
			name: "Graph without cycle",
			// Graph: 0 -> 1 -> 2 -> 3
			graph: [][]int{
				{1},      // 0 -> 1
				{2},      // 1 -> 2
				{3},      // 2 -> 3
				{},       // 3 has no outgoing edges
			},
			expected: false,
		},
		{
			name:     "Empty graph",
			graph:    [][]int{},
			expected: false,
		},
		{
			name: "Graph with self-loop",
			// Graph: 0 -> 1 -> 2 -> 2 (self-loop)
			graph: [][]int{
				{1},      // 0 -> 1
				{2},      // 1 -> 2
				{2},      // 2 -> 2 (self-loop)
			},
			expected: true,
		},
		{
			name: "Complex graph without cycle",
			// Graph with multiple paths but no cycles
			graph: [][]int{
				{1, 2},   // 0 -> 1, 2
				{3, 4},   // 1 -> 3, 4
				{5},      // 2 -> 5
				{},       // 3 has no outgoing edges
				{},       // 4 has no outgoing edges
				{},       // 5 has no outgoing edges
			},
			expected: false,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			result := HasCycleInGraph(test.graph)
			if result != test.expected {
				t.Errorf("Expected %v, got %v", test.expected, result)
			}
		})
	}
}

func TestHasCycleInLinkedList(t *testing.T) {
	t.Run("Linked list with cycle", func(t *testing.T) {
		// Create a linked list with a cycle: 1 -> 2 -> 3 -> 4 -> 2
		node1 := &ListNode{Val: 1}
		node2 := &ListNode{Val: 2}
		node3 := &ListNode{Val: 3}
		node4 := &ListNode{Val: 4}
		
		node1.Next = node2
		node2.Next = node3
		node3.Next = node4
		node4.Next = node2 // Creates a cycle
		
		if !HasCycleInLinkedList(node1) {
			t.Error("Expected true for linked list with cycle")
		}
	})

	t.Run("Linked list without cycle", func(t *testing.T) {
		// Create a linked list without cycles: 1 -> 2 -> 3 -> 4
		node1 := &ListNode{Val: 1}
		node2 := &ListNode{Val: 2}
		node3 := &ListNode{Val: 3}
		node4 := &ListNode{Val: 4}
		
		node1.Next = node2
		node2.Next = node3
		node3.Next = node4
		
		if HasCycleInLinkedList(node1) {
			t.Error("Expected false for linked list without cycle")
		}
	})

	t.Run("Empty linked list", func(t *testing.T) {
		if HasCycleInLinkedList(nil) {
			t.Error("Expected false for empty linked list")
		}
	})

	t.Run("Linked list with a single node and no cycle", func(t *testing.T) {
		node := &ListNode{Val: 1}
		if HasCycleInLinkedList(node) {
			t.Error("Expected false for linked list with a single node and no cycle")
		}
	})

	t.Run("Linked list with a self-loop", func(t *testing.T) {
		// Create a linked list with a self-loop: 1 -> 1
		node := &ListNode{Val: 1}
		node.Next = node // Self-loop
		
		if !HasCycleInLinkedList(node) {
			t.Error("Expected true for linked list with a self-loop")
		}
	})
} 