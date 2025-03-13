---
title: Building a Complete Hash Map
---

# 🏗️ Putting It All Together: Implementing a Hash Map

> [!NOTE]
> Now that we understand the individual components, let's implement a complete HashMap class from scratch.

## Complete HashMap Implementation 📝

We'll build two implementations of a hash map:
1. A separate chaining implementation (using linked lists)
2. An open addressing implementation (using linear probing)

Let's start with separate chaining.

## Separate Chaining HashMap 🔗

First, we need a node class to store our key-value pairs:

```javascript
class HashMapNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}
```

Now, the complete hash map implementation:

```javascript
class HashMap {
  constructor(capacity = 16) {
    this.capacity = capacity;
    this.buckets = new Array(capacity).fill(null);
    this.size = 0;
    this.loadFactorThreshold = 0.75;
  }
  
  hash(key) {
    if (typeof key === 'number') {
      return key % this.capacity;
    }
    
    const keyString = String(key);
    let hash = 0;
    
    for (let i = 0; i < keyString.length; i++) {
      // Use a common string hashing algorithm
      hash = (hash * 31 + keyString.charCodeAt(i)) % this.capacity;
    }
    
    return hash;
  }
  
  put(key, value) {
    // Check if we need to resize
    if ((this.size + 1) / this.capacity > this.loadFactorThreshold) {
      this.resize(this.capacity * 2);
    }
    
    const index = this.hash(key);
    let node = this.buckets[index];
    
    // Check if key already exists
    while (node !== null) {
      if (node.key === key) {
        // Update existing value
        node.value = value;
        return;
      }
      node = node.next;
    }
    
    // Add new node to the beginning of the chain
    const newNode = new HashMapNode(key, value);
    newNode.next = this.buckets[index];
    this.buckets[index] = newNode;
    this.size++;
  }
  
  get(key) {
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
  
  remove(key) {
    const index = this.hash(key);
    let node = this.buckets[index];
    let prev = null;
    
    while (node !== null) {
      if (node.key === key) {
        // Found the key
        if (prev === null) {
          // It's the first node
          this.buckets[index] = node.next;
        } else {
          // It's in the middle or at the end
          prev.next = node.next;
        }
        this.size--;
        return true;
      }
      prev = node;
      node = node.next;
    }
    
    return false; // Key not found
  }
  
  containsKey(key) {
    return this.get(key) !== undefined;
  }
  
  isEmpty() {
    return this.size === 0;
  }
  
  getSize() {
    return this.size;
  }
  
  keys() {
    const allKeys = [];
    
    for (let i = 0; i < this.capacity; i++) {
      let node = this.buckets[i];
      while (node !== null) {
        allKeys.push(node.key);
        node = node.next;
      }
    }
    
    return allKeys;
  }
  
  values() {
    const allValues = [];
    
    for (let i = 0; i < this.capacity; i++) {
      let node = this.buckets[i];
      while (node !== null) {
        allValues.push(node.value);
        node = node.next;
      }
    }
    
    return allValues;
  }
  
  entries() {
    const allEntries = [];
    
    for (let i = 0; i < this.capacity; i++) {
      let node = this.buckets[i];
      while (node !== null) {
        allEntries.push([node.key, node.value]);
        node = node.next;
      }
    }
    
    return allEntries;
  }
  
  clear() {
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }
  
  resize(newCapacity) {
    const oldBuckets = this.buckets;
    this.capacity = newCapacity;
    this.buckets = new Array(newCapacity).fill(null);
    this.size = 0;
    
    // Rehash all existing entries
    for (let i = 0; i < oldBuckets.length; i++) {
      let node = oldBuckets[i];
      while (node !== null) {
        this.put(node.key, node.value);
        node = node.next;
      }
    }
  }
}
```

## Open Addressing HashMap (Linear Probing) 🔎

Now let's implement a hash map using open addressing with linear probing:

