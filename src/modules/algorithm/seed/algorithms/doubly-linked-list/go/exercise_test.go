package doublylinkedlist

import (
	"testing"
)

func TestDoublyLinkedList_Append(t *testing.T) {
	list := DoublyLinkedList[int]{}
	list.Append(1)
	list.Append(2)
	list.Append(3)
	if list.Size != 3 {
		t.Errorf("Expected size 3, got %d", list.Size)
	}
}

func TestDoublyLinkedList_Prepend(t *testing.T) {
	list := DoublyLinkedList[int]{}
	list.Prepend(1)
	list.Prepend(2)
	if list.Size != 2 {
		t.Errorf("Expected size 2, got %d", list.Size)
	}
}

func TestDoublyLinkedList_Delete(t *testing.T) {
	list := DoublyLinkedList[int]{}
	list.Append(1)
	list.Append(2)
	list.Append(3)
	list.Delete(2)
	if list.Size != 2 {
		t.Errorf("Expected size 2, got %d", list.Size)
	}
}

func TestDoublyLinkedList_Find(t *testing.T) {
	list := DoublyLinkedList[int]{}
	list.Append(1)
	list.Append(2)
	list.Append(3)
	node := list.Find(2)
	if node == nil || node.Data != 2 {
		t.Errorf("Expected to find node with data 2")
	}
}

func TestDoublyLinkedList_FindNotFound(t *testing.T) {
	list := DoublyLinkedList[int]{}
	list.Append(1)
	list.Append(2)
	list.Append(3)
	node := list.Find(4)
	if node != nil {
		t.Errorf("Expected not to find node with data 4")
	}
} 