package astar

// AStarSearchRecursive implements a recursive version of the A* search algorithm.
func AStarSearchRecursive(grid [][]int, start []int, goal []int) [][]int {
	rows := len(grid)
	cols := len(grid[0])
	closed := make([][]bool, rows)
	for i := range closed {
		closed[i] = make([]bool, cols)
	}

	startNode := &node{
		x:      start[0],
		y:      start[1],
		g:      0,
		h:      heuristic(start[0], start[1], goal[0], goal[1]),
		parent: nil,
	}
	startNode.f = startNode.g + startNode.h
	openList := []*node{startNode}

	result := recursiveAStar(openList, closed, grid, rows, cols, goal)
	if result == nil {
		return [][]int{}
	}
	path := [][]int{}
	for n := result; n != nil; n = n.parent {
		path = append([][]int{{n.x, n.y}}, path...)
	}
	return path
}

func recursiveAStar(openList []*node, closed [][]bool, grid [][]int, rows, cols int, goal []int) *node {
	if len(openList) == 0 {
		return nil
	}
	currentIndex := 0
	for i := 1; i < len(openList); i++ {
		if openList[i].f < openList[currentIndex].f {
			currentIndex = i
		}
	}
	current := openList[currentIndex]
	openList = append(openList[:currentIndex], openList[currentIndex+1:]...)

	if current.x == goal[0] && current.y == goal[1] {
		return current
	}

	closed[current.y][current.x] = true
	directions := [][]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}
	for _, d := range directions {
		newX := current.x + d[0]
		newY := current.y + d[1]
		if newX < 0 || newX >= cols || newY < 0 || newY >= rows {
			continue
		}
		if grid[newY][newX] == 1 || closed[newY][newX] {
			continue
		}

		gScore := current.g + 1
		hScore := heuristic(newX, newY, goal[0], goal[1])
		fScore := gScore + hScore

		skip := false
		for _, n := range openList {
			if n.x == newX && n.y == newY && gScore >= n.g {
				skip = true
				break
			}
		}
		if skip {
			continue
		}

		neighbor := &node{
			x:      newX,
			y:      newY,
			g:      gScore,
			h:      hScore,
			f:      fScore,
			parent: current,
		}
		openList = append(openList, neighbor)
	}

	return recursiveAStar(openList, closed, grid, rows, cols, goal)
} 