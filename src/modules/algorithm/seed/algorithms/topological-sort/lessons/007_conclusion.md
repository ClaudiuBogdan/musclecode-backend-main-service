---
title: Topological Sort - Conclusion and Practice
---

# 🏆 Topological Sort: Conclusion and Practice

## 🔄 Recap of Our Journey

Congratulations! You've mastered one of the most useful graph algorithms in computer science. Let's recap what we've learned:

1. **Problem Understanding**: Topological sort creates a linear ordering of vertices in a directed acyclic graph (DAG) such that for every edge (u, v), vertex u comes before vertex v.

2. **Graph Representation**: We typically use adjacency lists to represent graphs for topological sort.

3. **Two Main Approaches**:
   - **DFS-based**: Explores as deeply as possible, building the result by prepending each vertex after its descendants are processed.
   - **BFS-based/Kahn's**: Uses in-degree counts to process vertices with no dependencies first, gradually removing edges.

4. **Applications**: Course scheduling, dependency resolution, task scheduling, and much more.

5. **Variations**: Lexicographically smallest ordering, enumerating all valid orderings, partial sorting.

6. **Pitfalls**: Cycle detection, edge direction, and implementation details to watch for.

## 💻 Complete Implementation

Here's a complete, robust implementation of topological sort using both approaches:

### DFS Approach

```typescript
function topologicalSortDFS(n: number, edges: number[][]): number[] {
  // Create the graph
  const graph: { [key: number]: number[] } = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  for (const [u, v] of edges) {
    graph[u].push(v);
  }

  const visited: boolean[] = new Array(n).fill(false);
  const inProcess: boolean[] = new Array(n).fill(false);
  const result: number[] = [];

  function dfs(node: number): boolean {
    // Mark as visited and in-process
    visited[node] = true;
    inProcess[node] = true;
    
    // Visit all neighbors
    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        if (!dfs(neighbor)) {
          return false; // Cycle detected
        }
      } else if (inProcess[neighbor]) {
        return false; // Cycle detected
      }
    }
    
    // Mark as processed and add to result
    inProcess[node] = false;
    result.unshift(node);
    return true;
  }

  // Process all vertices
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      if (!dfs(i)) {
        return []; // Cycle detected
      }
    }
  }

  return result;
}
```

### BFS Approach (Kahn's Algorithm)

```typescript
function topologicalSortBFS(n: number, edges: number[][]): number[] {
  // Create the graph
  const graph: { [key: number]: number[] } = {};
  const inDegree: number[] = new Array(n).fill(0);
  
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  
  for (const [u, v] of edges) {
    graph[u].push(v);
    inDegree[v]++;
  }
  
  // Queue for BFS (start with vertices that have no dependencies)
  const queue: number[] = [];
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }
  
  const result: number[] = [];
  let count = 0;
  
  // Process vertices in topological order
  while (queue.length > 0) {
    const u = queue.shift()!;
    result.push(u);
    count++;
    
    // For each neighbor, remove the edge from u to v
    for (const v of graph[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) {
        queue.push(v);
      }
    }
  }
  
  // If count != n, there is a cycle
  return count === n ? result : [];
}
```

## 🧠 Practice Problems

To solidify your understanding, try these practice problems:

### 1️⃣ Course Schedule

Given a list of course prerequisites, determine if it's possible to finish all courses.

```
Input: numCourses = 4, prerequisites = [[1,0], [2,1], [3,2]]
Output: true
Explanation: We can complete the courses in the order [0,1,2,3]
```

<details>
<summary>Solution Approach</summary>

1. Create a graph from the prerequisites
2. Use topological sort
3. If we can create a valid ordering (no cycles), return true; otherwise, return false

```typescript
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const result = topologicalSort(numCourses, prerequisites);
  return result.length === numCourses;
}
```
</details>

### 2️⃣ Alien Dictionary

Given a sorted dictionary of an alien language, find the order of characters in the alphabet.

```
Input: words = ["wrt", "wrf", "er", "ett", "rftt"]
Output: "wertf"
```

<details>
<summary>Solution Approach</summary>

1. Extract character order relationships by comparing adjacent words
2. Build a graph where vertices are characters and edges represent order relationships
3. Perform topological sort on this graph to get the alphabet order

