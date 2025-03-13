from typing import List

def coin_change(coins: List[int], amount: int) -> int:
    """
    Implements coin change using an iterative dynamic programming approach.
    
    Args:
        coins: List of coin denominations.
        amount: The total amount to form.
        
    Returns:
        Minimum number of coins needed, or -1 if the amount cannot be formed.
    """
    if amount == 0:
        return 0
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if i - coin >= 0:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return -1 if dp[amount] == float('inf') else dp[amount] 