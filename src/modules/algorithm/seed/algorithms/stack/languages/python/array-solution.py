class Stack:
    def __init__(self):
        """
        Initializes an empty stack using a list.
        """
        self.items = []

    def push(self, value: int) -> None:
        """
        Adds an element to the top of the stack.
        """
        self.items.append(value)

    def pop(self) -> int | None:
        """
        Removes and returns the top element from the stack.
        Returns None if the stack is empty.
        """
        if self.is_empty():
            return None
        return self.items.pop()

    def peek(self) -> int | None:
        """
        Returns the top element of the stack without removing it.
        Returns None if the stack is empty.
        """
        if self.is_empty():
            return None
        return self.items[-1]

    def is_empty(self) -> bool:
        """
        Returns True if the stack is empty, False otherwise.
        """
        return len(self.items) == 0 