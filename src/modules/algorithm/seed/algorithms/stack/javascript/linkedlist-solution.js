/**
 * Node class to represent each element in the linked list
 */
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

/**
 * Implements a Stack data structure using a linked list.
 */
class Stack {
  constructor() {
    this.top = null;
  }

  push(value) {
    const newNode = new Node(value);
    newNode.next = this.top;
    this.top = newNode;
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    const value = this.top.data;
    this.top = this.top.next;
    return value;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.top.data;
  }

  isEmpty() {
    return this.top === null;
  }
}

module.exports = { Stack };
