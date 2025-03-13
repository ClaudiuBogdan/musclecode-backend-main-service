from typing import List

def hamiltonian_path(graph: List[List[int]]) -> bool:
    """
    Determines if a Hamiltonian path exists in the given graph using dynamic programming (Held-Karp algorithm).
    Note: This solution has a time complexity of O(n^2 * 2^n) and may not be suitable for large graphs.
    Args:
        graph: A 2D list representing the adjacency matrix of the graph.
    Returns:
        True if a Hamiltonian path exists, false otherwise.
    """
    n = len(graph)
    if n == 0:
        return False

    # dp[i][mask] is true if there is a path that visits all vertices in 'mask' ending at vertex i
    dp = [[False] * (1 << n) for _ in range(n)]

    # Base case: a path of length 1 ending at each vertex is possible
    for i in range(n):
        dp[i][1 << i] = True

    # Build the dp table
    for mask in range(1, 1 << n):
        for i in range(n):
            if (mask & (1 << i)) != 0:  # If vertex i is in the mask
                for j in range(n):
                    if i != j and (mask & (1 << j)) != 0 and graph[j][i] == 1:  # If vertex j is also in the mask and there is an edge from j to i
                        dp[i][mask] = dp[i][mask] or dp[j][mask ^ (1 << i)]

    # Check if there is a path that visits all vertices ending at any vertex
    for i in range(n):
        if dp[i][(1 << n) - 1]:
            return True

    return False 