package kruskal

import (
	"reflect"
	"testing"
)

func TestKruskalBasicFunctionality(t *testing.T) {
	vertices := 4
	edges := []Edge{
		{Source: 0, Destination: 1, Weight: 10},
		{Source: 0, Destination: 2, Weight: 6},
		{Source: 0, Destination: 3, Weight: 5},
		{Source: 1, Destination: 3, Weight: 15},
		{Source: 2, Destination: 3, Weight: 4},
	}
	expectedMST := []Edge{
		{Source: 2, Destination: 3, Weight: 4},
		{Source: 0, Destination: 3, Weight: 5},
		{Source: 0, Destination: 1, Weight: 10},
	}

	mst := Kruskal(vertices, edges)

	if !equalEdges(mst, expectedMST) {
		t.Errorf("Kruskal(%d, %v) = %v, want %v", vertices, edges, mst, expectedMST)
	}
}

func TestKruskalGraphWith5Vertices(t *testing.T) {
	vertices := 5
	edges := []Edge{
		{Source: 0, Destination: 1, Weight: 2},
		{Source: 0, Destination: 3, Weight: 6},
		{Source: 1, Destination: 2, Weight: 3},
		{Source: 1, Destination: 3, Weight: 8},
		{Source: 1, Destination: 4, Weight: 5},
		{Source: 2, Destination: 4, Weight: 7},
	}
	expectedMST := []Edge{
		{Source: 0, Destination: 1, Weight: 2},
		{Source: 1, Destination: 2, Weight: 3},
		{Source: 1, Destination: 4, Weight: 5},
		{Source: 0, Destination: 3, Weight: 6},
	}

	mst := Kruskal(vertices, edges)

	if !equalEdges(mst, expectedMST) {
		t.Errorf("Kruskal(%d, %v) = %v, want %v", vertices, edges, mst, expectedMST)
	}
}

func TestKruskalNoEdges(t *testing.T) {
	vertices := 3
	edges := []Edge{}
	expectedMST := []Edge{}

	mst := Kruskal(vertices, edges)

	if !reflect.DeepEqual(mst, expectedMST) {
		t.Errorf("Kruskal(%d, %v) = %v, want %v", vertices, edges, mst, expectedMST)
	}
}

func TestKruskalSingleVertex(t *testing.T) {
	vertices := 1
	edges := []Edge{}
	expectedMST := []Edge{}

	mst := Kruskal(vertices, edges)

	if !reflect.DeepEqual(mst, expectedMST) {
		t.Errorf("Kruskal(%d, %v) = %v, want %v", vertices, edges, mst, expectedMST)
	}
}

// Helper function to check if two slices of edges are equal, ignoring order
func equalEdges(a, b []Edge) bool {
	if len(a) != len(b) {
		return false
	}
	for _, edgeA := range a {
		found := false
		for _, edgeB := range b {
			if edgeA == edgeB {
				found = true
				break
			}
		}
		if !found {
			return false
		}
	}
	return true
} 