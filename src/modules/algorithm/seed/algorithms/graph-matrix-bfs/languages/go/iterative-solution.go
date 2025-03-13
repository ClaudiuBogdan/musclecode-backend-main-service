package graphmatrixbfs

// BFSMatrix performs a Breadth-First Search (BFS) on a graph represented by an adjacency matrix.
//
// graph: The adjacency matrix representing the graph.
//
//	graph[i][j] == 1 if there's an edge from vertex i to vertex j, 0 otherwise.
//
// startVertex: The index of the starting vertex for the traversal.
// Returns: An array containing the indices of the vertices in the order they were visited.
//
// Time Complexity: O(V^2), where V is the number of vertices.
// Space Complexity: O(V), due to the queue and visited array.
func BFSMatrix(graph [][]int, startVertex int) []int {
	numVertices := len(graph)
	visited := make([]bool, numVertices)
	queue := make([]int, 0)
	traversal := make([]int, 0)

	if startVertex < 0 || startVertex >= numVertices {
		return []int{} // Or return an error
	}

	queue = append(queue, startVertex)
	visited[startVertex] = true

	for len(queue) > 0 {
		currentVertex := queue[0]
		queue = queue[1:] // Dequeue
		traversal = append(traversal, currentVertex)

		for neighbor := 0; neighbor < numVertices; neighbor++ {
			if graph[currentVertex][neighbor] == 1 && !visited[neighbor] {
				queue = append(queue, neighbor)
				visited[neighbor] = true
			}
		}
	}

	return traversal
} 