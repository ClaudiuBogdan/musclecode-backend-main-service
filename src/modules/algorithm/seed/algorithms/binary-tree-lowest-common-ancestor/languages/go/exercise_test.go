package binarytreelowestcommonancestor

import "testing"

func TestLowestCommonAncestor(t *testing.T) {
	// Constructing the tree:
	//         3
	//        / \
	//       5   1
	//      / \  / \
	//     6   2 0  8
	//        / \
	//       7   4

	three := &TreeNode{Val: 3}
	five := &TreeNode{Val: 5}
	one := &TreeNode{Val: 1}
	six := &TreeNode{Val: 6}
	two := &TreeNode{Val: 2}
	zero := &TreeNode{Val: 0}
	eight := &TreeNode{Val: 8}
	seven := &TreeNode{Val: 7}
	four := &TreeNode{Val: 4}

	three.Left = five
	three.Right = one
	five.Left = six
	five.Right = two
	one.Left = zero
	one.Right = eight
	two.Left = seven
	two.Right = four

	// Test case 1: LCA of nodes 5 and 1 is 3
	lca := LowestCommonAncestor(three, five, one)
	if lca == nil || lca.Val != 3 {
		t.Errorf("LowestCommonAncestor(3,5,1) = %v; want 3", lca)
	}

	// Test case 2: LCA of nodes 5 and 4 is 5
	lca = LowestCommonAncestor(three, five, four)
	if lca == nil || lca.Val != 5 {
		t.Errorf("LowestCommonAncestor(3,5,4) = %v; want 5", lca)
	}
} 