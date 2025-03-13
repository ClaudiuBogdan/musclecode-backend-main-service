package cycledetection

// HasCycleInGraphIterative detects if there is a cycle in a directed graph using an iterative approach
// Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
// Space Complexity: O(V) for the visited and recursion stack arrays
//
// The implementation:
// - Uses DFS to traverse the graph
// - Maintains two sets: visited nodes and nodes in the current recursion stack
// - If a node in the current recursion stack is visited again, a cycle is detected
func HasCycleInGraphIterative(graph [][]int) bool {
	if len(graph) == 0 {
		return false
	}

	n := len(graph)
	// Track all visited vertices
	visited := make([]bool, n)
	// Track vertices in the current recursion stack
	recStack := make([]bool, n)

	// Check each vertex as a potential starting point
	for i := 0; i < n; i++ {
		if !visited[i] {
			if hasCycleUtilIterative(i, graph, visited, recStack) {
				return true
			}
		}
	}

	return false
}

// hasCycleUtilIterative is a helper function that implements iterative DFS to detect cycles
func hasCycleUtilIterative(start int, graph [][]int, visited, recStack []bool) bool {
	// Create a stack for DFS
	type stackItem struct {
		vertex int
		index  int // Index of the neighbor being processed
	}
	stack := []stackItem{{vertex: start, index: 0}}

	// Mark the current node as visited and add to recursion stack
	visited[start] = true
	recStack[start] = true

	for len(stack) > 0 {
		// Get the top item from the stack
		current := &stack[len(stack)-1]
		
		// If we've processed all neighbors of the current vertex
		if current.index >= len(graph[current.vertex]) {
			// Remove the vertex from recursion stack
			recStack[current.vertex] = false
			// Pop from stack
			stack = stack[:len(stack)-1]
			continue
		}

		// Get the next neighbor to process
		neighbor := graph[current.vertex][current.index]
		current.index++

		// If the neighbor is in recursion stack, there is a cycle
		if recStack[neighbor] {
			return true
		}

		// If not visited, mark as visited and add to stack
		if !visited[neighbor] {
			visited[neighbor] = true
			recStack[neighbor] = true
			stack = append(stack, stackItem{vertex: neighbor, index: 0})
		}
	}

	return false
}

// HasCycleInLinkedListIterative detects if there is a cycle in a linked list using Floyd's Tortoise and Hare algorithm
// Time Complexity: O(n) where n is the length of the linked list
// Space Complexity: O(1) as it only uses two pointers
//
// The implementation:
// - Uses two pointers: slow (moves one step at a time) and fast (moves two steps at a time)
// - If there is a cycle, the fast pointer will eventually catch up to the slow pointer
// - If there is no cycle, the fast pointer will reach the end of the list
func HasCycleInLinkedListIterative(head *ListNode) bool {
	if head == nil || head.Next == nil {
		return false
	}

	slow := head
	fast := head

	// Move slow pointer by one step and fast pointer by two steps
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next

		// If slow and fast pointers meet, there is a cycle
		if slow == fast {
			return true
		}
	}

	// If fast pointer reaches the end, there is no cycle
	return false
} 