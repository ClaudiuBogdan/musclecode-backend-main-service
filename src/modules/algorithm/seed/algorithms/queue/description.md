# Queue

A Queue is a linear data structure that follows the First-In-First-Out (FIFO) principle, where the first element added is the first one to be removed. This fundamental structure mirrors real-world queues like people waiting in line at a ticket counter.

## The Challenge

Implement a queue data structure that supports standard operations: enqueue (adding an element to the rear), dequeue (removing an element from the front), peek (viewing the front element without removing it), and checking if the queue is empty or full.

### Example 1

```js
// Initialize an empty queue
let queue = new Queue(5); // Queue with capacity 5
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.dequeue()); // Output: 10
console.log(queue.peek()); // Output: 20
```

_Explanation: First element (10) is removed with dequeue, and the new front element (20) is viewed with peek._

### Example 2

```js
let queue = new Queue(3);
queue.enqueue("A");
queue.enqueue("B");
queue.enqueue("C");
console.log(queue.isFull()); // Output: true
queue.dequeue();
queue.enqueue("D");
console.log(queue.peek()); // Output: "B"
```

_Explanation: Queue becomes full after adding three elements. After removing "A" and adding "D", the front element is "B"._

<details>
<summary>
### Speed and Efficiency
</summary>

Queue operations have consistent performance characteristics:

- **Time Complexity**:
  - **Enqueue:** $O(1)$ - Adding an element to the rear is a constant-time operation
  - **Dequeue:** $O(1)$ - Removing an element from the front is also constant-time
  - **Peek:** $O(1)$ - Viewing the front element without removing it
  - **isEmpty/isFull:** $O(1)$ - Checking queue status
- **Space Complexity:** $O(n)$ where n is the maximum number of elements the queue can hold
</details>
<details>
<summary>
### Key Principles
</summary>

Queue data structure is built on these fundamental concepts:

- **FIFO (First-In-First-Out):** The first element added to the queue is the first one to be removed

- **Two Access Points:** Elements are added at the rear and removed from the front

- **Sequential Processing:** Ideal for scenarios where order of arrival determines processing order

- **Bounded vs. Unbounded:** Queues can have a fixed capacity (bounded) or grow dynamically (unbounded)

- **Circular Implementation:** Efficient array-based implementation that reuses space
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For those who benefit from visual explanations, consider checking out these resources for interactive and animated guides:

- [Queue Data Structure Operations Animation](https://www.youtube.com/watch?v=HcB1P9sJZB4) - Visual explanation using ticket counter examples
- [Introduction to Queue with Example](https://www.youtube.com/watch?v=yzj0Ch01Exo) - Comprehensive tutorial on queue operations
- [VisuAlgo: Queue Visualization](https://visualgo.net/en/list) - Interactive visualization of queue operations
- [Introduction to Queue | Data Structures and Algorithms Tutorial](https://www.youtube.com/watch?v=WTS3h6NrzEQ) - Learn the FIFO principle and queue operations

</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing or using Queues, be mindful of these common challenges:

- **Array Implementation Limitations:** Simple array implementations can waste space after dequeue operations

- **Queue Overflow:** Attempting to enqueue when the queue is full (in bounded implementations)

- **Queue Underflow:** Attempting to dequeue or peek when the queue is empty

- **Front/Rear Pointer Management:** Incorrectly updating these pointers can lead to data loss or corruption

- **Circular Queue Complexity:** The logic for circular queues can be tricky, especially with index calculations
</details>
<details>
<summary>
### When and Where to Use Queues
</summary>

Queues are ideal in scenarios such as:

- **Task Scheduling:** Managing processes in operating systems

- **Breadth-First Search:** Exploring nodes level by level in graph algorithms

- **Buffering:** Managing data flow between processes with different processing rates

- **Printer Spooling:** Managing print jobs in order of submission

- **Customer Service Systems:** Processing customer requests in order of arrival

However, they may not be the best choice for:

- **Priority-based Processing:** Where some elements need to be processed before others regardless of arrival order (use Priority Queue instead)

- **Random Access:** When you need to access or remove elements from arbitrary positions
</details>
<details>
<summary>
### Real-World Applications
</summary>

Queues are used in many practical applications, including:

- **Web Servers:** Managing incoming requests in the order they arrive

- **Ticket Systems:** Processing customers in the order they joined the line

- **Message Queues:** In distributed systems for asynchronous communication

- **CPU Scheduling:** Managing processes waiting for CPU time

- **Keyboard Buffer:** Managing keystrokes in the order they were pressed

- **Traffic Management:** Controlling flow at intersections, toll booths, etc.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several specialized queue types extend the basic concept:

- **Circular Queue:** Reuses array space by connecting the last position to the first

- **Priority Queue:** Elements with higher priority are dequeued before those with lower priority

- **Deque (Double-Ended Queue):** Allows insertion and deletion at both ends

- **Blocking Queue:** Thread-safe implementation that blocks when the queue is empty or full

- **Delay Queue:** Elements can only be taken when their delay has expired
</details>
<details>
<summary>
### A Brief Look at History
</summary>

The queue data structure has its conceptual roots in real-world queuing systems that have existed throughout human history. In computing, queues became formalized as data structures in the early days of computer science, particularly with the development of operating systems that needed to manage multiple processes. The queue's FIFO principle proved essential for fair resource allocation and has remained a fundamental concept in computer science education and practice ever since.

</details>
<details>
<summary>
### Pseudocode Implementation
</summary>

```
// Array implementation of Queue
function createQueue(maxSize):
    Initialize array[maxSize]
    front = -1
    rear = -1
    size = 0
    
function isEmpty():
    return (size == 0)
    
function isFull():
    return (size == maxSize)
    
function enqueue(data):
    if isFull():
        return "Queue Overflow"
    if isEmpty():
        front = 0
    rear = (rear + 1) % maxSize
    array[rear] = data
    size = size + 1
    
function dequeue():
    if isEmpty():
        return "Queue Underflow"
    data = array[front]
    if front == rear:
        // Last element being removed
        front = -1
        rear = -1
    else:
        front = (front + 1) % maxSize
    size = size - 1
    return data
    
function peek():
    if isEmpty():
        return "Queue is Empty"
    return array[front]
```
</details>
<details>
<summary>
### Proof of Correctness
</summary>

The queue algorithm's correctness can be proven through the following logical steps:

1. **FIFO Property Maintenance:** 
   - Elements are always added at the rear (enqueue)
   - Elements are always removed from the front (dequeue)
   - This ensures the first element added will be the first one removed

2. **Boundary Conditions:**
   - Empty Queue: front = rear = -1
   - Single Element: front = rear
   - Full Queue: size = maxSize

3. **Operation Correctness:**
   - **Enqueue:** 
     - Updates rear pointer correctly
     - Handles transition from empty to non-empty state
     - Prevents overflow in bounded implementations
   
   - **Dequeue:**
     - Returns the correct element (at front)
     - Updates front pointer correctly
     - Handles transition to empty state when last element is removed
     - Prevents underflow

4. **Circular Implementation Correctness:**
   - The modulo operation (% maxSize) ensures indices wrap around correctly
   - This prevents index out-of-bounds errors while efficiently reusing array space

5. **Invariant Maintenance:**
   - The size variable always reflects the actual number of elements
   - The relationship between front, rear, and size remains consistent

This proof demonstrates that the queue algorithm will always:
- Maintain the FIFO property
- Correctly handle edge cases (empty, full, single element)
- Efficiently manage the underlying storage

</details>