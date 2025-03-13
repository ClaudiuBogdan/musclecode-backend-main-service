package articulationpoints

// ArticulationPointsRecursive implements the articulation points algorithm using recursive DFS.
func ArticulationPointsRecursive(graph [][]int) []int {
	n := len(graph)
	visited := make([]bool, n)
	disc := make([]int, n)
	low := make([]int, n)
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	artPoints := make(map[int]struct{})
	time := 0

	var dfs func(u int)
	dfs = func(u int) {
		visited[u] = true
		disc[u] = time
		low[u] = time
		time++
		children := 0

		for _, v := range graph[u] {
			if !visited[v] {
				parent[v] = u
				children++
				dfs(v)
				if low[v] < low[u] {
					low[u] = low[v]
				}
				if parent[u] == -1 && children > 1 {
					artPoints[u] = struct{}{}
				}
				if parent[u] != -1 && low[v] >= disc[u] {
					artPoints[u] = struct{}{}
				}
			} else if v != parent[u] {
				if disc[v] < low[u] {
					low[u] = disc[v]
				}
			}
		}
	}

	for i := 0; i < n; i++ {
		if !visited[i] {
			dfs(i)
		}
	}

	// Convert artPoints map to slice
	result := []int{}
	for k := range artPoints {
		result = append(result, k)
	}
	return result
} 