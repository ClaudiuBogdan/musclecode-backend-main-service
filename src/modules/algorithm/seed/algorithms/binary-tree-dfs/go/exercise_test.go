package binarytreedfs

import (
	"reflect"
	"testing"
)

func TestBinaryTreeDFS_Numeric(t *testing.T) {
	// Construct the following tree:
	//     1
	//    / \
	//   2   3
	//  / \   \
	// 4   5   6
	root := &TreeNode{
		Val: 1,
		Left: &TreeNode{
			Val: 2,
			Left:  &TreeNode{Val: 4},
			Right: &TreeNode{Val: 5},
		},
		Right: &TreeNode{
			Val: 3,
			Right: &TreeNode{Val: 6},
		},
	}

	expected := []int{1, 2, 4, 5, 3, 6}
	if got := BinaryTreeDFS(root); !reflect.DeepEqual(got, expected) {
		t.Errorf("BinaryTreeDFS() = %v; want %v", got, expected)
	}
}

func TestBinaryTreeDFS_Empty(t *testing.T) {
	var root *TreeNode = nil
	expected := []int{}
	if got := BinaryTreeDFS(root); !reflect.DeepEqual(got, expected) {
		t.Errorf("BinaryTreeDFS() = %v; want %v", got, expected)
	}
} 