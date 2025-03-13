package queue

// Queue represents a queue data structure implemented using an array.
type Queue struct {
	items    []interface{}
	capacity int
	front    int
	rear     int
	count    int
}

// NewQueue creates a new queue with the given capacity.
func NewQueue(capacity int) *Queue {
	return &Queue{
		items:    make([]interface{}, capacity),
		capacity: capacity,
		front:    0,
		rear:     -1,
		count:    0,
	}
}

// Enqueue adds an element to the rear of the queue.
func (q *Queue) Enqueue(item interface{}) {
	if q.IsFull() {
		panic("Queue Overflow")
	}
	q.rear = (q.rear + 1) % q.capacity
	q.items[q.rear] = item
	q.count++
}

// Dequeue removes an element from the front of the queue.
func (q *Queue) Dequeue() interface{} {
	if q.IsEmpty() {
		return nil
	}
	item := q.items[q.front]
	q.front = (q.front + 1) % q.capacity
	q.count--
	return item
}

// Peek returns the element at the front of the queue without removing it.
func (q *Queue) Peek() interface{} {
	if q.IsEmpty() {
		return nil
	}
	return q.items[q.front]
}

// IsEmpty checks if the queue is empty.
func (q *Queue) IsEmpty() bool {
	return q.count == 0
}

// IsFull checks if the queue is full.
func (q *Queue) IsFull() bool {
	return q.count == q.capacity
}

// Size returns the number of elements in the queue.
func (q *Queue) Size() int {
	return q.count
} 