# LRU Cache

Least Recently Used (LRU) Cache is a data structure that maintains a fixed-size collection of key-value pairs, automatically removing the least recently accessed items when the capacity is reached. It combines efficient lookup with a usage-tracking mechanism to optimize memory utilization in systems with limited resources.

## The Challenge

Design a data structure that implements an LRU cache with the following operations:

- `LRUCache(int capacity)`: Initialize the cache with a positive size capacity.
- `int get(key)`: Return the value of the key if it exists in the cache, otherwise return -1.
- `void put(key, value)`: Update the value of the key if it exists, otherwise add the key-value pair to the cache. If the number of keys exceeds the capacity, evict the least recently used key.

Both operations must execute in O(1) time complexity.

### Example 1

```js
Input:
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[^2], [1, 1], [2, 2], [^1], [3, 3], [^2], [4, 4], [^1], [^3], [^4]]
Output:
[null, null, null, 1, null, -1, null, -1, 3, 4]
```

_Explanation:_

```
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
```

<details>
<summary>
### Speed and Efficiency
</summary>

LRU Cache is designed for optimal performance in caching scenarios:

- **Time Complexity**:
  - **get operation:** O(1) - Constant time lookup using a hash map
  - **put operation:** O(1) - Constant time insertion and potential eviction
- **Space Complexity:** O(capacity) - Stores at most 'capacity' key-value pairs plus the overhead of the data structures
</details>
<details>
<summary>
### Key Principles
</summary>

The LRU Cache algorithm is built on several fundamental concepts:

- **Recency Tracking:** Maintains items in order of their access time, with most recently used at the front.

- **Constant-Time Operations:** Achieves O(1) operations through a combination of data structures.

- **Fixed Capacity:** Enforces a maximum size limit, automatically evicting items when necessary.

- **Cache Replacement Policy:** Follows the principle that recently used items are more likely to be used again.

- **Dual Data Structure Approach:** Typically implemented using a hash map for lookups and a doubly linked list for order maintenance.
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For those who benefit from visual explanations, consider checking out these resources for interactive and animated guides:

