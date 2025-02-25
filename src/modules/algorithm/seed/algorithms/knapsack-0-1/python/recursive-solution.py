from typing import List
from functools import lru_cache

def knapsack_01(weights: List[int], values: List[int], capacity: int) -> int:
    """
    Implements the 0/1 Knapsack algorithm using a recursive approach with memoization.
    
    Args:
        weights: A list of item weights.
        values: A list of item values.
        capacity: Maximum capacity of the knapsack.
    
    Returns:
        The maximum total value achievable.
    """
    n = len(weights)
    
    @lru_cache(maxsize=None)
    def helper(i: int, remaining: int) -> int:
        if i >= n or remaining <= 0:
            return 0
        without = helper(i + 1, remaining)
        with_item = 0
        if weights[i] <= remaining:
            with_item = values[i] + helper(i + 1, remaining - weights[i])
        return max(without, with_item)
    
    return helper(0, capacity) 