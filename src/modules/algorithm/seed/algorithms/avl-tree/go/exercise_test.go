package avltree

import "testing"

func TestAVLTreeExercise(t *testing.T) {
	// Using the stub exercise implementation, which is not implemented.
	tree := NewAVLTree()
	tree.Insert(40)
	tree.Insert(20)
	tree.Insert(10)
	tree.Insert(25)
	tree.Insert(30)
	tree.Insert(22)

	if node := tree.Search(25); node != nil {
		t.Errorf("Expected nil from exercise implementation, got node with value %d", node.Value)
	}
}

func TestAVLTreeIterative(t *testing.T) {
	tree := NewAVLTree()
	// Using the iterative solution (from iterative-solution.go).
	tree.Insert(40)
	tree.Insert(20)
	tree.Insert(10)
	tree.Insert(25)
	tree.Insert(30)
	tree.Insert(22)

	node := tree.Search(22)
	if node == nil || node.Value != 22 {
		t.Errorf("Iterative Solution: Expected to find value 22, got %v", node)
	}
}

func TestAVLTreeRecursive(t *testing.T) {
	// Create a new tree for recursive solution.
	tree := NewAVLTree()
	// Using recursive Insert from recursive-solution.go.
	tree.Insert(40)
	tree.Insert(20)
	tree.Insert(10)
	tree.Insert(25)
	tree.Insert(30)
	tree.Insert(22)

	node := tree.Search(30)
	if node == nil || node.Value != 30 {
		t.Errorf("Recursive Solution: Expected to find value 30, got %v", node)
	}
} 