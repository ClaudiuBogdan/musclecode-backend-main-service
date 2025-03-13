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
 * A simple priority queue implementation for Dijkstra's algorithm
 */
class PriorityQueue {
  private items: { node: string; distance: number }[] = [];

  enqueue(node: string, distance: number): void {
    this.items.push({ node, distance });
    this.items.sort((a, b) => a.distance - b.distance);
  }

  dequeue(): { node: string; distance: number } | undefined {
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  contains(node: string): boolean {
    return this.items.some((item) => item.node === node);
  }

  decreaseKey(node: string, newDistance: number): void {
    const index = this.items.findIndex((item) => item.node === node);
    if (index !== -1) {
      this.items[index].distance = newDistance;
      this.items.sort((a, b) => a.distance - b.distance);
    }
  }
}

/**
 * Implements Dijkstra's algorithm to find the shortest path from a source node
 * to all other nodes in a weighted graph using an iterative approach.
 *
 * @param graph - An adjacency list representation of a weighted graph
 * @param source - The source node to start the algorithm from
 * @returns A map of nodes to their shortest distance from the source
 *
 * Time Complexity: O((V + E) log V) where V is the number of vertices and E is the number of edges
 * Space Complexity: O(V) for storing distances and the priority queue
 *
 * The implementation:
 * - Uses a priority queue to efficiently select the next node to process
 * - Maintains a distance map to track the shortest known distance to each node
 * - Processes nodes in order of increasing distance from the source
 * - Updates distances when shorter paths are found
 * - Returns the final distance map when all reachable nodes have been processed
 */
export function dijkstra(graph: Graph, source: string): DistanceMap {
  // Initialize distances with infinity for all nodes except the source
  const distances: DistanceMap = {};
  const visited: Set<string> = new Set();
  const pq = new PriorityQueue();

  // Initialize all nodes with infinity distance except the source
  for (const node in graph) {
    distances[node] = node === source ? 0 : Infinity;
  }

  // Add source to the priority queue
  pq.enqueue(source, 0);

  // Process nodes until the priority queue is empty
  while (!pq.isEmpty()) {
    // Get the node with the smallest distance
    const current = pq.dequeue();
    if (!current) break;

    const { node: currentNode, distance: currentDistance } = current;

    // Skip if we've already processed this node
    if (visited.has(currentNode)) continue;

    // Mark as visited
    visited.add(currentNode);

    // Process all neighbors of the current node
    for (const edge of graph[currentNode] || []) {
      const { node: neighbor, weight } = edge;

      // Skip if we've already processed this neighbor
      if (visited.has(neighbor)) continue;

      // Calculate new distance to the neighbor
      const newDistance = currentDistance + weight;

      // Update distance if we found a shorter path
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;

        // Add or update neighbor in the priority queue
        if (pq.contains(neighbor)) {
          pq.decreaseKey(neighbor, newDistance);
        } else {
          pq.enqueue(neighbor, newDistance);
        }
      }
    }
  }

  return distances;
}
