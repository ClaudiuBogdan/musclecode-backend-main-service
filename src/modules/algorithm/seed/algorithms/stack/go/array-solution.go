package stack

// Stack represents a stack data structure implemented using an array.
type Stack struct {
	items []int
}

// NewStack creates a new empty stack.
func NewStack() *Stack {
	return &Stack{items: []int{}}
}

// Push adds an element to the top of the stack.
func (s *Stack) Push(value int) {
	s.items = append(s.items, value)
}

// Pop removes and returns the top element from the stack.
// Returns nil if the stack is empty.
func (s *Stack) Pop() *int {
	if s.IsEmpty() {
		return nil
	}
	index := len(s.items) - 1
	value := s.items[index]
	s.items = s.items[:index]
	return &value
}

// Peek returns the top element of the stack without removing it.
// Returns nil if the stack is empty.
func (s *Stack) Peek() *int {
	if s.IsEmpty() {
		return nil
	}
	return &s.items[len(s.items)-1]
}

// IsEmpty returns true if the stack is empty, false otherwise.
func (s *Stack) IsEmpty() bool {
	return len(s.items) == 0
} 