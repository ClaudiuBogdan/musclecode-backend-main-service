package hamiltonianpath

import "testing"

func TestHamiltonianPathExists(t *testing.T) {
	graph := [][]int{
		{0, 1, 1, 0, 0},
		{1, 0, 1, 1, 0},
		{1, 1, 0, 1, 1},
		{0, 1, 1, 0, 1},
		{0, 0, 1, 1, 0},
	}
	if !HamiltonianPath(graph) {
		t.Errorf("HamiltonianPath(graph) = false; want true")
	}
}

func TestHamiltonianPathNotExists(t *testing.T) {
	graph := [][]int{
		{0, 1, 0, 0},
		{1, 0, 0, 0},
		{0, 0, 0, 1},
		{0, 0, 1, 0},
	}
	if HamiltonianPath(graph) {
		t.Errorf("HamiltonianPath(graph) = true; want false")
	}
}

func TestEmptyGraph(t *testing.T) {
	graph := [][]int{}
	if HamiltonianPath(graph) {
		t.Errorf("HamiltonianPath(graph) = true; want false")
	}
}

func TestSingleNodeGraph(t *testing.T) {
	graph := [][]int{{0}}
	if !HamiltonianPath(graph) {
		t.Errorf("HamiltonianPath(graph) = false; want true")
	}
} 