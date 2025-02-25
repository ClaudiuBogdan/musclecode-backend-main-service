package graphlistbfs

// BFS performs a breadth-first search traversal on a graph represented as an adjacency list.
// It returns an array containing the vertices in the order they were visited during BFS traversal.
//
// This is an iterative implementation using a queue.
//
// Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
// Space Complexity: O(V) for the queue and visited set
//
// The implementation:
// - Uses a queue to keep track of vertices to visit
// - Uses a map to keep track of visited vertices
// - Starts with the given vertex and explores all its neighbors
// - Then explores neighbors of neighbors in a level-by-level manner
// - Avoids revisiting vertices by checking the visited map
//
// Parameters:
//   - graph: A map representing the graph as an adjacency list where keys are vertices
//     and values are slices of adjacent vertices
//   - start: The starting vertex for the BFS traversal
//
// Returns:
//   - A slice containing the vertices in the order they were visited during BFS traversal
func BFS(graph map[interface{}][]interface{}, start interface{}) []interface{} {
	// Slice to store the order of visited vertices
	result := []interface{}{}
	
	// Map to keep track of visited vertices
	visited := make(map[interface{}]bool)
	
	// Queue for BFS traversal
	queue := []interface{}{}
	
	// Add the starting vertex to the queue and mark it as visited
	queue = append(queue, start)
	visited[start] = true
	
	// Continue until the queue is empty
	for len(queue) > 0 {
		// Remove the first vertex from the queue
		currentVertex := queue[0]
		queue = queue[1:]
		
		// Add the current vertex to the result
		result = append(result, currentVertex)
		
		// Get all adjacent vertices of the current vertex
		neighbors, exists := graph[currentVertex]
		if !exists {
			neighbors = []interface{}{}
		}
		
		// For each adjacent vertex
		for _, neighbor := range neighbors {
			// If the neighbor hasn't been visited yet
			if !visited[neighbor] {
				// Add it to the queue and mark it as visited
				queue = append(queue, neighbor)
				visited[neighbor] = true
			}
		}
	}
	
	return result
} 