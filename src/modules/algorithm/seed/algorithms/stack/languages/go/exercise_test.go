package stack

import "testing"

func TestStackBasicFunctionality(t *testing.T) {
	stack := NewStack()

	// Test Push
	stack.Push(10)
	stack.Push(20)

	// Test Peek
	peeked := stack.Peek()
	if peeked == nil || *peeked != 20 {
		t.Errorf("Peek() = %v, want %v", peeked, 20)
	}

	// Test Pop
	popped := stack.Pop()
	if popped == nil || *popped != 20 {
		t.Errorf("Pop() = %v, want %v", popped, 20)
	}

	popped = stack.Pop()
	if popped == nil || *popped != 10 {
		t.Errorf("Pop() = %v, want %v", popped, 10)
	}

	// Test IsEmpty
	if !stack.IsEmpty() {
		t.Errorf("IsEmpty() = %v, want %v", stack.IsEmpty(), true)
	}

	// Test Pop when empty
	popped = stack.Pop()
	if popped != nil {
		t.Errorf("Pop() = %v, want %v", popped, nil)
	}

	// Test Peek when empty
	peeked = stack.Peek()
	if peeked != nil {
		t.Errorf("Peek() = %v, want %v", peeked, nil)
	}
}

func TestStackEdgeCases(t *testing.T) {
	stack := NewStack()

	// Test IsEmpty on a new stack
	if !stack.IsEmpty() {
		t.Errorf("IsEmpty() = %v, want %v", stack.IsEmpty(), true)
	}

	// Test Push and then IsEmpty
	stack.Push(5)
	if stack.IsEmpty() {
		t.Errorf("IsEmpty() = %v, want %v", stack.IsEmpty(), false)
	}

	// Test Pop last element
	popped := stack.Pop()
	if popped == nil || *popped != 5 {
		t.Errorf("Pop() = %v, want %v", popped, 5)
	}

	// Test IsEmpty after Pop
	if !stack.IsEmpty() {
		t.Errorf("IsEmpty() = %v, want %v", stack.IsEmpty(), true)
	}
} 