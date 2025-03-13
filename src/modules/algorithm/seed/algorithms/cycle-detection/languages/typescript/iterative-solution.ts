/**
 * Implements cycle detection for a directed graph using an iterative approach (DFS with visited tracking).
 *
 * @param graph - An adjacency list representation of a directed graph
 * @returns True if the graph contains a cycle, false otherwise
 *
 * Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
 * Space Complexity: O(V) for the visited and recursion stack arrays
 *
 * The implementation:
 * - Uses DFS to traverse the graph
 * - Maintains two sets: visited nodes and nodes in the current recursion stack
 * - If a node in the current recursion stack is visited again, a cycle is detected
 */
export function hasCycleInGraph(graph: number[][]): boolean {
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
  function hasCycleUtil(vertex: number): boolean {
    // Mark current node as visited and add to recursion stack
    visited[vertex] = true;
    recStack[vertex] = true;

    // Visit all adjacent vertices
    for (const neighbor of graph[vertex]) {
      // If not visited, recursively check for cycles
      if (!visited[neighbor]) {
        if (hasCycleUtil(neighbor)) {
          return true;
        }
      }
      // If the neighbor is in recursion stack, there is a cycle
      else if (recStack[neighbor]) {
        return true;
      }
    }

    // Remove the vertex from recursion stack
    recStack[vertex] = false;
    return false;
  }
}

/**
 * Implements cycle detection for a linked list using Floyd's Tortoise and Hare algorithm.
 *
 * @param head - The head node of a linked list
 * @returns True if the linked list contains a cycle, false otherwise
 *
 * Time Complexity: O(n) where n is the length of the linked list
 * Space Complexity: O(1) as it only uses two pointers
 *
 * The implementation:
 * - Uses two pointers: slow (moves one step at a time) and fast (moves two steps at a time)
 * - If there is a cycle, the fast pointer will eventually catch up to the slow pointer
 * - If there is no cycle, the fast pointer will reach the end of the list
 */
export function hasCycleInLinkedList(head: ListNode | null): boolean {
  if (!head || !head.next) return false;

  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  // Move slow pointer by one step and fast pointer by two steps
  while (fast && fast.next) {
    slow = slow!.next;
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
export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}
