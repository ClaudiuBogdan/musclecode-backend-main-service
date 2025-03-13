/**
 * Performs a Breadth-First Search (BFS) on a graph represented by an adjacency matrix.
 *
 * @param {number[][]} graph The adjacency matrix representing the graph.
 *              `graph[i][j] === 1` if there's an edge from vertex i to vertex j, 0 otherwise.
 * @param {number} startVertex The index of the starting vertex for the traversal.
 * @returns {number[]} An array containing the indices of the vertices in the order they were visited.
 *
 * Time Complexity: O(V^2), where V is the number of vertices.
 * Space Complexity: O(V), due to the queue and visited array.
 */
function bfsMatrix(graph, startVertex) {
  const numVertices = graph.length;
  const visited = new Array(numVertices).fill(false);
  const queue = [];
  const traversal = [];

  if (startVertex < 0 || startVertex >= numVertices) {
    return []; // Or throw an error
  }

  queue.push(startVertex);
  visited[startVertex] = true;

  while (queue.length > 0) {
    const currentVertex = queue.shift();
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

module.exports = { bfsMatrix };
