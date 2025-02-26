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
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  // Method to prepend a node to the beginning of the list
  prepend(data: T): void {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  // Method to delete a node with given data from the list
  delete(data: T): void {
    let current = this.head;

    while (current) {
      if (current.data === data) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }

        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }

        this.size--;
        return;
      }
      current = current.next;
    }
  }

  // Method to find a node with given data
  find(data: T): Node<T> | null {
    let current = this.head;

    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }

    return null;
  }

  // Method to print the list in forward direction
  printForward(): void {
    let current = this.head;
    let result = '';
    while (current) {
      result += current.data + ' ';
      current = current.next;
    }
    console.log(result.trim());
  }

  // Method to print the list in backward direction
  printBackward(): void {
    let current = this.tail;
    let result = '';
    while (current) {
      result += current.data + ' ';
      current = current.prev;
    }
    console.log(result.trim());
  }
}

export { DoublyLinkedList, Node };
