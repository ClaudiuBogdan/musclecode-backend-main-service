package coinchange

// CoinChangeIterative implements the coin change algorithm using an iterative dynamic programming approach.
// It returns the minimum number of coins needed to form the given amount, or -1 if not possible.
func CoinChangeIterative(coins []int, amount int) int {
    if amount == 0 {
        return 0
    }
    dp := make([]int, amount+1)
    for i := 1; i <= amount; i++ {
        dp[i] = amount + 1
        for _, coin := range coins {
            if i-coin >= 0 && dp[i-coin]+1 < dp[i] {
                dp[i] = dp[i-coin] + 1
            }
        }
    }
    if dp[amount] > amount {
        return -1
    }
    return dp[amount]
} 