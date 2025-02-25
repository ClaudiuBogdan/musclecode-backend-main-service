"""
Breadth-First Search (BFS) algorithm implementation for graphs represented as adjacency lists.

This is an iterative implementation using a queue.

Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
Space Complexity: O(V) for the queue and visited set

The implementation:
- Uses a queue to keep track of vertices to visit
- Uses a set to keep track of visited vertices
- Starts with the given vertex and explores all its neighbors
- Then explores neighbors of neighbors in a level-by-level manner
- Avoids revisiting vertices by checking the visited set

Args:
    graph: A dictionary representing the graph as an adjacency list where keys are vertices
           and values are lists of adjacent vertices
    start: The starting vertex for the BFS traversal

Returns:
    A list containing the vertices in the order they were visited during BFS traversal
"""
from collections import deque

def bfs(graph, start):
    # List to store the order of visited vertices
    result = []
    
    # Set to keep track of visited vertices
    visited = set()
    
    # Queue for BFS traversal (using deque for efficient popleft operation)
    queue = deque([start])
    
    # Mark the starting vertex as visited
    visited.add(start)
    
    # Continue until the queue is empty
    while queue:
        # Remove the first vertex from the queue
        current_vertex = queue.popleft()
        
        # Add the current vertex to the result
        result.append(current_vertex)
        
        # Get all adjacent vertices of the current vertex
        neighbors = graph.get(current_vertex, [])
        
        # For each adjacent vertex
        for neighbor in neighbors:
            # If the neighbor hasn't been visited yet
            if neighbor not in visited:
                # Add it to the queue and mark it as visited
                queue.append(neighbor)
                visited.add(neighbor)
    
    return result 