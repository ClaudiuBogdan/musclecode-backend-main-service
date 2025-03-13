/**
 * Iteratively implements Prim's algorithm using an adjacency list.
 *
 * @param {object} graph - A weighted, undirected graph represented as an adjacency list
 * @returns {[number, [number, number][]]} - The total weight of the MST and the edges that form it
 */
function primsAlgorithm(graph) {
  const vertices = Object.keys(graph).map(Number);
  if (vertices.length === 0) {
    return [0, []];
  }

  const mstEdges = [];
  let mstWeight = 0;
  const visited = new Set();
  const priorityQueue = []; // [weight, from, to]

  // Start from the first vertex
  const startVertex = vertices[0];
  visited.add(startVertex);

  // Add initial edges to the priority queue
  for (const [neighbor, weight] of graph[startVertex]) {
    priorityQueue.push([weight, startVertex, neighbor]);
  }

  // Sort the priority queue by weight
  priorityQueue.sort((a, b) => a[0] - b[0]);

  while (priorityQueue.length > 0) {
    const [weight, from, to] = priorityQueue.shift();

    if (visited.has(to)) {
      continue;
    }

    visited.add(to);
    mstWeight += weight;
    mstEdges.push([from, to]);

    // Add new edges to the priority queue
    if (graph[to]) {
      for (const [neighbor, weight] of graph[to]) {
        if (!visited.has(neighbor)) {
          priorityQueue.push([weight, to, neighbor]);
        }
      }
    }

    priorityQueue.sort((a, b) => a[0] - b[0]);
  }

  return [mstWeight, mstEdges];
}

module.exports = { primsAlgorithm };
