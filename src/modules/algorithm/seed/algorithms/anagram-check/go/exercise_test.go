package anagramcheck

import "testing"

func TestIsAnagram(t *testing.T) {
	tests := []struct {
		name     string
		s1       string
		s2       string
		expected bool
	}{
		{"anagrams", "listen", "silent", true},
		{"anagrams", "triangle", "integral", true},
		{"non-anagrams", "hello", "world", false},
		{"different lengths", "abc", "ab", false},
		{"empty strings", "", "", true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := IsAnagram(tt.s1, tt.s2); got != tt.expected {
				t.Errorf("IsAnagram(%q, %q) = %v; want %v", tt.s1, tt.s2, got, tt.expected)
			}
		})
	}
} 