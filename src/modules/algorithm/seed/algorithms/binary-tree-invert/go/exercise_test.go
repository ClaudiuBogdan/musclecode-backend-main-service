package binarytreeinvert

import "testing"

func TestInvertTree(t *testing.T) {
	// Construct the original tree:
	//         4
	//       /   \
	//      2     7
	//     / \   / \
	//    1   3 6   9
	root := &TreeNode{
		Val: 4,
		Left: &TreeNode{
			Val: 2,
			Left:  &TreeNode{Val: 1},
			Right: &TreeNode{Val: 3},
		},
		Right: &TreeNode{
			Val: 7,
			Left:  &TreeNode{Val: 6},
			Right: &TreeNode{Val: 9},
		},
	}

	// Expected inverted tree:
	//         4
	//       /   \
	//      7     2
	//     / \   / \
	//    9   6 3   1
	expected := &TreeNode{
		Val: 4,
		Left: &TreeNode{
			Val: 7,
			Left:  &TreeNode{Val: 9},
			Right: &TreeNode{Val: 6},
		},
		Right: &TreeNode{
			Val: 2,
			Left:  &TreeNode{Val: 3},
			Right: &TreeNode{Val: 1},
		},
	}

	result := InvertTree(root)
	if !treesEqual(result, expected) {
		t.Errorf("InvertTree() = %+v, expected %+v", result, expected)
	}
}

func treesEqual(t1, t2 *TreeNode) bool {
	if t1 == nil && t2 == nil {
		return true
	}
	if t1 == nil || t2 == nil {
		return false
	}
	return t1.Val == t2.Val && treesEqual(t1.Left, t2.Left) && treesEqual(t1.Right, t2.Right)
} 