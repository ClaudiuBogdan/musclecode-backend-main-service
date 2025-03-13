/**
 * Recursive implementation of the articulation points algorithm using DFS.
 *
 * @param {number[][]} graph - The undirected graph represented as an adjacency list.
 * @returns {number[]} - An array of articulation points.
 */
function articulationPointsRecursive(graph) {
  const n = graph.length;
  const visited = new Array(n).fill(false);
  const disc = new Array(n).fill(0);
  const low = new Array(n).fill(0);
  const parent = new Array(n).fill(-1);
  const artPoints = new Set();
  let time = 0;

  function dfs(u) {
    visited[u] = true;
    disc[u] = low[u] = time++;
    let children = 0;
    for (const v of graph[u]) {
      if (!visited[v]) {
        parent[v] = u;
        children++;
        dfs(v);
        low[u] = Math.min(low[u], low[v]);
        if (parent[u] === -1 && children > 1) {
          artPoints.add(u);
        }
        if (parent[u] !== -1 && low[v] >= disc[u]) {
          artPoints.add(u);
        }
      } else if (v !== parent[u]) {
        low[u] = Math.min(low[u], disc[v]);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }
  return Array.from(artPoints);
}

module.exports = { articulationPointsRecursive }; 