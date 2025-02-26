from typing import List, Tuple, Dict
import heapq

Graph = Dict[int, List[Tuple[int, int]]]  # Node -> List of (neighbor, weight) tuples

def prims_algorithm(graph: Graph) -> Tuple[int, List[Tuple[int, int]]]:
    """
    Finds the Minimum Spanning Tree (MST) of a weighted, undirected graph using Prim's algorithm iteratively.

    Args:
        graph: A dictionary representing the graph where keys are nodes and values are lists of (neighbor, weight) tuples.

    Returns:
        A tuple containing the total weight of the MST and a list of edges that form the MST.
    """
    vertices = list(graph.keys())
    if not vertices:
        return 0, []

    mst_edges: List[Tuple[int, int]] = []
    mst_weight = 0
    visited = set()
    priority_queue = []  # (weight, from_node, to_node)

    # Start from the first vertex
    start_vertex = vertices[0]
    visited.add(start_vertex)

    # Add initial edges to the priority queue
    for neighbor, weight in graph[start_vertex]:
        heapq.heappush(priority_queue, (weight, start_vertex, neighbor))

    while priority_queue:
        weight, from_node, to_node = heapq.heappop(priority_queue)

        if to_node in visited:
            continue

        visited.add(to_node)
        mst_weight += weight
        mst_edges.append((from_node, to_node))

        # Add new edges to the priority queue
        if to_node in graph:
            for neighbor, weight in graph[to_node]:
                if neighbor not in visited:
                    heapq.heappush(priority_queue, (weight, to_node, neighbor))

    return mst_weight, mst_edges 