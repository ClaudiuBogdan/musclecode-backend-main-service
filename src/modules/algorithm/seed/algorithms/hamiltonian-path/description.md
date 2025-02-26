# Hamiltonian Path

A Hamiltonian Path is a path in an undirected or directed graph that visits each vertex exactly once. It represents one of the fundamental problems in graph theory, combining simplicity in concept with complexity in solution.

## The Challenge

Given a graph G with vertices V and edges E, find a path that visits each vertex in G exactly once. If such a path exists, the graph is said to have a Hamiltonian Path. If the path forms a cycle (the last vertex is connected to the first vertex), it's called a Hamiltonian Cycle or Hamiltonian Circuit.

### Example 1

```
Input: Graph with vertices {A, B, C, D, E} and edges {(A,B), (A,C), (B,C), (B,D), (C,D), (C,E), (D,E)}
Output: A-B-D-C-E
```

_Explanation: The path A-B-D-C-E visits each vertex exactly once._

### Example 2

```
Input: Graph with vertices {A, B, C, D} and edges {(A,B), (B,C), (C,D)}
Output: A-B-C-D
```

_Explanation: The path A-B-C-D visits each vertex exactly once, following the only possible Hamiltonian path in this graph._

<details>
<summary>
### Speed and Efficiency
</summary>

The Hamiltonian Path problem is known for its computational complexity:

- **Time Complexity**:
  - **Brute Force Approach:** O(n!) where n is the number of vertices, as we need to check all possible permutations of vertices[^1].
  - **Dynamic Programming Approach:** O(n² × 2ⁿ) using the Bellman-Held-Karp algorithm[^7].
- **Space Complexity:** O(n × 2ⁿ) for the dynamic programming approach[^7].

The problem is NP-Complete, meaning a proposed solution can be verified in polynomial time, but finding a solution is believed to require exponential time in the worst case[^7].
</details>
<details>
<summary>
### Key Principles
</summary>

The Hamiltonian Path algorithm relies on several core concepts:

- **Vertex Visitation:** Each vertex must be visited exactly once.

- **Edge Traversal:** Not all edges need to be traversed, only those that form the path.

- **Path Connectivity:** Each vertex in the path must be connected by an edge to the next vertex.

- **Completeness:** The path must include all vertices in the graph.

- **Uniqueness:** Multiple Hamiltonian paths may exist in a single graph.
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For those who prefer visual explanations, these resources offer interactive and animated guides:

