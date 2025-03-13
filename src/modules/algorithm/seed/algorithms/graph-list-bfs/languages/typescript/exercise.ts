/**
 * Performs a breadth-first search (BFS) traversal on a graph represented as an adjacency list.
 *
 * @param graph - An adjacency list representation of a graph where keys are vertices and values are arrays of adjacent vertices
 * @param start - The starting vertex for the BFS traversal
 * @returns An array containing the vertices in the order they were visited during BFS traversal
 */
export function bfs<T>(
  graph: Record<string | number, (string | number)[]>,
  start: string | number,
): (string | number)[] {
  // TODO: Implement the BFS algorithm
}
