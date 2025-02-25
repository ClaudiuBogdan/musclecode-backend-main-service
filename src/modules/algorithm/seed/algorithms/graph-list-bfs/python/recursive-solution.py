"""
Breadth-First Search (BFS) algorithm implementation for graphs represented as adjacency lists.

This is a recursive implementation that simulates BFS behavior.

Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
Space Complexity: O(V) for the queue, visited set, and call stack

The implementation:
- Uses a recursive approach to simulate BFS
- Maintains a queue and visited set across recursive calls
- Processes one level of the graph at a time
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
    
    # Start the recursive BFS
    _bfs_recursive(graph, queue, visited, result)
    
    return result

def _bfs_recursive(graph, queue, visited, result):
    """
    Helper function for recursive BFS implementation
    
    Args:
        graph: The adjacency list representation of the graph
        queue: Queue of vertices to visit
        visited: Set of visited vertices
        result: List to store the traversal order
    """
    # Base case: if the queue is empty, we're done
    if not queue:
        return
    
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
    
    # Recursive call to process the next vertex in the queue
    _bfs_recursive(graph, queue, visited, result) 