```typescript
function alienOrder(words: string[]): string {
  // Build a graph of character relationships
  const graph: { [key: string]: Set<string> } = {};
  
  // Initialize the graph with all unique characters
  for (const word of words) {
    for (const char of word) {
      if (!graph[char]) graph[char] = new Set();
    }
  }
  
  // Extract order relationships by comparing adjacent words
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];
    
    // Check for invalid case: if word1 is prefix of word2, it should come before
    if (word1.length > word2.length && word1.startsWith(word2)) {
      return "";
    }
    
    // Find the first differing character
    const minLength = Math.min(word1.length, word2.length);
    for (let j = 0; j < minLength; j++) {
      if (word1[j] !== word2[j]) {
        graph[word1[j]].add(word2[j]);
        break;
      }
    }
  }
  
  // Convert graph to edges format for topological sort
  const chars = Object.keys(graph);
  const n = chars.length;
  const charToIndex: { [key: string]: number } = {};
  chars.forEach((char, index) => {
    charToIndex[char] = index;
  });
  
  const edges: number[][] = [];
  chars.forEach((char) => {
    graph[char].forEach((neighbor) => {
      edges.push([charToIndex[char], charToIndex[neighbor]]);
    });
  });
  
  // Perform topological sort
  const order = topologicalSort(n, edges);
  
  // If we can't find a valid ordering, return empty string
  if (order.length < n) return "";
  
  // Convert back to characters
  return order.map(index => chars[index]).join("");
}
```
</details>

### 3️⃣ Parallel Task Scheduling

Given a set of tasks with dependencies and their execution times, find the minimum time to complete all tasks if you have infinite parallel processors.

```
Input: n = 4, times = [1, 3, 2, 2], dependencies = [[0,1], [0,2], [1,3], [2,3]]
Output: 6
Explanation: Tasks can be executed in the order [0,1,2,3] or [0,2,1,3].
Task 0 takes 1 unit, then tasks 1 and 2 can run in parallel (taking 3 units),
and finally task 3 takes 2 units. Total time: 1 + 3 + 2 = 6 units.
```

<details>
<summary>Solution Approach</summary>

1. Perform a topological sort to get a valid order
2. Use dynamic programming to calculate the earliest start time for each task
3. The minimum completion time is the maximum of (earliest start time + execution time) across all tasks

```typescript
function minimumTime(n: number, times: number[], dependencies: number[][]): number {
  // Create the graph
  const graph: { [key: number]: number[] } = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }
  
  for (const [u, v] of dependencies) {
    graph[u].push(v);
  }
  
  // Perform topological sort
  const order = topologicalSort(n, dependencies);
  
  // If we can't find a valid ordering, return -1
  if (order.length < n) return -1;
  
  // Calculate earliest start time for each task
  const earliestStart: number[] = new Array(n).fill(0);
  
  for (const task of order) {
    for (const dependent of graph[task]) {
      earliestStart[dependent] = Math.max(
        earliestStart[dependent],
        earliestStart[task] + times[task]
      );
    }
  }
  
  // Calculate minimum completion time
  let minTime = 0;
  for (let i = 0; i < n; i++) {
    minTime = Math.max(minTime, earliestStart[i] + times[i]);
  }
  
  return minTime;
}
```
</details>

## 🌟 Final Thoughts

Topological sort is a powerful algorithm with a surprising number of real-world applications. By mastering this technique, you've added an invaluable tool to your algorithmic toolbox.

Remember these key insights:

1. **Applicability**: Only works on directed acyclic graphs (DAGs).
2. **Multiple Valid Solutions**: Most graphs have more than one valid topological ordering.
3. **Method Selection**: Choose between DFS and BFS based on your specific needs and the problem context.
4. **Cycle Detection**: Always account for the possibility of cycles in your input graph.

## 🚀 Next Steps

To continue your graph algorithm journey, consider exploring:

1. **Strongly Connected Components**: Learn how to identify clusters in directed graphs.
2. **Shortest Path Algorithms**: Dijkstra's, Bellman-Ford, and Floyd-Warshall for finding optimal paths.
3. **Minimum Spanning Trees**: Prim's and Kruskal's algorithms for connecting all vertices at minimum cost.
4. **Network Flow**: Max-flow min-cut algorithms for optimization problems.

Remember, the best way to master algorithms is through consistent practice. Keep coding, keep visualizing, and keep solving problems!

> [!TIP]
> When approaching a new problem, try to determine if it can be modeled as a graph with dependencies. If so, topological sort might be the key to your solution!

Happy coding! 🎉 