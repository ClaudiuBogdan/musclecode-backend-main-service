package graphmatrixbfs

import (
	"reflect"
	"testing"
)

func TestBFSMatrix(t *testing.T) {
	testCases := []struct {
		name        string
		graph       [][]int
		startVertex int
		expected    []int
	}{
		{
			name: "Simple graph",
			graph: [][]int{
				{0, 1, 0, 1, 0},
				{1, 0, 1, 0, 0},
				{0, 1, 0, 0, 0},
				{1, 0, 0, 0, 1},
				{0, 0, 0, 1, 0},
			},
			startVertex: 0,
			expected:    []int{0, 1, 3, 2, 4},
		},
		{
			name: "Disconnected graph",
			graph: [][]int{
				{0, 1, 0, 0},
				{1, 0, 0, 0},
				{0, 0, 0, 1},
				{0, 0, 1, 0},
			},
			startVertex: 0,
			expected:    []int{0, 1},
		},
		{
			name:        "Single-node graph",
			graph:       [][]int{{0}},
			startVertex: 0,
			expected:    []int{0},
		},
		{
			name:        "Empty graph",
			graph:       [][]int{},
			startVertex: 0,
			expected:    []int{},
		},
		{
            name: "Larger complex graph",
            graph: [][]int{
                {0, 1, 1, 0, 0, 0, 0},
                {1, 0, 0, 1, 1, 0, 0},
                {1, 0, 0, 0, 0, 1, 1},
                {0, 1, 0, 0, 0, 0, 0},
                {0, 1, 0, 0, 0, 0, 0},
                {0, 0, 1, 0, 0, 0, 0},
                {0, 0, 1, 0, 0, 0, 0},
            },
            startVertex: 0,
            expected: []int{0, 1, 2, 3, 4, 5, 6},
        },
        {
            name: "Different start vertex",
            graph: [][]int{
                {0, 1, 1, 0, 0, 0, 0},
                {1, 0, 0, 1, 1, 0, 0},
                {1, 0, 0, 0, 0, 1, 1},
                {0, 1, 0, 0, 0, 0, 0},
                {0, 1, 0, 0, 0, 0, 0},
                {0, 0, 1, 0, 0, 0, 0},
                {0, 0, 1, 0, 0, 0, 0},
            },
            startVertex: 3,
            expected: []int{3, 1, 4},
        },
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			result := BFSMatrix(tc.graph, tc.startVertex)
			if !reflect.DeepEqual(result, tc.expected) {
				t.Errorf("Expected %v, but got %v", tc.expected, result)
			}
		})
	}
} 