from typing import Generic, TypeVar, List, Optional

T = TypeVar('T')

class RingBuffer(Generic[T]):
    def __init__(self, capacity: int):
        self.buffer: List[Optional[T]] = [None] * capacity
        self.head: int = 0
        self.tail: int = 0
        self.count: int = 0
        self.capacity: int = capacity

    def enqueue(self, item: T) -> None:
        self.buffer[self.head] = item
        self.head = (self.head + 1) % self.capacity
        if self.count == self.capacity:
            self.tail = (self.tail + 1) % self.capacity
        else:
            self.count += 1

    def dequeue(self) -> Optional[T]:
        if self.is_empty():
            return None
        item = self.buffer[self.tail]
        self.buffer[self.tail] = None
        self.tail = (self.tail + 1) % self.capacity
        self.count -= 1
        return item

    def is_full(self) -> bool:
        return self.count == self.capacity

    def is_empty(self) -> bool:
        return self.count == 0

    def get_count(self) -> int:
        return self.count 