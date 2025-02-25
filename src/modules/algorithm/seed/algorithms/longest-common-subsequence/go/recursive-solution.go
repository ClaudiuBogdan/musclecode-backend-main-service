package lcs

type pair struct {
    i, j int
}

// LongestCommonSubsequenceRecursive implements the longest common subsequence algorithm using recursion with memoization.
func LongestCommonSubsequenceRecursive(text1, text2 string) int {
    memo := make(map[pair]int)

    var lcs func(i, j int) int
    lcs = func(i, j int) int {
        if i == len(text1) || j == len(text2) {
            return 0
        }
        key := pair{i, j}
        if val, exists := memo[key]; exists {
            return val
        }
        if text1[i] == text2[j] {
            memo[key] = 1 + lcs(i+1, j+1)
        } else {
            left := lcs(i+1, j)
            right := lcs(i, j+1)
            if left > right {
                memo[key] = left
            } else {
                memo[key] = right
            }
        }
        return memo[key]
    }

    return lcs(0, 0)
} 