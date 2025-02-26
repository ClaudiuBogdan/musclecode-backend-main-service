package singlylinkedlist

import (
	"testing"
)

func TestSinglyLinkedListBasicFunctionality(t *testing.T) {
	list := SinglyLinkedList{}

	// Test InsertAtBeginning
	list.InsertAtBeginning(10)
	if list.Head == nil || list.Head.Data != 10 {
		t.Errorf("InsertAtBeginning failed")
	}

	// Test InsertAtEnd
	list.InsertAtEnd(20)
	if list.Head == nil || list.Head.Data != 10 || list.Head.Next == nil || list.Head.Next.Data != 20 {
		t.Errorf("InsertAtEnd failed")
	}

	// Test Search
	node := list.Search(20)
	if node == nil || node.Data != 20 {
		t.Errorf("Search failed")
	}

	// Test Delete
	list.Delete(10)
	if list.Head == nil || list.Head.Data != 20 {
		t.Errorf("Delete failed")
	}
}

func TestSinglyLinkedListEdgeCases(t *testing.T) {
	list := SinglyLinkedList{}

	// Test Delete on empty list
	list.Delete(10) // Should not panic

	// Test Search on empty list
	node := list.Search(10)
	if node != nil {
		t.Errorf("Search on empty list failed")
	}
} 