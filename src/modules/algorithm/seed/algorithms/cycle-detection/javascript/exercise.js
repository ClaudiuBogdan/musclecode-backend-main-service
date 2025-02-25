/**
 * Detects if there is a cycle in a directed graph.
 *
 * @param {Array<Array<number>>} graph - An adjacency list representation of a directed graph
 * @returns {boolean} True if the graph contains a cycle, false otherwise
 */
function hasCycleInGraph(graph) {
  // TODO: Implement cycle detection for a directed graph
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

/**
 * Detects if there is a cycle in a linked list.
 *
 * @param {ListNode|null} head - The head node of a linked list
 * @returns {boolean} True if the linked list contains a cycle, false otherwise
 */
function hasCycleInLinkedList(head) {
  // TODO: Implement cycle detection for a linked list
  return false;
}

module.exports = {
  hasCycleInGraph,
  hasCycleInLinkedList,
  ListNode,
};
