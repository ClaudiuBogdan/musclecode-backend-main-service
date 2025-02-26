class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Queue:
    def __init__(self, capacity: int = float('inf')):
        """
        Initializes an empty queue with a given capacity.
        """
        self.front = None
        self.rear = None
        self.count = 0
        self.capacity = capacity

    def enqueue(self, item: any) -> None:
        """
        Adds an element to the rear of the queue.
        """
        if self.count >= self.capacity:
            raise OverflowError("Queue is full")
        new_node = Node(item)
        if self.is_empty():
            self.front = new_node
            self.rear = new_node
        else:
            self.rear.next = new_node
            self.rear = new_node
        self.count += 1

    def dequeue(self) -> any:
        """
        Removes an element from the front of the queue.
        """
        if self.is_empty():
            return None
        item = self.front.data
        self.front = self.front.next
        self.count -= 1
        if self.is_empty():
            self.rear = None
        return item

    def peek(self) -> any:
        """
        Returns the element at the front of the queue without removing it.
        """
        if self.is_empty():
            return None
        return self.front.data

    def is_empty(self) -> bool:
        """
        Checks if the queue is empty.
        """
        return self.count == 0

    def is_full(self) -> bool:
        """
        Checks if the queue is full.
        """
        return self.count == self.capacity

    def size(self) -> int:
        """
        Returns the number of elements in the queue.
        """
        return self.count 