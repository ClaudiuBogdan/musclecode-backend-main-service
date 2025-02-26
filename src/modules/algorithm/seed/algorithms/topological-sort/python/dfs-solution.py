from typing import List

def topological_sort(n: int, edges: List[List[int]]) -> List[int]:
    """
    Topological Sort using Depth-First Search (DFS)

    Args:
        n: The number of vertices in the graph.
        edges: The edges of the graph represented as a list of [u, v] pairs.

    Returns:
        A topological ordering of the vertices.
    """
    graph = {i: [] for i in range(n)}
    for u, v in edges:
        graph[u].append(v)

    visited = [False] * n
    stack = []

    def dfs(node: int) -> bool:
        visited[node] = True

        for neighbor in graph[node]:
            if not visited[neighbor]:
                if not dfs(neighbor):
                    return False  # Cycle detected
            elif neighbor in stack:
                return False  # Cycle detected

        stack.insert(0, node)  # Push node onto stack after visiting all its neighbors
        return True

    for i in range(n):
        if not visited[i]:
            if not dfs(i):
                return []  # Cycle detected

    return stack 