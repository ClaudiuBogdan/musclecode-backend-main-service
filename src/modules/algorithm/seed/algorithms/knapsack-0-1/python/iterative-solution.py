from typing import List

def knapsack_01(weights: List[int], values: List[int], capacity: int) -> int:
    """
    Implements the 0/1 Knapsack algorithm using an iterative tabulation approach.
    
    Args:
        weights: A list of item weights.
        values: A list of item values.
        capacity: Maximum capacity of the knapsack.
    
    Returns:
        The maximum total value achievable.
    """
    n = len(weights)
    # Create dp table with dimensions (n+1) x (capacity+1)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][capacity] 