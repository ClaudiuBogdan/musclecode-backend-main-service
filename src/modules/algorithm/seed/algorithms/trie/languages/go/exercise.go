package trie

type TrieNode struct {
	children    map[rune]*TrieNode
	wordCount   int
	prefixCount int
}

type Trie struct {
	root *TrieNode
}

// NewTrie initializes and returns a new Trie.
func NewTrie() *Trie {
	return &Trie{root: &TrieNode{children: make(map[rune]*TrieNode)}}
}

func (t *Trie) Insert(word string) {
	// TODO: Implement the iterative insertion for the trie.
}

func (t *Trie) Search(word string) bool {
	// TODO: Implement search.
	return false
}

func (t *Trie) StartsWith(prefix string) bool {
	// TODO: Implement prefix search.
	return false
}

func (t *Trie) CountWordsEqualTo(word string) int {
	// TODO: Return count of words equal to word.
	return 0
}

func (t *Trie) CountWordsStartingWith(prefix string) int {
	// TODO: Return count of words starting with prefix.
	return 0
}

func (t *Trie) Erase(word string) {
	// TODO: Erase one occurrence of the word.
} 