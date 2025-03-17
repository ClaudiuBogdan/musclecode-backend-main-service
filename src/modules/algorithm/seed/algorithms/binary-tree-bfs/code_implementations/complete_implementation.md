---
title: Complete BFS Implementations
---

# Complete BFS Implementations

This reference provides fully-implemented BFS solutions in multiple programming languages. Each implementation includes:

1. A well-structured tree/node class
2. The complete BFS algorithm
3. Example usage
4. Time and space complexity analysis

## JavaScript Implementation

```javascript
/**
 * Definition for a binary tree node.
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Breadth-First Search (BFS) implementation for binary trees
 * @param {TreeNode} root - Root node of the binary tree
 * @return {number[]} - Array of node values in level order
 * 
 * Time Complexity: O(n) where n is the number of nodes in the tree
 * Space Complexity: O(n) for the queue in the worst case
 */
function bfs(root) {
  // Handle empty tree
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    // Remove the first node from the queue
    const node = queue.shift();
    result.push(node.val);
    
    // Add children to the queue (if they exist)
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  
  return result;
}

/**
 * Level-aware BFS implementation
 * @param {TreeNode} root - Root node of the binary tree
 * @return {number[][]} - Array of arrays, each containing nodes at one level
 */
function levelOrderBfs(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    // Process all nodes at the current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(currentLevel);
  }
  
  return result;
}

// Example usage
const tree = new TreeNode(1);
tree.left = new TreeNode(2);
tree.right = new TreeNode(3);
tree.left.left = new TreeNode(4);
tree.left.right = new TreeNode(5);
tree.right.left = new TreeNode(6);
tree.right.right = new TreeNode(7);

/*
Tree structure:
     1
   /   \
  2     3
 / \   / \
4   5 6   7
*/

console.log("BFS traversal:", bfs(tree));
// Output: [1, 2, 3, 4, 5, 6, 7]

console.log("Level order traversal:", levelOrderBfs(tree));
// Output: [[1], [2, 3], [4, 5, 6, 7]]

// Performance-optimized queue for large trees
class Queue {
  constructor() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }
  
  enqueue(item) {
    this.items[this.backIndex] = item;
    this.backIndex++;
  }
  
  dequeue() {
    if (this.isEmpty()) return null;
    
    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex];
    this.frontIndex++;
    return item;
  }
  
  isEmpty() {
    return this.frontIndex === this.backIndex;
  }
  
  size() {
    return this.backIndex - this.frontIndex;
  }
}

function optimizedBfs(root) {
  if (!root) return [];
  
  const result = [];
  const queue = new Queue();
  queue.enqueue(root);
  
  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    result.push(node.val);
    
    if (node.left) queue.enqueue(node.left);
    if (node.right) queue.enqueue(node.right);
  }
  
  return result;
}
```

## Python Implementation

