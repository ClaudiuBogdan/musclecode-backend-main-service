# Hash Map

A Hash Map (also known as Hash Table) is a data structure that implements an associative array abstract data type, a structure that can map keys to values. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found[^1].

## The Challenge

Given a collection of key-value pairs, implement a data structure that allows for efficient insertion, retrieval, and deletion operations. The goal is to achieve near-constant time complexity for these operations regardless of the size of the collection.

### Example 1

```js
// Create a new hash map
let states = {'TN': "Tennessee", 'CA': "California", 'NY': "New York", 'FL': "Florida"};

// Retrieve a value
let westCoastState = states['CA']; // Returns "California"
```


### Example 2

```js
// Create a hash map
let hashMap = new HashMap();

// Insert key-value pairs
hashMap.put("123-4567", "Charlotte");
hashMap.put("123-4568", "Thomas");
hashMap.put("123-4569", "Jens");

// Retrieve a value
let name = hashMap.get("123-4568"); // Returns "Thomas"
```

<details>
<summary>
### Speed and Efficiency
</summary>

Hash Maps are known for their exceptional efficiency in most operations:

- **Time Complexity**:
  - **Average Case:** $O(1)$ for insertion, deletion, and lookup operations[^3].
  - **Worst Case:** $O(n)$ when many collisions occur, requiring traversal of linked lists or other collision resolution structures.
- **Space Complexity:** $O(n)$ where n is the number of key-value pairs stored.
</details>
<details>
<summary>
### Key Principles
</summary>

Hash Maps are built on several fundamental concepts:

- **Hash Function:** Converts keys into array indices using a mathematical function[^3].

- **Buckets:** Storage locations in the underlying array where key-value pairs are stored[^8].

- **Collision Resolution:** Techniques to handle when different keys hash to the same index, such as:
  - **Separate Chaining:** Using linked lists at each bucket to store multiple entries[^1].
  - **Open Addressing:** Finding alternative slots when collisions occur, using methods like:
    - Linear Probing: Checking the next available slot sequentially.
    - Quadratic Probing: Using quadratic functions to find the next slot.
    - Double Hashing: Using a second hash function to determine the step size[^1][^10].

- **Load Factor:** The ratio of entries to buckets, which affects performance and when to resize the hash table[^5].
</details>
<details>
<summary>
### Visual Learning Aids
</summary>

For those who benefit from visual explanations, consider checking out these resources for interactive and animated guides:

