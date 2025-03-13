from typing import List

def hamiltonian_path(graph: List[List[int]]) -> bool:
    """
    Determines if a Hamiltonian path exists in the given graph using backtracking.
    Args:
        graph: A 2D list representing the adjacency matrix of the graph.
    Returns:
        True if a Hamiltonian path exists, false otherwise.
    """
    n = len(graph)
    if n == 0:
        return False

    path: List[int] = []
    visited = [False] * n

    def find_path(v: int) -> bool:
        path.append(v)
        visited[v] = True

        if len(path) == n:
            return True

        for i in range(n):
            if graph[v][i] == 1 and not visited[i]:
                if find_path(i):
                    return True

        # Backtrack
        path.pop()
        visited[v] = False
        return False

    for start_node in range(n):
        if find_path(start_node):
            return True
        # Reset visited and path for the next start node
        path.clear()
        visited = [False] * n

    return False 