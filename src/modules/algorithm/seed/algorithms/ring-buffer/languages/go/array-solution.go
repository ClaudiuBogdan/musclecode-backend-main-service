package ringbuffer

// RingBuffer represents a circular buffer with a fixed capacity.
type RingBuffer struct {
	buffer   []interface{}
	head     int
	tail     int
	count    int
	capacity int
}

// NewRingBuffer creates a new RingBuffer with the given capacity.
func NewRingBuffer(capacity int) *RingBuffer {
	return &RingBuffer{
		buffer:   make([]interface{}, capacity),
		head:     0,
		tail:     0,
		count:    0,
		capacity: capacity,
	}
}

// Enqueue adds an element to the ring buffer.
func (rb *RingBuffer) Enqueue(item interface{}) {
	rb.buffer[rb.head] = item
	rb.head = (rb.head + 1) % rb.capacity
	if rb.count == rb.capacity {
		rb.tail = (rb.tail + 1) % rb.capacity
	} else {
		rb.count++
	}
}

// Dequeue removes and returns the oldest element from the ring buffer.
// Returns nil if the buffer is empty.
func (rb *RingBuffer) Dequeue() interface{} {
	if rb.IsEmpty() {
		return nil
	}
	item := rb.buffer[rb.tail]
	rb.buffer[rb.tail] = nil // Avoid memory leaks
	rb.tail = (rb.tail + 1) % rb.capacity
	rb.count--
	return item
}

// IsFull returns true if the ring buffer is full.
func (rb *RingBuffer) IsFull() bool {
	return rb.count == rb.capacity
}

// IsEmpty returns true if the ring buffer is empty.
func (rb *RingBuffer) IsEmpty() bool {
	return rb.count == 0
}

// GetCount returns the number of elements currently in the ring buffer.
func (rb *RingBuffer) GetCount() int {
	return rb.count
} 