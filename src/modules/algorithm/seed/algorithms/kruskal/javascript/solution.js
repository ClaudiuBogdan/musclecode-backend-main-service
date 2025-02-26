/**
 * Implements Kruskal's algorithm to find the Minimum Spanning Tree (MST) of a graph.
 *
 * @param {number} vertices - The number of vertices in the graph
 * @param {number[][]} edges - An array of edges, where each edge is represented as [source, destination, weight]
 * @returns {number[][]} The edges of the minimum spanning tree
 */
function kruskal(vertices, edges) {
  // Sort edges by weight in ascending order
  edges.sort((a, b) => a[2] - b[2]);

  const parent = Array.from({ length: vertices }, (_, i) => i);

  function find(i) {
    if (parent[i] === i) {
      return i;
    }
    return (parent[i] = find(parent[i])); // Path compression
  }

  function union(i, j) {
    const rootI = find(i);
    const rootJ = find(j);
    parent[rootI] = rootJ;
  }

  const mst = [];
  for (const edge of edges) {
    const [u, v, weight] = edge;
    if (find(u) !== find(v)) {
      union(u, v);
      mst.push(edge);
    }
  }

  return mst;
}

module.exports = { kruskal };
