# Kruskal's Algorithm

Kruskal's Algorithm is a greedy algorithm used to find the minimum spanning tree (MST) of a connected, undirected, and weighted graph. It builds the MST by selecting edges with the lowest weight while avoiding cycles, resulting in a tree that connects all vertices with minimal total weight.

## The Challenge

Given an undirected weighted graph represented as a collection of edges, where each edge has a source vertex, destination vertex, and weight, implement Kruskal's algorithm to find the minimum spanning tree. The algorithm should return the set of edges that form the MST with the minimum possible total weight.

### Example 1

```js
Input: vertices = 4, edges = [[0,1,10], [0,2,6], [0,3,5], [1,3,15], [2,3,4]]
Output: [[2,3,4], [0,3,5], [0,1,10]]
```

_Explanation: The MST includes the edges (2,3) with weight 4, (0,3) with weight 5, and (0,1) with weight 10, for a total weight of 19._

### Example 2

```js
Input: vertices = 5, edges = [[0,1,2], [0,3,6], [1,2,3], [1,3,8], [1,4,5], [2,4,7]]
Output: [[0,1,2], [1,2,3], [1,4,5], [0,3,6]]
```

_Explanation: The MST includes edges with weights 2, 3, 5, and 6, for a total weight of 16._

<details>
<summary>
### Speed and Efficiency
</summary>

Kruskal's Algorithm has the following complexity characteristics:

- **Time Complexity**:
  - **Sorting Edges:** O(E log E) where E is the number of edges
  - **Processing Edges:** O(E α(V)) where α is the inverse Ackermann function
  - **Overall:** O(E log E) or O(E log V) since E can be at most V²
- **Space Complexity:** O(E + V) for storing the edges and disjoint set data structure

The algorithm's performance is primarily dominated by the edge sorting step.
</details>
<details>
<summary>
### Key Principles
</summary>

Kruskal's Algorithm operates on several fundamental concepts:

- **Greedy Approach:** Always selects the edge with the lowest weight that doesn't create a cycle.

- **Disjoint-Set Data Structure:** Uses Union-Find operations to efficiently detect cycles.

- **Forest Growth:** Initially treats each vertex as a separate tree and gradually merges them.

- **Cycle Prevention:** Ensures the final structure is a tree by avoiding the formation of cycles.

- **Minimum Weight Selection:** Prioritizes edges with lower weights to minimize the total cost.
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For those who benefit from visual explanations, consider checking out these resources for interactive and animated guides:

- [Kruskal's Algorithm Explained and Implemented in Java | Geekific](https://www.youtube.com/watch?v=JptKmWQSerU)
- [VisuAlgo - Minimum Spanning Tree Visualization](https://visualgo.net/en/mst)
- [Kruskal's Algorithm Animation - How does it progress?](https://www.youtube.com/watch?v=o8Sqm1_3BRo)
- [CS USF CA Visualization Tool](https://www.cs.usfca.edu/~galles/visualization/Kruskal.html) - Interactive visualization of Kruskal's algorithm

</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing or using Kruskal's Algorithm, be mindful of these common challenges:

- **Inefficient Cycle Detection:** Using naive cycle detection instead of Union-Find data structure.

- **Improper Edge Sorting:** Forgetting to sort edges by weight at the beginning.

- **Disconnected Graphs:** Not accounting for graphs that aren't connected, which would result in a minimum spanning forest rather than a tree.

- **Edge Cases:** Not handling graphs with no edges or only one vertex.

- **Duplicate Edges:** Not properly handling multiple edges between the same vertices.
</details>
<details>
<summary>
### When and Where to Use Kruskal's Algorithm
</summary>

Kruskal's Algorithm is ideal in scenarios such as:

- Sparse graphs where the number of edges is significantly less than V².

- Applications where edge weights are already sorted or can be sorted efficiently.

- When implementing a Union-Find data structure is straightforward.

- Distributed systems where edges can be processed independently.

However, it may not be the best choice for:

- Dense graphs where Prim's algorithm might perform better.

- Scenarios where the graph is constantly changing, requiring frequent MST recalculations.

- Applications where incremental MST updates are needed.
</details>
<details>
<summary>
### Real-World Applications
</summary>

Kruskal's Algorithm has numerous practical applications, including:

- **Network Design:** Designing minimum-cost networks like telecommunications, electrical, or hydraulic systems.

- **Cluster Analysis:** Identifying clusters in data by finding connected components.

- **Image Segmentation:** Partitioning digital images into multiple segments.

- **Transportation Planning:** Designing optimal road or railway networks.

- **Circuit Design:** Minimizing wire length in circuit layouts.

- **Water Supply Networks:** Optimizing pipe layouts to minimize costs while ensuring connectivity.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several algorithms are related to or extend Kruskal's approach:

- **Prim's Algorithm:** Another MST algorithm that grows a single tree from a starting vertex.

- **Borůvka's Algorithm:** An MST algorithm that grows multiple trees simultaneously.

- **Reverse-Delete Algorithm:** A counterpart to Kruskal's that starts with all edges and removes the heaviest ones that don't disconnect the graph.

- **Filter-Kruskal:** A parallel variant that filters edges unlikely to be in the MST.

- **Maximum Spanning Tree:** A variation that finds the tree with maximum total weight.
</details>
<details>
<summary>
### A Brief Look at History
</summary>

Kruskal's algorithm was first published by Joseph Kruskal in 1956 in a paper titled "On the Shortest Spanning Subtree of a Graph and the Traveling Salesman Problem." Shortly after its publication, it was independently rediscovered by Loberman and Weinberger in 1957. The algorithm represents one of the earliest applications of the greedy approach to graph problems and has since become a fundamental technique in network design and optimization. Its elegance lies in its simplicity and the fact that it produces optimal results despite making locally optimal choices at each step.
</details>