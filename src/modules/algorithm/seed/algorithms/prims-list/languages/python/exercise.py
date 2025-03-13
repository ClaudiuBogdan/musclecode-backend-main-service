from typing import List, Tuple, Dict

Graph = Dict[int, List[Tuple[int, int]]]  # Node -> List of (neighbor, weight) tuples

def prims_algorithm(graph: Graph) -> Tuple[int, List[Tuple[int, int]]]:
    """
    Finds the Minimum Spanning Tree (MST) of a weighted, undirected graph using Prim's algorithm.

    Args:
        graph: A dictionary representing the graph where keys are nodes and values are lists of (neighbor, weight) tuples.

    Returns:
        A tuple containing the total weight of the MST and a list of edges that form the MST.
    """
    # TODO: Implement Prim's algorithm using the adjacency list representation
    return 0, [] 