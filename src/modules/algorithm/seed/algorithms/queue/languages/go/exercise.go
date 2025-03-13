package queue

// Queue represents a queue data structure.
type Queue struct {
	// TODO: Implement the queue fields
}

// NewQueue creates a new queue with the given capacity.
func NewQueue(capacity int) *Queue {
	// TODO: Implement the constructor
	return nil
}

// Enqueue adds an element to the rear of the queue.
func (q *Queue) Enqueue(item interface{}) {
	// TODO: Implement the Enqueue method
}

// Dequeue removes an element from the front of the queue.
func (q *Queue) Dequeue() interface{} {
	// TODO: Implement the Dequeue method
	return nil
}

// Peek returns the element at the front of the queue without removing it.
func (q *Queue) Peek() interface{} {
	// TODO: Implement the Peek method
	return nil
}

// IsEmpty checks if the queue is empty.
func (q *Queue) IsEmpty() bool {
	// TODO: Implement the IsEmpty method
	return false
}

// IsFull checks if the queue is full.
func (q *Queue) IsFull() bool {
	// TODO: Implement the IsFull method
	return false
}

// Size returns the number of elements in the queue.
func (q *Queue) Size() int {
	// TODO: Implement the Size method
	return 0
} 