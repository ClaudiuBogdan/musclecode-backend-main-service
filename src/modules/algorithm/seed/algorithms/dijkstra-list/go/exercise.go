package dijkstra

// Edge represents a weighted edge in the graph
type Edge struct {
	Node   string
	Weight int
}

// Graph is an adjacency list representation of a weighted graph
type Graph map[string][]Edge

// Dijkstra implements Dijkstra's algorithm to find the shortest path from a source node
// to all other nodes in a weighted graph.
//
// Parameters:
//   - graph: An adjacency list representation of a weighted graph
//   - source: The source node to start the algorithm from
//
// Returns:
//   - A map of nodes to their shortest distance from the source
func Dijkstra(graph Graph, source string) map[string]float64 {
	// TODO: Implement Dijkstra's algorithm
	return nil
} 