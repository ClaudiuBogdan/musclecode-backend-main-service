package singlylinkedlist

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
	// TODO: Implement the InsertAtBeginning method
}

// InsertAtEnd inserts a new node at the end of the list
func (list *SinglyLinkedList) InsertAtEnd(data interface{}) {
	// TODO: Implement the InsertAtEnd method
}

// Delete deletes a node with the given data from the list
func (list *SinglyLinkedList) Delete(data interface{}) {
	// TODO: Implement the Delete method
}

// Search searches for a node with the given data in the list
func (list *SinglyLinkedList) Search(data interface{}) *Node {
	// TODO: Implement the Search method
	return nil
}

// Display prints the linked list
func (list *SinglyLinkedList) Display() {
	// TODO: Implement the Display method
} 