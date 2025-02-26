/**
 * Determines if a Hamiltonian path exists in the given graph using dynamic programming (Held-Karp algorithm).
 * Note: This solution has a time complexity of O(n^2 * 2^n) and may not be suitable for large graphs.
 * @param {number[][]} graph A 2D array representing the adjacency matrix of the graph.
 * @returns {boolean} True if a Hamiltonian path exists, false otherwise.
 */
function hamiltonianPath(graph) {
  const n = graph.length;
  if (n === 0) return false;

  // dp[i][mask] is true if there is a path that visits all vertices in 'mask' ending at vertex i
  const dp = Array(n)
    .fill(null)
    .map(() => Array(1 << n).fill(false));

  // Base case: a path of length 1 ending at each vertex is possible
  for (let i = 0; i < n; i++) {
    dp[i][1 << i] = true;
  }

  // Build the dp table
  for (let mask = 1; mask < 1 << n; mask++) {
    for (let i = 0; i < n; i++) {
      if ((mask & (1 << i)) !== 0) {
        // If vertex i is in the mask
        for (let j = 0; j < n; j++) {
          if (i !== j && (mask & (1 << j)) !== 0 && graph[j][i] === 1) {
            // If vertex j is also in the mask and there is an edge from j to i
            dp[i][mask] = dp[i][mask] || dp[j][mask ^ (1 << i)];
          }
        }
      }
    }
  }

  // Check if there is a path that visits all vertices ending at any vertex
  for (let i = 0; i < n; i++) {
    if (dp[i][(1 << n) - 1]) {
      return true;
    }
  }

  return false;
}

module.exports = { hamiltonianPath };
