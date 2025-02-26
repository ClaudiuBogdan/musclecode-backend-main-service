# Hamiltonian Cycle

A Hamiltonian Cycle is a path in an undirected graph that visits each vertex exactly once and returns to the starting vertex, forming a closed loop. This fundamental concept in graph theory represents one of the classic NP-complete problems in computer science, making it both theoretically significant and computationally challenging.

## The Challenge

Given an undirected graph G with n vertices, determine whether there exists a cycle that visits every vertex exactly once before returning to the starting vertex. If such a cycle exists, the graph is said to contain a Hamiltonian Cycle.

### Example 1

```
Input: Graph with adjacency matrix
[
  [0, 1, 0, 1, 0],
  [1, 0, 1, 1, 1],
  [0, 1, 0, 0, 1],
  [1, 1, 0, 0, 1],
  [0, 1, 1, 1, 0]
]
Output: Cycle Found: 0 1 2 4 3 0
```

_Explanation: The path 0→1→2→4→3→0 forms a valid Hamiltonian Cycle._

### Example 2

```
Input: Graph with no Hamiltonian Cycle
Output: Solution does not exist
```

_Explanation: No path exists that visits each vertex exactly once and returns to the start._

<details>
<summary>
### Speed and Efficiency
</summary>

The Hamiltonian Cycle problem is computationally intensive:

- **Time Complexity**:
  - **Naive Approach:** O(n!) as it requires checking all possible permutations of vertices.
  - **Backtracking:** Still exponential in the worst case, but typically performs better in practice due to early pruning.
- **Space Complexity:** O(n) for storing the path and visited vertices information.

Finding a Hamiltonian Cycle is an NP-complete problem, meaning no known polynomial-time algorithm exists for solving it in all cases.
</details>
<details>
<summary>
### Key Principles
</summary>

The backtracking approach to solving the Hamiltonian Cycle problem relies on several core principles:

- **Systematic Exploration:** Recursively builds potential solutions by adding one vertex at a time.

- **Constraint Checking:** At each step, verifies that adding a vertex maintains the potential for a valid cycle.

- **Backtracking:** When reaching a dead end (no valid vertex to add), reverts to a previous state and explores alternative paths.

- **Adjacency Verification:** Ensures that consecutive vertices in the path are connected by edges in the graph.

- **Cycle Completion:** Confirms that the last vertex in the path is connected to the starting vertex to form a cycle.
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For those who benefit from visual explanations, consider checking out these resources for interactive and animated guides:

- [Hamiltonian Cycle using Backtracking - Abdul Bari](https://www.youtube.com/watch?v=dQr4wZCiJJ4)
- [Hamiltonian Path | Backtracking | Graphs](https://www.youtube.com/watch?v=jGRRBJlNtwI)
- [Hamiltonian Cycle / Gray Code Animation](https://www3.cs.stonybrook.edu/~skiena/combinatorica/animations/ham.html)
- [Graph Algorithm Animation Tool](https://yongdanielliang.github.io/animation/animation.html)

</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing or working with Hamiltonian Cycle algorithms, be aware of these common challenges:

- **Exponential Growth:** The search space grows factorially with the number of vertices, making naive approaches impractical for large graphs.

- **Ineffective Pruning:** Failing to implement effective pruning strategies can lead to unnecessary exploration of invalid paths.

- **Edge Case Handling:** Special consideration is needed for graphs with few vertices or specific structures.

- **Cycle Verification:** Forgetting to check if the last vertex connects back to the starting vertex.

- **Confusing with Eulerian Cycles:** Hamiltonian Cycles visit each vertex once, while Eulerian Cycles traverse each edge once.
</details>
<details>
<summary>
### When and Where to Use Hamiltonian Cycle
</summary>

The Hamiltonian Cycle algorithm is applicable in scenarios such as:

- **Circuit Design:** Finding optimal layouts for electronic circuits.

- **Transportation Planning:** Determining routes that visit multiple locations exactly once.

- **Network Design:** Planning efficient network topologies.

- **Genome Sequencing:** Assembling DNA fragments in bioinformatics.

However, due to its computational complexity, it may not be suitable for:

- **Very Large Graphs:** The exponential time complexity makes it impractical for graphs with many vertices.

- **Real-time Applications:** Where quick solutions are required.

- **Frequently Changing Graphs:** Where recalculation would be needed often.
</details>
<details>
<summary>
### Real-World Applications
</summary>

The Hamiltonian Cycle problem appears in various practical contexts:

- **Traveling Salesperson Problem:** A weighted version where the goal is to find the shortest Hamiltonian Cycle.

- **Vehicle Routing:** Planning delivery routes that visit each location exactly once.

- **Production Scheduling:** Sequencing tasks where each must be performed exactly once with setup constraints.

- **Gray Code Generation:** Creating sequences where consecutive values differ by exactly one bit.

- **Game Design:** Creating puzzles or game levels where players must visit every location exactly once.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several variations and related problems extend the Hamiltonian Cycle concept:

- **Hamiltonian Path:** Similar to Hamiltonian Cycle but doesn't require returning to the starting vertex.

- **Traveling Salesperson Problem (TSP):** Finds the shortest Hamiltonian Cycle in a weighted graph.

- **Knight's Tour:** A specialized Hamiltonian Path problem on a chess board.

- **Longest Path Problem:** Finding the longest simple path in a graph (also NP-hard).

- **Approximation Algorithms:** For large instances, heuristic approaches like genetic algorithms or simulated annealing are often used.
</details>
<details>
<summary>
### A Brief Look at History
</summary>

The Hamiltonian Cycle problem is named after Sir William Rowan Hamilton, who invented a game called the "Icosian Game" in 1857. The game involved finding a path along the edges of a dodecahedron that visits each vertex exactly once before returning to the start.

The problem gained prominence in theoretical computer science when it was proven to be NP-complete in the 1970s as part of Karp's 21 NP-complete problems. Despite decades of research, no polynomial-time algorithm has been found, supporting the belief that P ≠ NP.

Today, the Hamiltonian Cycle problem remains a classic example used to illustrate computational complexity theory and the power of backtracking algorithms.
</details>