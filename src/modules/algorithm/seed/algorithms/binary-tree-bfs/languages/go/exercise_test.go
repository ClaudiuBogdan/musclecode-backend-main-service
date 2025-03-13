package binarytreebfs

import (
	"reflect"
	"testing"
)

func buildTree1() *TreeNode {
	// Constructing the binary tree:
	//       1
	//      / \
	//     2   3
	//    / \   \
	//   4   5   6
	return &TreeNode{
		Val: 1,
		Left: &TreeNode{
			Val: 2,
			Left: &TreeNode{
				Val: 4,
			},
			Right: &TreeNode{
				Val: 5,
			},
		},
		Right: &TreeNode{
			Val: 3,
			Right: &TreeNode{
				Val: 6,
			},
		},
	}
}

func buildTree2() *TreeNode {
	// Constructing the binary tree:
	//   1
	//    \
	//     2
	//    /
	//   3
	return &TreeNode{
		Val: 1,
		Right: &TreeNode{
			Val: 2,
			Left: &TreeNode{
				Val: 3,
			},
		},
	}
}

func TestBFSIterative(t *testing.T) {
	tests := []struct {
		name     string
		root     *TreeNode
		expected []int
	}{
		{"empty tree", nil, []int{}},
		{"single node", &TreeNode{Val: 1}, []int{1}},
		{"tree1", buildTree1(), []int{1, 2, 3, 4, 5, 6}},
		{"tree2", buildTree2(), []int{1, 2, 3}},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := BFS(tt.root)
			if !reflect.DeepEqual(got, tt.expected) {
				t.Errorf("BFS() = %v; expected %v", got, tt.expected)
			}
		})
	}
}

func TestBFSRecursive(t *testing.T) {
	tests := []struct {
		name     string
		root     *TreeNode
		expected []int
	}{
		{"empty tree", nil, []int{}},
		{"single node", &TreeNode{Val: 1}, []int{1}},
		{"tree1", buildTree1(), []int{1, 2, 3, 4, 5, 6}},
		{"tree2", buildTree2(), []int{1, 2, 3}},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := BFSRecursive(tt.root)
			if !reflect.DeepEqual(got, tt.expected) {
				t.Errorf("BFSRecursive() = %v; expected %v", got, tt.expected)
			}
		})
	}
} 