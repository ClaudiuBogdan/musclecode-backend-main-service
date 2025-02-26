package hashmap

// HashMapNode represents a node in the linked list for separate chaining.
type HashMapNode struct {
	Key   interface{}
	Value interface{}
	Next  *HashMapNode
}

// HashMap represents a hash map data structure.
type HashMap struct {
	capacity int
	size     int
	buckets  []*HashMapNode
}

// NewHashMap creates a new HashMap with the given capacity.
func NewHashMap(capacity int) *HashMap {
	return &HashMap{
		capacity: capacity,
		buckets:  make([]*HashMapNode, capacity),
	}
}

// hash calculates the hash code for the given key.
func (hm *HashMap) hash(key interface{}) int {
	hash := 0
	keyString, ok := key.(string)
	if ok {
		for _, char := range keyString {
			hash = (hash*31 + int(char)) % hm.capacity
		}
	} else {
		// Simple fallback for non-string keys (not ideal for production)
		hash = 0
	}
	return hash
}

// Put inserts a key-value pair into the hash map.
func (hm *HashMap) Put(key interface{}, value interface{}) {
	index := hm.hash(key)
	node := hm.buckets[index]

	for node != nil {
		if node.Key == key {
			node.Value = value
			return
		}
		node = node.Next
	}

	newNode := &HashMapNode{Key: key, Value: value, Next: hm.buckets[index]}
	hm.buckets[index] = newNode
	hm.size++
}

// Get retrieves the value associated with the given key.
func (hm *HashMap) Get(key interface{}) interface{} {
	index := hm.hash(key)
	node := hm.buckets[index]

	for node != nil {
		if node.Key == key {
			return node.Value
		}
		node = node.Next
	}

	return nil
}

// Remove deletes the key-value pair associated with the given key.
func (hm *HashMap) Remove(key interface{}) {
	index := hm.hash(key)
	node := hm.buckets[index]
	var prev *HashMapNode

	for node != nil {
		if node.Key == key {
			if prev == nil {
				hm.buckets[index] = node.Next
			} else {
				prev.Next = node.Next
			}
			hm.size--
			return
		}
		prev = node
		node = node.Next
	}
}

// Size returns the number of key-value pairs in the hash map.
func (hm *HashMap) Size() int {
	return hm.size
}

// IsEmpty returns true if the hash map is empty, false otherwise.
func (hm *HashMap) IsEmpty() bool {
	return hm.size == 0
} 