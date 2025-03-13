package hamiltoniancycle

import (
	"reflect"
	"testing"
)

func TestFindHamiltonianCycle(t *testing.T) {
	tests := []struct {
		name     string
		graph    [][]int
		expected []int
	}{
		{
			name: "find cycle",
			graph: [][]int{
				{0, 1, 0, 1, 0},
				{1, 0, 1, 1, 1},
				{0, 1, 0, 0, 1},
				{1, 1, 0, 0, 1},
				{0, 1, 1, 1, 0},
			},
			expected: []int{0, 1, 2, 4, 3, 0},
		},
		{
			name: "no cycle",
			graph: [][]int{
				{0, 1, 0, 0},
				{1, 0, 1, 0},
				{0, 1, 0, 1},
				{0, 0, 1, 0},
			},
			expected: nil,
		},
		{
			name: "single node",
			graph: [][]int{
				{0},
			},
			expected: []int{0, 0},
		},
		{
			name: "complete graph",
			graph: [][]int{
				{0, 1, 1},
				{1, 0, 1},
				{1, 1, 0},
			},
			expected: []int{0, 1, 2, 0},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := FindHamiltonianCycle(tt.graph)
			if !reflect.DeepEqual(result, tt.expected) {
				t.Errorf("FindHamiltonianCycle(%v) = %v, want %v", tt.graph, result, tt.expected)
			}
		})
	}
} 