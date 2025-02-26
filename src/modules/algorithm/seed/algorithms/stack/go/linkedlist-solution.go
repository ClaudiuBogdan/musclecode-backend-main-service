package stack

// Node represents a node in the linked list.
type Node struct {
	data int
	next *Node
}

// Stack represents a stack data structure implemented using a linked list.
type Stack struct {
	top *Node
}

// NewStack creates a new empty stack.
func NewStack() *Stack {
	return &Stack{top: nil}
}

// Push adds an element to the top of the stack.
func (s *Stack) Push(value int) {
	newNode := &Node{data: value, next: s.top}
	s.top = newNode
}

// Pop removes and returns the top element from the stack.
// Returns nil if the stack is empty.
func (s *Stack) Pop() *int {
	if s.IsEmpty() {
		return nil
	}
	value := s.top.data
	s.top = s.top.next
	return &value
}

// Peek returns the top element of the stack without removing it.
// Returns nil if the stack is empty.
func (s *Stack) Peek() *int {
	if s.IsEmpty() {
		return nil
	}
	return &s.top.data
}

// IsEmpty returns true if the stack is empty, false otherwise.
func (s *Stack) IsEmpty() bool {
	return s.top == nil
} 