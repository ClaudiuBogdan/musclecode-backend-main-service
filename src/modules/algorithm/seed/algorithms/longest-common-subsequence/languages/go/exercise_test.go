package lcs

import "testing"

func TestLongestCommonSubsequenceBasic(t *testing.T) {
    tests := []struct {
        text1    string
        text2    string
        expected int
    }{
        {"abcde", "ace", 3},
        {"abc", "abc", 3},
        {"abc", "def", 0},
        {"", "abc", 0},
        {"abc", "", 0},
    }

    for _, tt := range tests {
        got := LongestCommonSubsequence(tt.text1, tt.text2)
        if got != tt.expected {
            t.Errorf("LongestCommonSubsequence(%q, %q) = %d; want %d", tt.text1, tt.text2, got, tt.expected)
        }
    }
} 