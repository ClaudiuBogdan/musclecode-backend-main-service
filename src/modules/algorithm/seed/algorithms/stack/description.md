# Stack

A stack is a linear data structure that follows the Last In First Out (LIFO) principle, where the last element inserted is the first one to be removed. It's like a pile of plates where you can only add or remove from the top.

## The Challenge

Implement a stack data structure that supports the following operations:

- `push(value)`: Add an element to the top of the stack
- `pop()`: Remove and return the element at the top of the stack
- `peek()` or `top()`: Return the top element without removing it
- `isEmpty()`: Check if the stack is empty


### Example 1

```js
// Create a new stack
let stack = new Stack();

// Push elements
stack.push(10);
stack.push(20);
stack.push(30);

// Peek at top element
console.log(stack.peek()); // Output: 30

// Pop elements
console.log(stack.pop()); // Output: 30
console.log(stack.pop()); // Output: 20

// Check if empty
console.log(stack.isEmpty()); // Output: false
```

<details>
<summary>
### Speed and Efficiency
</summary>

Stack operations are extremely efficient:

- **Time Complexity**:
  - **Push:** $O(1)$ - Adding an element to the top takes constant time
  - **Pop:** $O(1)$ - Removing the top element takes constant time
  - **Peek:** $O(1)$ - Viewing the top element takes constant time
  - **isEmpty:** $O(1)$ - Checking if the stack is empty takes constant time
- **Space Complexity:** $O(n)$ where n is the number of elements stored in the stack
</details>
<details>
<summary>
### Key Principles
</summary>

Stacks are built on a few fundamental concepts:

- **LIFO (Last In First Out):** The last element added to the stack will be the first one to be removed.

- **Access Restriction:** Elements can only be accessed from one end (the top).

- **Top Tracking:** A pointer called `TOP` keeps track of the topmost element in the stack.

- **Bounded vs. Unbounded:** Stacks can be implemented with a fixed size (bounded) or with dynamic size (unbounded).
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For those who benefit from visual explanations, consider checking out these resources for interactive and animated guides:

- [Stack Data Structure Tutorial – Solve Coding Challenges](https://www.youtube.com/watch?v=k1IaYPGel3s) - Visual explanation of stack operations
- [Stack Animations | Data Structure | Visual How](https://www.youtube.com/watch?v=-qsKQVpGPKs) - Animated visualization of stack operations
- [CS 277 | Queues and Stacks](https://courses.grainger.illinois.edu/cs277/sp2023/resources/quacks/) - Interactive animation for stacks and queues
- [Algorithm and Data Structure Animations](https://yongdanielliang.github.io/animation/animation.html) - Collection of data structure animations including stacks
</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing or using stacks, be mindful of these common challenges:

- **Stack Overflow:** Attempting to push an element when the stack is full (in bounded implementations).

- **Stack Underflow:** Attempting to pop or peek when the stack is empty.

- **Memory Leaks:** Not properly managing memory in dynamic implementations.

- **Incorrect TOP Management:** Forgetting to update the TOP pointer after push or pop operations.

- **Off-by-One Errors:** Incorrectly initializing or comparing the TOP index.
</details>
<details>
<summary>
### When and Where to Use Stacks
</summary>

Stacks are ideal in scenarios such as:

- **Function Call Management:** Managing function calls and returns in programming languages.

- **Expression Evaluation:** Evaluating arithmetic expressions and checking balanced parentheses.

- **Backtracking Algorithms:** Implementing algorithms that need to "undo" operations.

- **Syntax Parsing:** Compilers and interpreters use stacks for parsing.

- **Browser History:** Implementing forward/backward navigation.

However, they may not be the best choice for:

- **Random Access:** When you need to access elements in the middle of the collection.

- **Sorted Data Management:** When elements need to maintain a specific order other than LIFO.

- **Searching:** When you frequently need to search for elements other than the top one.
</details>
<details>
<summary>
### Real-World Applications
</summary>

Stacks are used in many practical applications, including:

- **Undo Mechanisms:** Text editors and graphic design applications use stacks to implement undo functionality.

- **Browser Navigation:** The back and forward buttons in web browsers use stacks to track history.

- **Memory Management:** Call stacks in programming languages manage function execution.

- **Expression Conversion:** Converting infix expressions to postfix or prefix notation.

- **Depth-First Search:** Implementing DFS traversal in graphs.

- **Parentheses Checking:** Validating balanced parentheses in code.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several variations and related data structures extend the stack concept:

- **Two-Stack Queue:** Implementing a queue using two stacks.

- **Min/Max Stack:** A stack that also keeps track of the minimum or maximum element.

- **Balanced Parentheses Stack:** Specialized for checking balanced symbols.

- **Queue:** A related data structure that follows First In First Out (FIFO) principle.

- **Deque (Double-Ended Queue):** Allows insertion and deletion at both ends.
</details>
<details>
<summary>
### A Brief Look at History
</summary>

The stack data structure has been a fundamental concept in computer science since the early days of computing. It was formalized in the 1950s and became essential with the development of high-level programming languages. The call stack, which manages function calls and returns, was one of the earliest practical applications of the stack concept. Today, stacks remain one of the most important and widely used data structures in computer science, serving as a building block for more complex algorithms and systems.
</details>
<details>
<summary>
### Pseudocode Implementation
</summary>

```
// Array-based implementation
function createStack(size):
    stack = new array of size
    top = -1
    
    function push(value):
        if top == size-1:
            return "Stack Overflow"
        top = top + 1
        stack[top] = value
    
    function pop():
        if top == -1:
            return "Stack Underflow"
        value = stack[top]
        top = top - 1
        return value
    
    function peek():
        if top == -1:
            return "Stack is empty"
        return stack[top]
    
    function isEmpty():
        return top == -1
        
    return {push, pop, peek, isEmpty}

// Linked list-based implementation
function createStack():
    top = null
    
    function push(value):
        newNode = {data: value, next: top}
        top = newNode
    
    function pop():
        if top == null:
            return "Stack Underflow"
        value = top.data
        top = top.next
        return value
    
    function peek():
        if top == null:
            return "Stack is empty"
        return top.data
    
    function isEmpty():
        return top == null
        
    return {push, pop, peek, isEmpty}
```
</details>
<details>
<summary>
### Proof of Correctness
</summary>

The stack data structure's correctness can be proven through the following logical steps:

1. **Initialization:** The stack starts empty with TOP = -1 (for array implementation) or TOP = null (for linked list implementation).

2. **Push Operation:**
   - Increments TOP and places the new element at the position pointed to by TOP
   - Maintains the invariant that TOP always points to the most recently added element
   - For linked lists, the new node becomes the new TOP with a reference to the previous TOP

3. **Pop Operation:**
   - Returns the element at TOP and decrements TOP
   - Maintains the invariant that after popping, TOP points to the next most recently added element
   - For linked lists, TOP moves to the next node, effectively removing the current top node

4. **Peek Operation:**
   - Returns the element at TOP without modifying the stack
   - Preserves the state of the stack

5. **isEmpty Operation:**
   - Correctly identifies an empty stack by checking if TOP == -1 (array) or TOP == null (linked list)

6. **LIFO Property Maintenance:**
   - Push adds elements to the top
   - Pop removes elements from the top
   - This ensures the last element pushed is the first one popped

7. **Boundary Conditions:**
   - Empty stack: TOP = -1 or null
   - Full stack (for bounded implementation): TOP = size-1
   - Proper error handling for overflow and underflow conditions

This proof demonstrates that the stack data structure correctly implements the LIFO principle and maintains its invariants through all operations.
</details>