- [Hash Table Data Structure - Basics | Animation | Visualization](https://www.youtube.com/watch?v=Wct0Z2g9XgU) - Excellent visual explanation of hash tables with animations
- [VisuAlgo - Hash Table Visualization](https://visualgo.net/en/hashtable) - Interactive tool showing different collision resolution techniques
- [HashMap EXPLAINED](https://www.youtube.com/watch?v=lgk_eMv0HD8) - Clear explanation of how hash maps work internally
- [Visualizing a HashMap](https://www.youtube.com/watch?v=WEILxTBDy0Y) - Simple visual example with key terminology
</details>
<details>
<summary>
### Common Pitfalls
</summary>

When implementing or using Hash Maps, be mindful of these common challenges:

- **Poor Hash Function:** A poorly designed hash function can lead to many collisions, degrading performance to O(n)[^5].

- **Ignoring Load Factor:** Not resizing the hash table when it becomes too full can severely impact performance.

- **Key Immutability:** Modifying keys after insertion can make them unfindable since their hash value changes.

- **Hash Collisions:** Not properly handling collisions can lead to data loss or incorrect retrieval.

- **Overlooking Edge Cases:** Not accounting for null keys or values, depending on the implementation.
</details>
<details>
<summary>
### When and Where to Use Hash Maps
</summary>

Hash Maps are ideal in scenarios such as:

- When you need fast lookups, insertions, and deletions by key.

- Implementing caches where quick access to stored items is critical.

- Counting frequency of items (like words in a document or character occurrences).

- De-duplicating data by using keys as unique identifiers.

- Implementing database indexing for quick record retrieval.

However, they may not be the best choice for:

- Applications requiring ordered data (use TreeMap/sorted structures instead).

- Memory-constrained environments, as hash maps can have significant overhead.

- Situations where worst-case performance guarantees are required.
</details>
<details>
<summary>
### Real-World Applications
</summary>

Hash Maps are ubiquitous in software development and are used in:

- **Database Systems:** For indexing and quick data retrieval.

- **Caching:** Web browsers use hash maps to cache recently visited pages.

- **Compiler Implementation:** Symbol tables in compilers use hash maps to store variable information.

- **Spell Checkers:** For quick word lookups in dictionaries.

- **Network Routers:** For routing tables and IP address lookups.

- **Password Storage:** Storing password hashes (though with cryptographic hash functions).

- **Language Features:** Implementing sets, dictionaries, and objects in programming languages.
</details>
<details>
<summary>
### Variations and Related Methods
</summary>

Several specialized hash map implementations and related structures exist:

- **LinkedHashMap:** Maintains insertion order while providing hash map functionality.

- **TreeMap:** Uses a tree structure (often a red-black tree) to maintain key order.

- **ConcurrentHashMap:** Thread-safe implementation for concurrent access.

- **Hopscotch Hashing:** A collision resolution technique that guarantees items are stored close to their ideal position[^1].

- **Robin Hood Hashing:** Reduces variance in probe sequence lengths by favoring elements farther from their ideal position[^1].

- **Cuckoo Hashing:** Uses multiple hash functions and moves elements around to resolve collisions.

- **Bloom Filters:** Space-efficient probabilistic data structure for set membership testing.
</details>
<details>
<summary>
### A Brief Look at History
</summary>

The concept of hash tables dates back to the 1950s, with early implementations appearing in assembly language programs. Hans Peter Luhn of IBM is often credited with developing the concept of hashing in the 1950s. The term "hash" itself comes from the idea of chopping and mixing data, similar to how food is hashed.

In 1968, Donald Knuth popularized the concept in his seminal work "The Art of Computer Programming." Since then, hash tables have become one of the most widely used data structures in computer science, with implementations in virtually every programming language and framework.

The evolution of hash tables has focused on developing better hash functions, more efficient collision resolution strategies, and adaptations for concurrent and distributed environments.
</details>
<details>
<summary>
### Pseudocode Implementation
</summary>

```
class HashMap:
    function initialize(size):
        buckets = array of size empty lists
        
    function hash(key):
        return appropriate_hash_function(key) % size_of_buckets
        
    function put(key, value):
        index = hash(key)
        bucket = buckets[index]
        
        for each (k, v) in bucket:
            if k equals key:
                replace v with value
                return
        
        add (key, value) to bucket
        
    function get(key):
        index = hash(key)
        bucket = buckets[index]
        
        for each (k, v) in bucket:
            if k equals key:
                return v
                
        return null
        
    function remove(key):
        index = hash(key)
        bucket = buckets[index]
        
        for i from 0 to length(bucket) - 1:
            if bucket[i].key equals key:
                remove element at position i from bucket
                return
```
</details>
<details>
<summary>
### Proof of Correctness
</summary>

The correctness of a hash map implementation can be proven through the following logical steps:

1. **Deterministic Hash Function:** For any given key, the hash function always produces the same hash code, ensuring consistent bucket placement.

2. **Collision Resolution Completeness:** The collision resolution strategy (e.g., separate chaining) must handle all possible collisions without data loss.

3. **Retrieval Correctness:** When retrieving a value:
   - The same hash function is applied to the key to find the correct bucket
   - The bucket is searched for the exact key match (not just hash match)
   - Only when the exact key is found is the associated value returned

4. **Insertion Correctness:** When inserting a key-value pair:
   - If the key already exists, its value is updated (not duplicated)
   - If the key is new, the pair is added to the appropriate bucket
   - The hash function correctly maps the key to a valid bucket index

5. **Deletion Correctness:** When removing a key-value pair:
   - The correct bucket is identified using the hash function
   - Only the exact key match is removed
   - The structure of the hash map remains intact after removal

6. **Invariant Maintenance:** Throughout all operations, the hash map maintains its structural integrity:
   - All keys remain findable via their hash values
   - No key exists in more than one location
   - The relationship between keys and their values is preserved

This proof demonstrates that a properly implemented hash map will always:
- Store key-value pairs in a retrievable manner
- Maintain unique keys with their current values
- Correctly handle collisions without data loss
- Provide consistent behavior across operations
</details>