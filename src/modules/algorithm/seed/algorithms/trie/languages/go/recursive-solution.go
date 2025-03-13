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
	t.insertHelper(t.root, word, 0)
}

func (t *Trie) insertHelper(node *TrieNode, word string, index int) {
	if index == len(word) {
		node.wordCount++
		return
	}
	ch := rune(word[index])
	if node.children[ch] == nil {
		node.children[ch] = &TrieNode{children: make(map[rune]*TrieNode)}
	}
	child := node.children[ch]
	child.prefixCount++
	t.insertHelper(child, word, index+1)
}

func (t *Trie) Search(word string) bool {
	return t.searchHelper(t.root, word, 0)
}

func (t *Trie) searchHelper(node *TrieNode, word string, index int) bool {
	if index == len(word) {
		return node.wordCount > 0
	}
	ch := rune(word[index])
	if node.children[ch] == nil {
		return false
	}
	return t.searchHelper(node.children[ch], word, index+1)
}

func (t *Trie) StartsWith(prefix string) bool {
	return t.startsWithHelper(t.root, prefix, 0)
}

func (t *Trie) startsWithHelper(node *TrieNode, prefix string, index int) bool {
	if index == len(prefix) {
		return true
	}
	ch := rune(prefix[index])
	if node.children[ch] == nil {
		return false
	}
	return t.startsWithHelper(node.children[ch], prefix, index+1)
}

func (t *Trie) CountWordsEqualTo(word string) int {
	return t.countWordsEqualToHelper(t.root, word, 0)
}

func (t *Trie) countWordsEqualToHelper(node *TrieNode, word string, index int) int {
	if index == len(word) {
		return node.wordCount
	}
	ch := rune(word[index])
	if node.children[ch] == nil {
		return 0
	}
	return t.countWordsEqualToHelper(node.children[ch], word, index+1)
}

func (t *Trie) CountWordsStartingWith(prefix string) int {
	return t.countWordsStartingWithHelper(t.root, prefix, 0)
}

func (t *Trie) countWordsStartingWithHelper(node *TrieNode, prefix string, index int) int {
	if index == len(prefix) {
		return node.prefixCount
	}
	ch := rune(prefix[index])
	if node.children[ch] == nil {
		return 0
	}
	return t.countWordsStartingWithHelper(node.children[ch], prefix, index+1)
}

func (t *Trie) Erase(word string) {
	if !t.Search(word) {
		return
	}
	t.eraseHelper(t.root, word, 0)
}

func (t *Trie) eraseHelper(node *TrieNode, word string, index int) {
	if index == len(word) {
		node.wordCount--
		return
	}
	ch := rune(word[index])
	child := node.children[ch]
	child.prefixCount--
	t.eraseHelper(child, word, index+1)
} 