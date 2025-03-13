from typing import List

def articulation_points_recursive(graph: List[List[int]]) -> List[int]:
    """
    Recursive implementation of the articulation points algorithm using DFS.
    
    Args:
        graph: An undirected graph represented as an adjacency list.
    
    Returns:
        A list of articulation points.
    """
    n = len(graph)
    visited = [False] * n
    disc = [0] * n
    low = [0] * n
    parent = [-1] * n
    art_points = set()
    time = [0]  # Using a list for mutability

    def dfs(u: int):
        visited[u] = True
        disc[u] = low[u] = time[0]
        time[0] += 1
        children = 0

        for v in graph[u]:
            if not visited[v]:
                parent[v] = u
                children += 1
                dfs(v)
                low[u] = min(low[u], low[v])
                if parent[u] == -1 and children > 1:
                    art_points.add(u)
                if parent[u] != -1 and low[v] >= disc[u]:
                    art_points.add(u)
            elif v != parent[u]:
                low[u] = min(low[u], disc[v])

    for i in range(n):
        if not visited[i]:
            dfs(i)
    return list(art_points) 