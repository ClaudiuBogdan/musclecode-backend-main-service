---
title: BFS Implementation in Different Languages
---

# 💻 BFS Implementations in Various Languages

Let's look at how to implement BFS in different programming languages. Each implementation follows the same core algorithm but adapts to the language's features and idioms.

## 🟨 JavaScript Implementation

```javascript
function bfs(graph, start) {
  // Array to store the order of visited vertices
  const result = [];

  // Set to keep track of visited vertices
  const visited = new Set();

  // Queue for BFS traversal
  const queue = [];

  // Add the starting vertex to the queue and mark it as visited
  queue.push(start);
  visited.add(start);

  // Continue until the queue is empty
  while (queue.length > 0) {
    // Remove the first vertex from the queue
    const currentVertex = queue.shift();

    // Add the current vertex to the result
    result.push(currentVertex);

    // Get all adjacent vertices of the current vertex
    const neighbors = graph[currentVertex] || [];

    // For each adjacent vertex
    for (const neighbor of neighbors) {
      // If the neighbor hasn't been visited yet
      if (!visited.has(neighbor)) {
        // Add it to the queue and mark it as visited
        queue.push(neighbor);
        visited.add(neighbor);
      }
    }
  }

  return result;
}
```

> [!NOTE]
> In JavaScript, we can use an array with `push()` and `shift()` operations to simulate a queue. For larger graphs, consider using a dedicated queue implementation for better performance.

## 🐍 Python Implementation

```python
from collections import deque

def bfs(graph, start):
    # List to store the order of visited vertices
    result = []
    
    # Set to keep track of visited vertices
    visited = set()
    
    # Queue for BFS traversal (using a deque for efficiency)
    queue = deque([start])
    
    # Mark the starting vertex as visited
    visited.add(start)
    
    # Continue until the queue is empty
    while queue:
        # Remove the first vertex from the queue
        current_vertex = queue.popleft()
        
        # Add the current vertex to the result
        result.append(current_vertex)
        
        # Get all adjacent vertices of the current vertex
        neighbors = graph.get(current_vertex, [])
        
        # For each adjacent vertex
        for neighbor in neighbors:
            # If the neighbor hasn't been visited yet
            if neighbor not in visited:
                # Add it to the queue and mark it as visited
                queue.append(neighbor)
                visited.add(neighbor)
    
    return result
```

> [!TIP]
> Python's `collections.deque` is optimized for quick appends and pops from both ends, making it perfect for queue operations.

## 📘 TypeScript Implementation

```typescript
function bfs(graph: Record<string | number, (string | number)[]>, start: string | number): (string | number)[] {
  // Array to store the order of visited vertices
  const result: (string | number)[] = [];

  // Set to keep track of visited vertices
  const visited = new Set<string | number>();

  // Queue for BFS traversal
  const queue: (string | number)[] = [];

  // Add the starting vertex to the queue and mark it as visited
  queue.push(start);
  visited.add(start);

  // Continue until the queue is empty
  while (queue.length > 0) {
    // Remove the first vertex from the queue
    const currentVertex = queue.shift()!;

    // Add the current vertex to the result
    result.push(currentVertex);

    // Get all adjacent vertices of the current vertex
    const neighbors = graph[currentVertex] || [];

    // For each adjacent vertex
    for (const neighbor of neighbors) {
      // If the neighbor hasn't been visited yet
      if (!visited.has(neighbor)) {
        // Add it to the queue and mark it as visited
        queue.push(neighbor);
        visited.add(neighbor);
      }
    }
  }

  return result;
}
```

## 👾 Go Implementation

```go
func BFS(graph map[string][]string, start string) []string {
	// Slice to store the order of visited vertices
	result := []string{}

	// Map to keep track of visited vertices
	visited := map[string]bool{}

	// Queue for BFS traversal (using a slice)
	queue := []string{start}

	// Mark the starting vertex as visited
	visited[start] = true

	// Continue until the queue is empty
	for len(queue) > 0 {
		// Remove the first vertex from the queue
		currentVertex := queue[0]
		queue = queue[1:]

		// Add the current vertex to the result
		result = append(result, currentVertex)

		// Get all adjacent vertices of the current vertex
		neighbors := graph[currentVertex]

		// For each adjacent vertex
		for _, neighbor := range neighbors {
			// If the neighbor hasn't been visited yet
			if !visited[neighbor] {
				// Add it to the queue and mark it as visited
				queue = append(queue, neighbor)
				visited[neighbor] = true
			}
		}
	}

	return result
}
```

## 🔄 Iterative vs. Recursive Approach

While BFS is typically implemented iteratively with a queue, it can also be implemented recursively:

<details>
<summary>Recursive BFS Implementation (JavaScript)</summary>

```javascript
function bfs(graph, start) {
  // Array to store the order of visited vertices
  const result = [];

  // Set to keep track of visited vertices
  const visited = new Set();

  // Queue for BFS traversal
  const queue = [start];

  // Mark the starting vertex as visited
  visited.add(start);

  // Start the recursive BFS
  bfsRecursive(graph, queue, visited, result);

  return result;
}

function bfsRecursive(graph, queue, visited, result) {
  // Base case: if the queue is empty, we're done
  if (queue.length === 0) {
    return;
  }

  // Remove the first vertex from the queue
  const currentVertex = queue.shift();

  // Add the current vertex to the result
  result.push(currentVertex);

  // Get all adjacent vertices of the current vertex
  const neighbors = graph[currentVertex] || [];

  // For each adjacent vertex
  for (const neighbor of neighbors) {
    // If the neighbor hasn't been visited yet
    if (!visited.has(neighbor)) {
      // Add it to the queue and mark it as visited
      queue.push(neighbor);
      visited.add(neighbor);
    }
  }

  // Recursive call to process the next vertex in the queue
  bfsRecursive(graph, queue, visited, result);
}
```
</details>

> [!NOTE]
> Although recursive BFS works, the iterative approach is generally preferred because:
> - It's more memory efficient (avoids deep call stacks)
> - It's more intuitive for the level-by-level nature of BFS
> - It better reflects the FIFO structure of the algorithm

## 🔍 Language-Specific Considerations

When implementing BFS, consider these language-specific optimizations:

1. **JavaScript/TypeScript**: 
   - Use `Set` for O(1) visited checks
   - For large graphs, consider a dedicated queue library

2. **Python**: 
   - Use `collections.deque` for efficient queue operations
   - Use `set` for O(1) visited checks

3. **Go**: 
   - Use maps for visited checks
   - Slices work well for simple queue operations

4. **Performance Tip**: 
   - Some languages allow early marking of vertices as visited when adding them to the queue (rather than when processing)
   - This can reduce redundant queue entries in dense graphs

> [!TIP]
> Choose data structures that best match your language's idioms while maintaining the critical FIFO property of BFS.

## ❓ Questions to Consider

1. How would you adapt these implementations for weighted graphs?
2. Could you implement BFS without using a visited set? What would be the downsides?
3. How would you implement BFS if the graph is represented as an adjacency matrix instead?

In the next section, we'll explore common applications and variations of the BFS algorithm! 