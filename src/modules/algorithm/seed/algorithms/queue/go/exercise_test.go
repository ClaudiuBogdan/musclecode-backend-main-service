package queue

import "testing"

func TestQueueBasicFunctionality(t *testing.T) {
	queue := NewQueue(5)

	queue.Enqueue(10)
	if queue.Peek() != 10 {
		t.Errorf("Peek() = %v, want %v", queue.Peek(), 10)
	}

	if queue.Dequeue() != 10 {
		t.Errorf("Dequeue() = %v, want %v", queue.Dequeue(), 10)
	}

	if !queue.IsEmpty() {
		t.Errorf("IsEmpty() = %v, want %v", queue.IsEmpty(), true)
	}
}

func TestQueueEdgeCases(t *testing.T) {
	queue := NewQueue(2)

	queue.Enqueue(10)
	queue.Enqueue(20)

	if !queue.IsFull() {
		t.Errorf("IsFull() = %v, want %v", queue.IsFull(), true)
	}

	queue = NewQueue(5)
	if queue.Peek() != nil {
		t.Errorf("Peek() = %v, want %v", queue.Peek(), nil)
	}

	if queue.Dequeue() != nil {
		t.Errorf("Dequeue() = %v, want %v", queue.Dequeue(), nil)
	}
}

func TestQueueEnqueueAndDequeue(t *testing.T) {
	queue := NewQueue(3)

	queue.Enqueue(1)
	queue.Enqueue(2)

	if queue.Dequeue() != 1 {
		t.Errorf("Dequeue() = %v, want %v", queue.Dequeue(), 1)
	}

	queue.Enqueue(3)

	if queue.IsFull() != true {
		t.Errorf("IsFull() = %v, want %v", queue.IsFull(), true)
	}

	if queue.Dequeue() != 2 {
		t.Errorf("Dequeue() = %v, want %v", queue.Dequeue(), 2)
	}

	if queue.Dequeue() != 3 {
		t.Errorf("Dequeue() = %v, want %v", queue.Dequeue(), 3)
	}

	if queue.IsEmpty() != true {
		t.Errorf("IsEmpty() = %v, want %v", queue.IsEmpty(), true)
	}
} 