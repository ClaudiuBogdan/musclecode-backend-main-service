package primslist

import "container/heap"

// Define a priority queue as a slice of edges
type PriorityQueue []EdgeWithNodes

// EdgeWithNodes struct to hold edge information along with the nodes it connects
type EdgeWithNodes struct {
	Weight int
	From   int
	To     int
}

// Implement the heap.Interface methods for the PriorityQueue
func (pq PriorityQueue) Len() int { return len(pq) }

// Less is modified to compare EdgeWithNodes based on their weights
func (pq PriorityQueue) Less(i, j int) bool {
	return pq[i].Weight < pq[j].Weight
}

func (pq PriorityQueue) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
}

func (pq *PriorityQueue) Push(x interface{}) {
	item := x.(EdgeWithNodes)
	*pq = append(*pq, item)
}

func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	*pq = old[0 : n-1]
	return item
}

// PrimsAlgorithm finds the Minimum Spanning Tree (MST) of a weighted, undirected graph using Prim's algorithm.
// It returns the total weight of the MST and the edges that form it.
func PrimsAlgorithm(graph Graph) (int, [][]int) {
	vertices := make([]int, 0, len(graph))
	for v := range graph {
		vertices = append(vertices, v)
	}

	if len(vertices) == 0 {
		return 0, [][]int{}
	}

	mstEdges := [][]int{}
	mstWeight := 0
	visited := make(map[int]bool)
	pq := make(PriorityQueue, 0)
	heap.Init(&pq)

	// Start from the first vertex
	startVertex := vertices[0]
	visited[startVertex] = true

	// Add initial edges to the priority queue
	for _, edge := range graph[startVertex] {
		heap.Push(&pq, EdgeWithNodes{Weight: edge.Weight, From: startVertex, To: edge.To})
	}

	var primsAlgorithmHelper func()
	primsAlgorithmHelper = func() {
		if pq.Len() == 0 {
			return
		}

		edgeWithNodes := heap.Pop(&pq).(EdgeWithNodes)
		weight := edgeWithNodes.Weight
		from := edgeWithNodes.From
		to := edgeWithNodes.To

		if visited[to] {
			primsAlgorithmHelper()
			return
		}

		visited[to] = true
		mstWeight += weight
		mstEdges = append(mstEdges, []int{from, to})

		// Add new edges to the priority queue
		for _, edge := range graph[to] {
			if !visited[edge.To] {
				heap.Push(&pq, EdgeWithNodes{Weight: edge.Weight, From: to, To: edge.To})
			}
		}

		primsAlgorithmHelper()
	}

	primsAlgorithmHelper()
	return mstWeight, mstEdges
} 