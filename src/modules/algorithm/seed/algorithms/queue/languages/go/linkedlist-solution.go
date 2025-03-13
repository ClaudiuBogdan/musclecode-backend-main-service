package queue

// Node represents a node in the linked list.
type Node struct {
	data interface{}
	next *Node
}

// Queue represents a queue data structure implemented using a linked list.
type Queue struct {
	front    *Node
	rear     *Node
	count    int
	capacity int
}

// NewQueue creates a new queue with the given capacity.
func NewQueue(capacity int) *Queue {
	return &Queue{
		front:    nil,
		rear:     nil,
		count:    0,
		capacity: capacity,
	}
}

// Enqueue adds an element to the rear of the queue.
func (q *Queue) Enqueue(item interface{}) {
	if q.count >= q.capacity {
		panic("Queue Overflow")
	}

	newNode := &Node{data: item, next: nil}

	if q.IsEmpty() {
		q.front = newNode
		q.rear = newNode
	} else {
		q.rear.next = newNode
		q.rear = newNode
	}

	q.count++
}

// Dequeue removes an element from the front of the queue.
func (q *Queue) Dequeue() interface{} {
	if q.IsEmpty() {
		return nil
	}

	item := q.front.data
	q.front = q.front.next
	q.count--

	if q.IsEmpty() {
		q.rear = nil
	}

	return item
}

// Peek returns the element at the front of the queue without removing it.
func (q *Queue) Peek() interface{} {
	if q.IsEmpty() {
		return nil
	}
	return q.front.data
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