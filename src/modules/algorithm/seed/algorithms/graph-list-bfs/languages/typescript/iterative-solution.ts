/**
 * Performs a breadth-first search (BFS) traversal on a graph represented as an adjacency list.
 *
 * @param graph - An adjacency list representation of a graph where keys are vertices and values are arrays of adjacent vertices
 * @param start - The starting vertex for the BFS traversal
 * @returns An array containing the vertices in the order they were visited during BFS traversal
 *
 * Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
 * Space Complexity: O(V) for the queue and visited set
 *
 * The implementation:
 * - Uses a queue to keep track of vertices to visit
 * - Uses a set to keep track of visited vertices
 * - Starts with the given vertex and explores all its neighbors
 * - Then explores neighbors of neighbors in a level-by-level manner
 * - Avoids revisiting vertices by checking the visited set
 */
export function bfs<T>(
  graph: Record<string | number, (string | number)[]>,
  start: string | number,
): (string | number)[] {
  // Array to store the order of visited vertices
  const result: (string | number)[] = [];

  // Set to keep track of visited vertices
  const visited = new Set<string | number>();

  // Queue for BFS traversal
  const queue: (string | number)[] = [];

  // Add the starting vertex to the queue and mark it as visited
  queue.push(start);
  visited.add(start);

  // Continue until the queue is empty
  while (queue.length > 0) {
    // Remove the first vertex from the queue
    const currentVertex = queue.shift()!;

    // Add the current vertex to the result
    result.push(currentVertex);

    // Get all adjacent vertices of the current vertex
    const neighbors = graph[currentVertex] || [];

    // For each adjacent vertex
    for (const neighbor of neighbors) {
      // If the neighbor hasn't been visited yet
      if (!visited.has(neighbor)) {
        // Add it to the queue and mark it as visited
        queue.push(neighbor);
        visited.add(neighbor);
      }
    }
  }

  return result;
}
