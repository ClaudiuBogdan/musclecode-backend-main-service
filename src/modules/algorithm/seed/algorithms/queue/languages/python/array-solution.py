class Queue:
    def __init__(self, capacity: int):
        """
        Initializes an empty queue with a given capacity.
        """
        self.items = [None] * capacity
        self.capacity = capacity
        self.front = 0
        self.rear = -1
        self.count = 0

    def enqueue(self, item: any) -> None:
        """
        Adds an element to the rear of the queue.
        """
        if self.is_full():
            raise OverflowError("Queue is full")
        self.rear = (self.rear + 1) % self.capacity
        self.items[self.rear] = item
        self.count += 1

    def dequeue(self) -> any:
        """
        Removes an element from the front of the queue.
        """
        if self.is_empty():
            return None
        item = self.items[self.front]
        self.front = (self.front + 1) % self.capacity
        self.count -= 1
        return item

    def peek(self) -> any:
        """
        Returns the element at the front of the queue without removing it.
        """
        if self.is_empty():
            return None
        return self.items[self.front]

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