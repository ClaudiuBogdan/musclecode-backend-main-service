/**
 * Implements cycle detection for a directed graph using an iterative approach (DFS with visited tracking).
 *
 * @param {Array<Array<number>>} graph - An adjacency list representation of a directed graph
 * @returns {boolean} True if the graph contains a cycle, false otherwise
 *
 * Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
 * Space Complexity: O(V) for the visited and recursion stack arrays
 *
 * The implementation:
 * - Uses DFS to traverse the graph
 * - Maintains two sets: visited nodes and nodes in the current recursion stack
 * - If a node in the current recursion stack is visited again, a cycle is detected
 */
function hasCycleInGraph(graph) {
  const n = graph.length;
  if (n === 0) return false;

  // Track all visited vertices
  const visited = new Array(n).fill(false);
  // Track vertices in the current recursion stack
  const recStack = new Array(n).fill(false);

  // Check each vertex as a potential starting point
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      if (hasCycleUtil(i)) {
        return true;
      }
    }
  }

  return false;

  // Helper function to detect cycle using DFS
  function hasCycleUtil(vertex) {
    // Create a stack for DFS
    const stack = [vertex];
    // Keep track of nodes in the current DFS path
    const inStack = new Array(n).fill(false);

    // Mark the current node as visited
    visited[vertex] = true;
    inStack[vertex] = true;

    while (stack.length > 0) {
      const current = stack[stack.length - 1]; // Peek at the top of the stack

      let allNeighborsProcessed = true;

      // Process all neighbors of the current vertex
      for (const neighbor of graph[current]) {
        // If not visited, mark as visited and add to stack
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
          inStack[neighbor] = true;
          allNeighborsProcessed = false;
          break;
        }
        // If the neighbor is in the current path, there is a cycle
        else if (inStack[neighbor]) {
          return true;
        }
      }

      // If all neighbors are processed, remove from current path
      if (allNeighborsProcessed) {
        inStack[stack.pop()] = false;
      }
    }

    return false;
  }
}

/**
 * Implements cycle detection for a linked list using Floyd's Tortoise and Hare algorithm.
 *
 * @param {ListNode|null} head - The head node of a linked list
 * @returns {boolean} True if the linked list contains a cycle, false otherwise
 *
 * Time Complexity: O(n) where n is the length of the linked list
 * Space Complexity: O(1) as it only uses two pointers
 *
 * The implementation:
 * - Uses two pointers: slow (moves one step at a time) and fast (moves two steps at a time)
 * - If there is a cycle, the fast pointer will eventually catch up to the slow pointer
 * - If there is no cycle, the fast pointer will reach the end of the list
 */
function hasCycleInLinkedList(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  // Move slow pointer by one step and fast pointer by two steps
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    // If slow and fast pointers meet, there is a cycle
    if (slow === fast) {
      return true;
    }
  }

  // If fast pointer reaches the end, there is no cycle
  return false;
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
