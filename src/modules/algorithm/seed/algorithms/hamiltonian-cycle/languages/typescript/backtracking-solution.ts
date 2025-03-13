/**
 * Determines if a Hamiltonian Cycle exists in a given graph using backtracking.
 * @param {number[][]} graph - Adjacency matrix representing the graph.
 * @returns {number[] | null} - A Hamiltonian Cycle if it exists, otherwise null.
 */
export function findHamiltonianCycle(graph: number[][]): number[] | null {
  const numVertices = graph.length;
  const path: number[] = new Array(numVertices);
  const visited: boolean[] = new Array(numVertices).fill(false);

  // Start from vertex 0
  path[0] = 0;
  visited[0] = true;

  if (hamCycleUtil(graph, path, visited, 1)) {
    path[numVertices] = 0; // Complete the cycle
    return path;
  }

  return null;

  function hamCycleUtil(
    graph: number[][],
    path: number[],
    visited: boolean[],
    position: number,
  ): boolean {
    // Base case: all vertices are included in the path
    if (position === numVertices) {
      // Check if the last vertex is adjacent to the first vertex
      if (graph[path[position - 1]][path[0]] === 1) {
        return true;
      } else {
        return false;
      }
    }

    // Try different vertices as the next candidate in the Hamiltonian Cycle
    for (let vertex = 1; vertex < numVertices; vertex++) {
      if (graph[path[position - 1]][vertex] === 1 && !visited[vertex]) {
        path[position] = vertex;
        visited[vertex] = true;

        // Recur to construct the rest of the path
        if (hamCycleUtil(graph, path, visited, position + 1)) {
          return true;
        }

        // Backtrack: If adding the current vertex doesn't lead to a solution,
        // then remove it and try a different vertex
        visited[vertex] = false;
        path[position] = -1;
      }
    }

    // If no vertex can be added to the path, return false
    return false;
  }
}
