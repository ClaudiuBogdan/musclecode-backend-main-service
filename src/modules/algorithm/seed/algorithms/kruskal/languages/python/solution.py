from typing import List, Tuple

Edge = Tuple[int, int, int]

def kruskal(vertices: int, edges: List[Edge]) -> List[Edge]:
    """
    Finds the Minimum Spanning Tree (MST) of a graph using Kruskal's algorithm.

    Args:
        vertices: The number of vertices in the graph.
        edges: A list of edges, where each edge is a tuple (source, destination, weight).

    Returns:
        A list of edges that form the MST.
    """
    edges.sort(key=lambda edge: edge[2])  # Sort edges by weight

    parent = list(range(vertices))

    def find(i: int) -> int:
        if parent[i] == i:
            return i
        parent[i] = find(parent[i])  # Path compression
        return parent[i]

    def union(i: int, j: int) -> None:
        root_i = find(i)
        root_j = find(j)
        parent[root_i] = root_j

    mst: List[Edge] = []
    for u, v, weight in edges:
        if find(u) != find(v):
            union(u, v)
            mst.append((u, v, weight))

    return mst 