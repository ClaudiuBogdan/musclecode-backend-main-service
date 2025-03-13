from typing import List
from collections import deque

def topological_sort(n: int, edges: List[List[int]]) -> List[int]:
    """
    Topological Sort using Kahn's Algorithm (BFS)

    Args:
        n: The number of vertices in the graph.
        edges: The edges of the graph represented as a list of [u, v] pairs.

    Returns:
        A topological ordering of the vertices.
    """
    graph = {i: [] for i in range(n)}
    in_degree = [0] * n

    for u, v in edges:
        graph[u].append(v)
        in_degree[v] += 1

    queue = deque([i for i in range(n) if in_degree[i] == 0])
    result = []
    count = 0

    while queue:
        u = queue.popleft()
        result.append(u)
        count += 1

        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    return result if count == n else []  # Check for cycle 