- [Hamiltonian Path | Backtracking | Graphs](https://www.youtube.com/watch?v=jGRRBJlNtwI) - A detailed explanation with algorithm implementation
- [Introduction to Hamilton Paths and Hamilton Circuits](https://www.youtube.com/watch?v=UOE22pyKD5c) - Clear introduction to the concept
- [Hamiltonian Path Generator](https://clisby.net/projects/hamiltonian_path/) - Interactive tool to generate and visualize Hamiltonian paths
- [What is a Hamilton path?](https://www.youtube.com/watch?v=6QFSkhcHLiA) - Simple examples and explanations

</details>
<details>
<summary>
### Common Approaches
</summary>

Several algorithms can be used to find Hamiltonian Paths:

- **Brute Force:** Generate all possible permutations of vertices and check if they form a valid path[^5].

- **Backtracking:** Start with an empty path, add vertices one by one, and backtrack when no valid vertex can be added[^3][^5].

- **Dynamic Programming:** Use the Bellman-Held-Karp algorithm to build solutions for subproblems[^2][^7].

- **Heuristic Approaches:** For large graphs, approximation algorithms may be more practical than exact solutions.
</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing or analyzing Hamiltonian Path algorithms, be aware of these challenges:

- **Exponential Growth:** The problem's complexity grows rapidly with the number of vertices.

- **Confusing with Eulerian Paths:** Unlike Eulerian paths (which visit each edge once), Hamiltonian paths focus on vertices.

- **Assuming Existence:** Not all graphs contain a Hamiltonian path.

- **Edge vs. Vertex Focus:** Remember that not all edges need to be traversed, only those necessary to visit each vertex once.

- **Cycle vs. Path Confusion:** A Hamiltonian cycle requires returning to the start vertex, while a path does not.
</details>
<details>
<summary>
### When and Where to Use
</summary>

Hamiltonian Path algorithms are particularly useful in:

- **Circuit Design:** Planning efficient routes for electronic components.

- **Transportation Planning:** Finding routes that visit all locations exactly once.

- **Genome Sequencing:** Assembling DNA fragments.

- **Traveling Salesman Problem:** As a foundation for solving this related optimization problem.

- **Game Development:** Creating puzzles and path-finding challenges.

However, due to its complexity, exact algorithms may not be practical for:

- **Very Large Graphs:** Where heuristic or approximation algorithms might be preferred.

- **Real-time Applications:** Where quick solutions are needed.
</details>
<details>
<summary>
### Real-World Applications
</summary>

The Hamiltonian Path problem appears in numerous practical contexts:

- **Traveling Salesman Problem:** Finding the shortest route that visits each city once.

- **Garbage Collection:** Planning routes for garbage trucks to visit all locations efficiently.

- **Electricity Meter Reading:** Optimizing routes for meter readers.

- **Scheduling Algorithms:** Arranging tasks with dependencies.

- **Circuit Board Drilling:** Minimizing the time to drill all holes in a circuit board.

- **DNA Fragment Assembly:** Reconstructing DNA sequences from fragments[^1].
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several variations and related problems extend the basic Hamiltonian Path concept:

- **Hamiltonian Cycle:** A Hamiltonian path that forms a cycle by connecting the last vertex to the first.

- **Longest Path Problem:** Finding the longest simple path in a graph.

- **Knight's Tour:** A special case where a knight on a chessboard must visit each square exactly once.

- **Traveling Salesman Problem:** Finding the shortest Hamiltonian cycle in a weighted graph.

- **Gray Code:** A binary numeral system where two successive values differ in only one bit, which can be represented as a Hamiltonian path on a hypercube.
</details>
<details>
<summary>
### A Brief Look at History
</summary>

The Hamiltonian Path problem is named after Sir William Rowan Hamilton, who invented a game called the "Icosian Game" in 1857. This puzzle involved finding a path along the edges of a dodecahedron that visits each vertex exactly once. The mathematical formalization of this problem led to what we now know as Hamiltonian paths and cycles.

The problem gained significant attention in theoretical computer science when it was proven to be NP-complete in the 1970s, making it one of the classic problems used to understand computational complexity.

</details>
<details>
<summary>
### Pseudocode Implementation
</summary>

Here's a backtracking algorithm to find a Hamiltonian Path:

```
function hamiltonianPath(graph, n):
    // Initialize path array
    path[^0] = 0  // Start with vertex 0
    
    // Try different vertices as the next in the path
    if findPath(graph, path, 1, n) is true:
        return path
    else:
        return "No Hamiltonian Path exists"

function findPath(graph, path, pos, n):
    // Base case: if all vertices are included
    if pos == n:
        return true
    
    // Try different vertices as candidates for path[pos]
    for v = 1 to n-1:
        // Check if this vertex can be added
        if isValid(v, graph, path, pos):
            path[pos] = v
            
            // Recur to construct rest of the path
            if findPath(graph, path, pos+1, n):
                return true
                
            // If adding vertex v doesn't lead to a solution, remove it
            path[pos] = -1  // Backtrack
    
    return false

function isValid(v, graph, path, pos):
    // Check if this vertex is adjacent to the previous vertex
    if graph[path[pos-1]][v] == 0:
        return false
    
    // Check if the vertex has already been included
    for i = 0 to pos-1:
        if path[i] == v:
            return false
            
    return true
```

This algorithm uses backtracking to systematically try different permutations of vertices, pruning those that cannot form a valid Hamiltonian Path.
</details>