package anagramcheck

import "strings"

// IsAnagramRecursive implements the anagram check algorithm using a recursive approach.
// It returns true if s1 and s2 are anagrams, false otherwise.
func IsAnagramRecursive(s1, s2 string) bool {
	if len(s1) != len(s2) {
		return false
	}
	if s1 == "" {
		return true
	}

	// Get the first character as a rune.
	r := []rune(s1)[0]
	// Find the byte index of the rune in s2.
	index := strings.IndexRune(s2, r)
	if index == -1 {
		return false
	}

	// Remove the character at the found index from s2.
	newS2 := s2[:index] + s2[index+len(string(r)):]
	return IsAnagramRecursive(s1[1:], newS2)
} 