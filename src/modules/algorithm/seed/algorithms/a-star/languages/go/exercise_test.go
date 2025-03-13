package astar

import "testing"

func TestAStarIterative(t *testing.T) {
	grid1 := [][]int{
		{0, 0, 0, 0, 0},
		{0, 1, 1, 0, 0},
		{0, 0, 0, 1, 0},
		{1, 1, 0, 0, 0},
		{0, 0, 0, 0, 0},
	}
	start1 := []int{0, 0}
	goal1 := []int{4, 4}
	expected1 := [][]int{{0, 0}, {1, 0}, {2, 0}, {2, 1}, {2, 2}, {3, 2}, {4, 2}, {4, 3}, {4, 4}}

	result := AStarSearch(grid1, start1, goal1)
	if !equalPath(result, expected1) {
		t.Errorf("AStarSearch() = %v; want %v", result, expected1)
	}

	grid2 := [][]int{
		{0, 1, 0},
		{1, 1, 0},
		{0, 0, 0},
	}
	start2 := []int{0, 0}
	goal2 := []int{2, 0}
	expected2 := [][]int{}

	result2 := AStarSearch(grid2, start2, goal2)
	if !equalPath(result2, expected2) {
		t.Errorf("AStarSearch() = %v; want %v", result2, expected2)
	}
}

func TestAStarRecursive(t *testing.T) {
	grid1 := [][]int{
		{0, 0, 0, 0, 0},
		{0, 1, 1, 0, 0},
		{0, 0, 0, 1, 0},
		{1, 1, 0, 0, 0},
		{0, 0, 0, 0, 0},
	}
	start1 := []int{0, 0}
	goal1 := []int{4, 4}
	expected1 := [][]int{{0, 0}, {1, 0}, {2, 0}, {2, 1}, {2, 2}, {3, 2}, {4, 2}, {4, 3}, {4, 4}}

	result := AStarSearchRecursive(grid1, start1, goal1)
	if !equalPath(result, expected1) {
		t.Errorf("AStarSearchRecursive() = %v; want %v", result, expected1)
	}

	grid2 := [][]int{
		{0, 1, 0},
		{1, 1, 0},
		{0, 0, 0},
	}
	start2 := []int{0, 0}
	goal2 := []int{2, 0}
	expected2 := [][]int{}

	result2 := AStarSearchRecursive(grid2, start2, goal2)
	if !equalPath(result2, expected2) {
		t.Errorf("AStarSearchRecursive() = %v; want %v", result2, expected2)
	}
}

// equalPath compares two paths.
func equalPath(a, b [][]int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if len(a[i]) != len(b[i]) {
			return false
		}
		for j := range a[i] {
			if a[i][j] != b[i][j] {
				return false
			}
		}
	}
	return true
} 