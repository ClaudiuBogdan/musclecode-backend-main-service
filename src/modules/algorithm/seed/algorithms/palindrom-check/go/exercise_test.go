package palindromecheck

import "testing"

func TestIsPalindromeBasic(t *testing.T) {
    tests := []struct {
        name     string
        input    string
        expected bool
    }{
        {"simple palindrome", "madam", true},
        {"odd-length palindrome", "racecar", true},
        {"non-palindrome", "hello", false},
        {"ignore case and punctuation", "A man, a plan, a canal: Panama", true},
        {"empty string", "", true},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := IsPalindrome(tt.input)
            if got != tt.expected {
                t.Errorf("IsPalindrome(%q) = %v; want %v", tt.input, got, tt.expected)
            }
        })
    }
} 