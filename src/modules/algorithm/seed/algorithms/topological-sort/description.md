# Topological Sort

Topological Sort is an algorithm for ordering the vertices of a directed acyclic graph (DAG) in such a way that for every directed edge (u,v), vertex u comes before vertex v in the ordering. This algorithm is essential for solving dependency-based scheduling problems and is widely used in build systems, task scheduling, and course prerequisite planning.

## The Challenge

Given a directed acyclic graph represented as an adjacency list, implement a function that returns a linear ordering of vertices such that for every directed edge (u,v), vertex u comes before vertex v in the ordering. If the graph contains a cycle, no valid topological ordering exists.

### Example 1

```js
Input: n = 4, edges = [[0,1], [0,2], [1,3], [2,3]]
Output: [0, 1, 2, 3] or [0, 2, 1, 3]
```

_Explanation: Both orderings are valid as they respect all dependencies._

### Example 2

```js
Input: n = 6, edges = [[5,2], [5,0], [4,0], [4,1], [2,3], [3,1]]
Output: [4, 5, 0, 2, 3, 1] or [5, 4, 2, 0, 3, 1] or other valid orderings
```

_Explanation: Multiple valid orderings exist as long as all dependencies are respected._

<details>
<summary>
### Speed and Efficiency
</summary>

Topological Sort offers efficient performance for directed acyclic graphs:

- **Time Complexity**: O(V + E) where V is the number of vertices and E is the number of edges in the graph.
  - This accounts for visiting each vertex once and processing each edge once.
  
- **Space Complexity**: O(V) for storing the visited array, recursion stack (in DFS approach), or queue (in BFS approach).
</details>
<details>
<summary>
### Key Principles
</summary>

Topological Sort is built on several fundamental concepts:

- **Directed Acyclic Graph (DAG)**: The algorithm only works on graphs without cycles.

- **Dependency Resolution**: Ensures that all prerequisites are processed before their dependents.

- **Multiple Valid Solutions**: A graph may have multiple valid topological orderings.

- **Implementation Approaches**: Can be implemented using either Depth-First Search (DFS) or Breadth-First Search (BFS/Kahn's algorithm).
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For those who benefit from visual explanations, consider checking out these resources for interactive and animated guides:

- [Topological Sort Visualized and Explained](https://www.youtube.com/watch?v=7J3GadLzydI) - Clear visualization of the algorithm in action
- [Alvis Algorithms Demo](https://alvis-algorithms.web.app/?a=tsrt) - Interactive tool to visualize topological sort
- [Topological Sort Algorithm | Graph Theory](https://www.youtube.com/watch?v=eL-KzMXSXXI) - Comprehensive explanation with step-by-step visualization
- [USACO Guide: Topological Sort](https://usaco.guide/gold/toposort) - Interactive tutorial with implementation details

</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing or using Topological Sort, be mindful of these common challenges:

- **Cycle Detection**: Failing to check if the graph contains cycles, which would make topological sorting impossible.

- **Incomplete Processing**: Not ensuring all vertices are included in the final ordering.

- **Algorithm Selection**: Choosing the wrong implementation approach for your specific use case.

- **Edge Direction**: Misinterpreting the direction of dependencies in the graph.

- **Verification**: Not verifying that the output respects all dependencies in the original graph.
</details>
<details>
<summary>
### When and Where to Use Topological Sort
</summary>

Topological Sort is ideal in scenarios such as:

- **Build Systems**: Determining the order to compile modules with dependencies.

- **Task Scheduling**: Organizing tasks that have prerequisites.

- **Course Planning**: Arranging courses based on prerequisite requirements.

- **Package Management**: Resolving dependencies between software packages.

- **Data Processing Pipelines**: Ordering operations where outputs of some operations are inputs to others.

However, it may not be the best choice for:

- **Graphs with Cycles**: As topological sorting is impossible for cyclic graphs.

- **Undirected Graphs**: The concept of "comes before" requires direction.

- **Dynamic Dependency Changes**: When dependencies frequently change during processing.
</details>
<details>
<summary>
### Real-World Applications
</summary>

Topological Sort has numerous practical applications:

- **Compiler Design**: Determining the order of operations during compilation.

- **Dependency Resolution**: In package managers like npm, pip, or apt.

- **Project Management**: Scheduling tasks in project planning tools.

- **Circuit Design**: Evaluating timing in electronic circuits.

- **Data Analysis**: Ordering operations in data processing workflows.

- **Operating Systems**: Managing process scheduling with dependencies.

- **Artificial Intelligence**: Resolving dependencies in knowledge representation systems.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several specialized algorithms extend or modify Topological Sort:

- **Kahn's Algorithm**: A BFS-based approach that maintains in-degree counts.

- **DFS-based Topological Sort**: Uses depth-first search with a stack to track completion order.

- **Lexicographically Smallest Topological Sort**: Finding the ordering that is lexicographically smallest.

- **Parallel Topological Sort**: Adaptations for parallel processing environments.

- **Partial Topological Sort**: Handling subsets of vertices when complete ordering isn't needed.
</details>
<details>
<summary>
### Implementation Approaches
</summary>

There are two main approaches to implementing Topological Sort:

#### DFS-based Approach:
```python
def topological_sort(graph):
    visited = set()
    stack = []
    
    def dfs(v):
        visited.add(v)
        for neighbor in graph[v]:
            if neighbor not in visited:
                dfs(neighbor)
        stack.append(v)
    
    for vertex in graph:
        if vertex not in visited:
            dfs(vertex)
    
    return stack[::-1]  # Return reversed stack
```

#### Kahn's Algorithm (BFS-based):
```python
from collections import deque

def topological_sort(graph, n):
    in_degree = [^0] * n
    for u in range(n):
        for v in graph[u]:
            in_degree[v] += 1
    
    queue = deque()
    for i in range(n):
        if in_degree[i] == 0:
            queue.append(i)
    
    result = []
    while queue:
        u = queue.popleft()
        result.append(u)
        
        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    
    # If result doesn't contain all vertices, there's a cycle
    return result if len(result) == n else []
```
</details>
<details>
<summary>
### A Brief Look at History
</summary>

Topological sorting emerged from the study of project scheduling problems in the mid-20th century. The concept was formalized in the context of graph theory as researchers tackled problems involving dependencies and precedence relationships. The algorithm gained prominence with the rise of computer science and has since become a fundamental technique in various fields requiring dependency resolution. Both the DFS-based approach and Kahn's algorithm (published in 1962) remain standard implementations, demonstrating the enduring value of this elegant solution to a common computational problem.
</details>