---
title: Queue Challenge
---

# Queue

Implement a queue data structure that supports the following standard operations:

- **Enqueue**: Adds an element to the rear of the queue.
- **Dequeue**: Removes the element from the front of the queue.
- **Peek**: Views the element at the front of the queue without removing it.
- **isEmpty**: Checks if the queue is empty.
- **isFull**: Checks if the queue is full.

### Example 1

```js
// Initialize an empty queue
const queue = new Queue(5); // Queue with capacity 5
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.dequeue()); // Output: 10
console.log(queue.peek()); // Output: 20
```

_Explanation: First element (10) is removed with dequeue, and the new front element (20) is viewed with peek._

### Example 2

```js
const queue = new Queue(3);
queue.enqueue('A');
queue.enqueue('B');
queue.enqueue('C');
console.log(queue.isFull()); // Output: true
queue.dequeue();
queue.enqueue('D');
console.log(queue.peek()); // Output: "B"
```

_Explanation: Queue becomes full after adding three elements. After removing "A" and adding "D", the front element is "B"._
