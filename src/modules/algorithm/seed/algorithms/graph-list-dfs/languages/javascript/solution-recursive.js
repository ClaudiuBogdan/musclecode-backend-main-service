/**
 * Performs a Depth-First Search (DFS) traversal on a graph using recursion.
 *
 * @param {Object} graph - An adjacency list representation of the graph where keys are vertices and values are arrays of adjacent vertices
 * @param {string} startVertex - The vertex to start the DFS traversal from
 * @returns {string[]} An array containing the vertices in the order they were visited
 */
function dfs(graph, startVertex) {
  const visited = new Set();
  const result = [];

  // Helper function for recursive DFS
  function dfsHelper(vertex) {
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

module.exports = { dfs };