```javascript
class HashMap {
  constructor(capacity = 16) {
    this.capacity = capacity;
    this.keys = new Array(capacity).fill(undefined);
    this.values = new Array(capacity).fill(undefined);
    this.size = 0;
    this.loadFactorThreshold = 0.6; // Lower threshold for open addressing
    this.DELETED = Symbol('DELETED'); // Special marker for deleted slots
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
  
  findSlot(key) {
    let index = this.hash(key);
    let startIndex = index;
    
    // Keep probing until we find an empty slot, a DELETED slot, or the key
    while (this.keys[index] !== undefined && 
           this.keys[index] !== this.DELETED && 
           this.keys[index] !== key) {
      index = (index + 1) % this.capacity;
      
      // If we've checked the entire array and came back to start
      if (index === startIndex) {
        return -1; // Map is full or key doesn't exist
      }
    }
    
    return index;
  }
  
  put(key, value) {
    // Check if we need to resize
    if ((this.size + 1) / this.capacity > this.loadFactorThreshold) {
      this.resize(this.capacity * 2);
    }
    
    const index = this.findSlot(key);
    
    if (index === -1) {
      throw new Error('HashMap is full');
    }
    
    const isNewKey = this.keys[index] === undefined || this.keys[index] === this.DELETED;
    
    this.keys[index] = key;
    this.values[index] = value;
    
    if (isNewKey) {
      this.size++;
    }
  }
  
  get(key) {
    const index = this.findSlot(key);
    
    if (index === -1 || this.keys[index] === undefined || this.keys[index] === this.DELETED) {
      return undefined;
    }
    
    return this.values[index];
  }
  
  remove(key) {
    const index = this.findSlot(key);
    
    if (index === -1 || this.keys[index] === undefined || this.keys[index] === this.DELETED) {
      return false;
    }
    
    // Mark this slot as deleted (not undefined)
    this.keys[index] = this.DELETED;
    this.values[index] = undefined;
    this.size--;
    
    return true;
  }
  
  containsKey(key) {
    return this.get(key) !== undefined;
  }
  
  isEmpty() {
    return this.size === 0;
  }
  
  getSize() {
    return this.size;
  }
  
  keys() {
    const allKeys = [];
    
    for (let i = 0; i < this.capacity; i++) {
      if (this.keys[i] !== undefined && this.keys[i] !== this.DELETED) {
        allKeys.push(this.keys[i]);
      }
    }
    
    return allKeys;
  }
  
  values() {
    const allValues = [];
    
    for (let i = 0; i < this.capacity; i++) {
      if (this.keys[i] !== undefined && this.keys[i] !== this.DELETED) {
        allValues.push(this.values[i]);
      }
    }
    
    return allValues;
  }
  
  entries() {
    const allEntries = [];
    
    for (let i = 0; i < this.capacity; i++) {
      if (this.keys[i] !== undefined && this.keys[i] !== this.DELETED) {
        allEntries.push([this.keys[i], this.values[i]]);
      }
    }
    
    return allEntries;
  }
  
  clear() {
    this.keys = new Array(this.capacity).fill(undefined);
    this.values = new Array(this.capacity).fill(undefined);
    this.size = 0;
  }
  
  resize(newCapacity) {
    const oldKeys = this.keys;
    const oldValues = this.values;
    const oldCapacity = this.capacity;
    
    this.capacity = newCapacity;
    this.keys = new Array(newCapacity).fill(undefined);
    this.values = new Array(newCapacity).fill(undefined);
    this.size = 0;
    
    // Rehash all existing entries
    for (let i = 0; i < oldCapacity; i++) {
      if (oldKeys[i] !== undefined && oldKeys[i] !== this.DELETED) {
        this.put(oldKeys[i], oldValues[i]);
      }
    }
  }
}
```

## Key Differences Between Implementations ⚖️

| Feature | Separate Chaining | Open Addressing |
|---------|------------------|----------------|
| **Storage Structure** | Array of linked lists | Single array for keys, single array for values |
| **Collision Handling** | Chains multiple entries at the same index | Probes for an empty slot |
| **Load Factor Threshold** | Typically higher (0.75) | Typically lower (0.6) |
| **Memory Usage** | Extra overhead for pointers/references | More efficient use of space |
| **Deletion** | Simple removal from linked list | Requires special DELETED marker |
| **Cache Performance** | Poorer due to non-contiguous memory | Better due to array storage |

