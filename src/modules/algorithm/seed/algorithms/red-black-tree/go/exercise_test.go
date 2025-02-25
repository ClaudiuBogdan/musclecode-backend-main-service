package redblacktree

import "testing"

func TestRedBlackTreeIterative(t *testing.T) {
	tree := &RedBlackTree{}
	tree.Insert(10)
	tree.Insert(20)
	tree.Insert(30)

	if node := tree.Search(10); node == nil {
		t.Errorf("Expected to find value 10")
	}
	if node := tree.Search(20); node == nil {
		t.Errorf("Expected to find value 20")
	}
	if node := tree.Search(30); node == nil {
		t.Errorf("Expected to find value 30")
	}
	if node := tree.Search(100); node != nil {
		t.Errorf("Expected not to find value 100")
	}
}

func TestRedBlackTreeRecursive(t *testing.T) {
	// Using the same RedBlackTree struct for recursive solution.
	tree := &RedBlackTree{}
	tree.Insert(5)
	tree.Insert(2)
	tree.Insert(8)

	if node := tree.Search(5); node == nil {
		t.Errorf("Expected to find value 5")
	}
	if node := tree.Search(2); node == nil {
		t.Errorf("Expected to find value 2")
	}
	if node := tree.Search(8); node == nil {
		t.Errorf("Expected to find value 8")
	}
	if node := tree.Search(10); node != nil {
		t.Errorf("Expected not to find value 10")
	}
} 