package maxheap

import "testing"

func TestMaxHeap(t *testing.T) {
	heap := NewMaxHeap([]int{5, 3, 8, 4, 1, 9, 7})

	if heap.Peek() != 9 {
		t.Errorf("Expected peek to be 9, got %d", heap.Peek())
	}

	heap.Insert(10)
	if heap.Peek() != 10 {
		t.Errorf("Expected peek to be 10 after insert, got %d", heap.Peek())
	}

	max := heap.ExtractMax()
	if max != 10 {
		t.Errorf("Expected extract max to be 10, got %d", max)
	}

	if heap.Peek() != 9 {
		t.Errorf("Expected peek to be 9 after extract max, got %d", heap.Peek())
	}

	if heap.Size() != 7 {
		t.Errorf("Expected size to be 7, got %d", heap.Size())
	}

	emptyHeap := NewMaxHeap([]int{})
	if emptyHeap.ExtractMax() != 0 {
		t.Errorf("Expected extract max to be 0 on empty heap, got %d", emptyHeap.ExtractMax())
	}

	if emptyHeap.Peek() != 0 {
		t.Errorf("Expected peek to be 0 on empty heap, got %d", emptyHeap.Peek())
	}

	if emptyHeap.Size() != 0 {
		t.Errorf("Expected size to be 0 on empty heap, got %d", emptyHeap.Size())
	}
} 