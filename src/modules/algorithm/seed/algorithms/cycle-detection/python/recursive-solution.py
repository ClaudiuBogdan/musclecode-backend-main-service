"""
Cycle Detection Algorithm Implementation - Recursive Solutions
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
    Detects if there is a cycle in a directed graph using a recursive DFS approach.
    
    Args:
        graph: An adjacency list representation of a directed graph
               where graph[i] contains a list of nodes that node i connects to.
    
    Returns:
        True if the graph contains a cycle, False otherwise
    
    Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges
    Space Complexity: O(V) for the visited and recursion stack arrays, plus O(V) for the recursion call stack
    
    The implementation:
    - Uses recursive DFS to traverse the graph
    - Maintains two sets: visited nodes and nodes in the current recursion path
    - If a node in the current recursion path is visited again, a cycle is detected
    """
    if not graph:
        return False
    
    n = len(graph)
    
    # Track all visited vertices
    visited = set()
    # Track vertices in the current recursion path
    in_path = set()
    
    def dfs_detect_cycle(vertex):
        """
        Recursive DFS function to detect cycle
        
        Args:
            vertex: The current vertex being visited
            
        Returns:
            True if a cycle is detected, False otherwise
        """
        # Mark current node as visited and add to recursion path
        visited.add(vertex)
        in_path.add(vertex)
        
        # Visit all adjacent vertices
        for neighbor in graph[vertex]:
            # If not visited, recursively check for cycles
            if neighbor not in visited:
                if dfs_detect_cycle(neighbor):
                    return True
            # If the neighbor is in current path, there is a cycle
            elif neighbor in in_path:
                return True
        
        # Remove the vertex from recursion path
        in_path.remove(vertex)
        return False
    
    # Check each vertex as a potential starting point
    for i in range(n):
        if i not in visited and dfs_detect_cycle(i):
            return True
    
    return False


def has_cycle_in_linked_list(head):
    """
    Detects if there is a cycle in a linked list using a recursive approach with a set.
    
    Args:
        head: The head node of a linked list
    
    Returns:
        True if the linked list contains a cycle, False otherwise
    
    Time Complexity: O(n) where n is the length of the linked list
    Space Complexity: O(n) for storing the set of visited nodes, plus O(n) for the recursion call stack
    
    The implementation:
    - Uses a set to keep track of visited nodes
    - Recursively traverses the linked list
    - If a node is encountered again, a cycle is detected
    """
    # Use a set to track visited nodes
    visited = set()
    
    def detect_cycle(node):
        """
        Recursive helper function to detect cycle
        
        Args:
            node: The current node being visited
            
        Returns:
            True if a cycle is detected, False otherwise
        """
        if not node:
            return False
        
        # If node is already in the set, we found a cycle
        if node in visited:
            return True
        
        # Add current node to visited set
        visited.add(node)
        
        # Recursively check the next node
        return detect_cycle(node.next)
    
    return detect_cycle(head) 