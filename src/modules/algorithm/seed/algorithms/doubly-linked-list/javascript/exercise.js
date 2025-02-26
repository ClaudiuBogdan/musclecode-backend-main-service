class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(data) {
    // TODO: Implement the append method
  }

  prepend(data) {
    // TODO: Implement the prepend method
  }

  delete(data) {
    // TODO: Implement the delete method
  }

  find(data) {
    // TODO: Implement the find method
  }

  printForward() {
    // TODO: Implement the printForward method
  }

  printBackward() {
    // TODO: Implement the printBackward method
  }
}

module.exports = { DoublyLinkedList, Node };
