package knapsack

import "fmt"

// Knapsack01Recursive implements the 0/1 Knapsack algorithm using a recursive approach with memoization.
func Knapsack01Recursive(weights []int, values []int, capacity int) int {
    memo := make(map[string]int)
    var helper func(i, remaining int) int
    n := len(weights)
    
    helper = func(i, remaining int) int {
        if i >= n || remaining <= 0 {
            return 0
        }
        key := fmt.Sprintf("%d:%d", i, remaining)
        if val, exists := memo[key]; exists {
            return val
        }
        without := helper(i+1, remaining)
        withItem := 0
        if weights[i] <= remaining {
            withItem = values[i] + helper(i+1, remaining-weights[i])
        }
        result := max(without, withItem)
        memo[key] = result
        return result
    }
    
    return helper(0, capacity)
} 