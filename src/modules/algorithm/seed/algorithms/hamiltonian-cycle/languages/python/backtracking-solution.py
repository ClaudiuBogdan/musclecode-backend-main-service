from typing import List, Optional

def find_hamiltonian_cycle(graph: List[List[int]]) -> Optional[List[int]]:
    """
    Determines if a Hamiltonian Cycle exists in a given graph using backtracking.
    
    Args:
        graph: Adjacency matrix representing the graph.
    
    Returns:
        A Hamiltonian Cycle if it exists, otherwise None.
    """
    num_vertices = len(graph)
    path = [-1] * num_vertices
    visited = [False] * num_vertices

    # Start from vertex 0
    path[0] = 0
    visited[0] = True

    def ham_cycle_util(path: List[int], visited: List[bool], position: int) -> bool:
        # Base case: all vertices are included in the path
        if position == num_vertices:
            # Check if the last vertex is adjacent to the first vertex
            if graph[path[position - 1]][0] == 1:
                return True
            else:
                return False

        # Try different vertices as the next candidate in the Hamiltonian Cycle
        for vertex in range(1, num_vertices):
            if graph[path[position - 1]][vertex] == 1 and not visited[vertex]:
                path[position] = vertex
                visited[vertex] = True

                # Recur to construct the rest of the path
                if ham_cycle_util(path, visited, position + 1):
                    return True

                # Backtrack: If adding the current vertex doesn't lead to a solution,
                # then remove it and try a different vertex
                visited[vertex] = False
                path[position] = -1

        # If no vertex can be added to the path, return False
        return False

    if ham_cycle_util(path, visited, 1):
        path.append(0)  # Complete the cycle
        return path

    return None 