package primslist

import (
	"reflect"
	"testing"
)

func TestPrimsAlgorithm(t *testing.T) {
	graph := Graph{
		0: {{To: 1, Weight: 4}, {To: 7, Weight: 8}},
		1: {{To: 0, Weight: 4}, {To: 2, Weight: 8}, {To: 7, Weight: 11}},
		2: {{To: 1, Weight: 8}, {To: 3, Weight: 7}, {To: 8, Weight: 2}},
		3: {{To: 2, Weight: 7}, {To: 4, Weight: 9}, {To: 5, Weight: 14}},
		4: {{To: 3, Weight: 9}, {To: 5, Weight: 10}},
		5: {{To: 3, Weight: 14}, {To: 4, Weight: 10}, {To: 6, Weight: 2}},
		6: {{To: 5, Weight: 2}, {To: 7, Weight: 1}, {To: 8, Weight: 6}},
		7: {{To: 0, Weight: 8}, {To: 1, Weight: 11}, {To: 6, Weight: 1}, {To: 8, Weight: 7}},
		8: {{To: 2, Weight: 2}, {To: 6, Weight: 6}, {To: 7, Weight: 7}},
	}

	weight, edges := PrimsAlgorithm(graph)

	expectedWeight := 37
	expectedEdges := [][]int{{0, 1}, {0, 7}, {7, 6}, {6, 5}, {5, 4}, {2, 8}, {2, 3}}

	if weight != expectedWeight {
		t.Errorf("Expected MST weight %d, but got %d", expectedWeight, weight)
	}

	if !reflect.DeepEqual(edges, expectedEdges) {
		t.Errorf("Expected MST edges %v, but got %v", expectedEdges, edges)
	}
}

func TestEmptyGraph(t *testing.T) {
	graph := Graph{}
	weight, edges := PrimsAlgorithm(graph)

	if weight != 0 {
		t.Errorf("Expected MST weight 0 for empty graph, but got %d", weight)
	}

	if len(edges) != 0 {
		t.Errorf("Expected no edges for empty graph, but got %v", edges)
	}
}

func TestSingleNodeGraph(t *testing.T) {
	graph := Graph{0: {}}
	weight, edges := PrimsAlgorithm(graph)

	if weight != 0 {
		t.Errorf("Expected MST weight 0 for single node graph, but got %d", weight)
	}

	if len(edges) != 0 {
		t.Errorf("Expected no edges for single node graph, but got %v", edges)
	}
} 