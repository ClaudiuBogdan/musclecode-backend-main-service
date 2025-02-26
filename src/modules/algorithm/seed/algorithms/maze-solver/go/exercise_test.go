package mazesolver

import (
	"reflect"
	"testing"
)

func TestSolveMazeBasicFunctionality(t *testing.T) {
	maze := Maze{
		{0, 0, 0, 0, 0},
		{1, 1, 0, 1, 1},
		{0, 0, 0, 0, 0},
		{1, 1, 0, 1, 1},
		{0, 0, 0, 0, 0},
	}
	start := Point{Row: 0, Col: 0}
	end := Point{Row: 4, Col: 4}
	result := SolveMaze(maze, start, end)
	if result == nil {
		t.Error("Expected a path, but got nil")
	}
}

func TestSolveMazeNoSolution(t *testing.T) {
	maze := Maze{
		{0, 1, 0},
		{0, 1, 0},
		{0, 1, 0},
	}
	start := Point{Row: 0, Col: 0}
	end := Point{Row: 0, Col: 2}
	result := SolveMaze(maze, start, end)
	if result != nil {
		t.Errorf("Expected nil, but got %v", result)
	}
}

func TestSolveMazeStartAndEndNextToWalls(t *testing.T) {
	maze := Maze{
		{0, 1},
		{0, 0},
	}
	start := Point{Row: 0, Col: 0}
	end := Point{Row: 1, Col: 1}
	result := SolveMaze(maze, start, end)
	if result == nil {
		t.Error("Expected a path, but got nil")
	}
}

func TestSolveMazeSingleCell(t *testing.T) {
	maze := Maze{{0}}
	start := Point{Row: 0, Col: 0}
	end := Point{Row: 0, Col: 0}
	result := SolveMaze(maze, start, end)
	expected := []Point{{Row: 0, Col: 0}}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, but got %v", expected, result)
	}
}

func TestSolveMazeComplex(t *testing.T) {
	maze := Maze{
		{0, 1, 0, 0, 0, 0},
		{0, 1, 0, 1, 1, 0},
		{0, 0, 0, 1, 0, 0},
		{1, 1, 1, 1, 0, 1},
		{0, 0, 0, 0, 0, 0},
		{1, 0, 1, 1, 1, 0},
		{0, 0, 0, 0, 0, 0},
	}
	start := Point{Row: 0, Col: 0}
	end := Point{Row: 6, Col: 5}
	result := SolveMaze(maze, start, end)
	if result == nil {
		t.Error("Expected a path, but got nil")
	}
} 