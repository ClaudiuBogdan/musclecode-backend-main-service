class Node {
  key: number;
  value: number;
  next: Node | null;
  prev: Node | null;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class LRUCache {
  capacity: number;
  cache: Map<number, Node>;
  head: Node;
  tail: Node;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
    this.head = new Node(0, 0); // Dummy head
    this.tail = new Node(0, 0); // Dummy tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    if (!this.cache.has(key)) {
      return -1;
    }

    const node = this.cache.get(key)!;
    this.removeNode(node);
    this.addToFront(node);
    return node.value;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      node.value = value;
      this.removeNode(node);
      this.addToFront(node);
    } else {
      const newNode = new Node(key, value);
      this.cache.set(key, newNode);
      this.addToFront(newNode);

      if (this.cache.size > this.capacity) {
        const tailNode = this.tail.prev!;
        this.removeNode(tailNode);
        this.cache.delete(tailNode.key);
      }
    }
  }

  private removeNode(node: Node): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private addToFront(node: Node): void {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }
}
