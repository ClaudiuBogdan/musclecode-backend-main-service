---
title: BFS Implementation - From Pseudocode to Code
---

# 💻 Implementing BFS: From Pseudocode to Code

Now that we understand the BFS algorithm conceptually and have walked through it step by step, let's formalize it with pseudocode and then implement it in actual code.

## Pseudocode for BFS with Adjacency Matrix 📝

```
function BFS_Matrix(graph, start_vertex):
    // Initialize data structures
    num_vertices = length of graph
    visited = array of size num_vertices, all set to false
    queue = empty queue
    traversal = empty array
    
    // Validate start vertex
    if start_vertex is out of bounds:
        return empty array
    
    // Start BFS from the start vertex
    visited[start_vertex] = true
    enqueue start_vertex to queue
    
    // BFS main loop
    while queue is not empty:
        current_vertex = dequeue from queue
        add current_vertex to traversal
        
        // Check all potential neighbors using adjacency matrix
        for neighbor = 0 to num_vertices - 1:
            if graph[current_vertex][neighbor] == 1 and not visited[neighbor]:
                visited[neighbor] = true
                enqueue neighbor to queue
                
    return traversal
```

This pseudocode captures the core of the BFS algorithm for graph matrices:
1. Initialize tracking structures
2. Process the starting vertex
3. Use a queue to maintain breadth-first order
4. Process each vertex and its unvisited neighbors
5. Return the traversal order

> [!NOTE]
> This pseudocode handles the case where the start vertex might be out of bounds - a good defensive programming practice.

## Implementation in Python 🐍

Now let's see a complete Python implementation of the BFS algorithm for an adjacency matrix:

```python
from collections import deque
from typing import List

def bfs_matrix(graph: List[List[int]], start_vertex: int) -> List[int]:
    """
    Performs a Breadth-First Search (BFS) on a graph represented by an adjacency matrix.
    
    Args:
        graph: The adjacency matrix representing the graph.
               graph[i][j] == 1 if there's an edge from vertex i to vertex j, 0 otherwise.
        start_vertex: The index of the starting vertex for the traversal.
        
    Returns:
        A list containing the indices of the vertices in the order they were visited.
    """
    # Get the number of vertices in the graph
    num_vertices = len(graph)
    
    # Initialize visited array, queue, and traversal result
    visited = [False] * num_vertices
    queue = deque()
    traversal = []
    
    # Validate start_vertex
    if start_vertex < 0 or start_vertex >= num_vertices:
        return []  # Or raise an exception
    
    # Start BFS from the start_vertex
    queue.append(start_vertex)
    visited[start_vertex] = True
    
    # BFS main loop
    while queue:
        current_vertex = queue.popleft()
        traversal.append(current_vertex)
        
        # Check all potential neighbors using the adjacency matrix
        for neighbor in range(num_vertices):
            if graph[current_vertex][neighbor] == 1 and not visited[neighbor]:
                queue.append(neighbor)
                visited[neighbor] = True
                
    return traversal
```

> [!TIP]
> Notice how we use Python's `deque` from the `collections` module as our queue. This provides efficient O(1) operations for both appending to the end and popping from the beginning, exactly what we need for a queue.

## Let's Break Down the Implementation 🔨

### Data Structures

1. **visited**: A boolean array to track which vertices have been visited.
2. **queue**: A deque (double-ended queue) to maintain the BFS order.
3. **traversal**: An array to store the traversal result.

### Key Points

1. **Input Validation**: We check if the start vertex is valid before proceeding.

2. **Queue Operations**:
   - `queue.append(vertex)`: Adds a vertex to the end of the queue (enqueue)
   - `queue.popleft()`: Removes and returns the vertex from the beginning of the queue (dequeue)

3. **Finding Neighbors**: We scan the entire row of the adjacency matrix for the current vertex, checking every potential connection.

4. **Marking as Visited**: We mark vertices as visited as soon as we discover them (when we add them to the queue), not when we process them.

## Time and Space Complexity Analysis ⏱️

