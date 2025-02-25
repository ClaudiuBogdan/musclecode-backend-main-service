package articulationpoints

import (
	"reflect"
	"sort"
	"testing"
)

func TestArticulationPoints(t *testing.T) {
	// Graph Example 1:
	// Graph with edges: (0,1), (1,2), (2,0), (1,3)
	// Adjacency list representation:
	graph1 := [][]int{
		{1, 2},    // 0
		{0, 2, 3}, // 1
		{0, 1},    // 2
		{1},       // 3
	}
	// Expected articulation point: [1]

	// Graph Example 2:
	// Graph with edges: (0,1), (1,2), (2,3), (3,0)
	// Adjacency list representation:
	graph2 := [][]int{
		{1, 3}, // 0
		{0, 2}, // 1
		{1, 3}, // 2
		{2, 0}, // 3
	}
	// Expected: [] (no articulation points)

	implementations := map[string]func(graph [][]int) []int{
		"Exercise (stub)": ArticulationPoints, // stub returns empty slice
		"Iterative":       ArticulationPointsIterative,
		"Recursive":       ArticulationPointsRecursive,
	}

	for name, f := range implementations {
		t.Run(name+" - Graph1", func(t *testing.T) {
			result := f(graph1)
			sort.Ints(result)
			expected := []int{1}
			if !reflect.DeepEqual(result, expected) {
				t.Errorf("For %s, got %v; want %v", name, result, expected)
			}
		})
		t.Run(name+" - Graph2", func(t *testing.T) {
			result := f(graph2)
			sort.Ints(result)
			expected := []int{}
			if !reflect.DeepEqual(result, expected) {
				t.Errorf("For %s, got %v; want %v", name, result, expected)
			}
		})
	}
} 