import heapq
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
    to all other nodes in a weighted graph using an iterative approach.
    
    Args:
        graph: An adjacency list representation of a weighted graph
               where keys are node names and values are lists of edges
               Each edge is a dictionary with 'node' and 'weight' keys
        source: The source node to start the algorithm from
        
    Returns:
        A dictionary mapping each node to its shortest distance from the source
        
    Time Complexity: O((V + E) log V) where V is the number of vertices and E is the number of edges
    Space Complexity: O(V) for storing distances and the priority queue
    
    The implementation:
    - Uses a priority queue (min heap) to efficiently select the next node to process
    - Maintains a distance map to track the shortest known distance to each node
    - Processes nodes in order of increasing distance from the source
    - Updates distances when shorter paths are found
    - Returns the final distance map when all reachable nodes have been processed
    """
    # Initialize distances with infinity for all nodes except the source
    distances = {node: float('inf') for node in graph}
    distances[source] = 0
    
    # Initialize priority queue with source node
    # Format: (distance, node)
    priority_queue = [(0, source)]
    
    # Keep track of visited nodes
    visited = set()
    
    # Process nodes until the priority queue is empty
    while priority_queue:
        # Get the node with the smallest distance
        current_distance, current_node = heapq.heappop(priority_queue)
        
        # Skip if we've already processed this node
        if current_node in visited:
            continue
        
        # Mark as visited
        visited.add(current_node)
        
        # If current distance is greater than the known distance, skip
        # This can happen due to duplicate entries in the priority queue
        if current_distance > distances[current_node]:
            continue
        
        # Process all neighbors of the current node
        for edge in graph.get(current_node, []):
            neighbor = edge['node']
            weight = edge['weight']
            
            # Skip if we've already processed this neighbor
            if neighbor in visited:
                continue
            
            # Calculate new distance to the neighbor
            new_distance = current_distance + weight
            
            # Update distance if we found a shorter path
            if new_distance < distances.get(neighbor, float('inf')):
                distances[neighbor] = new_distance
                heapq.heappush(priority_queue, (new_distance, neighbor))
    
    return distances 