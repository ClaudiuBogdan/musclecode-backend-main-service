/**
 * Interface for a weighted graph edge
 */
interface Edge {
  node: string;
  weight: number;
}

/**
 * Type definition for an adjacency list representation of a graph
 * where keys are node names and values are arrays of edges
 */
type Graph = {
  [key: string]: Edge[];
};

/**
 * Type definition for the result of Dijkstra's algorithm
 * where keys are node names and values are the shortest distance from the source
 */
type DistanceMap = {
  [key: string]: number;
};

/**
 * Implements Dijkstra's algorithm to find the shortest path from a source node
 * to all other nodes in a weighted graph.
 *
 * @param graph - An adjacency list representation of a weighted graph
 * @param source - The source node to start the algorithm from
 * @returns A map of nodes to their shortest distance from the source
 */
export function dijkstra(graph: Graph, source: string): DistanceMap {
  // TODO: Implement Dijkstra's algorithm
}
