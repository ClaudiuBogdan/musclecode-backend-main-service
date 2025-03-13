/**
 * Performs a breadth-first search (BFS) traversal on a graph represented as an adjacency list.
 *
 * @param {Object} graph - An adjacency list representation of a graph where keys are vertices and values are arrays of adjacent vertices
 * @param {string|number} start - The starting vertex for the BFS traversal
 * @returns {Array} An array containing the vertices in the order they were visited during BFS traversal
 *
 * Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
 * Space Complexity: O(V) for the queue, visited set, and call stack
 *
 * The implementation:
 * - Uses a recursive approach to simulate BFS
 * - Maintains a queue and visited set across recursive calls
 * - Processes one level of the graph at a time
 * - Avoids revisiting vertices by checking the visited set
 */
function bfs(graph, start) {
  // Array to store the order of visited vertices
  const result = [];

  // Set to keep track of visited vertices
  const visited = new Set();

  // Queue for BFS traversal
  const queue = [start];

  // Mark the starting vertex as visited
  visited.add(start);

  // Start the recursive BFS
  bfsRecursive(graph, queue, visited, result);

  return result;
}

/**
 * Helper function for recursive BFS implementation
 *
 * @param {Object} graph - The adjacency list representation of the graph
 * @param {Array} queue - Queue of vertices to visit
 * @param {Set} visited - Set of visited vertices
 * @param {Array} result - Array to store the traversal order
 */
function bfsRecursive(graph, queue, visited, result) {
  // Base case: if the queue is empty, we're done
  if (queue.length === 0) {
    return;
  }

  // Remove the first vertex from the queue
  const currentVertex = queue.shift();

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

  // Recursive call to process the next vertex in the queue
  bfsRecursive(graph, queue, visited, result);
}

module.exports = { bfs };
