type Edge = [number, number, number];

/**
 * Implements Kruskal's algorithm to find the Minimum Spanning Tree (MST) of a graph.
 *
 * @param {number} vertices - The number of vertices in the graph
 * @param {Edge[]} edges - An array of edges, where each edge is represented as [source, destination, weight]
 * @returns {Edge[]} The edges of the minimum spanning tree
 */
export function kruskal(vertices: number, edges: Edge[]): Edge[] {
  // Sort edges by weight in ascending order
  edges.sort((a, b) => a[2] - b[2]);

  const parent: number[] = Array.from({ length: vertices }, (_, i) => i);

  function find(i: number): number {
    if (parent[i] === i) {
      return i;
    }
    return (parent[i] = find(parent[i])); // Path compression
  }

  function union(i: number, j: number): void {
    const rootI = find(i);
    const rootJ = find(j);
    parent[rootI] = rootJ;
  }

  const mst: Edge[] = [];
  for (const edge of edges) {
    const [u, v, weight] = edge;
    if (find(u) !== find(v)) {
      union(u, v);
      mst.push(edge);
    }
  }

  return mst;
}
