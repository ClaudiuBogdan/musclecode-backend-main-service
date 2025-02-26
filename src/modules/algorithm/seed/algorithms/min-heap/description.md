# Min Heap

A Min Heap is a specialized binary tree-based data structure that maintains the property where each parent node contains a value less than or equal to its children. This structure efficiently provides constant-time access to the minimum element in the collection, making it ideal for priority queue implementations and sorting algorithms.

## The Challenge

Implement a Min Heap data structure that maintains elements in a way that the smallest element is always at the root. The structure should support operations like insertion, extraction of the minimum element, and building a heap from an unordered array.

### Example 1

```js
// Creating a min heap from an array
Input: [7, 2, 9, 4, 45, 60, 10]
Output: [2, 4, 9, 7, 45, 60, 10] // Array representation of min heap
```

_Explanation: The array is restructured to satisfy the min heap property where each parent is smaller than its children._

### Example 2

```js
// Extracting minimum element
Input: Extract-Min from [2, 4, 9, 7, 45, 60, 10]
Output: 2 // Minimum element
Resulting heap: [4, 7, 9, 10, 45, 60] // After extraction
```

_Explanation: The smallest element (2) is removed from the heap, and the structure is reorganized to maintain the min heap property._

<details>
<summary>
### Speed and Efficiency
</summary>

Min Heap operations have the following complexities:

- **Time Complexity**:
  - **Get Minimum:** O(1) - The minimum element is always at the root
  - **Insert:** O(log n) - May require traversing from leaf to root
  - **Extract Minimum:** O(log n) - Requires reorganizing the heap
  - **Build Heap:** O(n) - Linear time to build a heap from an array
- **Space Complexity:** O(n) for storing n elements in the heap
</details>
<details>
<summary>
### Key Principles
</summary>

Min Heap is built on these fundamental concepts:

- **Min Heap Property:** Each parent node is less than or equal to its children
- **Complete Binary Tree:** All levels are filled except possibly the last level, which is filled from left to right
- **Array Representation:** Efficiently stored in an array where:
  - Parent of node at index i: floor((i-1)/2)
  - Left child of node at index i: 2i + 1
  - Right child of node at index i: 2i + 2
- **Implicit Structure:** No explicit pointers needed; relationships determined by index calculations
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For visual explanations of Min Heap algorithms, check out these resources:

