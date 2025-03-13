---
title: Dynamic Programming Solution for Hamiltonian Paths
---

# 🧮 Dynamic Programming Solution for Hamiltonian Paths

While backtracking is intuitive, dynamic programming offers an alternative approach that can be more efficient for certain graph structures. This approach uses the Held-Karp algorithm, originally designed for the Traveling Salesman Problem.

## 🔍 Understanding the Dynamic Programming Approach

> [!NOTE]
> Dynamic programming for Hamiltonian Paths uses the concept of "bitmasking" to represent sets of vertices efficiently.

The key insight is that we can:
1. Use bits to represent which vertices are part of our current subpath
2. Build solutions for larger subproblems from smaller ones
3. Avoid recomputing the same subproblems multiple times

## 📊 State Representation

For a graph with `n` vertices:

1. We use an integer `mask` where the bit at position `i` is 1 if vertex `i` is in our current path, and 0 otherwise
2. We track the end vertex `i` of our current subpath
3. Our state is represented as `dp[i][mask]` = whether there's a path ending at vertex `i` that visits exactly the vertices in `mask`

## 🔢 Held-Karp Algorithm for Hamiltonian Path

Here's the approach step by step:

1. Initialize a 2D array `dp[n][2^n]`, where `n` is the number of vertices
2. Base case: `dp[i][1<<i] = true` for all vertices `i` (a path of just one vertex is always possible)
3. For each subset of vertices (`mask`):
   - For each vertex `i` in the subset:
     - For each vertex `j` in the subset:
       - If `i` and `j` are connected by an edge, then `dp[i][mask]` is true if `dp[j][mask - {i}]` is true

### 🎯 Pseudocode

```
function hamiltonianPath(graph):
    n = number of vertices in graph
    dp[n][2^n] = all false
    
    // Base case: paths of length 1
    for i from 0 to n-1:
        dp[i][1 << i] = true
    
    // Build solution bottom-up
    for mask from 1 to 2^n - 1:
        for i from 0 to n-1:
            if (mask & (1 << i)) != 0:  // If vertex i is in the mask
                for j from 0 to n-1:
                    if i != j and (mask & (1 << j)) != 0 and graph[j][i] == 1:
                        dp[i][mask] = dp[i][mask] || dp[j][mask ^ (1 << i)]
    
    // Check if there's a Hamiltonian Path ending at any vertex
    for i from 0 to n-1:
        if dp[i][2^n - 1]:
            return true
    
    return false
```

## 🔍 Visualizing with an Example

Consider a simple path graph with 4 vertices:

```mermaid
graph LR;
    A---B;
    B---C;
    C---D;
```

<details>
<summary>Step-by-step execution</summary>

1. Initialize `dp[i][1<<i] = true` for all i (paths of length 1)
   - `dp[A][0001] = true`
   - `dp[B][0010] = true`
   - `dp[C][0100] = true`
   - `dp[D][1000] = true`

2. Consider paths of length 2:
   - `dp[B][0011] = true` (path A→B)
   - `dp[A][0011] = true` (path B→A)
   - `dp[C][0110] = true` (path B→C)
   - `dp[B][0110] = true` (path C→B)
   - `dp[D][1100] = true` (path C→D)
   - `dp[C][1100] = true` (path D→C)

3. Consider paths of length 3:
   - `dp[C][0111] = true` (path A→B→C)
   - `dp[A][0111] = false` (no path ending at A that visits A, B, C exactly once)
   - `dp[D][1110] = true` (path B→C→D)

4. Consider paths of length 4:
   - `dp[D][1111] = true` (path A→B→C→D)

Since `dp[D][1111] = true`, a Hamiltonian Path exists: A→B→C→D
</details>

## ⚖️ Advantages and Limitations

> [!TIP]
> The dynamic programming approach has better worst-case complexity than backtracking, but still grows exponentially with graph size.

**Advantages:**
- More efficient than backtracking for many graphs
- Time complexity O(n² × 2ⁿ) is better than O(n!)
- Can be adapted to find optimal paths with weights

**Limitations:**
- More complex to implement and understand
- Still exponential in the number of vertices
- Higher memory requirement: O(n × 2ⁿ)

## 👨‍💻 Python Implementation

```python
def hamiltonian_path(graph):
    n = len(graph)
    
    # dp[i][mask] = True if there's a path that ends at vertex i
    # and visits exactly the vertices in mask
    dp = [[False] * (1 << n) for _ in range(n)]
    
    # Base case: paths of length 1
    for i in range(n):
        dp[i][1 << i] = True
    
    # Build the dp table
    for mask in range(1, 1 << n):
        for i in range(n):
            if (mask & (1 << i)) != 0:  # If vertex i is in the mask
                for j in range(n):
                    if i != j and (mask & (1 << j)) != 0 and graph[j][i] == 1:
                        dp[i][mask] = dp[i][mask] or dp[j][mask ^ (1 << i)]
    
    # Check if there's a path that visits all vertices
    for i in range(n):
        if dp[i][(1 << n) - 1]:
            return True
    
    return False
```

## 🧠 Think About It

1. How would you modify the algorithm to reconstruct the actual path?
2. Under what circumstances might the backtracking approach outperform dynamic programming?
3. How would you adapt this algorithm if you needed to find a Hamiltonian Cycle instead of a Path? 