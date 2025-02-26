package kruskal

import (
	"sort"
)

// Edge represents a weighted edge in the graph
type Edge struct {
	Source      int
	Destination int
	Weight      int
}

// Kruskal finds the Minimum Spanning Tree (MST) of a graph using Kruskal's algorithm.
// It returns a list of edges that form the MST.
func Kruskal(vertices int, edges []Edge) []Edge {
	// Sort edges by weight in ascending order
	sort.Slice(edges, func(i, j int) bool {
		return edges[i].Weight < edges[j].Weight
	})

	parent := make([]int, vertices)
	for i := range parent {
		parent[i] = i
	}

	var find func(int) int
	find = func(i int) int {
		if parent[i] == i {
			return i
		}
		parent[i] = find(parent[i]) // Path compression
		return parent[i]
	}

	union := func(i, j int) {
		rootI := find(i)
		rootJ := find(j)
		parent[rootI] = rootJ
	}

	mst := make([]Edge, 0)
	for _, edge := range edges {
		if find(edge.Source) != find(edge.Destination) {
			union(edge.Source, edge.Destination)
			mst = append(mst, edge)
		}
	}

	return mst
} 