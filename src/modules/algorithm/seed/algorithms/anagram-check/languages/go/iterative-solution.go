package anagramcheck

// IsAnagramIterative implements the anagram check algorithm using an iterative approach.
// It returns true if s1 and s2 are anagrams, false otherwise.
func IsAnagramIterative(s1, s2 string) bool {
	if len(s1) != len(s2) {
		return false
	}

	count := make(map[rune]int)
	for _, ch := range s1 {
		count[ch]++
	}

	for _, ch := range s2 {
		if count[ch] == 0 {
			return false
		}
		count[ch]--
	}

	return true
} 