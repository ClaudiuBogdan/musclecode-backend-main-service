# Articulation Points Algorithm

Articulation Points (also known as cut vertices) are nodes in an undirected graph which, when removed along with their associated edges, increase the number of connected components in the graph. These points represent critical vulnerabilities in network structures, making them essential to identify in various applications.

## The Challenge

Given an undirected graph G(V, E) with vertices V and edges E, find all articulation points in the graph. A vertex is an articulation point if removing it (and its incident edges) disconnects the graph or increases the number of connected components.

### Example 1

```
Input: Graph with edges [(0,1), (1,2), (2,0), (1,3)]
Output: [^1]
```

_Explanation: Removing vertex 1 disconnects vertex 3 from the rest of the graph._

### Example 2

```
Input: Graph with edges [(0,1), (1,2), (2,3), (3,0)]
Output: []
```

_Explanation: The graph forms a cycle, and removing any single vertex doesn't disconnect the graph._

<details>
<summary>
### Speed and Efficiency
</summary>

The Articulation Points algorithm based on Depth-First Search (DFS) offers excellent performance:

- **Time Complexity**: O(V+E), where V is the number of vertices and E is the number of edges in the graph[^1][^7].
- **Space Complexity**: O(V) for storing the discovery time, low values, and visited status of vertices.

This linear time complexity makes it efficient even for large graphs, as it requires only a single DFS traversal of the graph.
</details>
<details>
<summary>
### Key Principles
</summary>

The algorithm relies on several fundamental concepts:

- **DFS Tree Construction**: The algorithm first constructs a DFS tree of the graph, establishing parent-child relationships[^1].

- **Discovery Time**: Each vertex is assigned a "discovery time" (or "visited time") indicating when it was first encountered during DFS[^1][^3].

- **Low Value**: For each vertex, we calculate a "low value" representing the minimum of:
  - Its own discovery time
  - Discovery time of vertices reachable via back edges
  - Low values of its children in the DFS tree[^1][^7]

- **Articulation Point Conditions**:
  - Root of DFS tree: If it has more than one child in the DFS tree
  - Non-root vertex: If it has a child whose low value is greater than or equal to the discovery time of the vertex[^1][^3][^7]
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For those who benefit from visual explanations, consider checking out these resources for interactive and animated guides:

