package mazesolver

type Maze [][]int
type Point struct {
	Row int
	Col int
}

// SolveMaze finds a path from start to end in a maze using Depth-First Search (DFS).
// Returns the path as a slice of Points, or nil if no solution exists.
func SolveMaze(maze Maze, start Point, end Point) []Point {
	rows := len(maze)
	cols := len(maze[0])
	path := []Point{}
	visited := make([][]bool, rows)
	for i := range visited {
		visited[i] = make([]bool, cols)
	}

	var dfs func(row int, col int) bool
	dfs = func(row int, col int) bool {
		if row < 0 || row >= rows || col < 0 || col >= cols || maze[row][col] == 1 || visited[row][col] {
			return false
		}

		visited[row][col] = true
		path = append(path, Point{Row: row, Col: col})

		if row == end.Row && col == end.Col {
			return true
		}

		// Explore in all four directions
		if dfs(row-1, col) || // Up
			dfs(row+1, col) || // Down
			dfs(row, col-1) || // Left
			dfs(row, col+1) { // Right
			return true
		}

		// Backtrack if no solution is found
		path = path[:len(path)-1]
		return false
	}

	if dfs(start.Row, start.Col) {
		return path
	}
	return nil
} 