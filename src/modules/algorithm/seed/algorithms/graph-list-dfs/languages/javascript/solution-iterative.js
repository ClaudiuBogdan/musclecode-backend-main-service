/**
 * Performs a Depth-First Search (DFS) traversal on a graph using an iterative approach.
 *
 * @param {Object} graph - An adjacency list representation of the graph where keys are vertices and values are arrays of adjacent vertices
 * @param {string} startVertex - The vertex to start the DFS traversal from
 * @returns {string[]} An array containing the vertices in the order they were visited
 */
function dfs(graph, startVertex) {
  const visited = new Set();
  const result = [];
  const stack = [startVertex];

  while (stack.length > 0) {
    // Pop a vertex from the stack
    const vertex = stack.pop();

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

module.exports = { dfs };
