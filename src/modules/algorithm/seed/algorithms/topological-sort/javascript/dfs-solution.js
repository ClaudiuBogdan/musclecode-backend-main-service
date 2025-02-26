/**
 * Topological Sort using Depth-First Search (DFS)
 *
 * @param {number} n - The number of vertices in the graph.
 * @param {number[][]} edges - The edges of the graph represented as an array of [u, v] pairs.
 * @returns {number[]} A topological ordering of the vertices.
 */
function topologicalSort(n, edges) {
  const graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  for (const [u, v] of edges) {
    graph[u].push(v);
  }

  const visited = new Array(n).fill(false);
  const stack = [];

  function dfs(node) {
    visited[node] = true;

    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        if (!dfs(neighbor)) {
          return false; // Cycle detected
        }
      } else if (stack.indexOf(neighbor) === -1) {
        return false; // Cycle detected
      }
    }

    stack.unshift(node); // Push node onto stack after visiting all its neighbors
    return true;
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      if (!dfs(i)) {
        return []; // Cycle detected
      }
    }
  }

  return stack;
}

module.exports = { topologicalSort };
