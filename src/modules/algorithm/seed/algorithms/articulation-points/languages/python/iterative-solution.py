from typing import List

def articulation_points_iterative(graph: List[List[int]]) -> List[int]:
    """
    Iterative implementation of the articulation points algorithm using an explicit stack.
    
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
    child_count = [0] * n
    time = 0

    # Stack items will be tuples: (u, index)
    for i in range(n):
        if not visited[i]:
            stack = [(i, 0)]
            visited[i] = True
            disc[i] = low[i] = time
            time += 1

            while stack:
                u, index = stack[-1]
                if index < len(graph[u]):
                    v = graph[u][index]
                    # update index for u
                    stack[-1] = (u, index + 1)
                    if not visited[v]:
                        parent[v] = u
                        child_count[u] += 1
                        visited[v] = True
                        disc[v] = low[v] = time
                        time += 1
                        stack.append((v, 0))
                    elif v != parent[u]:
                        low[u] = min(low[u], disc[v])
                else:
                    stack.pop()
                    if parent[u] != -1:
                        p = parent[u]
                        low[p] = min(low[p], low[u])
                        if low[u] >= disc[p]:
                            art_points.add(p)
                    else:
                        if child_count[u] > 1:
                            art_points.add(u)
    return list(art_points) 