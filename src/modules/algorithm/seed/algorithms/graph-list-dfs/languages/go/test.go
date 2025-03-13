package dfs

import (
	"reflect"
	"testing"
)

func TestDFS(t *testing.T) {
	tests := []struct {
		name        string
		graph       map[string][]string
		startVertex string
		expected    []string
	}{
		{
			name: "Example 1: Simple tree-like graph",
			graph: map[string][]string{
				"A": {"B", "C"},
				"B": {"D", "E"},
				"C": {},
				"D": {},
				"E": {},
			},
			startVertex: "A",
			expected:    []string{"A", "B", "D", "E", "C"},
		},
		{
			name: "Example 2: Graph with cycles",
			graph: map[string][]string{
				"0": {"1", "2"},
				"1": {"0", "3", "4"},
				"2": {"0"},
				"3": {"1"},
				"4": {"1", "5"},
				"5": {"4"},
			},
			startVertex: "0",
			expected:    []string{"0", "1", "3", "4", "5", "2"},
		},
		{
			name: "Small cyclic graph",
			graph: map[string][]string{
				"X": {"Y", "Z"},
				"Y": {"X"},
				"Z": {"X"},
			},
			startVertex: "X",
			expected:    []string{"X", "Y", "Z"},
		},
		{
			name: "Larger graph with multiple branches",
			graph: map[string][]string{
				"1": {"2", "3", "4"},
				"2": {"1", "5", "6"},
				"3": {"1"},
				"4": {"1", "7", "8"},
				"5": {"2"},
				"6": {"2"},
				"7": {"4"},
				"8": {"4"},
			},
			startVertex: "1",
			expected:    []string{"1", "2", "5", "6", "3", "4", "7", "8"},
		},
		{
			name: "Single vertex graph",
			graph: map[string][]string{
				"S": {},
			},
			startVertex: "S",
			expected:    []string{"S"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := DFS(tt.graph, tt.startVertex)
			if !reflect.DeepEqual(result, tt.expected) {
				t.Errorf("DFS() = %v, want %v", result, tt.expected)
			}
		})
	}
} 