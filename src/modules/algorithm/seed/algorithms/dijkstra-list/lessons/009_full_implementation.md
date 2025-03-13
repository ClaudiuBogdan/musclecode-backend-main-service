---
title: Complete Implementation of Dijkstra's Algorithm
---

# 🏗️ Complete Implementation of Dijkstra's Algorithm

Now that we understand all the key components of Dijkstra's algorithm, let's put everything together into a complete implementation. We'll build a full JavaScript implementation that finds the shortest path from a source node to all other nodes in a weighted graph.

## 📝 The Complete Code

```javascript
/**
 * A simple priority queue implementation for Dijkstra's algorithm
 */
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(node, distance) {
    this.items.push({ node, distance });
    this.items.sort((a, b) => a.distance - b.distance);
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  contains(node) {
    return this.items.some((item) => item.node === node);
  }

  decreaseKey(node, newDistance) {
    const index = this.items.findIndex((item) => item.node === node);
    if (index !== -1) {
      this.items[index].distance = newDistance;
      this.items.sort((a, b) => a.distance - b.distance);
    }
  }
}

/**
 * Implements Dijkstra's algorithm to find the shortest path from a source node
 * to all other nodes in a weighted graph.
 *
 * @param {Object} graph - An adjacency list representation of a weighted graph
 *                        where keys are node names and values are arrays of edges
 *                        Each edge is an object with 'node' and 'weight' properties
 * @param {string} source - The source node to start the algorithm from
 * @returns {Object} A map of nodes to their shortest distance from the source
 */
function dijkstra(graph, source) {
  // Initialize distances with infinity for all nodes except the source
  const distances = {};
  const visited = new Set();
  const previous = {}; // For path reconstruction
  const pq = new PriorityQueue();

  // Initialize all nodes with infinity distance except the source
  for (const node in graph) {
    distances[node] = node === source ? 0 : Infinity;
    previous[node] = null;
  }

  // Add source to the priority queue
  pq.enqueue(source, 0);

  // Process nodes until the priority queue is empty
  while (!pq.isEmpty()) {
    // Get the node with the smallest distance
    const current = pq.dequeue();
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
        previous[neighbor] = currentNode; // Update path

        // Add or update neighbor in the priority queue
        if (pq.contains(neighbor)) {
          pq.decreaseKey(neighbor, newDistance);
        } else {
          pq.enqueue(neighbor, newDistance);
        }
      }
    }
  }

  return { distances, previous };
}

/**
 * Reconstructs the shortest path from source to target
 * using the 'previous' map from Dijkstra's algorithm
 * 
 * @param {Object} previous - Map of nodes to their predecessor in the shortest path
 * @param {string} target - The target node to find path to
 * @returns {Array} The path from source to target as an array of nodes
 */
function getPath(previous, target) {
  const path = [];
  let current = target;
  
  // If there's no path to the target, return an empty path
  if (previous[current] === null && current !== Object.keys(previous)[0]) {
    return path;
  }
  
  // Build the path by following previous pointers
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  return path;
}
```

## 💻 Using the Algorithm

Here's how to use our implementation to find the shortest paths in a graph:

```javascript
// Example graph from our earlier lessons
const graph = {
  A: [
    { node: 'B', weight: 2 },
    { node: 'D', weight: 6 },
  ],
  B: [
    { node: 'C', weight: 3 },
    { node: 'D', weight: 7 },
  ],
  C: [{ node: 'E', weight: 5 }],
  D: [
    { node: 'C', weight: 1 },
    { node: 'E', weight: 2 },
  ],
  E: [],
};

// Find shortest paths from node A
const { distances, previous } = dijkstra(graph, 'A');

console.log('Shortest distances from A:');
console.log(distances);
// Output: { A: 0, B: 2, C: 5, D: 6, E: 8 }

// Find the path from A to E
const pathToE = getPath(previous, 'E');
console.log('Shortest path from A to E:');
console.log(pathToE.join(' → '));
// Output: A → D → E
```

## 🧠 Breaking Down the Implementation

Let's analyze the key parts of our implementation:

### 1. Priority Queue

```javascript
class PriorityQueue {
  // ... implementation details ...
}
```

This is our simple array-based priority queue with O(n log n) enqueue operations. For production use, you might replace this with a more efficient binary heap implementation.

### 2. Core Algorithm Structure

```javascript
function dijkstra(graph, source) {
  // Initialize data structures
  // ...
  
  // Main loop - process nodes in order of increasing distance
  while (!pq.isEmpty()) {
    // ...
  }
  
  return { distances, previous };
}
```

The algorithm follows the structure we've discussed throughout these lessons:
1. Initialize data structures
2. Process nodes in order of increasing distance
3. Return the results

### 3. Path Tracking

```javascript
// Update distance if we found a shorter path
if (newDistance < distances[neighbor]) {
  distances[neighbor] = newDistance;
  previous[neighbor] = currentNode; // Update path
  // ...
}
```

We're tracking the `previous` node for each vertex, which allows us to reconstruct the shortest path from the source to any other node.

### 4. Path Reconstruction

```javascript
function getPath(previous, target) {
  // ... build and return the path ...
}
```

This helper function builds the actual path by following the `previous` pointers backward from the target to the source.

## 🔍 Tracing Through an Example

Let's trace through our algorithm once more with our example graph, focusing on the path tracking:

1. Start at A with distance 0
   - distances = {A:0, B:∞, C:∞, D:∞, E:∞}
   - previous = {A:null, B:null, C:null, D:null, E:null}

2. Process A's neighbors:
   - Update B: distance = 2, previous[B] = A
   - Update D: distance = 6, previous[D] = A
   - distances = {A:0, B:2, C:∞, D:6, E:∞}
   - previous = {A:null, B:A, C:null, D:A, E:null}

3. Process B's neighbors:
   - Update C: distance = 5, previous[C] = B
   - D's new distance (2+7=9) > current (6), so no update
   - distances = {A:0, B:2, C:5, D:6, E:∞}
   - previous = {A:null, B:A, C:B, D:A, E:null}

4. Process C's neighbors:
   - Update E: distance = 10, previous[E] = C
   - distances = {A:0, B:2, C:5, D:6, E:10}
   - previous = {A:null, B:A, C:B, D:A, E:C}

5. Process D's neighbors:
   - C's new distance (6+1=7) > current (5), so no update
   - Update E: distance = 8, previous[E] = D
   - distances = {A:0, B:2, C:5, D:6, E:8}
   - previous = {A:null, B:A, C:B, D:A, E:D}

6. Final result:
   - Path to E = [A, D, E]

## 🚀 Optimizations and Extensions

Here are some ways to extend and optimize our implementation:

1. **Early Termination**: If we only need the path to a specific target:
   ```javascript
   if (currentNode === target) {
     return { distances, previous };
   }
   ```

2. **More Efficient Priority Queue**: Replace our simple implementation with a binary heap for better performance.

3. **Distance-Only Version**: If you only need distances and not paths, you can remove the `previous` map to save memory.

4. **Path Cost Function**: Allow customizing the edge weight calculation:
   ```javascript
   const newDistance = currentDistance + costFunction(edge);
   ```

## 🎯 Key Takeaways

- Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a weighted graph
- The implementation uses a priority queue, a distances map, and a previous map for path tracking
- The algorithm guarantees optimal paths when all edge weights are non-negative
- Path reconstruction involves following previous pointers backward from the target
- Performance can be significantly improved with a more efficient priority queue implementation

In our final lesson, we'll practice solving problems using Dijkstra's algorithm and discuss some common challenges! 