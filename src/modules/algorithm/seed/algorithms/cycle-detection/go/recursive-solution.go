package cycledetection

// HasCycleInGraphRecursive detects if there is a cycle in a directed graph using a recursive DFS approach
// Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
// Space Complexity: O(V) for the visited and recursion stack arrays, plus O(V) for the recursion call stack
//
// The implementation:
// - Uses recursive DFS to traverse the graph
// - Maintains two sets: visited nodes and nodes in the current recursion path
// - If a node in the current recursion path is visited again, a cycle is detected
func HasCycleInGraphRecursive(graph [][]int) bool {
	if len(graph) == 0 {
		return false
	}

	n := len(graph)
	// Track all visited vertices
	visited := make([]bool, n)
	// Track vertices in the current recursion path
	inPath := make([]bool, n)

	// Check each vertex as a potential starting point
	for i := 0; i < n; i++ {
		if !visited[i] && dfsDetectCycle(i, graph, visited, inPath) {
			return true
		}
	}

	return false
}

// dfsDetectCycle is a recursive DFS function to detect cycle
func dfsDetectCycle(vertex int, graph [][]int, visited, inPath []bool) bool {
	// Mark current node as visited and add to recursion path
	visited[vertex] = true
	inPath[vertex] = true

	// Visit all adjacent vertices
	for _, neighbor := range graph[vertex] {
		// If not visited, recursively check for cycles
		if !visited[neighbor] {
			if dfsDetectCycle(neighbor, graph, visited, inPath) {
				return true
			}
		} else if inPath[neighbor] {
			// If the neighbor is in current path, there is a cycle
			return true
		}
	}

	// Remove the vertex from recursion path
	inPath[vertex] = false
	return false
}

// HasCycleInLinkedListRecursive detects if there is a cycle in a linked list using a recursive approach with a map
// Time Complexity: O(n) where n is the length of the linked list
// Space Complexity: O(n) for storing the map of visited nodes, plus O(n) for the recursion call stack
//
// The implementation:
// - Uses a map to keep track of visited nodes
// - Recursively traverses the linked list
// - If a node is encountered again, a cycle is detected
func HasCycleInLinkedListRecursive(head *ListNode) bool {
	// Use a map to track visited nodes
	visited := make(map[*ListNode]bool)
	return detectCycle(head, visited)
}

// detectCycle is a recursive helper function to detect cycle in a linked list
func detectCycle(node *ListNode, visited map[*ListNode]bool) bool {
	if node == nil {
		return false
	}

	// If node is already in the map, we found a cycle
	if visited[node] {
		return true
	}

	// Add current node to visited map
	visited[node] = true

	// Recursively check the next node
	return detectCycle(node.Next, visited)
} 