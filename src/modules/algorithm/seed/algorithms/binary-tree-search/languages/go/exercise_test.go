package binarytresearch

import (
	"reflect"
	"testing"
)

// Helper function to insert multiple values into BST
func buildBST(values []int) *Node {
	var root *Node
	for _, v := range values {
		root = Insert(root, v)
	}
	return root
}

// Helper function for inorder traversal
func inorderTraversal(root *Node, result *[]int) {
	if root != nil {
		inorderTraversal(root.Left, result)
		*result = append(*result, root.Val)
		inorderTraversal(root.Right, result)
	}
}

func TestSearch(t *testing.T) {
	bst := buildBST([]int{7, 3, 9, 1, 5})
	if !Search(bst, 5) {
		t.Errorf("Search(bst, 5) = false; want true")
	}
	if Search(bst, 4) {
		t.Errorf("Search(bst, 4) = true; want false")
	}
}

func TestInsert(t *testing.T) {
	bst := buildBST([]int{7, 3, 9, 1, 5})
	bst = Insert(bst, 4)
	if !Search(bst, 4) {
		t.Errorf("After inserting 4, Search(bst, 4) = false; want true")
	}
	var inorder []int
	inorderTraversal(bst, &inorder)
	expected := []int{1, 3, 4, 5, 7, 9}
	if !reflect.DeepEqual(inorder, expected) {
		t.Errorf("Inorder traversal = %v; want %v", inorder, expected)
	}
}

func TestDelete(t *testing.T) {
	bst := buildBST([]int{7, 3, 9, 1, 5})
	bst = Delete(bst, 3)
	if Search(bst, 3) {
		t.Errorf("After deleting 3, Search(bst, 3) = true; want false")
	}
	var inorder []int
	inorderTraversal(bst, &inorder)
	expected := []int{1, 5, 7, 9}
	if !reflect.DeepEqual(inorder, expected) {
		t.Errorf("Inorder traversal after deletion = %v; want %v", inorder, expected)
	}
} 