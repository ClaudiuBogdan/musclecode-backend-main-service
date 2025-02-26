# Singly Linked List

A Singly Linked List is a fundamental data structure that represents a sequence of nodes where each node contains data and a reference to the next node in the sequence. Unlike arrays, linked lists are dynamic data structures that can grow or shrink in size during execution.

## The Challenge

Implement a singly linked list data structure that supports basic operations such as insertion, deletion, and traversal. Each node in the list should contain a data element and a pointer to the next node. The list should maintain a reference to the head (first node) of the list.

### Example 1

```js
// Create a new singly linked list
const list = new SinglyLinkedList();
list.insertAtEnd(10);
list.insertAtEnd(20);
list.insertAtEnd(30);
list.display(); // Output: 10 -> 20 -> 30
```


### Example 2

```js
// Perform operations on a singly linked list
const list = new SinglyLinkedList();
list.insertAtBeginning(15);
list.insertAtBeginning(10);
list.insertAtEnd(20);
list.delete(15);
list.display(); // Output: 10 -> 20
```

<details>
<summary>
### Speed and Efficiency
</summary>

Singly Linked Lists offer specific performance characteristics:

- **Time Complexity**:
  - **Access**: $O(n)$ - Must traverse from head to reach a specific position
  - **Insertion at beginning**: $O(1)$ - Only requires updating the head pointer
  - **Insertion at end**: $O(n)$ without tail pointer, $O(1)$ with tail pointer
  - **Deletion**: $O(n)$ - Requires finding the node before the one to delete
  - **Search**: $O(n)$ - May need to examine every node in the worst case
- **Space Complexity**: $O(n)$ - Linear space required for n nodes
</details>
<details>
<summary>
### Key Principles
</summary>

Singly Linked Lists are built on these fundamental concepts:

- **Dynamic Memory Allocation**: Nodes are allocated memory as needed, allowing the list to grow or shrink.

- **Sequential Access**: Elements must be accessed in sequence, starting from the head node.

- **Node Structure**: Each node contains data and a pointer to the next node.

- **Head Reference**: The list maintains a reference to the first node (head) to access the entire list.

- **Null Termination**: The last node's next pointer is set to null, indicating the end of the list.
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For visual explanations of Singly Linked Lists, check out these resources:

