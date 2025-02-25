package binarytreecompare

import "testing"

func TestIsSameTree_BasicFunctionality(t *testing.T) {
	// Tree1: [1,2,3]
	tree1 := &TreeNode{Val: 1, Left: &TreeNode{Val: 2}, Right: &TreeNode{Val: 3}}
	// Tree2: [1,2,3]
	tree2 := &TreeNode{Val: 1, Left: &TreeNode{Val: 2}, Right: &TreeNode{Val: 3}}

	if !IsSameTree(tree1, tree2) {
		t.Errorf("Expected identical trees to return true")
	}

	// Tree3: [1,2,3] vs [1,2,null,3]
	tree3 := &TreeNode{Val: 1, Left: &TreeNode{Val: 2, Left: &TreeNode{Val: 3}}, Right: nil}

	if IsSameTree(tree1, tree3) {
		t.Errorf("Expected different trees to return false")
	}
}

func TestIsSameTree_EdgeCases(t *testing.T) {
	if !IsSameTree(nil, nil) {
		t.Errorf("Expected both nil trees to return true")
	}
	tree := &TreeNode{Val: 1}
	if IsSameTree(tree, nil) {
		t.Errorf("Expected a tree and nil to return false")
	}
	if IsSameTree(nil, tree) {
		t.Errorf("Expected nil and a tree to return false")
	}
}

func TestIsSameTree_ComplexTrees(t *testing.T) {
	// Complex Tree1: [1,2,3,4,5,6,7]
	tree1 := &TreeNode{
		Val: 1,
		Left: &TreeNode{
			Val:   2,
			Left:  &TreeNode{Val: 4},
			Right: &TreeNode{Val: 5},
		},
		Right: &TreeNode{
			Val:   3,
			Left:  &TreeNode{Val: 6},
			Right: &TreeNode{Val: 7},
		},
	}
	// Complex Tree2: [1,2,3,4,5,6,7]
	tree2 := &TreeNode{
		Val: 1,
		Left: &TreeNode{
			Val:   2,
			Left:  &TreeNode{Val: 4},
			Right: &TreeNode{Val: 5},
		},
		Right: &TreeNode{
			Val:   3,
			Left:  &TreeNode{Val: 6},
			Right: &TreeNode{Val: 7},
		},
	}
	if !IsSameTree(tree1, tree2) {
		t.Errorf("Expected complex identical trees to return true")
	}
	// Complex tree with a difference: last node different.
	tree3 := &TreeNode{
		Val: 1,
		Left: &TreeNode{
			Val:   2,
			Left:  &TreeNode{Val: 4},
			Right: &TreeNode{Val: 5},
		},
		Right: &TreeNode{
			Val:   3,
			Left:  &TreeNode{Val: 6},
			Right: &TreeNode{Val: 8},
		},
	}
	if IsSameTree(tree1, tree3) {
		t.Errorf("Expected complex trees with different value to return false")
	}
} 