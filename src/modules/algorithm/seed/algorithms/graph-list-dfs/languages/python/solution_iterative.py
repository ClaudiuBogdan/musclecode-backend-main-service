def dfs(graph, start_vertex):
    """
    Performs a Depth-First Search (DFS) traversal on a graph using an iterative approach.
    
    Args:
        graph: A dictionary representing the graph as an adjacency list
               where keys are vertices and values are lists of adjacent vertices
        start_vertex: The vertex to start the DFS traversal from
        
    Returns:
        A list containing the vertices in the order they were visited
    """
    visited = set()
    result = []
    stack = [start_vertex]
    
    while stack:
        # Pop a vertex from the stack
        vertex = stack.pop()
        
        # Skip if already visited
        if vertex in visited:
            continue
        
        # Mark as visited and add to result
        visited.add(vertex)
        result.append(vertex)
        
        # Add neighbors to the stack in reverse order
        # This ensures we visit them in the same order as the recursive solution
        for neighbor in reversed(graph[vertex]):
            if neighbor not in visited:
                stack.append(neighbor)
    
    return result 