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
	newNode := &Node[T]{Data: data, Prev: nil, Next: nil}
	if list.Head == nil {
		list.Head = newNode
		list.Tail = newNode
	} else {
		newNode.Prev = list.Tail
		list.Tail.Next = newNode
		list.Tail = newNode
	}
	list.Size++
}

// Prepend adds a new node with the given data to the beginning of the list.
func (list *DoublyLinkedList[T]) Prepend(data T) {
	newNode := &Node[T]{Data: data, Prev: nil, Next: nil}
	if list.Head == nil {
		list.Head = newNode
		list.Tail = newNode
	} else {
		newNode.Next = list.Head
		list.Head.Prev = newNode
		list.Head = newNode
	}
	list.Size++
}

// Delete removes the first node with the given data from the list.
func (list *DoublyLinkedList[T]) Delete(data T) {
	current := list.Head
	for current != nil {
		if current.Data == data {
			if current.Prev != nil {
				current.Prev.Next = current.Next
			} else {
				list.Head = current.Next
			}

			if current.Next != nil {
				current.Next.Prev = current.Prev
			} else {
				list.Tail = current.Prev
			}

			list.Size--
			return
		}
		current = current.Next
	}
}

// Find searches for the first node with the given data and returns it.
func (list *DoublyLinkedList[T]) Find(data T) *Node[T] {
	current := list.Head
	for current != nil {
		if current.Data == data {
			return current
		}
		current = current.Next
	}
	return nil
} 