package astar

type node struct {
	x, y   int
	g, h   int
	f      int
	parent *node
}

func heuristic(x, y, goalX, goalY int) int {
	return abs(x-goalX) + abs(y-goalY)
}

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

// AStarSearch implements the iterative version of the A* algorithm.
func AStarSearch(grid [][]int, start []int, goal []int) [][]int {
	rows := len(grid)
	cols := len(grid[0])
	closed := make([][]bool, rows)
	for i := range closed {
		closed[i] = make([]bool, cols)
	}

	openList := []*node{}
	startNode := &node{
		x:      start[0],
		y:      start[1],
		g:      0,
		h:      heuristic(start[0], start[1], goal[0], goal[1]),
		parent: nil,
	}
	startNode.f = startNode.g + startNode.h
	openList = append(openList, startNode)

	for len(openList) > 0 {
		// Find node with lowest f.
		currentIndex := 0
		for i := 1; i < len(openList); i++ {
			if openList[i].f < openList[currentIndex].f {
				currentIndex = i
			}
		}
		current := openList[currentIndex]
		// Remove current from openList.
		openList = append(openList[:currentIndex], openList[currentIndex+1:]...)

		if current.x == goal[0] && current.y == goal[1] {
			// Reconstruct path.
			path := [][]int{}
			for n := current; n != nil; n = n.parent {
				path = append([][]int{{n.x, n.y}}, path...)
			}
			return path
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
	}

	return [][]int{}
} 