- [Singly Linked Lists Tutorial - What is a Linked List?](https://www.youtube.com/watch?v=HB7TcYklBHY)
- [Singly Linked List Explained in C](https://www.youtube.com/watch?v=nrIeocfcdIc)
- [VisuAlgo - Linked List Visualization](https://visualgo.net/en/list)
- [Create a Singly Linked List in Java (Animation)](https://www.youtube.com/watch?v=Fg4VIjTdHx4)

</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing or using Singly Linked Lists, watch out for these common challenges:

- **Losing the Head Reference**: If you lose the reference to the head node, you lose access to the entire list.

- **Memory Leaks**: Failing to properly manage node deletion can lead to memory leaks.

- **Null Pointer Exceptions**: Not checking for null before accessing a node's next pointer.

- **Traversal Termination**: Forgetting to check for the end of the list during traversal.

- **Edge Cases**: Not handling empty lists or operations on the first/last elements correctly.
</details>
<details>
<summary>
### When and Where to Use Singly Linked Lists
</summary>

Singly Linked Lists are ideal in scenarios such as:

- When frequent insertions and deletions at the beginning of the list are required.

- Implementing stacks and queues where elements are added/removed from specific ends.

- When memory usage needs to be dynamic and exact.

- When the size of the collection is unknown or frequently changing.

However, they may not be the best choice for:

- Applications requiring random access to elements.

- Scenarios where backward traversal is frequently needed.

- Memory-constrained environments where the overhead of pointers is significant.
</details>
<details>
<summary>
### Real-World Applications
</summary>

Singly Linked Lists are used in many practical applications:

- **Implementation of Stacks**: Using the head for push and pop operations.

- **Implementation of Queues**: Using head for dequeue and tail for enqueue operations.

- **Symbol Tables in Compilers**: For managing identifiers and their attributes.

- **Undo Functionality**: In applications like text editors and graphic design tools.

- **Memory Management**: Operating systems use linked lists to track allocated and free memory blocks.

- **Polynomial Manipulation**: Representing polynomials with each term as a node.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several variations extend or modify the basic Singly Linked List:

- **Circular Linked List**: The last node points back to the first node instead of null.

- **Doubly Linked List**: Each node has pointers to both next and previous nodes.

- **Skip List**: A multi-level linked list that allows for faster search operations.

- **Self-Organizing List**: Rearranges nodes based on access frequency to improve performance.

- **XOR Linked List**: Uses bitwise XOR to store both next and previous references in a single pointer.
</details>
<details>
<summary>
### A Brief Look at History
</summary>

Linked lists have been a fundamental data structure in computer science since the early days of programming. They were developed to overcome the limitations of arrays, particularly the need for contiguous memory allocation. The concept of linked data structures dates back to the 1950s, with significant developments in the 1960s as part of list processing languages like LISP. Singly linked lists served as the foundation for more complex data structures and have remained relevant despite the introduction of more sophisticated alternatives due to their simplicity and efficiency for certain operations.

</details>
<details>
<summary>
### Pseudocode Implementation
</summary>

```
// Node structure
structure Node:
    data    // The data stored in the node
    next    // Pointer to the next node

// SinglyLinkedList class
class SinglyLinkedList:
    head = null    // Reference to the first node

    // Insert a node at the beginning
    function insertAtBeginning(value):
        newNode = create new Node
        newNode.data = value
        newNode.next = head
        head = newNode

    // Insert a node at the end
    function insertAtEnd(value):
        newNode = create new Node
        newNode.data = value
        newNode.next = null
        
        if head is null:
            head = newNode
            return
            
        current = head
        while current.next is not null:
            current = current.next
        current.next = newNode

    // Delete a node with specific value
    function delete(value):
        if head is null:
            return
            
        if head.data equals value:
            head = head.next
            return
            
        current = head
        while current.next is not null and current.next.data is not value:
            current = current.next
            
        if current.next is not null:
            current.next = current.next.next

    // Search for a value
    function search(value):
        current = head
        position = 0
        
        while current is not null:
            if current.data equals value:
                return position
            current = current.next
            position = position + 1
            
        return -1    // Value not found

    // Display the list
    function display():
        current = head
        while current is not null:
            print current.data
            current = current.next
```
</details>
<details>
<summary>
### Proof of Correctness
</summary>

The correctness of singly linked list operations can be proven through the following logical steps:

1. **Insertion at Beginning**:
   - The new node's next pointer is set to the current head
   - The head is updated to point to the new node
   - This maintains the list structure by preserving the link to the rest of the list

2. **Insertion at End**:
   - For an empty list, the new node becomes the head
   - For a non-empty list, we traverse to the last node and update its next pointer
   - The new node's next pointer is set to null, maintaining the list termination

3. **Deletion**:
   - For deleting the head, we simply update the head pointer
   - For other nodes, we find the node before the target and update its next pointer
   - This preserves the list structure by maintaining proper links between nodes

4. **Search**:
   - The algorithm examines each node sequentially from the head
   - It returns the position if the value is found or -1 if not
   - This ensures all nodes are checked exactly once

5. **Invariant Maintenance**:
   - All operations maintain the fundamental invariant that the list is a sequence of nodes where each node points to the next
   - The last node always points to null, indicating the end of the list
   - The head always points to the first node or null for an empty list

These proofs demonstrate that the singly linked list operations will:
- Correctly modify the list structure during insertions and deletions
- Maintain proper links between nodes
- Correctly identify the presence or absence of values during searches
- Preserve the integrity of the list across all operations

</details>
<details>
<summary>
### Memory Management Considerations
</summary>

Effective memory management is crucial when working with singly linked lists:

- **Dynamic Allocation**: Nodes are typically allocated dynamically, requiring proper memory management.

- **Memory Fragmentation**: Frequent insertions and deletions can lead to memory fragmentation.

- **Garbage Collection**: In languages without automatic garbage collection, failing to free deleted nodes causes memory leaks.

- **Cache Performance**: Linked lists often have poor cache locality compared to arrays due to non-contiguous memory allocation.

- **Node Size Overhead**: Each node requires additional memory for the next pointer beyond just the data.

- **Memory Pooling**: For performance-critical applications, implementing a node pool can reduce allocation overhead.

- **Bulk Operations**: Consider batch allocations when adding multiple nodes to improve performance.

</details>
<details>
<summary>
### Optimization Techniques
</summary>

Several techniques can improve singly linked list performance:

- **Tail Pointer**: Maintaining a reference to the last node enables O(1) insertions at the end.

- **Length Counter**: Keeping track of the list length avoids O(n) traversals when size information is needed.

- **Sentinel Nodes**: Using dummy head/tail nodes can simplify edge cases and reduce conditional checks.

- **Batch Processing**: Performing multiple operations in a single traversal when possible.

- **Sorted Insertion**: Maintaining a sorted list can improve search operations when binary search isn't applicable.

- **Two-Pointer Technique**: Using fast and slow pointers for operations like finding the middle node or detecting cycles.

- **Recursive vs. Iterative**: Choosing the appropriate approach based on the operation and expected list size.

</details>