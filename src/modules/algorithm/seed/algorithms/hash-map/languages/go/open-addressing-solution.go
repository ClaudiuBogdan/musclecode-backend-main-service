package hashmap

// HashMap represents a hash map data structure.
type HashMap struct {
	capacity int
	size     int
	keys   []interface{}
	values []interface{}
}

// NewHashMap creates a new HashMap with the given capacity.
func NewHashMap(capacity int) *HashMap {
	return &HashMap{
		capacity: capacity,
		size:     0,
		keys:   make([]interface{}, capacity),
		values: make([]interface{}, capacity),
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
	initialIndex := index

	for hm.keys[index] != nil {
		if hm.keys[index] == key {
			hm.values[index] = value
			return
		}
		index = (index + 1) % hm.capacity
		if index == initialIndex {
			// In a real implementation, you might resize the hash map here.
			panic("HashMap is full")
		}
	}

	hm.keys[index] = key
	hm.values[index] = value
	hm.size++
}

// Get retrieves the value associated with the given key.
func (hm *HashMap) Get(key interface{}) interface{} {
	index := hm.hash(key)
	initialIndex := index

	for hm.keys[index] != nil {
		if hm.keys[index] == key {
			return hm.values[index]
		}
		index = (index + 1) % hm.capacity
		if index == initialIndex {
			return nil
		}
	}

	return nil
}

// Remove deletes the key-value pair associated with the given key.
func (hm *HashMap) Remove(key interface{}) {
	index := hm.hash(key)
	initialIndex := index

	for hm.keys[index] != nil {
		if hm.keys[index] == key {
			hm.keys[index] = nil
			hm.values[index] = nil
			hm.size--
			return
		}
		index = (index + 1) % hm.capacity
		if index == initialIndex {
			return
		}
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