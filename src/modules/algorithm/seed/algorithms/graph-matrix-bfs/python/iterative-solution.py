from typing import List
from collections import deque

def bfs_matrix(graph: List[List[int]], start_vertex: int) -> List[int]:
    """
    Performs a Breadth-First Search (BFS) on a graph represented by an adjacency matrix.

    Args:
        graph: The adjacency matrix representing the graph.
               `graph[i][j] == 1` if there's an edge from vertex i to vertex j, 0 otherwise.
        start_vertex: The index of the starting vertex for the traversal.

    Returns:
        A list containing the indices of the vertices in the order they were visited.

    Time Complexity: O(V^2), where V is the number of vertices.
    Space Complexity: O(V), due to the queue and visited array.
    """
    num_vertices = len(graph)
    visited = [False] * num_vertices
    queue = deque()
    traversal = []

    if start_vertex < 0 or start_vertex >= num_vertices:
        return []  # Or raise an exception

    queue.append(start_vertex)
    visited[start_vertex] = True

    while queue:
        current_vertex = queue.popleft()
        traversal.append(current_vertex)

        for neighbor in range(num_vertices):
            if graph[current_vertex][neighbor] == 1 and not visited[neighbor]:
                queue.append(neighbor)
                visited[neighbor] = True

    return traversal 