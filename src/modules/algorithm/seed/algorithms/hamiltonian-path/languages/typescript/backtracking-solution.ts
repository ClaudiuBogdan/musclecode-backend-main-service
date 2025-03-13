/**
 * Determines if a Hamiltonian path exists in the given graph using backtracking.
 * @param graph A 2D array representing the adjacency matrix of the graph.
 * @returns True if a Hamiltonian path exists, false otherwise.
 */
export function hamiltonianPath(graph: number[][]): boolean {
  const n = graph.length;
  if (n === 0) return false;

  const path: number[] = [];
  const visited = new Array(n).fill(false);

  function findPath(v: number): boolean {
    path.push(v);
    visited[v] = true;

    if (path.length === n) {
      return true;
    }

    for (let i = 0; i < n; i++) {
      if (graph[v][i] === 1 && !visited[i]) {
        if (findPath(i)) {
          return true;
        }
      }
    }

    // Backtrack
    path.pop();
    visited[v] = false;
    return false;
  }

  for (let startNode = 0; startNode < n; startNode++) {
    if (findPath(startNode)) {
      return true;
    }
    // Reset visited and path for the next start node
    path.length = 0;
    visited.fill(false);
  }

  return false;
}