```python
from collections import deque

class TreeNode:
    """Definition for a binary tree node."""
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def bfs(root):
    """
    Breadth-First Search (BFS) implementation for binary trees
    
    Args:
        root: Root node of the binary tree
    Returns:
        List of node values in level order
    
    Time Complexity: O(n) where n is the number of nodes
    Space Complexity: O(n) for the queue in the worst case
    """
    if not root:
        return []
    
    result = []
    # Using deque for O(1) popleft operations
    queue = deque([root])
    
    while queue:
        node = queue.popleft()
        result.append(node.val)
        
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    
    return result

def level_order_bfs(root):
    """
    Level-aware BFS implementation
    
    Args:
        root: Root node of the binary tree
    Returns:
        List of lists, each containing nodes at one level
    """
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        current_level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(current_level)
    
    return result

# Example usage
if __name__ == "__main__":
    # Create a binary tree
    #      1
    #    /   \
    #   2     3
    #  / \   / \
    # 4   5 6   7
    tree = TreeNode(1)
    tree.left = TreeNode(2)
    tree.right = TreeNode(3)
    tree.left.left = TreeNode(4)
    tree.left.right = TreeNode(5)
    tree.right.left = TreeNode(6)
    tree.right.right = TreeNode(7)
    
    print("BFS traversal:", bfs(tree))
    # Output: [1, 2, 3, 4, 5, 6, 7]
    
    print("Level order traversal:", level_order_bfs(tree))
    # Output: [[1], [2, 3], [4, 5, 6, 7]]
    
    # Graph BFS example with cycle detection
    def graph_bfs(graph, start):
        """BFS implementation for graphs with cycle detection"""
        if start not in graph:
            return []
        
        result = []
        queue = deque([start])
        visited = {start}
        
        while queue:
            node = queue.popleft()
            result.append(node)
            
            for neighbor in graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        return result
    
    # Example graph: {node: [neighbors]}
    graph = {
        'A': ['B', 'C'],
        'B': ['A', 'D', 'E'],
        'C': ['A', 'F'],
        'D': ['B'],
        'E': ['B', 'F'],
        'F': ['C', 'E']
    }
    
    print("Graph BFS traversal:", graph_bfs(graph, 'A'))
    # Output: ['A', 'B', 'C', 'D', 'E', 'F']
```

## TypeScript Implementation

```typescript
/**
 * Definition for a binary tree node.
 */
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Breadth-First Search (BFS) implementation for binary trees
 * @param root - Root node of the binary tree
 * @returns Array of node values in level order
 * 
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(n) for the queue in the worst case
 */
function bfs(root: TreeNode | null): number[] {
  if (!root) return [];
  
  const result: number[] = [];
  const queue: TreeNode[] = [root];
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node.val);
    
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  
  return result;
}

/**
 * Level-aware BFS implementation
 * @param root - Root node of the binary tree
 * @returns Array of arrays, each containing nodes at one level
 */
function levelOrderBfs(root: TreeNode | null): number[][] {
  if (!root) return [];
  
  const result: number[][] = [];
  const queue: TreeNode[] = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(currentLevel);
  }
  
  return result;
}

// Efficient queue implementation for large trees
class Queue<T> {
  private items: Record<number, T>;
  private frontIndex: number;
  private backIndex: number;
  
  constructor() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }
  
  enqueue(item: T): void {
    this.items[this.backIndex] = item;
    this.backIndex++;
  }
  
  dequeue(): T | null {
    if (this.isEmpty()) return null;
    
    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex];
    this.frontIndex++;
    return item;
  }
  
  isEmpty(): boolean {
    return this.frontIndex === this.backIndex;
  }
  
  size(): number {
    return this.backIndex - this.frontIndex;
  }
}

function optimizedBfs(root: TreeNode | null): number[] {
  if (!root) return [];
  
  const result: number[] = [];
  const queue = new Queue<TreeNode>();
  queue.enqueue(root);
  
  while (!queue.isEmpty()) {
    const node = queue.dequeue()!;
    result.push(node.val);
    
    if (node.left) queue.enqueue(node.left);
    if (node.right) queue.enqueue(node.right);
  }
  
  return result;
}

// Example usage
const tree = new TreeNode(1);
tree.left = new TreeNode(2);
tree.right = new TreeNode(3);
tree.left.left = new TreeNode(4);
tree.left.right = new TreeNode(5);
tree.right.left = new TreeNode(6);
tree.right.right = new TreeNode(7);

/*
Tree structure:
     1
   /   \
  2     3
 / \   / \
4   5 6   7
*/

console.log("BFS traversal:", bfs(tree));
// Output: [1, 2, 3, 4, 5, 6, 7]

console.log("Level order traversal:", levelOrderBfs(tree));
// Output: [[1], [2, 3], [4, 5, 6, 7]]

// Graph BFS with generic type support
type Graph<T> = Map<T, T[]>;

function graphBfs<T>(graph: Graph<T>, start: T): T[] {
  const result: T[] = [];
  const queue: T[] = [start];
  const visited = new Set<T>([start]);
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    
    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}
```

