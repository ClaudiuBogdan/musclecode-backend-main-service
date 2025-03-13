class HashMap {
  constructor(capacity = 16) {
    this.capacity = capacity;
    this.size = 0;
    this.keys = new Array(capacity).fill(undefined);
    this.values = new Array(capacity).fill(undefined);
  }

  hash(key) {
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

  put(key, value) {
    let index = this.hash(key);
    let initialIndex = index;

    while (this.keys[index] !== undefined) {
      if (this.keys[index] === key) {
        this.values[index] = value;
        return;
      }
      index = (index + 1) % this.capacity;
      if (index === initialIndex) {
        throw new Error('HashMap is full');
      }
    }

    this.keys[index] = key;
    this.values[index] = value;
    this.size++;
  }

  get(key) {
    let index = this.hash(key);
    let initialIndex = index;

    while (this.keys[index] !== undefined) {
      if (this.keys[index] === key) {
        return this.values[index];
      }
      index = (index + 1) % this.capacity;
      if (index === initialIndex) {
        return undefined;
      }
    }

    return undefined;
  }

  remove(key) {
    let index = this.hash(key);
    let initialIndex = index;

    while (this.keys[index] !== undefined) {
      if (this.keys[index] === key) {
        this.keys[index] = undefined;
        this.values[index] = undefined;
        this.size--;
        return;
      }
      index = (index + 1) % this.capacity;
      if (index === initialIndex) {
        return;
      }
    }
  }

  size() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }
}

module.exports = { HashMap };
