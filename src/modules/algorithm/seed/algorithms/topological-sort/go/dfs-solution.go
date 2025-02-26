package topologicalsort

// TopologicalSort performs a topological sort on a directed acyclic graph (DAG) using Depth-First Search (DFS).
// It returns a valid topological ordering of the vertices, or an empty slice if the graph contains a cycle.
// n: The number of vertices in the graph.
// edges: A list of directed edges, where each edge is represented as a pair of integers [u, v],
// indicating a directed edge from vertex u to vertex v.
func TopologicalSort(n int, edges [][]int) []int {
	graph := make(map[int][]int)
	for i := 0; i < n; i++ {
		graph[i] = []int{}
	}
	for _, edge := range edges {
		graph[edge[0]] = append(graph[edge[0]], edge[1])
	}

	visited := make([]bool, n)
	recursionStack := make([]bool, n)
	result := make([]int, 0)

	var dfs func(node int) bool
	dfs = func(node int) bool {
		visited[node] = true
		recursionStack[node] = true

		for _, neighbor := range graph[node] {
			if !visited[neighbor] {
				if !dfs(neighbor) {
					return false // Cycle detected
				}
			} else if recursionStack[neighbor] {
				return false // Cycle detected
			}
		}

		recursionStack[node] = false
		result = append([]int{node}, result...) // Prepend node to result after visiting all its neighbors
		return true
	}

	for i := 0; i < n; i++ {
		if !visited[i] {
			if !dfs(i) {
				return []int{} // Cycle detected
			}
		}
	}

	return result
} 