package dfs

// DFS performs a Depth-First Search (DFS) traversal on a graph using an iterative approach.
//
// Parameters:
//   graph: A map representing the graph as an adjacency list
//          where keys are vertices and values are slices of adjacent vertices
//   startVertex: The vertex to start the DFS traversal from
//
// Returns:
//   A slice containing the vertices in the order they were visited
func DFS(graph map[string][]string, startVertex string) []string {
	visited := make(map[string]bool)
	result := []string{}
	stack := []string{startVertex}

	for len(stack) > 0 {
		// Pop a vertex from the stack
		lastIndex := len(stack) - 1
		vertex := stack[lastIndex]
		stack = stack[:lastIndex]

		// Skip if already visited
		if visited[vertex] {
			continue
		}

		// Mark as visited and add to result
		visited[vertex] = true
		result = append(result, vertex)

		// Add neighbors to the stack in reverse order
		// This ensures we visit them in the same order as the recursive solution
		for i := len(graph[vertex]) - 1; i >= 0; i-- {
			neighbor := graph[vertex][i]
			if !visited[neighbor] {
				stack = append(stack, neighbor)
			}
		}
	}

	return result
} 