- [Articulation Points Graph Algorithm - YouTube](https://www.youtube.com/watch?v=2kREIkF9UAs) - Detailed explanation with step-by-step visualization
- [Articulation Points | Cut Vertices | Tarjan's Algorithm | Graphs](https://www.youtube.com/watch?v=qNVNoZJFp_g) - Comprehensive explanation of both brute force and Tarjan's approaches
- [CS USF CA Visualization Tool](https://www.cs.usfca.edu/~galles/visualization/ConnectedComponent.html) - Interactive visualization of connected components
- [Visualgo Graph Algorithms](https://visualgo.net/en/dfsbfs) - Interactive visualization of DFS and related graph algorithms

</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing the Articulation Points algorithm, be mindful of these common challenges:

- **Root Node Special Case**: Forgetting to handle the root node separately, which is an articulation point if and only if it has more than one child in the DFS tree[^1][^3].

- **Back Edge Handling**: Incorrectly updating low values when encountering back edges during DFS traversal.

- **Parent Edge Confusion**: Mistaking the edge back to a parent as a back edge to an ancestor.

- **Disconnected Graphs**: Not accounting for graphs with multiple connected components by failing to run DFS from each unvisited vertex.

- **Duplicate Reporting**: Identifying the same articulation point multiple times without proper tracking.
</details>
<details>
<summary>
### When and Where to Use Articulation Points Algorithm
</summary>

The Articulation Points algorithm is particularly valuable in:

- **Network Reliability Analysis**: Identifying critical nodes whose failure would disrupt communication.

- **Infrastructure Planning**: Finding vulnerable points in transportation, power, or communication networks.

- **Social Network Analysis**: Discovering individuals who bridge different communities.

- **Circuit Design**: Identifying critical components in electronic circuits.

- **Biological Networks**: Finding essential proteins or genes in protein-protein interaction networks.

However, it may not be necessary for:

- **Highly redundant networks** with multiple paths between all nodes.

- **Complete graphs** where no articulation points exist by definition.

- **Tree structures** where every non-leaf node is trivially an articulation point.
</details>
<details>
<summary>
### Real-World Applications
</summary>

Articulation Points have numerous practical applications:

- **Telecommunications**: Identifying critical routers or switches in network infrastructure.

- **Transportation Systems**: Finding critical junctions in road or railway networks.

- **Supply Chain Management**: Discovering vulnerable distribution centers.

- **Cybersecurity**: Identifying critical servers whose compromise would significantly impact network connectivity.

- **Urban Planning**: Determining critical intersections or bridges in city layouts.

- **Database Sharding**: Optimizing database partitioning by identifying natural break points in data relationships.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several related concepts and algorithms extend the idea of articulation points:

- **Bridge Finding Algorithm**: Identifies edges whose removal disconnects the graph (similar concept but for edges instead of vertices)[^7].

- **Biconnected Components**: Components of a graph that remain connected even after removing any single vertex.

- **Strongly Connected Components**: In directed graphs, subgraphs where every vertex is reachable from every other vertex.

- **k-Vertex Connectivity**: Extends the concept to find sets of k vertices whose removal disconnects the graph.

- **Tarjan's Algorithm**: A more general approach that can find articulation points, bridges, and strongly connected components[^6].
</details>
<details>
<summary>
### A Brief Look at History
</summary>

The algorithm for finding articulation points was developed by Robert Tarjan in 1972 as part of his work on graph theory algorithms. Tarjan's contributions to graph algorithms were groundbreaking, earning him the Turing Award in 1986. The articulation points algorithm exemplifies his approach of using depth-first search with clever bookkeeping to solve complex graph problems efficiently. This algorithm has stood the test of time and remains the standard approach for identifying critical nodes in network structures, demonstrating the enduring value of elegant algorithmic design.
</details>
<details>
<summary>
### Pseudocode Implementation
</summary>

```
function ArticulationPoints(G, s):
    // Initialize arrays
    Visited = array of false for each vertex
    depth = array of -1 for each vertex
    low = array of -1 for each vertex
    parent = array of -1 for each vertex
    articulationPoints = empty set
    timer = 0
    
    // Run DFS for each unvisited vertex (handles disconnected graphs)
    for each vertex v in G:
        if not Visited[v]:
            DFS(G, v, Visited, depth, low, parent, articulationPoints, timer)
    
    return articulationPoints

function DFS(G, u, Visited, depth, low, parent, articulationPoints, timer):
    // Mark current vertex as visited
    Visited[u] = true
    
    // Set discovery time and initial low value
    depth[u] = low[u] = timer
    timer = timer + 1
    
    // Count children in DFS tree
    childCount = 0
    
    // Explore all adjacent vertices
    for each vertex v adjacent to u:
        if not Visited[v]:
            // v is a child of u in DFS tree
            parent[v] = u
            childCount = childCount + 1
            
            // Recursive DFS call
            DFS(G, v, Visited, depth, low, parent, articulationPoints, timer)
            
            // Update low value of u
            low[u] = min(low[u], low[v])
            
            // Check if u is an articulation point
            if parent[u] == -1 and childCount > 1:
                // u is root with multiple children
                articulationPoints.add(u)
            else if parent[u] != -1 and low[v] >= depth[u]:
                // u is not root and low value of child v is >= discovery time of u
                articulationPoints.add(u)
        else if v != parent[u]:
            // Update low value if v is not parent of u (back edge)
            low[u] = min(low[u], depth[v])
```
</details>