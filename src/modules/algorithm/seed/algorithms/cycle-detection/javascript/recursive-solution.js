/**
 * Implements cycle detection for a directed graph using a recursive DFS approach.
 *
 * @param {Array<Array<number>>} graph - An adjacency list representation of a directed graph
 * @returns {boolean} True if the graph contains a cycle, false otherwise
 *
 * Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
 * Space Complexity: O(V) for the visited and recursion stack arrays, plus O(V) for the recursion call stack
 *
 * The implementation:
 * - Uses recursive DFS to traverse the graph
 * - Maintains two sets: visited nodes and nodes in the current recursion path
 * - If a node in the current recursion path is visited again, a cycle is detected
 */
function hasCycleInGraph(graph) {
  const n = graph.length;
  if (n === 0) return false;

  // Track all visited vertices
  const visited = new Array(n).fill(false);
  // Track vertices in the current recursion path
  const inPath = new Array(n).fill(false);

  // Check each vertex as a potential starting point
  for (let i = 0; i < n; i++) {
    if (!visited[i] && dfsDetectCycle(i)) {
      return true;
    }
  }

  return false;

  // Recursive DFS function to detect cycle
  function dfsDetectCycle(vertex) {
    // Mark current node as visited and add to recursion path
    visited[vertex] = true;
    inPath[vertex] = true;

    // Visit all adjacent vertices
    for (const neighbor of graph[vertex]) {
      // If not visited, recursively check for cycles
      if (!visited[neighbor]) {
        if (dfsDetectCycle(neighbor)) {
          return true;
        }
      }
      // If the neighbor is in current path, there is a cycle
      else if (inPath[neighbor]) {
        return true;
      }
    }

    // Remove the vertex from recursion path
    inPath[vertex] = false;
    return false;
  }
}

/**
 * Implements cycle detection for a linked list using a recursive approach with a set.
 *
 * @param {ListNode|null} head - The head node of a linked list
 * @returns {boolean} True if the linked list contains a cycle, false otherwise
 *
 * Time Complexity: O(n) where n is the length of the linked list
 * Space Complexity: O(n) for storing the set of visited nodes
 *
 * The implementation:
 * - Uses a set to keep track of visited nodes
 * - Recursively traverses the linked list
 * - If a node is encountered again, a cycle is detected
 */
function hasCycleInLinkedList(head) {
  // Use a set to track visited nodes
  const visited = new Set();

  // Recursive helper function
  function detectCycle(node) {
    if (!node) return false;

    // If node is already in the set, we found a cycle
    if (visited.has(node)) {
      return true;
    }

    // Add current node to visited set
    visited.add(node);

    // Recursively check the next node
    return detectCycle(node.next);
  }

  return detectCycle(head);
}

/**
 * Node class for a linked list
 */
class ListNode {
  /**
   * @param {number} val - The value to store in the node
   */
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

module.exports = {
  hasCycleInGraph,
  hasCycleInLinkedList,
  ListNode,
};
