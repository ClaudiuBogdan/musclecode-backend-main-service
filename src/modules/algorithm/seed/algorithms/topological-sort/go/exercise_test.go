package topologicalsort

import (
	"reflect"
	"testing"
)

func validateTopologicalSort(n int, edges [][]int, result []int) bool {
	if len(result) != n {
		return false
	}

	index := make(map[int]int)
	for i, node := range result {
		index[node] = i
	}

	for _, edge := range edges {
		if index[edge[0]] >= index[edge[1]] {
			return false
		}
	}

	return true
}

func TestTopologicalSortBasicFunctionality(t *testing.T) {
	testCases := []struct {
		name  string
		n     int
		edges [][]int
		valid bool // Whether a valid topological sort is expected
	}{
		{
			name:  "simple DAG",
			n:     4,
			edges: [][]int{{0, 1}, {0, 2}, {1, 3}, {2, 3}},
			valid: true,
		},
		{
			name:  "complex DAG",
			n:     6,
			edges: [][]int{{5, 2}, {5, 0}, {4, 0}, {4, 1}, {2, 3}, {3, 1}},
			valid: true,
		},
		{
			name:  "graph with no edges",
			n:     5,
			edges: [][]int{},
			valid: true,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			result := TopologicalSort(tc.n, tc.edges)

			if !tc.valid {
				if len(result) != 0 {
					t.Errorf("Expected empty slice for invalid graph, got %v", result)
				}
				return
			}

			if !validateTopologicalSort(tc.n, tc.edges, result) {
				t.Errorf("TopologicalSort(%d, %v) = %v; is not a valid topological sort", tc.n, tc.edges, result)
			}
		})
	}
}

func TestTopologicalSortCyclicGraph(t *testing.T) {
	n := 3
	edges := [][]int{{0, 1}, {1, 2}, {2, 0}}
	result := TopologicalSort(n, edges)

	if len(result) != 0 {
		t.Errorf("Expected empty slice for cyclic graph, got %v", result)
	}
}

func TestTopologicalSortSingleNodeGraph(t *testing.T) {
	n := 1
	edges := [][]int{}
	result := TopologicalSort(n, edges)

	if !reflect.DeepEqual(result, []int{0}) {
		t.Errorf("Expected [0] for single node graph, got %v", result)
	}
} 