class Node:
    def __init__(self, data: int):
        """
        Initializes a node with data and a next pointer.
        """
        self.data = data
        self.next = None

class Stack:
    def __init__(self):
        """
        Initializes an empty stack using a linked list.
        """
        self.top = None

    def push(self, value: int) -> None:
        """
        Adds an element to the top of the stack.
        """
        new_node = Node(value)
        new_node.next = self.top
        self.top = new_node

    def pop(self) -> int | None:
        """
        Removes and returns the top element from the stack.
        Returns None if the stack is empty.
        """
        if self.is_empty():
            return None
        value = self.top.data
        self.top = self.top.next
        return value

    def peek(self) -> int | None:
        """
        Returns the top element of the stack without removing it.
        Returns None if the stack is empty.
        """
        if self.is_empty():
            return None
        return self.top.data

    def is_empty(self) -> bool:
        """
        Returns True if the stack is empty, False otherwise.
        """
        return self.top is None 