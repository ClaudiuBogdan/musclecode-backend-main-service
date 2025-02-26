/**
 * Implement the following methods for an ArrayList:
 *
 * 1. add(element): Adds an element to the end of the list.
 * 2. remove(index): Removes the element at the specified index.
 */
class ArrayList {
  constructor() {
    this.data = [];
  }

  add(element) {
    // TODO: Implement the add method
  }

  remove(index) {
    // TODO: Implement the remove method
  }

  get(index) {
    return this.data[index];
  }

  size() {
    return this.data.length;
  }
}

module.exports = { ArrayList };