- [Min Heap from Array - Algorithms Visually Explained](https://www.youtube.com/watch?v=FLm-v5p7ja0)
- [Everything you need to know about Heaps](https://www.youtube.com/watch?v=V8QD98eONCw)
- [Binary Min/Max Heap Insert Overview](https://www.youtube.com/watch?v=VEYSSANa-cw)
- [Heap Explained and Implemented in Java](https://www.youtube.com/watch?v=L3hfc7Hvirw)
- [Data Structures & Algorithms: Min Heap](https://www.youtube.com/watch?v=1ppUtnVZee4)
- [Visualgo Heap Visualization](https://visualgo.net/en/heap)
- [USFCA Interactive Heap Visualization](https://www.cs.usfca.edu/~galles/visualization/Heap.html)

</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing or using Min Heaps, be mindful of these common challenges:

- **Indexing Errors:** Miscalculating parent/child relationships in the array representation
- **Heapify Confusion:** Incorrectly implementing the heapify operation, especially during extraction
- **Boundary Conditions:** Not handling edge cases like empty heaps or single-element heaps
- **Insertion Order:** Forgetting that heap insertion doesn't preserve the original order of equal elements
- **Confusing with Binary Search Trees:** Heaps don't follow the left-smaller, right-larger property of BSTs
</details>
<details>
<summary>
### When and Where to Use Min Heap
</summary>

Min Heap is ideal in scenarios such as:

- **Priority Queues:** When you need to efficiently access the smallest element
- **Dijkstra's Algorithm:** For finding shortest paths in graphs
- **Heap Sort:** As the underlying structure for an efficient sorting algorithm
- **Median Finding:** When combined with a max heap to track streaming medians
- **Task Scheduling:** When tasks need to be executed based on priority

However, it may not be the best choice for:

- **Searching for arbitrary elements:** O(n) in worst case
- **Maintaining sorted order:** Heap extraction gives elements in sorted order but modifies the structure
- **Applications needing fast lookups by value:** Consider hash tables instead
</details>
<details>
<summary>
### Real-World Applications
</summary>

Min Heaps are used in many practical applications, including:

- **Operating Systems:** For process scheduling based on priority
- **Network Routing:** In algorithms that find optimal paths
- **Event-Driven Simulation:** To process events in order of occurrence time
- **Huffman Coding:** For data compression algorithms
- **Memory Management:** In systems that allocate resources based on size or priority
- **Database Query Optimization:** For efficiently processing ordered operations
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several specialized variations extend the basic Min Heap:

- **Max Heap:** Where the maximum element is at the root
- **Min-Max Heap:** Efficiently supports both minimum and maximum operations
- **Binomial Heap:** Supports efficient merging of heaps
- **Fibonacci Heap:** Provides amortized efficiency for decrease-key operations
- **Pairing Heap:** A self-adjusting heap with good practical performance
- **D-ary Heap:** Generalizes binary heaps to d children per node
</details>
<details>
<summary>
### A Brief Look at History
</summary>

The heap data structure was invented by J.W.J. Williams in 1964 as part of the Heapsort algorithm. Robert W. Floyd later improved the algorithm for building a heap in linear time. Heaps have since become fundamental components in algorithm design, particularly for priority-based operations. Their elegant balance of simplicity and efficiency has made them a staple in computer science education and practical applications for decades.

</details>
<details>
<summary>
### Pseudocode Implementation
</summary>

```
// Initialize a min heap
function initMinHeap(capacity):
    create a new MinHeap with:
        array of size capacity
        size = 0
        capacity = capacity
    return the MinHeap

// Get parent index
function parent(i):
    return floor((i - 1) / 2)

// Get left child index
function leftChild(i):
    return 2*i + 1

// Get right child index
function rightChild(i):
    return 2*i + 2

// Get minimum element
function getMin(heap):
    if heap is empty:
        return error
    return heap.array[^0]

// Insert a key into the min heap
function insert(heap, key):
    if heap.size == heap.capacity:
        return error (heap is full)
    
    // Insert at the end
    heap.size = heap.size + 1
    i = heap.size - 1
    heap.array[i] = key
    
    // Fix the min heap property if violated
    while i > 0 and heap.array[parent(i)] > heap.array[i]:
        swap heap.array[i] and heap.array[parent(i)]
        i = parent(i)

// Extract the minimum element
function extractMin(heap):
    if heap is empty:
        return error
    
    // Store the minimum
    root = heap.array[^0]
    
    // Replace root with last element
    heap.array[^0] = heap.array[heap.size - 1]
    heap.size = heap.size - 1
    
    // Restore min heap property
    heapify(heap, 0)
    
    return root

// Heapify a subtree rooted at index i
function heapify(heap, i):
    left = leftChild(i)
    right = rightChild(i)
    smallest = i
    
    if left < heap.size and heap.array[left] < heap.array[i]:
        smallest = left
    
    if right < heap.size and heap.array[right] < heap.array[smallest]:
        smallest = right
    
    if smallest != i:
        swap heap.array[i] and heap.array[smallest]
        heapify(heap, smallest)

// Build a min heap from an array
function buildMinHeap(array):
    heap = initMinHeap(array.length)
    heap.array = array
    heap.size = array.length
    
    // Start from last non-leaf node and heapify all nodes
    for i from floor(heap.size/2) - 1 down to 0:
        heapify(heap, i)
    
    return heap
```
</details>
<details>
<summary>
### Proof of Correctness
</summary>

The min heap algorithm's correctness can be proven through the following logical steps:

1. **Min Heap Property Maintenance:**
   - After insertion, we perform "bubble up" to ensure the new element is in the correct position
   - After extraction, we perform "heapify" to restore the min heap property
   - Both operations maintain the invariant that each parent is less than or equal to its children

2. **Completeness Property:**
   - Insertions always add to the next available position from left to right
   - Extractions replace the root with the last element and then heapify
   - These operations preserve the complete binary tree structure

3. **Minimum Element Access:**
   - We can prove by contradiction that the minimum element must be at the root:
     - If the minimum were elsewhere, its parent would be greater, violating the min heap property
     - Therefore, the minimum must be at the root

4. **Termination:**
   - Heapify operations have a bounded depth (log n)
   - Build-heap performs a finite number of heapify operations
   - Insert and extract perform a finite number of comparisons and swaps

5. **Loop Invariants:**
   - During heapify: All subtrees except possibly the one being processed satisfy the min heap property
   - During build-heap: All subtrees rooted at indices i+1 to n-1 already satisfy the min heap property

This proof demonstrates that the min heap algorithm correctly:
- Maintains the min heap property throughout all operations
- Ensures the minimum element is always accessible at the root in O(1) time
- Preserves the complete binary tree structure
- Performs all operations within their specified time complexities

</details>