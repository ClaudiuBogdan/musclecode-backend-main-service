package dijkstra

import (
	"math"
)

// Edge represents a weighted edge in the graph
type Edge struct {
	Node   string
	Weight int
}

// Graph is an adjacency list representation of a weighted graph
type Graph map[string][]Edge

// Dijkstra implements Dijkstra's algorithm to find the shortest path from a source node
// to all other nodes in a weighted graph using a recursive approach.
//
// Parameters:
//   - graph: An adjacency list representation of a weighted graph
//   - source: The source node to start the algorithm from
//
// Returns:
//   - A map of nodes to their shortest distance from the source
//
// Time Complexity: O(V²) where V is the number of vertices
// Space Complexity: O(V) for storing distances and the visited set, plus O(V) for the recursion stack
//
// The implementation:
// - Uses a recursive approach to process nodes in order of increasing distance
// - Maintains a distance map to track the shortest known distance to each node
// - Processes the node with the smallest tentative distance at each step
// - Updates distances when shorter paths are found
// - Returns the final distance map when all reachable nodes have been processed
func Dijkstra(graph Graph, source string) map[string]float64 {
	// Initialize distances with infinity for all nodes except the source
	distances := make(map[string]float64)
	for node := range graph {
		distances[node] = math.Inf(1) // Positive infinity
	}
	distances[source] = 0
	
	// Keep track of visited nodes
	visited := make(map[string]bool)
	
	// Start the recursive process
	processNextNode(graph, distances, visited)
	
	return distances
}

// processNextNode recursively processes the next unvisited node with the smallest distance
func processNextNode(graph Graph, distances map[string]float64, visited map[string]bool) {
	// Find the unvisited node with the smallest distance
	minDistance := math.Inf(1)
	var nextNode string
	hasNext := false
	
	for node, distance := range distances {
		if !visited[node] && distance < minDistance {
			minDistance = distance
			nextNode = node
			hasNext = true
		}
	}
	
	// If no unvisited nodes or all remaining nodes are unreachable, we're done
	if !hasNext || minDistance == math.Inf(1) {
		return
	}
	
	// Mark the node as visited
	visited[nextNode] = true
	
	// Process all neighbors of the current node
	for _, edge := range graph[nextNode] {
		neighbor := edge.Node
		weight := float64(edge.Weight)
		
		// Skip if we've already processed this neighbor
		if visited[neighbor] {
			continue
		}
		
		// Calculate new distance to the neighbor
		newDistance := distances[nextNode] + weight
		
		// Update distance if we found a shorter path
		if newDistance < distances[neighbor] {
			distances[neighbor] = newDistance
		}
	}
	
	// Recursively process the next node
	processNextNode(graph, distances, visited)
} 