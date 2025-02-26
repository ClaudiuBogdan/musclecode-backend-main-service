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
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  prepend(data) {
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

  delete(data) {
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

  find(data) {
    let current = this.head;

    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }

    return null;
  }

  printForward() {
    let current = this.head;
    let result = '';
    while (current) {
      result += current.data + ' ';
      current = current.next;
    }
    console.log(result.trim());
  }

  printBackward() {
    let current = this.tail;
    let result = '';
    while (current) {
      result += current.data + ' ';
      current = current.prev;
    }
    console.log(result.trim());
  }
}

module.exports = { DoublyLinkedList, Node };
