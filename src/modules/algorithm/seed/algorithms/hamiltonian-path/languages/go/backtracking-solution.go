package hamiltonianpath

// HamiltonianPath determines if a Hamiltonian path exists in the given graph using backtracking.
// graph represents the adjacency matrix of the graph.
// It returns true if a Hamiltonian path exists, false otherwise.
func HamiltonianPath(graph [][]int) bool {
	n := len(graph)
	if n == 0 {
		return false
	}

	path := make([]int, 0, n)
	visited := make([]bool, n)

	var findPath func(v int) bool
	findPath = func(v int) bool {
		path = append(path, v)
		visited[v] = true

		if len(path) == n {
			return true
		}

		for i := 0; i < n; i++ {
			if graph[v][i] == 1 && !visited[i] {
				if findPath(i) {
					return true
				}
			}
		}

		// Backtrack
		path = path[:len(path)-1]
		visited[v] = false
		return false
	}

	for startNode := 0; startNode < n; startNode++ {
		// Reset visited and path for the next start node
		path = path[:0]
		for i := range visited {
			visited[i] = false
		}
		if findPath(startNode) {
			return true
		}

	}

	return false
} 