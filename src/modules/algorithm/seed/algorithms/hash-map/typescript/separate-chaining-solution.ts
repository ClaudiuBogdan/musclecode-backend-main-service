class HashMapNode<K, V> {
  key: K;
  value: V;
  next: HashMapNode<K, V> | null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

export class HashMap<K, V> {
  private capacity: number;
  private size: number;
  private buckets: (HashMapNode<K, V> | null)[];

  constructor(capacity: number = 16) {
    this.capacity = capacity;
    this.size = 0;
    this.buckets = new Array(capacity).fill(null);
  }

  private hash(key: K): number {
    if (typeof key === 'number') {
      return key % this.capacity;
    }
    const keyString = String(key);
    let hash = 0;
    for (let i = 0; i < keyString.length; i++) {
      hash = (hash * 31 + keyString.charCodeAt(i)) % this.capacity;
    }
    return hash;
  }

  put(key: K, value: V): void {
    const index = this.hash(key);
    let node = this.buckets[index];

    while (node !== null) {
      if (node.key === key) {
        node.value = value;
        return;
      }
      if (node.next === null) {
        break;
      }
      node = node.next;
    }

    const newNode = new HashMapNode(key, value);
    if (this.buckets[index] === null) {
      this.buckets[index] = newNode;
    } else {
      newNode.next = this.buckets[index];
      this.buckets[index] = newNode;
    }
    this.size++;
  }

  get(key: K): V | undefined {
    const index = this.hash(key);
    let node = this.buckets[index];

    while (node !== null) {
      if (node.key === key) {
        return node.value;
      }
      node = node.next;
    }

    return undefined;
  }

  remove(key: K): void {
    const index = this.hash(key);
    let node = this.buckets[index];
    let prev: HashMapNode<K, V> | null = null;

    while (node !== null) {
      if (node.key === key) {
        if (prev === null) {
          this.buckets[index] = node.next;
        } else {
          prev.next = node.next;
        }
        this.size--;
        return;
      }
      prev = node;
      node = node.next;
    }
  }

  sizeValue(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}