## Java Implementation

```java
import java.util.*;

/**
 * Definition for a binary tree node.
 */
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    TreeNode() {}
    
    TreeNode(int val) {
        this.val = val;
    }
    
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * BFS implementations for binary trees
 */
public class BinaryTreeBFS {
    /**
     * Breadth-First Search (BFS) implementation for binary trees
     * 
     * Time Complexity: O(n) where n is the number of nodes
     * Space Complexity: O(n) for the queue in the worst case
     * 
     * @param root Root node of the binary tree
     * @return List of node values in level order
     */
    public List<Integer> bfs(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            result.add(node.val);
            
            if (node.left != null) {
                queue.offer(node.left);
            }
            if (node.right != null) {
                queue.offer(node.right);
            }
        }
        
        return result;
    }
    
    /**
     * Level-aware BFS implementation
     * 
     * @param root Root node of the binary tree
     * @return List of lists, each containing nodes at one level
     */
    public List<List<Integer>> levelOrderBfs(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>(levelSize);
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);
                
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }
            
            result.add(currentLevel);
        }
        
        return result;
    }
    
    // Graph BFS implementation
    public List<String> graphBfs(Map<String, List<String>> graph, String start) {
        List<String> result = new ArrayList<>();
        if (!graph.containsKey(start)) {
            return result;
        }
        
        Queue<String> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        
        queue.offer(start);
        visited.add(start);
        
        while (!queue.isEmpty()) {
            String node = queue.poll();
            result.add(node);
            
            for (String neighbor : graph.getOrDefault(node, Collections.emptyList())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }
        
        return result;
    }
    
    // Main method with example usage
    public static void main(String[] args) {
        // Create a binary tree
        //      1
        //    /   \
        //   2     3
        //  / \   / \
        // 4   5 6   7
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        root.right.left = new TreeNode(6);
        root.right.right = new TreeNode(7);
        
        BinaryTreeBFS solution = new BinaryTreeBFS();
        
        System.out.println("BFS traversal: " + solution.bfs(root));
        // Output: [1, 2, 3, 4, 5, 6, 7]
        
        System.out.println("Level order traversal: " + solution.levelOrderBfs(root));
        // Output: [[1], [2, 3], [4, 5, 6, 7]]
        
        // Example graph
        Map<String, List<String>> graph = new HashMap<>();
        graph.put("A", Arrays.asList("B", "C"));
        graph.put("B", Arrays.asList("A", "D", "E"));
        graph.put("C", Arrays.asList("A", "F"));
        graph.put("D", Arrays.asList("B"));
        graph.put("E", Arrays.asList("B", "F"));
        graph.put("F", Arrays.asList("C", "E"));
        
        System.out.println("Graph BFS traversal: " + solution.graphBfs(graph, "A"));
        // Output: [A, B, C, D, E, F]
    }
}
```

## C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <string>

/**
 * Definition for a binary tree node.
 */
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode* left, TreeNode* right) : val(x), left(left), right(right) {}
};

/**
 * Breadth-First Search (BFS) implementation for binary trees
 * 
 * Time Complexity: O(n) where n is the number of nodes
 * Space Complexity: O(n) for the queue in the worst case
 * 
 * @param root Root node of the binary tree
 * @return Vector of node values in level order
 */
std::vector<int> bfs(TreeNode* root) {
    std::vector<int> result;
    if (!root) {
        return result;
    }
    
    std::queue<TreeNode*> queue;
    queue.push(root);
    
    while (!queue.empty()) {
        TreeNode* node = queue.front();
        queue.pop();
        result.push_back(node->val);
        
        if (node->left) {
            queue.push(node->left);
        }
        if (node->right) {
            queue.push(node->right);
        }
    }
    
    return result;
}

/**
 * Level-aware BFS implementation
 * 
 * @param root Root node of the binary tree
 * @return Vector of vectors, each containing nodes at one level
 */
