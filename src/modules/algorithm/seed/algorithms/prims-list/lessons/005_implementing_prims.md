---
title: Implementing Prim's Algorithm Step by Step
---

# 🛠️ Implementing Prim's Algorithm

Now that we understand the core concepts, let's build Prim's algorithm step by step. We'll go through the entire implementation, explaining each part along the way.

## 📋 Overview of the Implementation

Our implementation will follow this structure:
1. Define the function with appropriate type hints
2. Initialize data structures
3. Start with an arbitrary vertex
4. Process the graph using a priority queue
5. Return the MST weight and edges

## 👨‍💻 The Complete Implementation in Python

```python
from typing import List, Tuple, Dict
import heapq

Graph = Dict[int, List[Tuple[int, int]]]  # Node -> List of (neighbor, weight) tuples

def prims_algorithm(graph: Graph) -> Tuple[int, List[Tuple[int, int]]]:
    """
    Finds the Minimum Spanning Tree (MST) of a weighted, undirected graph using Prim's algorithm.
    
    Args:
        graph: A dictionary representing the graph where keys are nodes and 
               values are lists of (neighbor, weight) tuples.
    
    Returns:
        A tuple containing the total weight of the MST and a list of edges that form the MST.
    """
    # Handle empty graph case
    vertices = list(graph.keys())
    if not vertices:
        return 0, []
    
    # Initialize data structures
    mst_edges: List[Tuple[int, int]] = []  # Edges in the MST
    mst_weight = 0                         # Total weight of the MST
    visited = set()                        # Vertices included in the MST
    priority_queue = []                    # Min heap: (weight, from_node, to_node)
    
    # Start from the first vertex
    start_vertex = vertices[0]
    visited.add(start_vertex)
    
    # Add all edges from the start vertex to the priority queue
    for neighbor, weight in graph[start_vertex]:
        heapq.heappush(priority_queue, (weight, start_vertex, neighbor))
    
    # Process the graph
    while priority_queue:
        # Get the minimum weight edge
        weight, from_node, to_node = heapq.heappop(priority_queue)
        
        # Skip if the destination node is already in the MST
        if to_node in visited:
            continue
        
        # Add the new vertex to the MST
        visited.add(to_node)
        mst_weight += weight
        mst_edges.append((from_node, to_node))
        
        # Add all edges from the new vertex to the priority queue
        if to_node in graph:  # Check if the node exists in the graph
            for neighbor, weight in graph[to_node]:
                if neighbor not in visited:
                    heapq.heappush(priority_queue, (weight, to_node, neighbor))
    
    return mst_weight, mst_edges
```

## 🔍 Breaking Down the Implementation

### 1️⃣ Type Definitions and Imports

```python
from typing import List, Tuple, Dict
import heapq

Graph = Dict[int, List[Tuple[int, int]]]  # Node -> List of (neighbor, weight) tuples
```

> [!NOTE]
> We define a type alias `Graph` to make our code more readable. It represents our adjacency list structure.

### 2️⃣ Function Signature and Documentation

```python
def prims_algorithm(graph: Graph) -> Tuple[int, List[Tuple[int, int]]]:
    """
    Finds the Minimum Spanning Tree (MST) of a weighted, undirected graph using Prim's algorithm.
    
    Args:
        graph: A dictionary representing the graph where keys are nodes and 
               values are lists of (neighbor, weight) tuples.
    
    Returns:
        A tuple containing the total weight of the MST and a list of edges that form the MST.
    """
```

### 3️⃣ Handling Edge Cases

```python
# Handle empty graph case
vertices = list(graph.keys())
if not vertices:
    return 0, []
```

> [!WARNING]
> Always handle edge cases! Here we check if the graph is empty.

### 4️⃣ Initializing Data Structures

```python
# Initialize data structures
mst_edges: List[Tuple[int, int]] = []  # Edges in the MST
mst_weight = 0                         # Total weight of the MST
visited = set()                        # Vertices included in the MST
priority_queue = []                    # Min heap: (weight, from_node, to_node)
```

### 5️⃣ Starting the Algorithm

```python
# Start from the first vertex
start_vertex = vertices[0]
visited.add(start_vertex)

# Add all edges from the start vertex to the priority queue
for neighbor, weight in graph[start_vertex]:
    heapq.heappush(priority_queue, (weight, start_vertex, neighbor))
```

> [!TIP]
> We can start from any vertex. In this implementation, we simply pick the first one.

### 6️⃣ The Main Algorithm Loop

```python
# Process the graph
while priority_queue:
    # Get the minimum weight edge
    weight, from_node, to_node = heapq.heappop(priority_queue)
    
    # Skip if the destination node is already in the MST
    if to_node in visited:
        continue
    
    # Add the new vertex to the MST
    visited.add(to_node)
    mst_weight += weight
    mst_edges.append((from_node, to_node))
    
    # Add all edges from the new vertex to the priority queue
    if to_node in graph:  # Check if the node exists in the graph
        for neighbor, weight in graph[to_node]:
            if neighbor not in visited:
                heapq.heappush(priority_queue, (weight, to_node, neighbor))
```

### 7️⃣ Returning the Result

```python
return mst_weight, mst_edges
```

## 🔄 The Algorithm in Action

Let's trace through a simple example with this graph:

```
0 -- 4 -- 1
|         |
8         8
|         |
7 -- 1 -- 2
```

<details>
<summary>Step-by-step execution</summary>

1. Start at vertex 0
   - Add edges (0,1,4) and (0,7,8) to the priority queue
   - Priority queue: [(4,0,1), (8,0,7)]

2. Pop (4,0,1) - Add vertex 1 to MST
   - Add edges (1,2,8) to the priority queue
   - Priority queue: [(8,0,7), (8,1,2)]

3. Pop (8,0,7) - Add vertex 7 to MST
   - Add edges (7,2,1) to the priority queue
   - Priority queue: [(1,7,2), (8,1,2)]

4. Pop (1,7,2) - Add vertex 2 to MST
   - No new unvisited vertices
   - Priority queue: [(8,1,2)]

5. Pop (8,1,2) - Vertex 2 already visited, discard

6. Priority queue empty - Algorithm complete
   - MST edges: [(0,1), (0,7), (7,2)]
   - MST weight: 4 + 8 + 1 = 13
</details>

## 💪 Time and Space Complexity

- **Time Complexity**: O((V + E) log V) where V is the number of vertices and E is the number of edges
  - We process each vertex and each edge once
  - Each priority queue operation takes O(log V) time

- **Space Complexity**: O(V + E)
  - We store the graph: O(V + E)
  - Priority queue: O(E) in the worst case
  - Visited set: O(V)
  - MST edges: O(V-1) (a tree with V vertices has V-1 edges)

---

**Think about:** How would you modify this implementation to handle a disconnected graph? 