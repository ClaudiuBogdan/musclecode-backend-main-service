package arraylist

import (
	"testing"
)

func TestAdd(t *testing.T) {
	list := NewArrayList()
	list.Add(1)
	list.Add(2)
	list.Add(3)

	if list.Size() != 3 {
		t.Errorf("Expected size 3, got %d", list.Size())
	}

	if list.Get(0) != 1 {
		t.Errorf("Expected element at index 0 to be 1, got %v", list.Get(0))
	}

	if list.Get(1) != 2 {
		t.Errorf("Expected element at index 1 to be 2, got %v", list.Get(1))
	}

	if list.Get(2) != 3 {
		t.Errorf("Expected element at index 2 to be 3, got %v", list.Get(2))
	}
}

func TestRemove(t *testing.T) {
	list := NewArrayList()
	list.Add("apple")
	list.Add("banana")
	list.Add("orange")

	list.Remove(1)

	if list.Size() != 2 {
		t.Errorf("Expected size 2, got %d", list.Size())
	}

	if list.Get(0) != "apple" {
		t.Errorf("Expected element at index 0 to be 'apple', got %v", list.Get(0))
	}

	if list.Get(1) != "orange" {
		t.Errorf("Expected element at index 1 to be 'orange', got %v", list.Get(1))
	}
}

func TestRemoveFromEmptyList(t *testing.T) {
	list := NewArrayList()
	
	// Ensure no panic occurs when removing from an empty list
	list.Remove(0)
	
	if list.Size() != 0 {
		t.Errorf("Expected size 0 after removing from empty list, got %d", list.Size())
	}
}

func TestRemoveBeginningAndEnd(t *testing.T) {
	list := NewArrayList()
	list.Add(1)
	list.Add(2)
	list.Add(3)

	list.Remove(0)
	if list.Size() != 2 {
		t.Errorf("Expected size 2 after removing first element, got %d", list.Size())
	}
	if list.Get(0) != 2 {
		t.Errorf("Expected element at index 0 to be 2, got %v", list.Get(0))
	}
	if list.Get(1) != 3 {
		t.Errorf("Expected element at index 1 to be 3, got %v", list.Get(1))
	}

	list.Remove(1)
	if list.Size() != 1 {
		t.Errorf("Expected size 1 after removing last element, got %d", list.Size())
	}
	if list.Get(0) != 2 {
		t.Errorf("Expected element at index 0 to be 2, got %v", list.Get(0))
	}
} 