- [LRU Cache - System Design | How LRU works](https://www.youtube.com/watch?v=52A8_TSe1_I) - Visual explanation of LRU cache implementation
- [Least recently used cache Explained with animation](https://www.youtube.com/watch?v=pEJP9S6sqHw) - Animated walkthrough of the LRU algorithm
- [LRU Cache Visualization](https://github.com/rithikachowta08/opengl-lru-algorithm) - OpenGL visualization of the LRU algorithm
- [Educative.io LRU Cache Implementation](https://www.educative.io/implement-least-recently-used-cache) - Interactive diagrams showing LRU operations

</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing or using LRU Cache, be mindful of these common challenges:

- **Synchronization Issues:** In multi-threaded environments, concurrent access can lead to race conditions.

- **Inefficient Implementation:** Using inappropriate data structures can degrade the O(1) performance guarantee.

- **Forgetting to Update Recency:** Not moving an element to the front after a get operation breaks the LRU property.

- **Edge Cases:** Not handling empty cache or single-element cache scenarios correctly.

- **Memory Leaks:** Not properly removing references to evicted elements, especially in languages without automatic garbage collection.
</details>
<details>
<summary>
### When and Where to Use LRU Cache
</summary>

LRU Cache is ideal in scenarios such as:

- **Web Browsers:** Caching recently visited pages for faster access.

- **Database Systems:** Buffering frequently accessed data to reduce disk I/O.

- **Operating Systems:** Page replacement algorithms in virtual memory management.

- **Content Delivery Networks (CDNs):** Storing frequently requested content closer to users.

- **Mobile Applications:** Caching data to reduce network requests and improve responsiveness.

However, it may not be the best choice for:

- **Predictable Access Patterns:** Where other caching policies like Most Frequently Used (MFU) might perform better.

- **Critical Real-time Systems:** Where predictable eviction is more important than recency.

- **Very Small or Very Large Caches:** Where the overhead might outweigh the benefits or where more sophisticated policies are needed.
</details>
<details>
<summary>
### Real-World Applications
</summary>

LRU Cache is widely used in various systems and applications:

- **Redis:** Implements LRU as one of its eviction policies for memory management.

- **Memcached:** Uses LRU for managing cached objects when memory limits are reached.

- **Browser Cache:** Web browsers use LRU-like algorithms to manage cached web resources.

- **CPU Caches:** Modern processors often employ LRU policies in their cache replacement strategies.

- **File System Buffer Cache:** Operating systems use LRU to decide which disk blocks to keep in memory.

- **Image Processing Software:** For caching recently processed images or thumbnails.

- **Mobile Apps:** To manage cached data when device storage is limited.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several variations of the LRU algorithm exist to address specific needs:

- **LRU-K:** Considers the K most recent references to an item before making eviction decisions.

- **TLRU (Time-aware LRU):** Adds time-based expiration to the LRU policy.

- **SLRU (Segmented LRU):** Divides the cache into multiple segments with different priorities.

- **ARC (Adaptive Replacement Cache):** Combines recency and frequency to improve hit rates.

- **CLOCK Algorithm:** A more efficient approximation of LRU using a circular buffer.

- **2Q:** Uses two queues to balance between recency and frequency of access.
</details>
<details>
<summary>
### A Brief Look at History
</summary>

The LRU cache algorithm emerged in the early days of computing as a solution to memory management challenges. It was first formally described in the 1960s during the development of virtual memory systems. The algorithm gained prominence as a page replacement policy in operating systems, where it proved effective at reducing page faults.

As computing evolved, LRU found applications beyond operating systems, becoming a fundamental component in database management systems, web servers, and various application-level caching mechanisms. Its enduring popularity stems from its simplicity, effectiveness, and the empirical observation that temporal locality (recently used items are likely to be used again) is common in many computational workloads.

Today, LRU remains one of the most widely implemented caching policies, serving as both a practical tool and a benchmark against which newer caching algorithms are measured.
</details>
<details>
<summary>
### Pseudocode Implementation
</summary>

```
class Node:
    constructor(key, value):
        this.key = key
        this.value = value
        this.prev = null
        this.next = null

class LRUCache:
    constructor(capacity):
        this.capacity = capacity
        this.cache = HashMap<Integer, Node>()
        this.head = Node(0, 0)  // dummy head
        this.tail = Node(0, 0)  // dummy tail
        this.head.next = this.tail
        this.tail.prev = this.head
        this.size = 0
    
    get(key):
        if key not in this.cache:
            return -1
        
        // Get the node and move it to the front (most recently used)
        node = this.cache[key]
        this.removeNode(node)
        this.addToFront(node)
        return node.value
    
    put(key, value):
        // If key exists, update value and move to front
        if key in this.cache:
            node = this.cache[key]
            node.value = value
            this.removeNode(node)
            this.addToFront(node)
            return
        
        // Create new node
        newNode = Node(key, value)
        this.cache[key] = newNode
        this.addToFront(newNode)
        this.size++
        
        // Check if capacity exceeded
        if this.size > this.capacity:
            // Remove least recently used (from end)
            lruNode = this.tail.prev
            this.removeNode(lruNode)
            delete this.cache[lruNode.key]
            this.size--
    
    removeNode(node):
        // Remove node from its current position
        node.prev.next = node.next
        node.next.prev = node.prev
    
    addToFront(node):
        // Add node right after the head
        node.next = this.head.next
        node.prev = this.head
        this.head.next.prev = node
        this.head.next = node
```
</details>
<details>
<summary>
### Proof of Correctness
</summary>

The correctness of the LRU Cache implementation can be proven through the following logical steps:

1. **Invariant Maintenance:**
   - The doubly linked list always maintains items in order from most recently used (head) to least recently used (tail).
   - The hash map always contains exactly the same keys as the linked list.
   - The size of the cache never exceeds the specified capacity.

2. **Operation Correctness:**
   - **get operation:**
     - If the key exists, the node is moved to the front of the list, maintaining the recency order.
     - If the key doesn't exist, -1 is returned as specified.
   - **put operation:**
     - If the key exists, its value is updated and the node is moved to the front.
     - If the key doesn't exist, a new node is created and added to the front.
     - If capacity is exceeded, the least recently used node (at the tail) is removed.

3. **Time Complexity Analysis:**
   - Hash map operations (lookup, insertion, deletion) are O(1).
   - Linked list operations (node removal, insertion at head) are O(1) since we have direct references to the nodes.
   - Therefore, both get and put operations are O(1) as required.

4. **Edge Cases Handling:**
   - Empty cache: Returns -1 for any get operation.
   - Single element cache: Correctly maintains the LRU property.
   - Capacity of 1: Properly evicts the only element when a new one is added.
   - Repeated access to the same key: Correctly maintains the element at the front of the list.

5. **Eviction Policy Verification:**
   - When capacity is reached, the algorithm always evicts the least recently used item.
   - After eviction, the invariants are maintained.

This proof demonstrates that the LRU Cache implementation correctly:
- Retrieves values in O(1) time
- Updates the cache in O(1) time
- Maintains the LRU ordering
- Enforces the capacity constraint
- Handles all edge cases according to the specification
</details>