package graphlistbfs

// BFS performs a breadth-first search traversal on a graph represented as an adjacency list.
// It returns an array containing the vertices in the order they were visited during BFS traversal.
//
// This is a recursive implementation that simulates BFS behavior.
//
// Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
// Space Complexity: O(V) for the queue, visited map, and call stack
//
// The implementation:
// - Uses a recursive approach to simulate BFS
// - Maintains a queue and visited map across recursive calls
// - Processes one level of the graph at a time
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
	queue := []interface{}{start}
	
	// Mark the starting vertex as visited
	visited[start] = true
	
	// Start the recursive BFS
	bfsRecursive(graph, queue, visited, &result)
	
	return result
}

// bfsRecursive is a helper function for recursive BFS implementation
//
// Parameters:
//   - graph: The adjacency list representation of the graph
//   - queue: Queue of vertices to visit
//   - visited: Map of visited vertices
//   - result: Pointer to slice to store the traversal order
func bfsRecursive(graph map[interface{}][]interface{}, queue []interface{}, visited map[interface{}]bool, result *[]interface{}) {
	// Base case: if the queue is empty, we're done
	if len(queue) == 0 {
		return
	}
	
	// Remove the first vertex from the queue
	currentVertex := queue[0]
	queue = queue[1:]
	
	// Add the current vertex to the result
	*result = append(*result, currentVertex)
	
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
	
	// Recursive call to process the next vertex in the queue
	bfsRecursive(graph, queue, visited, result)
} 