package coinchange

// CoinChangeRecursive implements the coin change algorithm using a recursive approach with memoization.
// It returns the minimum number of coins needed to form the given amount, or -1 if not possible.
func CoinChangeRecursive(coins []int, amount int) int {
    memo := make(map[int]int)

    var helper func(rem int) int
    helper = func(rem int) int {
        if rem < 0 {
            return amount + 1
        }
        if rem == 0 {
            return 0
        }
        if val, exists := memo[rem]; exists {
            return val
        }
        minCoins := amount + 1
        for _, coin := range coins {
            candidate := helper(rem - coin) + 1
            if candidate < minCoins {
                minCoins = candidate
            }
        }
        memo[rem] = minCoins
        return minCoins
    }

    result := helper(amount)
    if result > amount {
        return -1
    }
    return result
} 