std::vector<std::vector<int>> levelOrderBfs(TreeNode* root) {
    std::vector<std::vector<int>> result;
    if (!root) {
        return result;
    }
    
    std::queue<TreeNode*> queue;
    queue.push(root);
    
    while (!queue.empty()) {
        int levelSize = queue.size();
        std::vector<int> currentLevel;
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = queue.front();
            queue.pop();
            currentLevel.push_back(node->val);
            
            if (node->left) {
                queue.push(node->left);
            }
            if (node->right) {
                queue.push(node->right);
            }
        }
        
        result.push_back(currentLevel);
    }
    
    return result;
}

// Graph BFS implementation
std::vector<std::string> graphBfs(
    const std::unordered_map<std::string, std::vector<std::string>>& graph,
    const std::string& start
) {
    std::vector<std::string> result;
    if (graph.find(start) == graph.end()) {
        return result;
    }
    
    std::queue<std::string> queue;
    std::unordered_set<std::string> visited;
    
    queue.push(start);
    visited.insert(start);
    
    while (!queue.empty()) {
        std::string node = queue.front();
        queue.pop();
        result.push_back(node);
        
        auto it = graph.find(node);
        if (it != graph.end()) {
            for (const std::string& neighbor : it->second) {
                if (visited.find(neighbor) == visited.end()) {
                    visited.insert(neighbor);
                    queue.push(neighbor);
                }
            }
        }
    }
    
    return result;
}

// Utility function to print vectors
template<typename T>
void printVector(const std::vector<T>& vec) {
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); i++) {
        std::cout << vec[i];
        if (i < vec.size() - 1) {
            std::cout << ", ";
        }
    }
    std::cout << "]";
}

// Main function with example usage
int main() {
    // Create a binary tree
    //      1
    //    /   \
    //   2     3
    //  / \   / \
    // 4   5 6   7
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    root->right->left = new TreeNode(6);
    root->right->right = new TreeNode(7);
    
    std::cout << "BFS traversal: ";
    printVector(bfs(root));
    std::cout << std::endl;
    // Output: [1, 2, 3, 4, 5, 6, 7]
    
    std::cout << "Level order traversal: [";
    auto levels = levelOrderBfs(root);
    for (size_t i = 0; i < levels.size(); i++) {
        printVector(levels[i]);
        if (i < levels.size() - 1) {
            std::cout << ", ";
        }
    }
    std::cout << "]" << std::endl;
    // Output: [[1], [2, 3], [4, 5, 6, 7]]
    
    // Example graph
    std::unordered_map<std::string, std::vector<std::string>> graph;
    graph["A"] = {"B", "C"};
    graph["B"] = {"A", "D", "E"};
    graph["C"] = {"A", "F"};
    graph["D"] = {"B"};
    graph["E"] = {"B", "F"};
    graph["F"] = {"C", "E"};
    
    std::cout << "Graph BFS traversal: ";
    printVector(graphBfs(graph, "A"));
    std::cout << std::endl;
    // Output: [A, B, C, D, E, F]
    
    // Clean up memory
    // (In a real application, use smart pointers or a tree destructor)
    delete root->right->right;
    delete root->right->left;
    delete root->left->right;
    delete root->left->left;
    delete root->right;
    delete root->left;
    delete root;
    
    return 0;
}
```

## Go Implementation

```go
package main

import (
	"fmt"
)

// TreeNode represents a binary tree node
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// BFS performs a breadth-first search traversal of a binary tree
// Time Complexity: O(n) where n is the number of nodes
// Space Complexity: O(n) for the queue in the worst case
func BFS(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}

	result := []int{}
	queue := []*TreeNode{root}

	for len(queue) > 0 {
		// Dequeue the front node
		node := queue[0]
		queue = queue[1:]
		result = append(result, node.Val)

		// Enqueue children
		if node.Left != nil {
			queue = append(queue, node.Left)
		}
		if node.Right != nil {
			queue = append(queue, node.Right)
		}
	}

	return result
}

