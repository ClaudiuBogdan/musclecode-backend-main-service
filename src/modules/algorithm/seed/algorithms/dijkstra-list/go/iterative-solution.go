package dijkstra

import (
	"container/heap"
	"math"
)

// Edge represents a weighted edge in the graph
type Edge struct {
	Node   string
	Weight int
}

// Graph is an adjacency list representation of a weighted graph
type Graph map[string][]Edge

// PriorityQueue implements a min-heap for Dijkstra's algorithm
type PriorityQueue []*Item

// Item represents a node with its priority (distance) in the priority queue
type Item struct {
	Node     string
	Distance float64
	Index    int // Index in the heap, used by the heap.Interface methods
}

// Len returns the length of the priority queue
func (pq PriorityQueue) Len() int { return len(pq) }

// Less compares two items by distance
func (pq PriorityQueue) Less(i, j int) bool {
	return pq[i].Distance < pq[j].Distance
}

// Swap swaps two items in the priority queue
func (pq PriorityQueue) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].Index = i
	pq[j].Index = j
}

// Push adds an item to the priority queue
func (pq *PriorityQueue) Push(x interface{}) {
	n := len(*pq)
	item := x.(*Item)
	item.Index = n
	*pq = append(*pq, item)
}

// Pop removes and returns the minimum item from the priority queue
func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	old[n-1] = nil  // avoid memory leak
	item.Index = -1 // for safety
	*pq = old[0 : n-1]
	return item
}

// Update modifies the distance of an item in the priority queue
func (pq *PriorityQueue) Update(item *Item, distance float64) {
	item.Distance = distance
	heap.Fix(pq, item.Index)
}

// Dijkstra implements Dijkstra's algorithm to find the shortest path from a source node
// to all other nodes in a weighted graph using an iterative approach.
//
// Parameters:
//   - graph: An adjacency list representation of a weighted graph
//   - source: The source node to start the algorithm from
//
// Returns:
//   - A map of nodes to their shortest distance from the source
//
// Time Complexity: O((V + E) log V) where V is the number of vertices and E is the number of edges
// Space Complexity: O(V) for storing distances and the priority queue
//
// The implementation:
// - Uses a priority queue to efficiently select the next node to process
// - Maintains a distance map to track the shortest known distance to each node
// - Processes nodes in order of increasing distance from the source
// - Updates distances when shorter paths are found
// - Returns the final distance map when all reachable nodes have been processed
func Dijkstra(graph Graph, source string) map[string]float64 {
	// Initialize distances with infinity for all nodes except the source
	distances := make(map[string]float64)
	for node := range graph {
		distances[node] = math.Inf(1) // Positive infinity
	}
	distances[source] = 0

	// Initialize priority queue with source node
	pq := make(PriorityQueue, 0)
	heap.Init(&pq)
	
	// Add source to the priority queue
	sourceItem := &Item{
		Node:     source,
		Distance: 0,
	}
	heap.Push(&pq, sourceItem)
	
	// Keep track of items in the priority queue for quick updates
	items := make(map[string]*Item)
	items[source] = sourceItem
	
	// Keep track of visited nodes
	visited := make(map[string]bool)
	
	// Process nodes until the priority queue is empty
	for pq.Len() > 0 {
		// Get the node with the smallest distance
		current := heap.Pop(&pq).(*Item)
		currentNode := current.Node
		currentDistance := current.Distance
		
		// Skip if we've already processed this node
		if visited[currentNode] {
			continue
		}
		
		// Mark as visited
		visited[currentNode] = true
		
		// If current distance is greater than the known distance, skip
		if currentDistance > distances[currentNode] {
			continue
		}
		
		// Process all neighbors of the current node
		for _, edge := range graph[currentNode] {
			neighbor := edge.Node
			weight := float64(edge.Weight)
			
			// Skip if we've already processed this neighbor
			if visited[neighbor] {
				continue
			}
			
			// Calculate new distance to the neighbor
			newDistance := currentDistance + weight
			
			// Update distance if we found a shorter path
			if newDistance < distances[neighbor] {
				distances[neighbor] = newDistance
				
				// Add or update neighbor in the priority queue
				if item, exists := items[neighbor]; exists {
					pq.Update(item, newDistance)
				} else {
					item := &Item{
						Node:     neighbor,
						Distance: newDistance,
					}
					heap.Push(&pq, item)
					items[neighbor] = item
				}
			}
		}
	}
	
	return distances
} 