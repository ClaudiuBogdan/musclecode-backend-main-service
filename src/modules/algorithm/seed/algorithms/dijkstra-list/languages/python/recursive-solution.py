from typing import Dict, List, TypedDict, Set, Optional, Tuple

# Type definitions for better code readability
class Edge(TypedDict):
    node: str
    weight: int

Graph = Dict[str, List[Edge]]
DistanceMap = Dict[str, float]

def dijkstra(graph: Graph, source: str) -> DistanceMap:
    """
    Implements Dijkstra's algorithm to find the shortest path from a source node
    to all other nodes in a weighted graph using a recursive approach.
    
    Args:
        graph: An adjacency list representation of a weighted graph
               where keys are node names and values are lists of edges
               Each edge is a dictionary with 'node' and 'weight' keys
        source: The source node to start the algorithm from
        
    Returns:
        A dictionary mapping each node to its shortest distance from the source
        
    Time Complexity: O(V²) where V is the number of vertices
    Space Complexity: O(V) for storing distances and the visited set, plus O(V) for the recursion stack
    
    The implementation:
    - Uses a recursive approach to process nodes in order of increasing distance
    - Maintains a distance map to track the shortest known distance to each node
    - Processes the node with the smallest tentative distance at each step
    - Updates distances when shorter paths are found
    - Returns the final distance map when all reachable nodes have been processed
    """
    # Initialize distances with infinity for all nodes except the source
    distances = {node: float('inf') for node in graph}
    distances[source] = 0
    
    # Keep track of visited nodes
    visited: Set[str] = set()
    
    def find_next_node() -> Optional[Tuple[str, float]]:
        """Find the unvisited node with the smallest distance."""
        min_distance = float('inf')
        next_node = None
        
        for node, distance in distances.items():
            if node not in visited and distance < min_distance:
                min_distance = distance
                next_node = node
        
        if next_node is None:
            return None
        
        return next_node, min_distance
    
    def process_next_node() -> None:
        """Process the next unvisited node with the smallest distance."""
        # Find the next node to process
        result = find_next_node()
        
        # If no unvisited nodes or all remaining nodes are unreachable, we're done
        if result is None:
            return
        
        current_node, _ = result
        
        # Mark the node as visited
        visited.add(current_node)
        
        # Process all neighbors of the current node
        for edge in graph.get(current_node, []):
            neighbor = edge['node']
            weight = edge['weight']
            
            # Skip if we've already processed this neighbor
            if neighbor in visited:
                continue
            
            # Calculate new distance to the neighbor
            new_distance = distances[current_node] + weight
            
            # Update distance if we found a shorter path
            if new_distance < distances.get(neighbor, float('inf')):
                distances[neighbor] = new_distance
        
        # Recursively process the next node
        process_next_node()
    
    # Start the recursive process
    process_next_node()
    
    return distances 