// LevelOrderBFS performs a level-aware breadth-first search traversal
func LevelOrderBFS(root *TreeNode) [][]int {
	if root == nil {
		return [][]int{}
	}

	result := [][]int{}
	queue := []*TreeNode{root}

	for len(queue) > 0 {
		levelSize := len(queue)
		currentLevel := []int{}

		for i := 0; i < levelSize; i++ {
			node := queue[0]
			queue = queue[1:]
			currentLevel = append(currentLevel, node.Val)

			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}

		result = append(result, currentLevel)
	}

	return result
}

// GraphBFS performs a breadth-first search traversal of a graph
func GraphBFS(graph map[string][]string, start string) []string {
	if _, exists := graph[start]; !exists {
		return []string{}
	}

	result := []string{}
	queue := []string{start}
	visited := map[string]bool{start: true}

	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		result = append(result, node)

		for _, neighbor := range graph[node] {
			if !visited[neighbor] {
				visited[neighbor] = true
				queue = append(queue, neighbor)
			}
		}
	}

	return result
}

func main() {
	// Create a binary tree
	//      1
	//    /   \
	//   2     3
	//  / \   / \
	// 4   5 6   7
	root := &TreeNode{Val: 1}
	root.Left = &TreeNode{Val: 2}
	root.Right = &TreeNode{Val: 3}
	root.Left.Left = &TreeNode{Val: 4}
	root.Left.Right = &TreeNode{Val: 5}
	root.Right.Left = &TreeNode{Val: 6}
	root.Right.Right = &TreeNode{Val: 7}

	fmt.Println("BFS traversal:", BFS(root))
	// Output: [1 2 3 4 5 6 7]

	fmt.Println("Level order traversal:", LevelOrderBFS(root))
	// Output: [[1] [2 3] [4 5 6 7]]

	// Example graph
	graph := map[string][]string{
		"A": {"B", "C"},
		"B": {"A", "D", "E"},
		"C": {"A", "F"},
		"D": {"B"},
		"E": {"B", "F"},
		"F": {"C", "E"},
	}

	fmt.Println("Graph BFS traversal:", GraphBFS(graph, "A"))
	// Output: [A B C D E F]
}
```

## Performance Considerations

When implementing BFS, consider the following performance optimizations:

1. **Queue Implementation**:
   - JavaScript/TypeScript: Use a custom queue implementation instead of array.shift() for large trees
   - Python: Use collections.deque instead of list for O(1) popleft operations
   - Java/C++: Use the built-in Queue implementations (LinkedList in Java, std::queue in C++)
   - Go: Slice operations are efficient, but for very large trees, consider a custom queue

2. **Visited Tracking**:
   - For graphs, use an efficient data structure like Set/HashSet to track visited nodes
   - Consider storing node IDs instead of entire node objects when memory is a concern

3. **Early Termination**:
   - If searching for a specific node, return early when found
   - For path-finding problems, stop when the target is reached

4. **Batch Processing**:
   - For very large trees/graphs, consider processing nodes in batches

## Common Pitfalls

When implementing BFS, avoid these common mistakes:

1. Not checking for null/nil nodes
2. Using a stack (LIFO) instead of a queue (FIFO)
3. Not tracking visited nodes in graphs (causing infinite loops in cyclic graphs)
4. Inefficient queue operations in performance-critical contexts
5. Not considering edge cases (empty tree, single node, etc.)

## Applications

BFS is well-suited for:

1. Finding the shortest path in unweighted graphs
2. Level-order tree traversal
3. Connected components in undirected graphs
4. Web crawling
5. Finding all nodes within a given distance
6. Solving puzzles with fewest moves

## Conclusion

BFS is a fundamental algorithm with wide applications in computer science. The implementations provided above should serve as a solid foundation for solving various tree and graph problems. Remember to adapt the code based on the specific requirements of your problem, and always consider the time and space complexity implications of your implementation. 