## Testing Our Implementation 🧪

Let's create some simple tests to verify our implementation works correctly:

```javascript
// Create a HashMap instance
const map = new HashMap();

// Test 1: Basic put and get
map.put("apple", "red");
map.put("banana", "yellow");
map.put("grape", "purple");

console.log(map.get("apple"));   // Should output: "red"
console.log(map.get("banana"));  // Should output: "yellow"
console.log(map.get("grape"));   // Should output: "purple"
console.log(map.get("mango"));   // Should output: undefined

// Test 2: Update existing key
map.put("apple", "green");
console.log(map.get("apple"));   // Should output: "green"

// Test 3: Remove a key
map.remove("banana");
console.log(map.get("banana"));  // Should output: undefined

// Test 4: Check size and isEmpty
console.log(map.getSize());      // Should output: 2
console.log(map.isEmpty());      // Should output: false

map.remove("apple");
map.remove("grape");
console.log(map.isEmpty());      // Should output: true

// Test 5: Handle collisions
// Force a collision by adding entries that hash to the same index
// (In a real scenario, this would depend on the hash function implementation)
const mapWithCollision = new HashMap(2);  // Small capacity to force collisions
mapWithCollision.put("a", 1);
mapWithCollision.put("c", 3);  // Might collide with "a" due to small capacity
console.log(mapWithCollision.get("a"));   // Should output: 1
console.log(mapWithCollision.get("c"));   // Should output: 3
```

## Optimizations and Improvements 🔧

There are several ways we could optimize our hash map implementation:

1. **Better Hash Functions** - Use more sophisticated hash functions like MurmurHash or FNV-1a for better distribution

2. **Dynamic Resizing** - Implement shrinking the hash map when it becomes too empty to save memory

3. **Alternative Collision Resolution** - Implement quadratic probing or double hashing for open addressing

4. **Use Trees for Long Chains** - Switch from linked lists to balanced trees (like red-black trees) when chains get long

5. **Custom Equality Checks** - Allow custom equality functions for comparing keys (useful for object keys)

6. **Iterator Support** - Implement iterator methods for easier iteration over keys, values, or entries

> [!TIP]
> Modern language implementations like Java's HashMap use a hybrid approach: they start with linked lists for collision chains, but switch to balanced trees when chains become long (typically 8 or more elements).

## Real-world Usage Examples 💼

Here's how you might use a hash map in a real application:

```javascript
// Example 1: Cache for a web app
const pageCache = new HashMap();

function fetchPage(url) {
  // Check cache first
  const cachedPage = pageCache.get(url);
  if (cachedPage) {
    return cachedPage;
  }
  
  // If not in cache, fetch from server
  const page = fetchFromServer(url);
  
  // Store in cache for future use
  pageCache.put(url, page);
  
  return page;
}

// Example 2: Counting word frequency
function countWords(text) {
  const wordCounts = new HashMap();
  const words = text.toLowerCase().match(/\w+/g);
  
  for (const word of words) {
    const count = wordCounts.get(word) || 0;
    wordCounts.put(word, count + 1);
  }
  
  return wordCounts;
}

// Example 3: De-duplicating entries
function removeDuplicates(array) {
  const seen = new HashMap();
  const result = [];
  
  for (const item of array) {
    if (!seen.containsKey(item)) {
      seen.put(item, true);
      result.push(item);
    }
  }
  
  return result;
}
```

## Summary and Next Steps 🎯

We've built two complete hash map implementations and examined their differences. Our implementations include:

- Core operations (put, get, remove)
- Helper methods (keys, values, entries, etc.)
- Dynamic resizing
- Proper collision handling

In real-world applications, you would typically use the built-in hash map implementations provided by your programming language:

- JavaScript: `Map` or object literals `{}`
- Python: `dict`
- Java: `HashMap`
- C++: `std::unordered_map`

But understanding how hash maps work internally helps you make better decisions about when and how to use them.

**Try it yourself:** Implement a hash map in your favorite programming language, or extend our implementations with additional features like:
- Iterator support
- Custom key comparison
- Alternative collision resolution strategies

In the next lesson, we'll explore advanced hash map concepts and techniques! 