package ringbuffer

import "testing"

func TestRingBufferBasicFunctionality(t *testing.T) {
	buffer := NewRingBuffer(3)

	buffer.Enqueue(1)
	buffer.Enqueue(2)
	buffer.Enqueue(3)

	if item := buffer.Dequeue(); item != 1 {
		t.Errorf("Dequeue() = %v, want %v", item, 1)
	}
	if item := buffer.Dequeue(); item != 2 {
		t.Errorf("Dequeue() = %v, want %v", item, 2)
	}
	if item := buffer.Dequeue(); item != 3 {
		t.Errorf("Dequeue() = %v, want %v", item, 3)
	}
	if item := buffer.Dequeue(); item != nil {
		t.Errorf("Dequeue() = %v, want %v", item, nil)
	}
}

func TestRingBufferOverwrite(t *testing.T) {
	buffer := NewRingBuffer(3)
	buffer.Enqueue(1)
	buffer.Enqueue(2)
	buffer.Enqueue(3)
	buffer.Enqueue(4)

	if item := buffer.Dequeue(); item != 2 {
		t.Errorf("Dequeue() = %v, want %v", item, 2)
	}
	if item := buffer.Dequeue(); item != 3 {
		t.Errorf("Dequeue() = %v, want %v", item, 3)
	}
	if item := buffer.Dequeue(); item != 4 {
		t.Errorf("Dequeue() = %v, want %v", item, 4)
	}
}

func TestRingBufferEnqueueDequeueAfterOverwrite(t *testing.T) {
	buffer := NewRingBuffer(3)
	buffer.Enqueue(1)
	buffer.Enqueue(2)
	buffer.Enqueue(3)
	buffer.Enqueue(4)

	if item := buffer.Dequeue(); item != 2 {
		t.Errorf("Dequeue() = %v, want %v", item, 2)
	}
	buffer.Enqueue(5)
	if item := buffer.Dequeue(); item != 3 {
		t.Errorf("Dequeue() = %v, want %v", item, 3)
	}
	if item := buffer.Dequeue(); item != 4 {
		t.Errorf("Dequeue() = %v, want %v", item, 4)
	}
	if item := buffer.Dequeue(); item != 5 {
		t.Errorf("Dequeue() = %v, want %v", item, 5)
	}
	if !buffer.IsEmpty() {
		t.Errorf("IsEmpty() = %v, want %v", buffer.IsEmpty(), true)
	}
}

func TestRingBufferCountsAndEmptyFullStatus(t *testing.T) {
	buffer := NewRingBuffer(3)
	if !buffer.IsEmpty() {
		t.Errorf("IsEmpty() = %v, want %v", buffer.IsEmpty(), true)
	}
	if buffer.IsFull() {
		t.Errorf("IsFull() = %v, want %v", buffer.IsFull(), false)
	}
	buffer.Enqueue(1)
	if buffer.GetCount() != 1 {
		t.Errorf("GetCount() = %v, want %v", buffer.GetCount(), 1)
	}
	if buffer.IsEmpty() {
		t.Errorf("IsEmpty() = %v, want %v", buffer.IsEmpty(), false)
	}
	if buffer.IsFull() {
		t.Errorf("IsFull() = %v, want %v", buffer.IsFull(), false)
	}
	buffer.Enqueue(2)
	buffer.Enqueue(3)
	if !buffer.IsFull() {
		t.Errorf("IsFull() = %v, want %v", buffer.IsFull(), true)
	}
	buffer.Dequeue()
	if buffer.IsFull() {
		t.Errorf("IsFull() = %v, want %v", buffer.IsFull(), false)
	}
	if buffer.GetCount() != 2 {
		t.Errorf("GetCount() = %v, want %v", buffer.GetCount(), 2)
	}
} 