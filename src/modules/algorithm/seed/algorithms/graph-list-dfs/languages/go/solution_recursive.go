package dfs

// DFS performs a Depth-First Search (DFS) traversal on a graph using recursion.
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

	// Helper function for recursive DFS
	var dfsHelper func(vertex string)
	dfsHelper = func(vertex string) {
		// Mark the current vertex as visited and add to result
		visited[vertex] = true
		result = append(result, vertex)

		// Visit all adjacent vertices that haven't been visited yet
		for _, neighbor := range graph[vertex] {
			if !visited[neighbor] {
				dfsHelper(neighbor)
			}
		}
	}

	// Start DFS from the given vertex
	dfsHelper(startVertex)

	return result
} 