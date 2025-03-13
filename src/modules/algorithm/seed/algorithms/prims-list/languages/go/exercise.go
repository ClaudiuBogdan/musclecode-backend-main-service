package primslist

type Graph map[int][]Edge

type Edge struct {
	To     int
	Weight int
}

// PrimsAlgorithm finds the Minimum Spanning Tree (MST) of a weighted, undirected graph using Prim's algorithm.
// It returns the total weight of the MST and the edges that form it.
func PrimsAlgorithm(graph Graph) (int, [][]int) {
	// TODO: Implement Prim's algorithm using the adjacency list representation
	return 0, [][]int{}
} 