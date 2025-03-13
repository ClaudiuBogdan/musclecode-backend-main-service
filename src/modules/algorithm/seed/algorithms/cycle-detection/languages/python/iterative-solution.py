"""
Cycle Detection Algorithm Implementation - Iterative Solutions
"""

class ListNode:
    """
    Node class for a linked list
    """
    def __init__(self, val=0):
        """
        Initialize a new ListNode
        
        Args:
            val: The value to store in the node
        """
        self.val = val
        self.next = None


def has_cycle_in_graph(graph):
    """
    Detects if there is a cycle in a directed graph using an iterative approach.
    
    Args:
        graph: An adjacency list representation of a directed graph
               where graph[i] contains a list of nodes that node i connects to.
    
    Returns:
        True if the graph contains a cycle, False otherwise
    
    Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
    Space Complexity: O(V) for the visited and recursion stack arrays
    
    The implementation:
    - Uses DFS to traverse the graph
    - Maintains two sets: visited nodes and nodes in the current path
    - If a node in the current path is visited again, a cycle is detected
    """
    if not graph:
        return False
    
    n = len(graph)
    # Track all visited vertices globally
    visited = set()
    
    # Check each vertex as a potential starting point
    for start in range(n):
        # Skip if already visited
        if start in visited:
            continue
            
        # Track vertices in the current path
        path = set()
        # Stack for DFS traversal
        stack = [(start, 0)]  # (node, index of neighbor being processed)
        
        while stack:
            node, idx = stack[-1]
            
            # If we're seeing this node for the first time
            if node not in visited:
                visited.add(node)
                path.add(node)
            
            # Process neighbors
            if idx < len(graph[node]):
                neighbor = graph[node][idx]
                # Update the index for the current node
                stack[-1] = (node, idx + 1)
                
                # If neighbor is in current path, we found a cycle
                if neighbor in path:
                    return True
                
                # If neighbor not visited, add to stack
                if neighbor not in visited:
                    stack.append((neighbor, 0))
            else:
                # All neighbors processed, remove from path
                node, _ = stack.pop()
                path.remove(node)
    
    return False


def has_cycle_in_linked_list(head):
    """
    Detects if there is a cycle in a linked list using Floyd's Tortoise and Hare algorithm.
    
    Args:
        head: The head node of a linked list
    
    Returns:
        True if the linked list contains a cycle, False otherwise
    
    Time Complexity: O(n) where n is the length of the linked list
    Space Complexity: O(1) as it only uses two pointers
    
    The implementation:
    - Uses two pointers: slow (moves one step at a time) and fast (moves two steps at a time)
    - If there is a cycle, the fast pointer will eventually catch up to the slow pointer
    - If there is no cycle, the fast pointer will reach the end of the list
    """
    if not head or not head.next:
        return False
    
    slow = head
    fast = head
    
    # Move slow pointer by one step and fast pointer by two steps
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        # If slow and fast pointers meet, there is a cycle
        if slow == fast:
            return True
    
    # If fast pointer reaches the end, there is no cycle
    return False 