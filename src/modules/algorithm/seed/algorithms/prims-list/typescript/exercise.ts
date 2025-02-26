type Graph = {
  [node: number]: [number, number][]; // Adjacency list: node -> [(neighbor, weight)]
};

/**
 * @param {Graph} graph - A weighted, undirected graph represented as an adjacency list
 * @returns {[number, [number, number][]]} - The total weight of the MST and the edges that form it
 */
export function primsAlgorithm(graph: Graph): [number, [number, number][]] {
  // TODO: Implement Prim's algorithm using the adjacency list representation
  return [0, []];
}
