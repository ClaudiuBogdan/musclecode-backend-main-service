package minheap

import "testing"

func TestMinHeapBasicFunctionality(t *testing.T) {
	minHeap := NewMinHeap()

	minHeap.Insert(5)
	minHeap.Insert(3)
	minHeap.Insert(7)

	if size := minHeap.Size(); size != 3 {
		t.Errorf("Expected size 3, got %d", size)
	}

	min, ok := minHeap.ExtractMin()
	if !ok || min != 3 {
		t.Errorf("Expected min 3, got %d", min)
	}

	if size := minHeap.Size(); size != 2 {
		t.Errorf("Expected size 2, got %d", size)
	}

	peek, ok := minHeap.Peek()
	if !ok || peek != 5 {
		t.Errorf("Expected peek 5, got %d", peek)
	}

	if size := minHeap.Size(); size != 2 {
		t.Errorf("Expected size 2, got %d", size)
	}
}

func TestMinHeapEmpty(t *testing.T) {
	minHeap := NewMinHeap()

	_, ok := minHeap.ExtractMin()
	if ok {
		t.Error("Expected ExtractMin to return false on empty heap")
	}

	_, ok = minHeap.Peek()
	if ok {
		t.Error("Expected Peek to return false on empty heap")
	}
} 