package trie

import "testing"

func TestTrieBasicOperations(t *testing.T) {
	trie := NewTrie()
	trie.Insert("apple")
	if !trie.Search("apple") {
		t.Errorf("Expected to find 'apple'")
	}
	if trie.Search("app") {
		t.Errorf("Did not expect to find 'app'")
	}
	if !trie.StartsWith("app") {
		t.Errorf("Expected prefix 'app' to exist")
	}

	trie.Insert("app")
	if !trie.Search("app") {
		t.Errorf("Expected to find 'app' after insertion")
	}
}

func TestTrieCountAndErase(t *testing.T) {
	trie := NewTrie()
	trie.Insert("apple")
	trie.Insert("apple")
	trie.Insert("apps")

	if count := trie.CountWordsEqualTo("apple"); count != 2 {
		t.Errorf("Expected count for 'apple' to be 2, got %d", count)
	}
	if count := trie.CountWordsStartingWith("app"); count != 3 {
		t.Errorf("Expected count for prefix 'app' to be 3, got %d", count)
	}

	trie.Erase("apple")
	if count := trie.CountWordsEqualTo("apple"); count != 1 {
		t.Errorf("After erase, expected count for 'apple' to be 1, got %d", count)
	}
} 