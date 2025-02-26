/**
 * Topological Sort using Kahn's Algorithm (BFS)
 *
 * @param {number} n - The number of vertices in the graph.
 * @param {number[][]} edges - The edges of the graph represented as an array of [u, v] pairs.
 * @returns {number[]} A topological ordering of the vertices.
 */
function topologicalSort(n, edges) {
  const graph = {};
  const inDegree = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }

  for (const [u, v] of edges) {
    graph[u].push(v);
    inDegree[v]++;
  }

  const queue = [];
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  const result = [];
  let count = 0;

  while (queue.length > 0) {
    const u = queue.shift();
    result.push(u);
    count++;

    for (const v of graph[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) {
        queue.push(v);
      }
    }
  }

  return count === n ? result : []; // Check for cycle
}

module.exports = { topologicalSort };
