from typing import Generic, TypeVar, Optional

T = TypeVar('T')

class RingBuffer(Generic[T]):
    def __init__(self, capacity: int):
        # TODO: Implement the RingBuffer class
        pass

    def enqueue(self, item: T) -> None:
        # TODO: Implement the enqueue method
        pass

    def dequeue(self) -> Optional[T]:
        # TODO: Implement the dequeue method
        pass

    def is_full(self) -> bool:
        # TODO: Implement the is_full method
        return False

    def is_empty(self) -> bool:
        # TODO: Implement the is_empty method
        return False

    def get_count(self) -> int:
        # TODO: Implement the get_count method
        return 0 