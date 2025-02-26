from typing import List, Any

class ArrayList:
    def __init__(self):
        self.data: List[Any] = []

    def add(self, element: Any) -> None:
        """Adds an element to the end of the list."""
        # TODO: Implement the add method
        pass

    def remove(self, index: int) -> None:
        """Removes the element at the specified index."""
        # TODO: Implement the remove method
        pass

    def get(self, index: int) -> Any:
        """Returns the element at the specified index."""
        return self.data[index]

    def size(self) -> int:
        """Returns the number of elements in the list."""
        return len(self.data) 