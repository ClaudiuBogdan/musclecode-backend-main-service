class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def append(self, data):
        """Appends a new node with data to the end of the list."""
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node
        self.size += 1

    def prepend(self, data):
        """Prepends a new node with data to the beginning of the list."""
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
        self.size += 1

    def delete(self, data):
        """Deletes the first node with the given data from the list."""
        current = self.head
        while current:
            if current.data == data:
                if current.prev:
                    current.prev.next = current.next
                else:
                    self.head = current.next

                if current.next:
                    current.next.prev = current.prev
                else:
                    self.tail = current.prev

                self.size -= 1
                return
            current = current.next

    def find(self, data):
        """Finds the first node with the given data."""
        current = self.head
        while current:
            if current.data == data:
                return current
            current = current.next
        return None

    def print_forward(self):
        """Prints the list in forward direction."""
        current = self.head
        result = ""
        while current:
            result += str(current.data) + " "
            current = current.next
        print(result.strip())

    def print_backward(self):
        """Prints the list in backward direction."""
        current = self.tail
        result = ""
        while current:
            result += str(current.data) + " "
            current = current.prev
        print(result.strip()) 