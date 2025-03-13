class Node {
  data: any;
  next: Node | null;

  constructor(data: any) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  head: Node | null;

  constructor() {
    this.head = null;
  }

  insertAtBeginning(data: any): void {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  insertAtEnd(data: any): void {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  delete(data: any): void {
    if (!this.head) return;

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  search(data: any): Node | null {
    let current = this.head;
    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  display(): void {
    let current = this.head;
    let str = '';
    while (current) {
      str += current.data + ' -> ';
      current = current.next;
    }
    str += 'null';
    console.log(str);
  }
}

export { SinglyLinkedList, Node };
