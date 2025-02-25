package binarytreetraversal

import (
	"reflect"
	"testing"
)

func createSampleTree() *TreeNode {
	// Constructing the sample binary tree:
	//      1
	//     / \
	//    2   3
	//   / \   \
	//  4   5   6
	node4 := &TreeNode{Val: 4}
	node5 := &TreeNode{Val: 5}
	node6 := &TreeNode{Val: 6}
	node2 := &TreeNode{Val: 2, Left: node4, Right: node5}
	node3 := &TreeNode{Val: 3, Right: node6}
	return &TreeNode{Val: 1, Left: node2, Right: node3}
}

func TestInOrderTraversal(t *testing.T) {
	root := createSampleTree()
	expected := []int{4, 2, 5, 1, 3, 6}
	result := InOrderTraversal(root)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("InOrderTraversal() = %v; want %v", result, expected)
	}
}

func TestPreOrderTraversal(t *testing.T) {
	root := createSampleTree()
	expected := []int{1, 2, 4, 5, 3, 6}
	result := PreOrderTraversal(root)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("PreOrderTraversal() = %v; want %v", result, expected)
	}
}

func TestPostOrderTraversal(t *testing.T) {
	root := createSampleTree()
	expected := []int{4, 5, 2, 6, 3, 1}
	result := PostOrderTraversal(root)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("PostOrderTraversal() = %v; want %v", result, expected)
	}
} 