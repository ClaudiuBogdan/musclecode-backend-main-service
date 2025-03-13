---
title: Implementing Kruskal's Algorithm
---

# 💻 Implementing Kruskal's Algorithm 💻

Now that we understand the core concepts of Kruskal's algorithm and the Disjoint-Set data structure, let's put it all together into a complete implementation.

## 📋 Step-by-Step Implementation

### 1️⃣ Initialize the algorithm

```javascript
function kruskal(vertices, edges) {
  // Create a copy of edges to avoid modifying the input
  const sortedEdges = [...edges];
  
  // Create the result array that will store our MST
  const mst = [];
  
  // Initialize the disjoint-set data structure
  const parent = Array.from({ length: vertices }, (_, i) => i);
}
```

### 2️⃣ Implement the disjoint-set operations

```javascript
function kruskal(vertices, edges) {
  // ... (previous code)
  
  // Find operation with path compression
  function find(i) {
    if (parent[i] === i) {
      return i;
    }
    return (parent[i] = find(parent[i]));
  }
  
  // Union operation
  function union(i, j) {
    const rootI = find(i);
    const rootJ = find(j);
    parent[rootI] = rootJ;
  }
}
```

### 3️⃣ Sort the edges by weight

```javascript
function kruskal(vertices, edges) {
  // ... (previous code)
  
  // Sort edges by weight in ascending order
  sortedEdges.sort((a, b) => a[2] - b[2]);
}
```

### 4️⃣ Process the edges to build the MST

```javascript
function kruskal(vertices, edges) {
  // ... (previous code)
  
  // Process each edge in order of increasing weight
  for (const edge of sortedEdges) {
    const [u, v, weight] = edge;
    
    // Check if this edge creates a cycle
    if (find(u) !== find(v)) {
      // If no cycle, include this edge in the MST
      union(u, v);
      mst.push(edge);
      
      // Once we have V-1 edges, our MST is complete
      if (mst.length === vertices - 1) {
        break;
      }
    }
  }
  
  return mst;
}
```

## 🧠 Understanding the Code

Let's analyze this implementation:

1. We start by initializing our data structures:
   - A copy of the edges to sort
   - An array to store our MST
   - A disjoint-set (represented by a parent array)

2. We implement the two key disjoint-set operations:
   - `find(i)`: Determines which set an element belongs to, with path compression for efficiency
   - `union(i, j)`: Merges two sets into one

3. We sort all edges by weight in ascending order.

4. We process each edge in order of increasing weight:
   - If the edge doesn't create a cycle (the endpoints are in different sets), add it to the MST
   - Once we have V-1 edges (enough to form a tree), we're done

> [!NOTE]
> A tree with V vertices has exactly V-1 edges. Once we've added V-1 edges without creating cycles, we have our MST.

## 🎯 Handling Edge Cases

Good implementations should handle various edge cases:

```javascript
function kruskal(vertices, edges) {
  // Handle empty graph or single vertex
  if (vertices <= 1 || edges.length === 0) {
    return [];
  }
  
  // ... (rest of the implementation)
}
```

## ⚡ Optimizations

For larger graphs, we can further optimize:

1. **Union by Rank**: Improve the union operation by keeping track of each set's size or height.

```javascript
// Initialize rank array
const rank = Array(vertices).fill(0);

function union(i, j) {
  const rootI = find(i);
  const rootJ = find(j);
  
  if (rootI === rootJ) return;
  
  // Always attach smaller rank tree under root of higher rank tree
  if (rank[rootI] < rank[rootJ]) {
    parent[rootI] = rootJ;
  } else if (rank[rootI] > rank[rootJ]) {
    parent[rootJ] = rootI;
  } else {
    // If ranks are same, make one as root and increment its rank
    parent[rootJ] = rootI;
    rank[rootI]++;
  }
}
```

2. **Early Exit**: We can stop once we've added V-1 edges (as shown in the implementation).

## 🧪 Testing Your Implementation

Here's how you can test your implementation with a simple example:

```javascript
// Example graph
const vertices = 4;
const edges = [
  [0, 1, 10],
  [0, 2, 6],
  [0, 3, 5],
  [1, 3, 15],
  [2, 3, 4]
];

const result = kruskal(vertices, edges);
console.log(result);
// Expected output: [[2, 3, 4], [0, 3, 5], [0, 1, 10]]
```

## 🚀 Time and Space Complexity

- **Time Complexity**: O(E log E) or O(E log V)
  - Sorting edges: O(E log E)
  - Processing edges with disjoint-set operations: O(E α(V)) ≈ O(E)
  
- **Space Complexity**: O(E + V)
  - We store the edges, MST, and disjoint-set data structure

> [!TIP]
> α(V) is the inverse Ackermann function which grows extremely slowly. For all practical purposes, it's considered a constant ≤ 4.

## 💭 Exercise

Try implementing Kruskal's algorithm on your own, and test it with these examples:

```javascript
// Example 1
const vertices1 = 5;
const edges1 = [
  [0, 1, 2],
  [0, 3, 6],
  [1, 2, 3],
  [1, 3, 8],
  [1, 4, 5],
  [2, 4, 7]
];

// Example 2
const vertices2 = 6;
const edges2 = [
  [0, 1, 4],
  [0, 2, 3],
  [1, 2, 1],
  [1, 3, 2],
  [2, 3, 4],
  [3, 4, 2],
  [4, 5, 6]
];
```

<details>
<summary>Expected Results</summary>

Example 1: `[[0, 1, 2], [1, 2, 3], [1, 4, 5], [0, 3, 6]]`

Example 2: `[[1, 2, 1], [1, 3, 2], [3, 4, 2], [0, 2, 3], [4, 5, 6]]`
</details> 