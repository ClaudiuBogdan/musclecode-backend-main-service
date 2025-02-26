/**
 * Performs a Depth-First Search (DFS) traversal on a graph using an iterative approach.
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
  const stack: string[] = [startVertex];

  while (stack.length > 0) {
    // Pop a vertex from the stack
    const vertex = stack.pop()!;

    // Skip if already visited
    if (visited.has(vertex)) {
      continue;
    }

    // Mark as visited and add to result
    visited.add(vertex);
    result.push(vertex);

    // Add neighbors to the stack in reverse order
    // This ensures we visit them in the same order as the recursive solution
    for (let i = graph[vertex].length - 1; i >= 0; i--) {
      const neighbor = graph[vertex][i];
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return result;
}
