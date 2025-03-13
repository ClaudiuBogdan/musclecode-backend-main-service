package articulationpoints

// ArticulationPointsIterative implements the articulation points algorithm using an iterative DFS approach.
func ArticulationPointsIterative(graph [][]int) []int {
	n := len(graph)
	visited := make([]bool, n)
	disc := make([]int, n)
	low := make([]int, n)
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	artPoints := make(map[int]struct{})
	childCount := make([]int, n)
	time := 0

	// Define a stack item struct.
	type stackItem struct {
		u     int // current vertex
		index int // next neighbor index to process
	}
	
	for i := 0; i < n; i++ {
		if !visited[i] {
			stack := []stackItem{{u: i, index: 0}}
			visited[i] = true
			disc[i] = time
			low[i] = time
			time++
			
			for len(stack) > 0 {
				topIdx := len(stack) - 1
				item := stack[topIdx]
				u := item.u
				
				if item.index < len(graph[u]) {
					v := graph[u][item.index]
					// increment the index in the stack
					stack[topIdx].index++
					
					if !visited[v] {
						parent[v] = u
						childCount[u]++
						visited[v] = true
						disc[v] = time
						low[v] = time
						time++
						stack = append(stack, stackItem{u: v, index: 0})
					} else if v != parent[u] {
						if disc[v] < low[u] {
							low[u] = disc[v]
						}
					}
				} else {
					// Finished processing all neighbors of u, pop from stack
					stack = stack[:topIdx]
					if parent[u] != -1 {
						p := parent[u]
						if low[u] < low[p] {
							low[p] = low[u]
						}
						if low[u] >= disc[p] {
							artPoints[p] = struct{}{}
						}
					} else {
						if childCount[u] > 1 {
							artPoints[u] = struct{}{}
						}
					}
				}
			}
		}
	}
	
	// Convert artPoints map to slice
	result := []int{}
	for k := range artPoints {
		result = append(result, k)
	}
	return result
} 