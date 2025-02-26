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
    // TODO: Implement the insertAtBeginning method
  }

  insertAtEnd(data: any): void {
    // TODO: Implement the insertAtEnd method
  }

  delete(data: any): void {
    // TODO: Implement the delete method
  }

  search(data: any): Node | null {
    // TODO: Implement the search method
    return null;
  }

  display(): void {
    // TODO: Implement the display method
  }
}

export { SinglyLinkedList, Node };
