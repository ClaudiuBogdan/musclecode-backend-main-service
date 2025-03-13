/**
 * Performs a Breadth-First Search (BFS) on a graph represented by an adjacency matrix.
 *
 * @param graph The adjacency matrix representing the graph.
 *              `graph[i][j] === 1` if there's an edge from vertex i to vertex j, 0 otherwise.
 * @param startVertex The index of the starting vertex for the traversal.
 * @returns An array containing the indices of the vertices in the order they were visited.
 *
 * Time Complexity: O(V^2), where V is the number of vertices.
 * Space Complexity: O(V), due to the queue and visited array.
 */
export function bfsMatrix(graph: number[][], startVertex: number): number[] {
  const numVertices = graph.length;
  const visited: boolean[] = new Array(numVertices).fill(false);
  const queue: number[] = [];
  const traversal: number[] = [];

  if (startVertex < 0 || startVertex >= numVertices) {
    return []; // Or throw an error, depending on desired behavior
  }

  queue.push(startVertex);
  visited[startVertex] = true;

  while (queue.length > 0) {
    const currentVertex = queue.shift()!; // Using ! because we know the queue is not empty
    traversal.push(currentVertex);

    for (let neighbor = 0; neighbor < numVertices; neighbor++) {
      if (graph[currentVertex][neighbor] === 1 && !visited[neighbor]) {
        queue.push(neighbor);
        visited[neighbor] = true;
      }
    }
  }

  return traversal;
}
