def dfs(graph, start_vertex):
    """
    Performs a Depth-First Search (DFS) traversal on a graph using recursion.
    
    Args:
        graph: A dictionary representing the graph as an adjacency list
               where keys are vertices and values are lists of adjacent vertices
        start_vertex: The vertex to start the DFS traversal from
        
    Returns:
        A list containing the vertices in the order they were visited
    """
    visited = set()
    result = []
    
    def dfs_helper(vertex):
        # Mark the current vertex as visited and add to result
        visited.add(vertex)
        result.append(vertex)
        
        # Visit all adjacent vertices that haven't been visited yet
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                dfs_helper(neighbor)
    
    # Start DFS from the given vertex
    dfs_helper(start_vertex)
    
    return result 