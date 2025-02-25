from typing import Dict, List, TypedDict

# Type definitions for better code readability
class Edge(TypedDict):
    node: str
    weight: int

Graph = Dict[str, List[Edge]]
DistanceMap = Dict[str, float]

def dijkstra(graph: Graph, source: str) -> DistanceMap:
    """
    Implements Dijkstra's algorithm to find the shortest path from a source node
    to all other nodes in a weighted graph.
    
    Args:
        graph: An adjacency list representation of a weighted graph
               where keys are node names and values are lists of edges
               Each edge is a dictionary with 'node' and 'weight' keys
        source: The source node to start the algorithm from
        
    Returns:
        A dictionary mapping each node to its shortest distance from the source
    """
    # TODO: Implement Dijkstra's algorithm
    pass 