// Define the Node class
class Node<T> {
  data: T;
  prev: Node<T> | null;
  next: Node<T> | null;

  constructor(data: T) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

// Define the DoublyLinkedList class
class DoublyLinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Method to append a node to the end of the list
  append(data: T): void {
    // TODO: Implement the append method
  }

  // Method to prepend a node to the beginning of the list
  prepend(data: T): void {
    // TODO: Implement the prepend method
  }

  // Method to delete a node with given data from the list
  delete(data: T): void {
    // TODO: Implement the delete method
  }

  // Method to find a node with given data
  find(data: T): Node<T> | null {
    // TODO: Implement the find method
  }

  // Method to print the list in forward direction
  printForward(): void {
    // TODO: Implement the printForward method
  }

  // Method to print the list in backward direction
  printBackward(): void {
    // TODO: Implement the printBackward method
  }
}

export { DoublyLinkedList, Node };
