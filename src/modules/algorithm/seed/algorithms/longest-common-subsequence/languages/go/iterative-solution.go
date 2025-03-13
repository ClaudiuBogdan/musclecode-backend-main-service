package lcs

// LongestCommonSubsequenceIterative implements the longest common subsequence algorithm using an iterative dynamic programming approach.
func LongestCommonSubsequenceIterative(text1, text2 string) int {
    m, n := len(text1), len(text2)

    // Create dp table with dimensions (m+1) x (n+1)
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }

    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if text1[i-1] == text2[j-1] {
                dp[i][j] = dp[i-1][j-1] + 1
            } else {
                if dp[i-1][j] > dp[i][j-1] {
                    dp[i][j] = dp[i-1][j]
                } else {
                    dp[i][j] = dp[i][j-1]
                }
            }
        }
    }

    return dp[m][n]
} 