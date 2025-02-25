# Cycle Detection

Cycle Detection is a fundamental algorithm in graph theory that identifies loops or cycles within a data structure. It's widely used in various applications from deadlock detection in operating systems to finding loops in linked lists, making it an essential tool in a programmer's toolkit.

## The Challenge

Given a graph or a sequence of iterated function values, implement an algorithm to detect if there is a cycle. In the case of a graph, a cycle is a path that starts and ends at the same vertex without using any edge more than once. For linked lists or function iterations, a cycle exists when the same element appears more than once in the traversal.

### Example 1

```js
Input: Graph with edges [(0,1), (1,2), (2,3), (3,1)]
Output: true
```

_Explanation: There is a cycle formed by vertices 1 → 2 → 3 → 1._

### Example 2

```js
Input: Linked list: 3 → 10 → 101 → 2 → 5 → 26 → 167 → 95 → 101 (points back to 101)
Output: true
```

_Explanation: The linked list has a cycle starting at node with value 101._

<details>
<summary>
### Speed and Efficiency
</summary>

The efficiency of cycle detection algorithms varies based on the approach:

- **DFS-based Cycle Detection**:
  - **Time Complexity:** $O(V + E)$ where V is the number of vertices and E is the number of edges.
  - **Space Complexity:** $O(V)$ for the recursion stack and visited array.

- **Floyd's Cycle Detection (Tortoise and Hare)**:
  - **Time Complexity:** $O(n)$ where n is the length of the sequence.
  - **Space Complexity:** $O(1)$ as it only requires two pointers.

- **Brent's Algorithm**:
  - **Time Complexity:** $O(λ + μ)$ where λ is the cycle length and μ is the index of the first element of the cycle.
  - **Space Complexity:** $O(1)$ as it uses constant extra space.

- **Union-Find Algorithm**:
  - **Time Complexity:** $O(E \log V)$ or $O(E \cdot α(V))$ with optimizations, where α is the inverse Ackermann function.
  - **Space Complexity:** $O(V)$ for storing the parent array.
</details>
<details>
<summary>
### Key Principles
</summary>

Cycle detection algorithms rely on several key concepts:

- **Graph Traversal:** Most approaches use either depth-first search (DFS) or breadth-first search (BFS) to explore the structure.

- **Marking Visited Nodes:** Keeping track of visited nodes to identify when a previously visited node is encountered again.

- **Two-Pointer Technique:** In Floyd's algorithm, using slow and fast pointers that move at different speeds to detect cycles.

- **Disjoint Sets:** In the Union-Find approach, maintaining sets of connected components and checking if an edge connects vertices already in the same set.

- **Back Edges:** In DFS, a back edge (pointing to an ancestor in the DFS tree) indicates a cycle.
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For those who prefer visual explanations, these resources offer interactive and animated guides:

- [Floyd's Cycle Detection Algorithm (Tortoise and Hare) Visualization](https://www.youtube.com/watch?v=XoJFL-yusu8) - Clear explanation with animations
- [Finding Cycles in a Graph: Algorithms and Techniques Explained](https://www.youtube.com/watch?v=Yy_cJ0NfSGU) - Comprehensive tutorial on cycle detection methods
- [Cycle Detection Visualization - Rosetta Code](https://rosettacode.org/wiki/Cycle_detection) - Examples in multiple programming languages
- [CS USF CA Visualization Tool](https://www.cs.usfca.edu/~galles/visualization/TopoSortDFS.html) - Interactive visualization of graph algorithms including cycle detection

</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing cycle detection algorithms, be aware of these common challenges:

- **Directed vs. Undirected Graphs:** The approach differs significantly between these two types of graphs.

- **Self-Loops:** Handling vertices that connect to themselves requires special attention.

- **Disconnected Components:** Ensuring all components of a graph are checked for cycles.

- **Parent Edge Confusion:** In undirected graphs, the edge to a parent node should not be considered a back edge.

- **Recursion Depth:** For large graphs, the recursion depth in DFS-based approaches might exceed stack limits.

- **Infinite Loops:** Improper implementation might result in infinite loops, especially when the termination condition is not properly defined.
</details>
<details>
<summary>
### When and Where to Use Cycle Detection
</summary>

Cycle detection is particularly useful in:

- **Deadlock Detection:** Identifying circular wait conditions in operating systems.

- **Compiler Analysis:** Detecting cyclic dependencies in module imports or inheritance hierarchies.

- **Circuit Design:** Verifying that electronic circuits don't have unintended feedback loops.

- **Memory Leak Detection:** Finding reference cycles in garbage collection systems.

- **Network Topology:** Ensuring network routing doesn't create loops.

- **Cryptography:** Predicting periods in pseudo-random number generators.

However, it may not be necessary when:

- **Working with trees:** By definition, trees don't contain cycles.

- **DAGs (Directed Acyclic Graphs):** These are specifically designed to be cycle-free.

- **Simple linear structures:** Arrays or singly-linked lists without any potential for cycles.
</details>
<details>
<summary>
### Real-World Applications
</summary>

Cycle detection algorithms have numerous practical applications:

- **Version Control Systems:** Detecting circular dependencies in code repositories.

- **Financial Systems:** Identifying circular transactions that might indicate fraud.

- **Social Network Analysis:** Finding circular relationships or influence patterns.

- **Game Development:** Detecting infinite loops in game state machines.

- **Distributed Systems:** Preventing circular waits in resource allocation.

- **Database Management:** Detecting cycles in transaction dependencies to prevent deadlocks.

- **Compiler Optimization:** Identifying loops for optimization in code.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several specialized algorithms exist for cycle detection:

- **Floyd's Cycle-Finding Algorithm (Tortoise and Hare):** Uses two pointers moving at different speeds.

- **Brent's Algorithm:** An improvement over Floyd's algorithm with better average-case performance.

- **DFS with Color Marking:** Uses three colors (white, gray, black) to track the state of vertices during traversal.

- **Union-Find Algorithm:** Uses disjoint sets to detect cycles in undirected graphs.

- **Johnson's Algorithm:** Finds all elementary cycles in a directed graph.

- **Tarjan's Algorithm:** Identifies strongly connected components, which can be used for cycle detection.
</details>
<details>
<summary>
### A Brief Look at History
</summary>

Cycle detection algorithms have evolved significantly over time. The concept dates back to the early days of graph theory in the 18th century, but modern algorithmic approaches emerged in the mid-20th century. Floyd's cycle-finding algorithm, also known as the "tortoise and hare" algorithm, was published by Robert W. Floyd in 1967. It represented a breakthrough in space-efficient cycle detection. Later, Richard Brent introduced an improvement in 1980 that maintains the same space complexity but offers better average-case performance. These algorithms continue to be refined and adapted for various applications in computer science, from operating systems to artificial intelligence.

</details>