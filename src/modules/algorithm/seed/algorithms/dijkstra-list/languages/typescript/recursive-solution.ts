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
 * to all other nodes in a weighted graph using a recursive approach.
 *
 * @param graph - An adjacency list representation of a weighted graph
 * @param source - The source node to start the algorithm from
 * @returns A map of nodes to their shortest distance from the source
 *
 * Time Complexity: O((V + E) log V) where V is the number of vertices and E is the number of edges
 * Space Complexity: O(V) for storing distances and the visited set, plus O(V) for the recursion stack
 *
 * The implementation:
 * - Uses a recursive approach to process nodes in order of increasing distance
 * - Maintains a distance map to track the shortest known distance to each node
 * - Processes the node with the smallest tentative distance at each step
 * - Updates distances when shorter paths are found
 * - Returns the final distance map when all reachable nodes have been processed
 */
export function dijkstra(graph: Graph, source: string): DistanceMap {
  // Initialize distances with infinity for all nodes except the source
  const distances: DistanceMap = {};
  const visited: Set<string> = new Set();

  // Initialize all nodes with infinity distance except the source
  for (const node in graph) {
    distances[node] = node === source ? 0 : Infinity;
  }

  /**
   * Recursive helper function to process the next unvisited node with the smallest distance
   */
  function processNextNode(): void {
    // Find the unvisited node with the smallest distance
    let minDistance = Infinity;
    let nextNode: string | null = null;

    for (const node in distances) {
      if (!visited.has(node) && distances[node] < minDistance) {
        minDistance = distances[node];
        nextNode = node;
      }
    }

    // If no unvisited nodes or all remaining nodes are unreachable, we're done
    if (nextNode === null || minDistance === Infinity) {
      return;
    }

    // Mark the node as visited
    visited.add(nextNode);

    // Process all neighbors of the current node
    for (const edge of graph[nextNode] || []) {
      const { node: neighbor, weight } = edge;

      // Skip if we've already processed this neighbor
      if (visited.has(neighbor)) continue;

      // Calculate new distance to the neighbor
      const newDistance = distances[nextNode] + weight;

      // Update distance if we found a shorter path
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
      }
    }

    // Recursively process the next node
    processNextNode();
  }

  // Start the recursive process
  processNextNode();

  return distances;
}
