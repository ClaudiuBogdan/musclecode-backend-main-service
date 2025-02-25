package palindromecheck

import (
	"unicode"
)

// IsPalindromeRecursive implements the palindrome check algorithm using recursion.
// It preprocesses the string by removing non-alphanumeric characters and converting to lowercase.
func IsPalindromeRecursive(s string) bool {
	filtered := ""
	for _, r := range s {
		if unicode.IsLetter(r) || unicode.IsNumber(r) {
			filtered += string(unicode.ToLower(r))
		}
	}
	return isPalindromeHelper(filtered, 0, len(filtered)-1)
}

func isPalindromeHelper(s string, left, right int) bool {
	if left >= right {
		return true
	}
	if s[left] != s[right] {
		return false
	}
	return isPalindromeHelper(s, left+1, right-1)
} 