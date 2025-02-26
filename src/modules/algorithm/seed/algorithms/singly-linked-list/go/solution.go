package singlylinkedlist

import "fmt"

// Node represents a node in the linked list
type Node struct {
	Data interface{}
	Next *Node
}

// SinglyLinkedList represents the linked list
type SinglyLinkedList struct {
	Head *Node
}

// InsertAtBeginning inserts a new node at the beginning of the list
func (list *SinglyLinkedList) InsertAtBeginning(data interface{}) {
	newNode := &Node{Data: data, Next: list.Head}
	list.Head = newNode
}

// InsertAtEnd inserts a new node at the end of the list
func (list *SinglyLinkedList) InsertAtEnd(data interface{}) {
	newNode := &Node{Data: data, Next: nil}
	if list.Head == nil {
		list.Head = newNode
		return
	}
	current := list.Head
	for current.Next != nil {
		current = current.Next
	}
	current.Next = newNode
}

// Delete deletes a node with the given data from the list
func (list *SinglyLinkedList) Delete(data interface{}) {
	if list.Head == nil {
		return
	}
	if list.Head.Data == data {
		list.Head = list.Head.Next
		return
	}
	current := list.Head
	for current.Next != nil {
		if current.Next.Data == data {
			current.Next = current.Next.Next
			return
		}
		current = current.Next
	}
}

// Search searches for a node with the given data in the list
func (list *SinglyLinkedList) Search(data interface{}) *Node {
	current := list.Head
	for current != nil {
		if current.Data == data {
			return current
		}
		current = current.Next
	}
	return nil
}

// Display prints the linked list
func (list *SinglyLinkedList) Display() {
	current := list.Head
	for current != nil {
		fmt.Printf("%v -> ", current.Data)
		current = current.Next
	}
	fmt.Println("nil")
} 