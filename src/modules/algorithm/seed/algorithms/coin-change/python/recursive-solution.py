from typing import List
from functools import lru_cache

def coin_change(coins: List[int], amount: int) -> int:
    """
    Implements coin change using a recursive approach with memoization.
    
    Args:
        coins: List of coin denominations.
        amount: The total amount to form.
        
    Returns:
        Minimum number of coins needed, or -1 if the amount cannot be formed.
    """
    @lru_cache(maxsize=None)
    def helper(rem: int) -> int:
        if rem < 0:
            return float('inf')
        if rem == 0:
            return 0
        min_coins = float('inf')
        for coin in coins:
            min_coins = min(min_coins, helper(rem - coin) + 1)
        return min_coins

    result = helper(amount)
    return -1 if result == float('inf') else result 