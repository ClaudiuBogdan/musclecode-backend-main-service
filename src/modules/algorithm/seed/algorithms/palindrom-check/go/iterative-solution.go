package palindromecheck

import (
	"unicode"
)

// IsPalindromeIterative implements the palindrome check algorithm using an iterative approach.
// It preprocesses the string by removing non-alphanumeric characters and converting to lowercase.
func IsPalindromeIterative(s string) bool {
	filtered := ""
	for _, r := range s {
		if unicode.IsLetter(r) || unicode.IsNumber(r) {
			filtered += string(unicode.ToLower(r))
		}
	}

	left, right := 0, len(filtered)-1
	for left < right {
		if filtered[left] != filtered[right] {
			return false
		}
		left++
		right--
	}
	return true
} 