package graphlistbfs

import (
	"reflect"
	"testing"
)

// Helper function to check if two slices are equal regardless of order
func equalSlices(a, b []interface{}) bool {
	if len(a) != len(b) {
		return false
	}
	
	// Create maps to count occurrences
	countA := make(map[interface{}]int)
	countB := make(map[interface{}]int)
	
	for _, val := range a {
		countA[val]++
	}
	
	for _, val := range b {
		countB[val]++
	}
	
	return reflect.DeepEqual(countA, countB)
}

// Helper function to check if a slice is a prefix of another slice
func isPrefix(prefix, slice []interface{}) bool {
	if len(prefix) > len(slice) {
		return false
	}
	
	for i, val := range prefix {
		if val != slice[i] {
			return false
		}
	}
	
	return true
}

func TestBFS(t *testing.T) {
	t.Run("Simple Graph", func(t *testing.T) {
		graph := map[interface{}][]interface{}{
			"A": {"B", "C"},
			"B": {"D", "E"},
			"C": {"F"},
			"D": {},
			"E": {},
			"F": {},
		}
		expected := []interface{}{"A", "B", "C", "D", "E", "F"}
		result := BFS(graph, "A")
		if !reflect.DeepEqual(result, expected) {
			t.Errorf("Expected %v, got %v", expected, result)
		}
	})

	t.Run("Numeric Vertices", func(t *testing.T) {
		graph := map[interface{}][]interface{}{
			0: {1, 2},
			1: {0, 3, 4},
			2: {0, 4},
			3: {1},
			4: {1, 2},
		}
		expected := []interface{}{0, 1, 2, 3, 4}
		result := BFS(graph, 0)
		if !reflect.DeepEqual(result, expected) {
			t.Errorf("Expected %v, got %v", expected, result)
		}
	})

	t.Run("Single Vertex", func(t *testing.T) {
		graph := map[interface{}][]interface{}{
			"A": {},
		}
		expected := []interface{}{"A"}
		result := BFS(graph, "A")
		if !reflect.DeepEqual(result, expected) {
			t.Errorf("Expected %v, got %v", expected, result)
		}
	})

	t.Run("Disconnected Graph", func(t *testing.T) {
		graph := map[interface{}][]interface{}{
			"A": {"B"},
			"B": {"A"},
			"C": {"D"},
			"D": {"C"},
		}
		expected := []interface{}{"A", "B"}
		result := BFS(graph, "A")
		if !reflect.DeepEqual(result, expected) {
			t.Errorf("Expected %v, got %v", expected, result)
		}
	})

	t.Run("Cyclic Graph", func(t *testing.T) {
		graph := map[interface{}][]interface{}{
			"A": {"B", "C"},
			"B": {"A", "D"},
			"C": {"A", "D"},
			"D": {"B", "C"},
		}
		expected := []interface{}{"A", "B", "C", "D"}
		result := BFS(graph, "A")
		if !reflect.DeepEqual(result, expected) {
			t.Errorf("Expected %v, got %v", expected, result)
		}
	})

	t.Run("Larger Graph", func(t *testing.T) {
		graph := map[interface{}][]interface{}{
			"A": {"B", "C", "D"},
			"B": {"A", "E", "F"},
			"C": {"A", "G", "H"},
			"D": {"A", "I", "J"},
			"E": {"B", "K"},
			"F": {"B"},
			"G": {"C"},
			"H": {"C"},
			"I": {"D"},
			"J": {"D"},
			"K": {"E"},
		}
		result := BFS(graph, "A")
		
		// Check first level neighbors are visited first
		firstLevelPrefix := []interface{}{"A", "B", "C", "D"}
		if !isPrefix(firstLevelPrefix, result) {
			t.Errorf("Expected %v to be a prefix of %v", firstLevelPrefix, result)
		}
		
		// Check all vertices are visited
		allVertices := []interface{}{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"}
		if !equalSlices(result, allVertices) {
			t.Errorf("Expected result to contain all vertices %v, got %v", allVertices, result)
		}
		
		// Check result length
		if len(result) != 11 {
			t.Errorf("Expected result length to be 11, got %d", len(result))
		}
	})
} 