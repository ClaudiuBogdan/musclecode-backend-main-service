package topologicalsort

// TopologicalSort performs a topological sort on a directed acyclic graph (DAG) using Kahn's Algorithm (BFS).
// It returns a valid topological ordering of the vertices, or an empty slice if the graph contains a cycle.
// n: The number of vertices in the graph.
// edges: A list of directed edges, where each edge is represented as a pair of integers [u, v],
// indicating a directed edge from vertex u to vertex v.
func TopologicalSort(n int, edges [][]int) []int {
	graph := make(map[int][]int)
	inDegree := make([]int, n)

	for i := 0; i < n; i++ {
		graph[i] = []int{}
	}

	for _, edge := range edges {
		graph[edge[0]] = append(graph[edge[0]], edge[1])
		inDegree[edge[1]]++
	}

	queue := make([]int, 0)
	for i := 0; i < n; i++ {
		if inDegree[i] == 0 {
			queue = append(queue, i)
		}
	}

	result := make([]int, 0)
	count := 0

	for len(queue) > 0 {
		u := queue[0]
		queue = queue[1:]
		result = append(result, u)
		count++

		for _, v := range graph[u] {
			inDegree[v]--
			if inDegree[v] == 0 {
				queue = append(queue, v)
			}
		}
	}

	if count != n {
		return []int{} // Cycle detected
	}

	return result
} 