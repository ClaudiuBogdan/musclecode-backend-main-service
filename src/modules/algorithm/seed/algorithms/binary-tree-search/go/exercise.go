package binarytresearch

// Node represents a node in the binary search tree.
type Node struct {
	Val   int
	Left  *Node
	Right *Node
}

// Search searches for a key in the binary search tree.
// Returns true if the key is found, false otherwise.
func Search(root *Node, key int) bool {
	// TODO: Implement the BST search operation.
	return false
}

// Insert inserts a key into the binary search tree and returns the new root.
func Insert(root *Node, key int) *Node {
	// TODO: Implement the BST insertion.
	return &Node{Val: key}
}

// Delete deletes a key from the binary search tree and returns the new root.
func Delete(root *Node, key int) *Node {
	// TODO: Implement the BST deletion.
	return root
} 