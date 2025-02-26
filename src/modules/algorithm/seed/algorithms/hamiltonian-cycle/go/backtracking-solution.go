package hamiltoniancycle

// FindHamiltonianCycle determines if a Hamiltonian Cycle exists in a given graph using backtracking.
// @param graph Adjacency matrix representing the graph.
// @returns A Hamiltonian Cycle if it exists, otherwise nil.
func FindHamiltonianCycle(graph [][]int) []int {
	numVertices := len(graph)
	path := make([]int, numVertices)
	visited := make([]bool, numVertices)

	// Start from vertex 0
	path[0] = 0
	visited[0] = true

	var hamCycleUtil func(graph [][]int, path []int, visited []bool, position int) bool

	hamCycleUtil = func(graph [][]int, path []int, visited []bool, position int) bool {
		// Base case: all vertices are included in the path
		if position == numVertices {
			// Check if the last vertex is adjacent to the first vertex
			if graph[path[position-1]][0] == 1 {
				return true
			} else {
				return false
			}
		}

		// Try different vertices as the next candidate in the Hamiltonian Cycle
		for vertex := 1; vertex < numVertices; vertex++ {
			if graph[path[position-1]][vertex] == 1 && !visited[vertex] {
				path[position] = vertex
				visited[vertex] = true

				// Recur to construct the rest of the path
				if hamCycleUtil(graph, path, visited, position+1)) {
					return true
				}

				// Backtrack: If adding the current vertex doesn't lead to a solution,
				// then remove it and try a different vertex
				visited[vertex] = false
				path[position] = 0 // Reset path[position]
			}
		}

		// If no vertex can be added to the path, return false
		return false
	}

	if hamCycleUtil(graph, path, visited, 1)) {
		cycle := append(path, 0) // Complete the cycle
		return cycle
	}

	return nil
} 