package ringbuffer

// RingBuffer represents a circular buffer with a fixed capacity.
type RingBuffer struct {
	// TODO: Implement the RingBuffer struct
}

// NewRingBuffer creates a new RingBuffer with the given capacity.
func NewRingBuffer(capacity int) *RingBuffer {
	// TODO: Implement the NewRingBuffer function
	return nil
}

// Enqueue adds an element to the ring buffer.
func (rb *RingBuffer) Enqueue(item interface{}) {
	// TODO: Implement the Enqueue method
}

// Dequeue removes and returns the oldest element from the ring buffer.
// Returns nil if the buffer is empty.
func (rb *RingBuffer) Dequeue() interface{} {
	// TODO: Implement the Dequeue method
	return nil
}

// IsFull returns true if the ring buffer is full.
func (rb *RingBuffer) IsFull() bool {
	// TODO: Implement the IsFull method
	return false
}

// IsEmpty returns true if the ring buffer is empty.
func (rb *RingBuffer) IsEmpty() bool {
	// TODO: Implement the IsEmpty method
	return false
}

// GetCount returns the number of elements currently in the ring buffer.
func (rb *RingBuffer) GetCount() int {
	// TODO: Implement the GetCount method
	return 0
} 