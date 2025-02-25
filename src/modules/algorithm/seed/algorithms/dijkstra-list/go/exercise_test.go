package dijkstra

import (
	"math"
	"reflect"
	"testing"
)

func TestDijkstra(t *testing.T) {
	tests := []struct {
		name   string
		graph  Graph
		source string
		want   map[string]float64
	}{
		{
			name: "Basic functionality with a simple graph",
			graph: Graph{
				"A": {
					{Node: "B", Weight: 2},
					{Node: "D", Weight: 6},
				},
				"B": {
					{Node: "C", Weight: 3},
					{Node: "D", Weight: 7},
				},
				"C": {
					{Node: "E", Weight: 5},
				},
				"D": {
					{Node: "C", Weight: 1},
					{Node: "E", Weight: 2},
				},
				"E": {},
			},
			source: "A",
			want: map[string]float64{
				"A": 0,
				"B": 2,
				"C": 5,
				"D": 6,
				"E": 8,
			},
		},
		{
			name: "Alternative paths",
			graph: Graph{
				"A": {
					{Node: "B", Weight: 4},
					{Node: "C", Weight: 2},
				},
				"B": {
					{Node: "D", Weight: 5},
				},
				"C": {
					{Node: "B", Weight: 1},
					{Node: "D", Weight: 8},
				},
				"D": {},
			},
			source: "A",
			want: map[string]float64{
				"A": 0,
				"B": 3,
				"C": 2,
				"D": 8,
			},
		},
		{
			name: "Single node graph",
			graph: Graph{
				"A": {},
			},
			source: "A",
			want: map[string]float64{
				"A": 0,
			},
		},
		{
			name: "Disconnected nodes",
			graph: Graph{
				"A": {
					{Node: "B", Weight: 1},
				},
				"B": {},
				"C": {
					{Node: "D", Weight: 1},
				},
				"D": {},
			},
			source: "A",
			want: map[string]float64{
				"A": 0,
				"B": 1,
				"C": math.Inf(1),
				"D": math.Inf(1),
			},
		},
		{
			name: "Complex graph with multiple paths",
			graph: Graph{
				"A": {
					{Node: "B", Weight: 4},
					{Node: "C", Weight: 2},
				},
				"B": {
					{Node: "C", Weight: 1},
					{Node: "D", Weight: 5},
				},
				"C": {
					{Node: "D", Weight: 8},
					{Node: "E", Weight: 10},
				},
				"D": {
					{Node: "E", Weight: 2},
				},
				"E": {
					{Node: "A", Weight: 7},
				},
			},
			source: "A",
			want: map[string]float64{
				"A": 0,
				"B": 4,
				"C": 2,
				"D": 9,
				"E": 11,
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := Dijkstra(tt.graph, tt.source)
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Dijkstra() = %v, want %v", got, tt.want)
			}
		})
	}
} 