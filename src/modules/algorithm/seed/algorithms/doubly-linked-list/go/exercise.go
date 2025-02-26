package doublylinkedlist

// Node represents a node in the doubly linked list.
type Node[T any] struct {
	Data T
	Prev *Node[T]
	Next *Node[T]
}

// DoublyLinkedList represents the doubly linked list.
type DoublyLinkedList[T any] struct {
	Head *Node[T]
	Tail *Node[T]
	Size int
}

// Append adds a new node with the given data to the end of the list.
func (list *DoublyLinkedList[T]) Append(data T) {
	// TODO: Implement the Append method
}

// Prepend adds a new node with the given data to the beginning of the list.
func (list *DoublyLinkedList[T]) Prepend(data T) {
	// TODO: Implement the Prepend method
}

// Delete removes the first node with the given data from the list.
func (list *DoublyLinkedList[T]) Delete(data T) {
	// TODO: Implement the Delete method
}

// Find searches for the first node with the given data and returns it.
func (list *DoublyLinkedList[T]) Find(data T) *Node[T] {
	// TODO: Implement the Find method
	return nil
} 