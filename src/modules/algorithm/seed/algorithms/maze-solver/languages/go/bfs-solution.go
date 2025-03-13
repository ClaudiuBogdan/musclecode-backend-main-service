package mazesolver

type Maze [][]int
type Point struct {
	Row int
	Col int
}

// SolveMaze finds a path from start to end in a maze using Breadth-First Search (BFS).
// Returns the path as a slice of Points, or nil if no solution exists.
func SolveMaze(maze Maze, start Point, end Point) []Point {
	rows := len(maze)
	cols := len(maze[0])

	queue := []struct {
		point Point
		path  []Point
	}{{point: start, path: []Point{start}}}

	visited := make([][]bool, rows)
	for i := range visited {
		visited[i] = make([]bool, cols)
	}
	visited[start.Row][start.Col] = true

	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]
		point := curr.point
		path := curr.path

		if point == end {
			return path
		}

		// Explore in all four directions
		directions := []Point{{Row: -1, Col: 0}, {Row: 1, Col: 0}, {Row: 0, Col: -1}, {Row: 0, Col: 1}} // Up, Down, Left, Right

		for _, direction := range directions {
			newRow := point.Row + direction.Row
			newCol := point.Col + direction.Col

			if newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && maze[newRow][newCol] == 0 && !visited[newRow][newCol] {
				newPoint := Point{Row: newRow, Col: newCol}
				newPath := make([]Point, len(path))
				copy(newPath, path)
				newPath = append(newPath, newPoint)

				queue = append(queue, struct {
					point Point
					path  []Point
				}{point: newPoint, path: newPath})
				visited[newRow][newCol] = true
			}
		}
	}

	return nil // No solution found
} 