### Time Complexity

The time complexity of BFS using an adjacency matrix is **O(V²)** where V is the number of vertices:

- We may process each vertex once: O(V)
- For each vertex, we examine all potential neighbors by checking an entire row in the adjacency matrix: O(V)
- Combined: O(V) * O(V) = O(V²)

### Space Complexity

The space complexity is **O(V)**:

- The visited array requires O(V) space
- The queue can contain at most V vertices: O(V)
- The traversal result can contain at most V vertices: O(V)
- Total: O(V) + O(V) + O(V) = O(V)

> [!WARNING]
> While the adjacency matrix itself requires O(V²) space, we don't count that in our algorithm's space complexity since it's provided as input.

## Variations and Enhancements 🌟

Here are some common variations and enhancements to the basic BFS implementation:

### 1. Tracking Distances

```python
def bfs_with_distances(graph, start_vertex):
    num_vertices = len(graph)
    visited = [False] * num_vertices
    queue = deque()
    distances = [-1] * num_vertices  # -1 indicates unreachable
    
    queue.append(start_vertex)
    visited[start_vertex] = True
    distances[start_vertex] = 0
    
    while queue:
        current_vertex = queue.popleft()
        
        for neighbor in range(num_vertices):
            if graph[current_vertex][neighbor] == 1 and not visited[neighbor]:
                queue.append(neighbor)
                visited[neighbor] = True
                distances[neighbor] = distances[current_vertex] + 1
                
    return distances
```

### 2. Reconstructing Shortest Paths

```python
def bfs_with_paths(graph, start_vertex, end_vertex):
    num_vertices = len(graph)
    visited = [False] * num_vertices
    queue = deque()
    parents = [-1] * num_vertices
    
    queue.append(start_vertex)
    visited[start_vertex] = True
    
    while queue and not visited[end_vertex]:
        current_vertex = queue.popleft()
        
        for neighbor in range(num_vertices):
            if graph[current_vertex][neighbor] == 1 and not visited[neighbor]:
                queue.append(neighbor)
                visited[neighbor] = True
                parents[neighbor] = current_vertex
    
    # Reconstruct path if end_vertex was reached
    if visited[end_vertex]:
        path = []
        current = end_vertex
        while current != -1:
            path.append(current)
            current = parents[current]
        path.reverse()
        return path
    else:
        return []  # No path exists
```

## Common Mistakes and Pitfalls ⚠️

When implementing BFS, watch out for these common mistakes:

1. **Not Marking Vertices as Visited Early Enough**: Vertices should be marked as visited when they're added to the queue, not when they're processed.

2. **Queue vs. Stack Confusion**: Using a stack (LIFO) instead of a queue (FIFO) would change the algorithm to DFS.

3. **Missing Edge Cases**:
   - Empty graphs
   - Invalid start vertices
   - Disconnected graphs

4. **Inefficiency with Sparse Graphs**: For sparse graphs, an adjacency list representation would be more efficient than an adjacency matrix.

## 🤔 Practice Exercise

Try implementing these enhancements to the basic BFS algorithm:

1. Modify the BFS function to return the level of each vertex (distance from the start).

2. Implement a function to find the shortest path between two vertices using BFS.

3. Adapt the BFS algorithm to work with directed graphs (where the adjacency matrix may not be symmetric).

<details>
<summary>Solution Hints</summary>

1. For tracking levels, maintain an array `levels` where `levels[v]` stores the distance from the start vertex. Initialize it with `-1` (unreachable) and set `levels[start_vertex] = 0`. When adding a vertex to the queue, set its level to be one more than its parent's level.

2. For finding the shortest path, maintain a parent array during BFS and reconstruct the path by following parents backward from the destination to the source.

3. For directed graphs, the logic remains the same. The only difference is that the adjacency matrix will not be symmetric (i.e., `graph[i][j]` may not equal `graph[j][i]`).
</details>

In the next lesson, we'll look at practical applications and variations of BFS algorithms in real-world problems. 