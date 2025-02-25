package trie

type TrieNode struct {
	children    map[rune]*TrieNode
	wordCount   int
	prefixCount int
}

type Trie struct {
	root *TrieNode
}

func NewTrie() *Trie {
	return &Trie{root: &TrieNode{children: make(map[rune]*TrieNode)}}
}

func (t *Trie) Insert(word string) {
	node := t.root
	for _, ch := range word {
		if node.children[ch] == nil {
			node.children[ch] = &TrieNode{children: make(map[rune]*TrieNode)}
		}
		node = node.children[ch]
		node.prefixCount++
	}
	node.wordCount++
}

func (t *Trie) Search(word string) bool {
	node := t.root
	for _, ch := range word {
		if node.children[ch] == nil {
			return false
		}
		node = node.children[ch]
	}
	return node.wordCount > 0
}

func (t *Trie) StartsWith(prefix string) bool {
	node := t.root
	for _, ch := range prefix {
		if node.children[ch] == nil {
			return false
		}
		node = node.children[ch]
	}
	return node.prefixCount > 0
}

func (t *Trie) CountWordsEqualTo(word string) int {
	node := t.root
	for _, ch := range word {
		if node.children[ch] == nil {
			return 0
		}
		node = node.children[ch]
	}
	return node.wordCount
}

func (t *Trie) CountWordsStartingWith(prefix string) int {
	node := t.root
	for _, ch := range prefix {
		if node.children[ch] == nil {
			return 0
		}
		node = node.children[ch]
	}
	return node.prefixCount
}

func (t *Trie) Erase(word string) {
	if !t.Search(word) {
		return
	}
	node := t.root
	for _, ch := range word {
		child := node.children[ch]
		child.prefixCount--
		node = child
	}
	node.wordCount--
} 