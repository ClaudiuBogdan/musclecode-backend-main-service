/**
 * Performs a Depth-First Search (DFS) traversal on a graph using recursion.
 *
 * @param graph - An adjacency list representation of the graph where keys are vertices and values are arrays of adjacent vertices
 * @param startVertex - The vertex to start the DFS traversal from
 * @returns An array containing the vertices in the order they were visited
 */
export function dfs(
  graph: Record<string, string[]>,
  startVertex: string,
): string[] {
  const visited: Set<string> = new Set();
  const result: string[] = [];

  // Helper function for recursive DFS
  function dfsHelper(vertex: string): void {
    // Mark the current vertex as visited and add to result
    visited.add(vertex);
    result.push(vertex);

    // Visit all adjacent vertices that haven't been visited yet
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        dfsHelper(neighbor);
      }
    }
  }

  // Start DFS from the given vertex
  dfsHelper(startVertex);

  return result;
}
