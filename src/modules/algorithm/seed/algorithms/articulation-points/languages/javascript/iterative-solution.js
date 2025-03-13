/**
 * Iterative implementation of the articulation points algorithm using an explicit stack.
 *
 * @param {number[][]} graph - The undirected graph represented as an adjacency list.
 * @returns {number[]} - An array of articulation points.
 */
function articulationPointsIterative(graph) {
  const n = graph.length;
  const visited = new Array(n).fill(false);
  const disc = new Array(n).fill(0);
  const low = new Array(n).fill(0);
  const parent = new Array(n).fill(-1);
  const artPoints = new Set();
  const childCount = new Array(n).fill(0);
  let time = 0;

  // Stack items: { u, index }
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      const stack = [];
      stack.push({ u: i, index: 0 });
      visited[i] = true;
      disc[i] = low[i] = time++;

      while (stack.length) {
        const top = stack[stack.length - 1];
        const u = top.u;
        if (top.index < graph[u].length) {
          const v = graph[u][top.index];
          top.index++;
          if (!visited[v]) {
            parent[v] = u;
            childCount[u]++;
            visited[v] = true;
            disc[v] = low[v] = time++;
            stack.push({ u: v, index: 0 });
          } else if (v !== parent[u]) {
            low[u] = Math.min(low[u], disc[v]);
          }
        } else {
          stack.pop();
          if (parent[u] !== -1) {
            const p = parent[u];
            low[p] = Math.min(low[p], low[u]);
            if (low[u] >= disc[p]) {
              artPoints.add(p);
            }
          } else {
            if (childCount[u] > 1) {
              artPoints.add(u);
            }
          }
        }
      }
    }
  }
  return Array.from(artPoints);
}

module.exports = { articulationPointsIterative }; 